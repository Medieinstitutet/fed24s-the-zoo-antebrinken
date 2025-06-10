import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ErrorPage from "./ErrorPage";
import AnimalList from "./AnimalList";
import AnimalDetail from "./AnimalDetail";
import HomePage from "./HomePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route index element={<HomePage />} />
          <Route path="animals" element={<AnimalList />} />
          <Route path="animals/:id" element={<AnimalDetail />} />
         
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}