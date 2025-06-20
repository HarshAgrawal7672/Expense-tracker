import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';



const ExpenseOverview = ({transactions,onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
      useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
      }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className=" text-xs font-bold text-gray-500 mt-0.5">
            Track your spendings trends Over time and get insights into where your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg"/>
          Add Expense

        </button>
      </div>

      <div className=" mt-10">

        <CustomLineChart data={chartData}/>

      </div>
    </div>
  )
}

export default ExpenseOverview
