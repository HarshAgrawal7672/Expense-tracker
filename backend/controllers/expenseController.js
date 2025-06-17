const xlsx = require('xlsx');
const Expense= require('../models/Expense');
//add   expense source
exports.addExpense = async (req, res) => {
    const userId=req.user._id;
    try{
        const { icon, category, amount,date } = req.body || {};

        // Validate input
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Create new expense
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date.now()) // Ensure date is stored as a Date object
        });

        await newExpense.save();

        res.status(201).json(newExpense);
    }
    catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all   expense sources
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expense sources:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete an expense source
exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
        // Find the expense source by ID and user ID
        const expense = await Expense.findOneAndDelete({ _id: expenseId });

        if (!expense) {
            return res.status(404).json({ message: 'Expense source not found' });
        }

        res.status(200).json({ message: 'Expense source deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense source:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Download   expense sources as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No expense sources found' });
        }

        // Convert expense data to Excel format
        const excelData = expenses.map(expense => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: expense.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            Icon: expense.icon || 'N/A'
        }));

        const worksheet = xlsx.utils.json_to_sheet(excelData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        xlsx.writeFile(workbook, 'expense_data.xlsx');
        res.download('expense_data.xlsx');

    } catch (error) {
        console.error('Error downloading expense as Excel:', error);
        res.status(500).json({ message: 'Server error' });
    }
}