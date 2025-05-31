const express = require("express");
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
}= require("../controllers/expenseController");
const { protect } = require("../midllewares/authMiddleware");

const router = express.Router();

// Route for adding Expense
router.post("/add", protect, addExpense);
// Route for getting all Expense
router.get("/get", protect, getAllExpense);
// Route for deleting Expense
router.delete("/:id", protect, deleteExpense);
// Route for downloading Expense as Excel
router.get("/downloadexcel", protect, downloadExpenseExcel);


module.exports = router;