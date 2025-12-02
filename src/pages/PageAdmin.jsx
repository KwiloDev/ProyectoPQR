import { useState } from "react";
import FiltrosPQR from "../components/FiltrosPQR";
import TablaPQR from "../components/TablaPQR";
import ExportarExcel from "../components/ExportarExcel";
import { Link } from "react-router-dom";

export default function PageAdmin() {
  const [auth, setAuth] = useState(() => {
  return localStorage.getItem("pqr_admin_auth") === "true";
});

  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [filtros, setFiltros] = useState({});
  const [data, setData] = useState([]);



  // ============================================
  //   LOGIN ADMIN
  // ============================================
  const login = (e) => {
    e.preventDefault();

    const realPass = import.meta.env.VITE_ADMIN_PASS;

    if (pass === realPass) {
      localStorage.setItem("pqr_admin_auth", "true");
      setAuth(true);
    } else {
      setError("Contraseña incorrecta");
    }
  };

  // ============================================
  //   LOGOUT
  // ============================================
  const logout = () => {
    localStorage.removeItem("pqr_admin_auth");
    setAuth(false);
  };

  const buscar = () => {
    setFiltros({ ...filtros });
  };

  // ============================================
  //   SI NO ESTÁ AUTENTICADO → LOGIN
  // ============================================
  if (!auth) {
  return (
    <div className="admin-login-container">

      <Link to="/PQR" className="btn-admin back-btn">
        ← Volver al formulario
      </Link>

      <h2>Acceso Administrador</h2>

      <form onSubmit={login} className="admin-login-form">

        {/* Wrapper del input y el ojo */}
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Ingrese contraseña"
            value={pass}
            autoComplete="new-password"
            onChange={(e) => setPass(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}


  // ============================================
  //   SI ESTÁ AUTENTICADO → MOSTRAR DASHBOARD
  // ============================================
  return (
    <div className="dashboard">

      {/* Botón regresar */}
      <div className="top-right-button">
        <button onClick={logout} className="btn-admin back-btn">
          Cerrar sesión
        </button>
      </div>

      <h1>Dashboard PQR — Crepes & Waffles</h1>

      <FiltrosPQR filtros={filtros} setFiltros={setFiltros} buscar={buscar} />

      <TablaPQR filtros={filtros} setData={setData} />

      <ExportarExcel data={data} />

      {data.length > 0 && (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Centro</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Valor</th>
              <th>Franquicia</th>
              <th>Últ/4</th>
              <th>Banco</th>
              <th>Observaciones</th>
              <th>Estado</th>
              <th>Fecha Transacción</th>
              <th>Creación PQR</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.attributes.centro_operacion}</td>
                <td>{p.attributes.nombre_cliente}</td>
                <td>{p.attributes.telefono}</td>
                <td>{p.attributes.valor_transaccion}</td>
                <td>{p.attributes.franquicia}</td>
                <td>{p.attributes.ultimos4}</td>
                <td>{p.attributes.banco_emisor}</td>
                <td>{p.attributes.observaciones}</td>
                <td>{p.attributes.estado}</td>
                <td>{p.attributes.fecha_transaccion}</td>
                <td>{new Date(p.attributes.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
