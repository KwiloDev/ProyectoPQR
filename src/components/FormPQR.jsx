import { useState } from "react";


export default function FormPQR() {

  const [form, setForm] = useState({
    centro_operacion: "",
    valor_transaccion: "",
    fecha_transaccion: "",
    ultimos4: "",
    banco_emisor: "",
    franquicia: "",
    pago_efectivo: "",
    nombre_cliente: "",
    telefono: "",
    correo: "",
    observaciones: "",
    estado: "pendiente"
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("https://macfer.crepesywaffles.com/api/pqr-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });

      const json = await res.json();

      if (res.ok) {
        setMensaje("🎉 Formulario enviado correctamente");
        setForm({
          centro_operacion: "",
          valor_transaccion: "",
          fecha_transaccion: "",
          ultimos4: "",
          banco_emisor: "",
          franquicia: "",
          pago_efectivo: "",
          nombre_cliente: "",
          telefono: "",
          correo: "",
          observaciones: "",
          estado: "pendiente",
        });
      } else {
        setMensaje("❌ Error al enviar: " + json?.error?.message);
      }
    } catch (error) {
        console.log(error)
      setMensaje("❌ Error de conexión");
    }
  };

  return (
    <form className="form-pqr" onSubmit={enviarFormulario}>

      <div className="logo-div">
        <img src="src/assets/logo-crepes.png" alt="logo" />
      </div>

      <h2>Formulario de Reclamaciones</h2>

      {mensaje && <p className="msg">{mensaje}</p>}

      {/* ========================================= */}
      {/*             DATOS DE TRANSACCIÓN          */}
      {/* ========================================= */}

      <div className="section-card">
        <h3>Datos de la transacción</h3>

        <label>Centro de operación:</label>
        <select
          name="centro_operacion"
          value={form.centro_operacion}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un centro de operación</option>

          <optgroup label="España">
            <option value="R01 FUENCARRAL">R01 FUENCARRAL</option>
            <option value="R02 DIVERSIA">R02 DIVERSIA</option>
            <option value="R03 HERON CITY">R03 HERON CITY</option>
          </optgroup>

          <optgroup label="Panamá">
            <option value="R01 MARBELLA">R01 MARBELLA</option>
            <option value="R02 MULTIPLAZA">R02 MULTIPLAZA</option>
            <option value="R03 ALTA PLAZA">R03 ALTA PLAZA</option>
            <option value="R04 TOWN CENTER">R04 TOWN CENTER</option>
          </optgroup>
        </select>

        <label>Valor de la transacción (COP):</label>
        <input
          type="number"
          name="valor_transaccion"
          placeholder="Ej: 50000"
          value={form.valor_transaccion}
          onChange={handleChange}
          required
        />

        <label>Fecha de la transacción:</label>
        <input
          type="date"
          name="fecha_transaccion"
          value={form.fecha_transaccion}
          onChange={handleChange}
          required
        />

        <label>Últimos 4 dígitos de la tarjeta:</label>
        <input
          type="text"
          name="ultimos4"
          placeholder="Ej: 1234"
          maxLength="4"
          value={form.ultimos4}
          onChange={handleChange}
          required
        />

        <label>Banco emisor:</label>
        <input
          type="text"
          name="banco_emisor"
          placeholder="Escriba el banco emisor"
          value={form.banco_emisor}
          onChange={handleChange}
          required
        />

        <label>Franquicia:</label>
        <div className="chip-group">
          {["MasterCard", "Visa", "Amex", "Otra"].map((item) => (
            <span
              key={item}
              className={`chip ${form.franquicia === item ? "chip-selected" : ""}`}
              onClick={() => setForm({ ...form, franquicia: item })}
            >
              {item}
            </span>
          ))}
        </div>

        <label>¿Cliente canceló en efectivo?</label>
        <div className="chip-group">
          <span
            className={`chip ${form.pago_efectivo === "si" ? "chip-selected" : ""}`}
            onClick={() => setForm({ ...form, pago_efectivo: "si" })}
          >
            Sí
          </span>

          <span
            className={`chip ${form.pago_efectivo === "no" ? "chip-selected" : ""}`}
            onClick={() => setForm({ ...form, pago_efectivo: "no" })}
          >
            No
          </span>
        </div>
      </div>

      {/* ========================================= */}
      {/*               DATOS DEL CLIENTE           */}
      {/* ========================================= */}

      <div className="section-card">
        <h3>Datos del cliente</h3>

        <label>Nombre del cliente:</label>
        <input
          type="text"
          name="nombre_cliente"
          placeholder="Ej: Juan Pérez"
          value={form.nombre_cliente}
          onChange={handleChange}
          required
        />

        <label>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          placeholder="Ej: 3201234567"
          value={form.telefono}
          onChange={handleChange}
          required
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          name="correo"
          placeholder="Ej: cliente@correo.com"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          placeholder="Escriba detalles adicionales…"
          value={form.observaciones}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn-enviar">Enviar Reclamación</button>
    </form>
  );
}
