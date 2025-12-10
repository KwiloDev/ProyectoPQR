import { Link } from "react-router-dom";
import FormPQR from "../components/FormPQR";

export default function PageForm() {
  return (
    <div className="page-container">

      {/* Botón para ir al panel administrativo */}
      <div className="top-right-button">
        <Link to="/admin" className="btn-admin">
          Panel administrativo
        </Link>
      </div>

      <FormPQR />
    </div>
  );
}
