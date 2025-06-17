import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState } from 'react'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {
  useUserAuth()

  const [incomeData,setIncomeData]=useState([])
  const [loading,setLoading]=useState(false)
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null
  })
  const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false)

  //get all income details

  const fetchIncomedetails=async ()=>{
    if(loading) return;

    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      )

      if(response.data){
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("something went wrong",error)

    }finally{
      setLoading(false)
    }

  }

  //handle add income

  const handleAddIncome= async (income)=>{
    const {source,amount,icon,date}=income
    // validation check
    if(!source.trim()){
      toast.error("source is required")
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModal(false)
      toast.success("Income added Successfully")
        fetchIncomedetails()
      
    }catch(error)
    {
      console.error( "ERRor adding income:",error.response?.data.message || error.message)
    }
  }

  //delete Income

  const deleteIncome= async (id) => {

    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({
        show: false,
        data:null
      })
      toast.success("Income deleted Successfully")
      fetchIncomedetails()
    } catch (error) {
      console.error("Error deleting income:", error.response?.data.message || error.message)

      
    }
    
  }

  //handle downlaod income details

  const handleDownloadIncomeDetails =async () =>{

    try {
      await axiosInstance.get
      
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    fetchIncomedetails()
  
    return () => {
    }
  }, [])
  



  return (
    <DashboardLayout activeMenu="Income">
      <div className=" my-5 mx-auto ">
        <div className='grid grid-cols-1 gap-6'> 
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
              />

          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id)=>{
              setOpenDeleteAlert({
                show:true,
                data:id
              })
            }}
            onDownload={handleDownloadIncomeDetails}
            />

        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </Modal>

          <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({
            show:false,
            data:null
          })}
          title="Delete Income"
          >
            <DeleteAlert
               content="Are you sure you want to delete this income ?"
               onDelete={()=>deleteIncome(openDeleteAlert.data)}
               />
          </Modal>

      </div>
      </DashboardLayout>
  )
}

export default Income
