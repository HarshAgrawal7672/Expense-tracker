import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({transactions,onSeeMore}) => {
  return (
        <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800 ">Incomes</h5>

        <button className=" card-btn" onClick={onSeeMore}>
          See More
          <LuArrowRight className="text-base" />
        </button>
      </div>


      <div className="mt-6">
        {transactions?.slice(0,5)?.map(income=>(
            <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("DD MMM YYYY")}
                amount={income.amount}
                type="income"
                hideDeleteBtn
                />
        ))}

      </div>
    </div>
  )
}

export default RecentIncome
