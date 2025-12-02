import * as XLSX from "xlsx";

export default function ExportarExcel({ data }) {

  const exportar = () => {
    const rows = data.map((p) => ({
      ID: p.id,
      Centro: p.attributes.centro_operacion,
      Valor: p.attributes.valor_transaccion,
      FechaTransaccion: p.attributes.fecha_transaccion,
      Ultimos4: p.attributes.ultimos4,
      Banco: p.attributes.banco_emisor,
      Franquicia: p.attributes.franquicia,
      PagoEfectivo: p.attributes.pago_efectivo,
      Cliente: p.attributes.nombre_cliente,
      Telefono: p.attributes.telefono,
      Correo: p.attributes.correo,
      Observaciones: p.attributes.observaciones,
      Estado: p.attributes.estado,
      FechaCreacion: p.attributes.createdAt
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(wb, ws, "PQR");
    XLSX.writeFile(wb, "reclamaciones.xlsx");
  };

  return (
    <button className="btn-excel" onClick={exportar}>
      Exportar Excel
    </button>
  );
}
