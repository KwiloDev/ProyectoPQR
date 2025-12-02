import axios from "axios";

export const api = axios.create({
  baseURL: "https://macfer.crepesywaffles.com/api"
});

export const obtenerPQR = async (filtros = {}) => {
  let query = [];

  if (filtros.estado)
    query.push(`filters[estado][$eq]=${filtros.estado}`);

  if (filtros.centro)
    query.push(`filters[centro_operacion][$contains]=${filtros.centro}`);

  if (filtros.franquicia)
    query.push(`filters[franquicia][$eq]=${filtros.franquicia}`);

  if (filtros.fechaInicio)
    query.push(`filters[createdAt][$gte]=${filtros.fechaInicio}`);

  if (filtros.fechaFin)
    query.push(`filters[createdAt][$lte]=${filtros.fechaFin}`);

  // Construir correctamente el querystring
  let queryString = "";
  
  if (query.length > 0) {
    queryString = "?" + query.join("&") + "&sort=createdAt:ASC";
  } else {
    queryString = "?sort=createdAt:ASC";
  }

  const url = `/pqr-forms${queryString}`;

  console.log("URL Final:", url);

  return api.get(url);
};
