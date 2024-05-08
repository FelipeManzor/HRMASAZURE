export const api = import.meta.env.VITE_API;

const noBodyReq = async (path, method) => {
  const resp = await fetch(`${api}/admin${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp;
};

const withBodyReq = async (path, method, data) => {
  const resp = await fetch(`${api}/admin${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return resp;
};

/**
 * general restful get api request sender
 * @param {string} path the endpoint
 */
export const apiGet = async (path) => {
  return noBodyReq(path, "GET");
};

/**
 * general restful delete api request sender
 * @param {string} path the endpoint
 */
export const apiDelete = async (path) => {
  return noBodyReq(path, "DELETE");
};

/**
 * general restful put api request sender
 * @param {string} path the endpoint
 * @param {object} data the data you want to update
 * @returns 
 */
export const apiPut = async (path, data) => {
    return withBodyReq(path, "PUT", data);
};

/**
 * general restful post request sender
 * @param {*} path the endpoint
 * @param {*} data the data you want to insert
 * @returns 
 */
export const apiPost = async (path, data) => {
    return withBodyReq(path, "POST", data);
};