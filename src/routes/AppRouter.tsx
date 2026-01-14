import { Routes, Route, Navigate } from "react-router-dom";
import Cierre from "../pages/Cierre";
import Promesa from "../pages/Promesa";
import App from "../App";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/promesa/:id" element={<Promesa />} />
      <Route path="/cierre/:id" element={<Cierre />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
