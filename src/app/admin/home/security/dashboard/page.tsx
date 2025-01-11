"use client";
import { Provider } from "react-redux";
import { store } from "@/state/store";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "../dashboard (2)/CardExpenseSummary";
import CardPopularProducts from "../dashboard (2)/CardPopularProducts";
import CardPurchaseSummary from "../dashboard (2)/CardPurchaseSummary";
import CardSalesSummary from "../dashboard (2)/CardSalesSummary";
import StatCard from "../dashboard (2)/StatCard";

const Dashboard = () => {
  return (
    <Provider store={store}>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
     
    </div>
    </Provider>
  );
};

export default Dashboard;
