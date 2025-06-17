import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/expense/ExpenseOverview";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


   //get all expense details

  const fetchExpensedetails=async ()=>{
    if(loading) return;

    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      )

      if(response.data){
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("something went wrong",error)

    }finally{
      setLoading(false)
    }

  }


 const handleAddExpense= async (expense)=>{
    const {category,amount,icon,date}=expense
    // validation check
    if(!category.trim()){
      toast.error("category is required")
      return
    }
    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("invalid amount")

      return
    }
    if(!date){
      toast.error("date is required")
      return
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon
      })
      setOpenAddExpenseModal(false)
      toast.success("Expense added Successfully")
        fetchExpensedetails()
      
    }catch(error)
    {
      console.error( "ERRor adding expense:",error.response?.data.message || error.message)
    }
  }


 useEffect(() => {
    fetchExpensedetails()
  
    return () => {
    }
  }, [])








  return (
    <DashboardLayout activeMenu="Expense">
      <div className=" my-5 mx-auto ">
        <div className='grid grid-cols-1 gap-6'> 
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={()=>setOpenAddExpenseModal(true)}
              />
              </div>

          </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
