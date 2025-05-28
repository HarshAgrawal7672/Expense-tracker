const express = require("express");
const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
}= require("../controllers/incomeController");
const { protect } = require("../midllewares/authMiddleware");

const router = express.Router();

// Route for adding income
router.post("/add", protect, addIncome);
// Route for getting all income
router.get("/get", protect, getAllIncome);
// Route for deleting income
router.delete("/:id", protect, deleteIncome);
// Route for downloading income as Excel
router.get("/downloadexcel", protect, downloadIncomeExcel);


module.exports = router;