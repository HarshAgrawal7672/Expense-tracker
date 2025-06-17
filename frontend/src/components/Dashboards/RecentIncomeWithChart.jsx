import React, { useEffect, useState } from "react";

import CustomPieChart from "../Charts/CustomPieChart";
const COLORS=["#875CF5","#FA2C37","#FF6900","#4f39f6"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {
   

    const [chartdata,setChartdata]=useState([])
    const prepareChartData=()=>{
        const DataArr=data?.map((item)=>({
            name:item?.source,
            amount:item?.amount
        }))

        setChartdata(DataArr)
    }

    useEffect(()=>{
        prepareChartData()
        return ()=>{}
    },[data])
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800 ">Last 60 Days Incomes</h5>

        <CustomPieChart
        data={chartdata}
        label="Total Income"
        totalamount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        />

        
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
