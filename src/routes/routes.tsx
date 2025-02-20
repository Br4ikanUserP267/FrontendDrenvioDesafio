import { Routes, Route } from "react-router-dom";

import Articulos from "../pages/marketplace/articulos";
import SpecialPriceForm from "../pages/Subidas/subidas"; // Corregí la ruta del import

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Articulos />} />
      <Route path="/subida" element={<SpecialPriceForm />} /> {/* 🔹 Agregamos un <Route> */}
    </Routes>
  );
}

export default AppRoutes;
