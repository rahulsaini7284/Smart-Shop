import axios from "axios";

const httpGet = axios.create({
  baseURL: "http://localhost:5911",
});
export { httpGet };
