"use client";

import {
  CheckCircle,
  Package,
  PlusCircleIcon,
  SearchIcon,
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
import Header from "../(components)/Header";

const Dashboard = () => {
  return (
    <DashWrapper>
    <div className="mx-auto pb-5 w-full">
        {/* SEARCH BAR */}
        <div className="mb-6">
            <div className="flex items-center border-2 border-gray-200 rounded">
                <SearchIcon className="w-5 h-5 text-gray-500 m-2"/>
                <input className="w-full py-2 px-4 rounded bg-white" 
                placeholder="Search products..." 
                // value={}
                onChange={(e) =>{}}
                />
            </div>
        </div>

        {/* HEADER BAR*/}
        <div className="flex justify-between items-center mb-6">
            <Header name="Maisons" />
            <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() =>{}}>
                <PlusCircleIcon className="w-5 mr-2 !text-gray-200" />
                Poster une maison
            </button>
        </div>
      </div>
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
