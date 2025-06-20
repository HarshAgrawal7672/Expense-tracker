import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboards/RecentTransactions";
import FinanceOverview from "../../components/Dashboards/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboards/ExpenseTransactions";
import Last30daysExpenses from "../../components/Dashboards/Last30daysExpenses";
import RecentIncomeWithChart from "../../components/Dashboards/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboards/RecentIncome";
const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className=" my-5 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalbalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <RecentTransactions
            transactions={dashboardData?.recenttransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
          totalBalance={dashboardData?.totalbalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData?.last30daysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        <Last30daysExpenses
          data={dashboardData?.last30daysExpenses?.transactions ||[]}
          />

        <RecentIncomeWithChart
        data={dashboardData?.last60daysIncome?.transactions.slice(0,4) || []}
        totalIncome={dashboardData?.totalIncome||0}
        />

        <RecentIncome
        transactions={dashboardData?.last60daysIncome?.transactions || []}
        onSeeMore={() => navigate("/income")}
        />




        </div>

        
      </div>
    </DashboardLayout>
  );
};

export default Home;
