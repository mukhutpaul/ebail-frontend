"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";
import DashboardWrapper from "@/app/dashboardWrapper";
import DashWrapper from "../dashWrapper";

const Dashboard = () => {
  return (
    <DashWrapper>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
     {/* <CardPopularProducts /> */} 
      {/* <CardSalesSummary /> */}
      {/* <CardPurchaseSummary /> */}
      <CardExpenseSummary />
      <CardExpenseSummary />
      <CardExpenseSummary />
      {/* <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      /> */}
      
    </div>
  </DashWrapper>
  );
};

export default Dashboard;
