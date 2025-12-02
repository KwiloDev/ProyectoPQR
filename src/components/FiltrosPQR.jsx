export default function FiltrosPQR({ filtros, setFiltros, buscar }) {

  const actualizar = (campo, valor) => {
    setFiltros({ ...filtros, [campo]: valor });
  };

  return (
    <div className="filtros-card">
      <h3>Filtros de búsqueda</h3>

      <div className="filtros-grid">

        {/* FILTRO ESTADO */}
        <div>
          <label>Estado</label>
          <select onChange={(e) => actualizar("estado", e.target.value)}>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_revision">En Revisión</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>

        {/* FILTRO CENTRO OPERACIÓN */}
        <div>
          <label>Centro de operación</label>

          <select onChange={(e) => actualizar("centro", e.target.value)}>
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
        </div>

        {/* FILTRO FRANQUICIA */}
        <div>
          <label>Franquicia</label>
          <select onChange={(e) => actualizar("franquicia", e.target.value)}>
            <option value="">Todas</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Visa">Visa</option>
            <option value="Amex">Amex</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        {/* FILTRO FECHAS */}
        <div>
          <label>Fecha inicio</label>
          <input
            type="date"
            onChange={(e) => actualizar("fechaInicio", e.target.value)}
          />
        </div>

        <div>
          <label>Fecha fin</label>
          <input
            type="date"
            onChange={(e) => actualizar("fechaFin", e.target.value)}
          />
        </div>
      </div>

      <button className="btn-buscar" onClick={buscar}>
        Buscar
      </button>
    </div>
  );
}
