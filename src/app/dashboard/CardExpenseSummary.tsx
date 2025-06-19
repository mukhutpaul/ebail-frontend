import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { PlusCircleIcon, TrendingUp } from "lucide-react";
import Image from "next/image";
import { FiPhone, FiPlus } from "react-icons/fi";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

 

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
             Vente parcelle
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7 overflow-auto">
          <Image
                  src={`/kinshasa.png`}
                  alt="maison"
                  width={600}
                  height={400}
                  className="mb-3 rounded-2xl w-100 h-100 justify-center"
                />
            
          </div>
          {/* HEADER */}
          <div>
            <hr />
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
            <div className="flex flex-row justify-between">
            <p>Vente parcelle</p>
            <p>Montant : 4500000$</p>
            </div><br/>
            <div className="flex flex-row gap-3 justify-between">
            <button className="flex flex-row gap-3">
            <FiPhone color="red" size={30}/>  +243 816 932 639
            </button>

            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-full">
              <PlusCircleIcon className="w-5 mr-2 !text-gray-200"/><p color="red">plus</p>
            </button>
            </div>
          </h2>
        </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
