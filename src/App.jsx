import { useState } from "react";
import FiltrosPQR from "./components/FiltrosPQR";
import TablaPQR from "./components/TablaPQR";
import ExportarExcel from "./components/ExportarExcel";

export default function App() {
  const [filtros, setFiltros] = useState({});
  const [data, setData] = useState([]);

  const buscar = () => {
    setFiltros({ ...filtros });
  };

  return (
    <div className="dashboard">

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
              <th>Telefono</th>          
              <th>Valor</th>
              <th>Franquicia</th>
              <th>Ult/4Dig</th>
              <th>Banco emisor</th>
              <th>Observaciones</th>
              <th>Estado</th>
              <th>Fecha Transaccion</th>
              <th>Fecha CreacionPQR</th>
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
