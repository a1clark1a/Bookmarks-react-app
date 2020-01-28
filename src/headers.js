import config from "./config";

const ApiEndpoint = config.API_ENDPOINT;

const headers = {
  "content-type": "application/json",
  Authorization: `bearer ${config.API_KEY}`
};

export { headers, ApiEndpoint };
