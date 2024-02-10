import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Graphs from "./pages/Graphs";
import Budgets from "./pages/Budgets";
import NoPage from "./pages/NoPage";
import BudgetCategories from "./pages/BudgetCategories";
import ChaseCard from "./pages/ChaseCard";
import AmazonCard from "./pages/AmazonCard";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
          <Route path="/graphs" element={<Graphs />}></Route>
          <Route path="/budgets" element={<Budgets />}></Route>
          <Route
            path="/budget_categories"
            element={<BudgetCategories />}
          ></Route>
          <Route path="/chase_card" element={<ChaseCard />}></Route>
          <Route path="/amazon_card" element={<AmazonCard />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
