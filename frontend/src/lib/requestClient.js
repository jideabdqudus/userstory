import axios from "axios";
import config from "../config";

const apiBaseUrl = config.base_url;

const getHeaders = (addContentType = true, ContentType = "") => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const headers = {};

  if (addContentType) {
    headers["Content-Type"] = ContentType || "application/json";
  }

  if (auth != null && typeof auth !== "undefined") {
    headers["authorization"] = `${auth.token}`;
  }

  return headers;
};

const requestClient = (options = {}) => {
  const headers = getHeaders();
  const opts = Object.assign(headers, options);

  return axios.create({
    baseURL: apiBaseUrl,
    timeout: 120000,
    headers: opts,
  });
};

export default requestClient;
