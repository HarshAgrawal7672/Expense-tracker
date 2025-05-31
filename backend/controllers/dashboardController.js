const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));
    // Fetch total income and total expense for the user

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log(
      "Total Income:",
      totalIncome,
      "User ID:",
      isValidObjectId(userId)
    );

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //get income tranasactions for last 60 days

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      },
    }).sort({ date: -1 }); // Sort by date in descending order

    //get total income transactions for last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    //get expense transactions for last 30 days
    const last60DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
    }).sort({ date: -1 }); // Sort by date in descending order
    //get total expense transactions for last 30 days
    const expenseLast30Days = last60DaysExpenseTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    // fetch last 5 transactions for income and expense

    // Fetch recent 5 income and expense transactions
    const incomeTx = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const expenseTx = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    // Add type to each transaction and combine
    const lastTransactions = [
      ...incomeTx.map((tx) => ({ ...tx.toObject(), type: "income" })),
      ...expenseTx.map((tx) => ({ ...tx.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Prepare the response data
    res.json({
      totalbalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30daysExpenses: {
        total: expenseLast30Days,
        transactions: last60DaysExpenseTransactions,
      },
      last60daysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recenttransactions: lastTransactions, // Limit to 5 most recent transactions
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
