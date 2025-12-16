import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import AddStreak from "@/pages/AddStreak";
import Navbar from "@/components/Navbar";
import ContextProvider from "./providers/ContextProvider";
import ManageStreak from "./pages/ManageStreak";
import ViewStreak from "./pages/ViewStreak";
import { Toaster } from "sonner";

export function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddStreak />} />
            <Route path="/manage/:id" element={<ManageStreak />} />
            <Route path="/view/:id" element={<ViewStreak />} />
          </Routes>
        </Layout>
        <Toaster position="top-center" />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
