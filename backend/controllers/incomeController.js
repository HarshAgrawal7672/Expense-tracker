const xlsx = require('xlsx');
const Income= require('../models/Income');
//add income source
exports.addIncome = async (req, res) => {
    const userId=req.user._id;
    try{
        const { icon, source, amount,date } = req.body || {};

        // Validate input
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        // Create new income source
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        });

        await newIncome.save();

        res.status(201).json(newIncome);
    }
    catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching income sources:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete an income source
exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id;

    try {
        // Find the income source by ID and user ID
        const income = await Income.findOneAndDelete({ _id: incomeId });

        if (!income) {
            return res.status(404).json({ message: 'Income source not found' });
        }

        res.status(200).json({ message: 'Income source deleted successfully' });
    } catch (error) {
        console.error('Error deleting income source:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Download income sources as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        if (incomes.length === 0) {
            return res.status(404).json({ message: 'No income sources found' });
        }

        // Convert income data to Excel format
        const excelData = incomes.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const worksheet = xlsx.utils.json_to_sheet(excelData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Incomes');
        xlsx.writeFile(workbook, 'income_data.xlsx');
        res.download('income_data.xlsx');

        
    } catch (error) {
        console.error('Error downloading income as Excel:', error);
        res.status(500).json({ message: 'Server error' });
    }
}