import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';



const ExpenseOverview = ({transactions,onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
      useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
      }, [transactions]);
  return (
    <div>
      
    </div>
  )
}

export default ExpenseOverview
