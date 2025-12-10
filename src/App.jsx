import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageForm from "./pages/PageForm";
import PageAdmin from "./pages/PageAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal: formulario para diligenciar */}
        <Route path="/" element={<PageForm />} />

        {/* Panel administrativo */}
        <Route path="/admin" element={<PageAdmin />} />

      </Routes>
    </BrowserRouter>
  );
}
