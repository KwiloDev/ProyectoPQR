import { useEffect, useState } from "react";
import { obtenerPQR } from "../services/api";

export default function TablaPQR({ filtros, setData }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargarDatos() {
      const res = await obtenerPQR(filtros);
      if (!cancelado) {
        setData(res.data.data);
        setLoading(false);
      }
    }

    cargarDatos();

    return () => (cancelado = true);
  }, [filtros, setData]);

  if (loading) return <p>Cargando...</p>;

  return null;
}
