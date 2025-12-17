import { useState } from "react";
import { formatNumber, parseNumber } from "../utils/formatMoney";

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
    estado: "pendiente",
  });

  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  // ----------------------------
  //  MANEJO DEL FORM STATE
  // ----------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
const handleValorTransaccion = (e) => {
  const raw = parseNumber(e.target.value); // quita puntos
  setForm({ ...form, valor_transaccion: raw });
};

  // ----------------------------
  //  VALIDACIÓN 
  // ----------------------------
  const validarFormulario = () => {
    let newErrors = {};

    const requiredFields = [
      "centro_operacion",
      "valor_transaccion",
      "fecha_transaccion",
      "ultimos4",
      "banco_emisor",
      "franquicia",
      "nombre_cliente",
      "telefono",
      "correo",
      "observaciones",
    ];

    requiredFields.forEach((f) => {
      if (!form[f] || form[f].toString().trim() === "") {
        newErrors[f] = "Campo obligatorio";
      }
    });

    // Últimos 4 dígitos
    if (form.ultimos4 && !/^\d{4}$/.test(form.ultimos4)) {
      newErrors.ultimos4 = "Debe contener exactamente 4 números";
    }

    // Teléfono
    if (form.telefono && !/^\d{7,15}$/.test(form.telefono)) {
      newErrors.telefono = "Debe contener solo números (7 a 15 dígitos)";
    }

    // Valor mínimo
    if (form.valor_transaccion && form.valor_transaccion < 1000) {
      newErrors.valor_transaccion = "El valor debe ser mayor a 1.000 COP";
    }

    // Email
    if (
      form.correo &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.correo)
    ) {
      newErrors.correo = "Correo electrónico inválido";
    }

    // Fecha
    if (form.fecha_transaccion) {
      const fecha = new Date(form.fecha_transaccion);
      if (fecha > new Date()) {
        newErrors.fecha_transaccion = "La fecha no puede ser futura";
      }
    }

    // Pago efectivo
    if (form.pago_efectivo !== "true" && form.pago_efectivo !== "false") {
      newErrors.pago_efectivo = "Debe seleccionar Sí o No";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------
  //  ENVÍO DEL FORMULARIO
  // ----------------------------
  const enviarFormulario = async (e) => {
    e.preventDefault();

    // VALIDAR ANTES DE ENVIAR
    if (!validarFormulario()) {
      setModal({
        open: true,
        title: "Formulario incompleto",
        message: "Por favor revisa los campos marcados en rojo.",
        type: "error",
      });

      const primerCampo = Object.keys(errors)[0];
      if (primerCampo) {
        const element = document.querySelector(`[name="${primerCampo}"]`);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    try {
      const res = await fetch("https://macfer.crepesywaffles.com/api/pqr-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });

      const json = await res.json();

      if (res.ok) {
        setModal({
          open: true,
          title: "Reclamación enviada",
          message: "Tu solicitud fue registrada exitosamente.",
          type: "success",
        });

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
        setModal({
          open: true,
          title: "Error al enviar",
          message: json?.error?.message || "No se pudo registrar la reclamación.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setModal({
        open: true,
        title: "Error de conexión",
        message: "No se logró comunicar con el servidor.",
        type: "error",
      });
    }
  };

  // ----------------------------
  //  CERRAR MODAL
  // ----------------------------
  const cerrarModal = () => {
    setModal({ ...modal, open: false });
    if (modal.type === "success") window.location.reload();
  };

  // ----------------------------
  //  RENDER DEL FORMULARIO
  // ----------------------------
  return (
    <form className="form-pqr" onSubmit={enviarFormulario} noValidate>

      {/* MODAL */}
      {modal.open && (
        <div className="modalPQR-overlay">
          <div className="modalPQR-box">
            <div className={`modalPQR-icon ${modal.type}`}>
              {modal.type === "success" ? "✔" : "✖"}
            </div>

            <h3 className="modalPQR-title">{modal.title}</h3>
            <p className="modalPQR-message">{modal.message}</p>

            <button onClick={cerrarModal} type="button" className="modalPQR-btn">
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* LOGO */}
      <div className="logo-div">
        <img src="src/assets/logo-crepes.png" alt="logo" />
      </div>

      <h2>Formulario de Reclamaciones</h2>

      {/* SECCIÓN 1 */}
      <div className="section-card">
        <h3>Datos de la transacción</h3>

        <label>Centro de operación:</label>
        <select
          name="centro_operacion"
          className={errors.centro_operacion ? "input-error" : ""}
          value={form.centro_operacion}
          onChange={handleChange}
        >
          <option value="">Seleccione un centro</option>

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

        <label>Valor de la transacción:</label>
<input
  type="text"
  name="valor_transaccion"
  className={errors.valor_transaccion ? "input-error" : ""}
  value={formatNumber(form.valor_transaccion)}
  onChange={handleValorTransaccion}
/>


        <label>Fecha de la transacción:</label>
        <input
          type="date"
          name="fecha_transaccion"
          className={errors.fecha_transaccion ? "input-error" : ""}
          value={form.fecha_transaccion}
          onChange={handleChange}
        />

        <label>Últimos 4 dígitos:</label>
        <input
          type="text"
          name="ultimos4"
          maxLength="4"
          className={errors.ultimos4 ? "input-error" : ""}
          value={form.ultimos4}
          onChange={handleChange}
        />

        <label>Banco emisor:</label>
        <input
          type="text"
          name="banco_emisor"
          className={errors.banco_emisor ? "input-error" : ""}
          value={form.banco_emisor}
          onChange={handleChange}
        />

        <label>Franquicia:</label>
        <div className={`chip-group ${errors.franquicia ? "chip-error" : ""}`}>
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

        <label>¿Pago en efectivo?</label>
        <div className={`chip-group ${errors.pago_efectivo ? "chip-error" : ""}`}>
          <span
            className={`chip ${form.pago_efectivo === "true" ? "chip-selected" : ""}`}
            onClick={() => setForm({ ...form, pago_efectivo: "true" })}
          >
            Sí
          </span>
          <span
            className={`chip ${form.pago_efectivo === "false" ? "chip-selected" : ""}`}
            onClick={() => setForm({ ...form, pago_efectivo: "false" })}
          >
            No
          </span>
        </div>
      </div>

      {/* SECCIÓN 2 */}
      <div className="section-card">
        <h3>Datos del cliente</h3>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre_cliente"
          className={errors.nombre_cliente ? "input-error" : ""}
          value={form.nombre_cliente}
          onChange={handleChange}
        />

        <label>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          className={errors.telefono ? "input-error" : ""}
          value={form.telefono}
          onChange={handleChange}
        />

        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          className={errors.correo ? "input-error" : ""}
          value={form.correo}
          onChange={handleChange}
        />

        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          className={errors.observaciones ? "input-error" : ""}
          value={form.observaciones}
          onChange={handleChange}
        />
      </div>

      <button className="btn-enviar">Enviar Reclamación</button>
    </form>
  );
}
