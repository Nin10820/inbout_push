import axios from "axios";

const instanceAPI = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://erp.stg.thuocsi.vn/api/v1",
  timeout: 5000,
  headers: {
    "api-key": "1fce20616fd2500d63b980b6f37ea8c288378604f47e282ff8644fc5529ebb75",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8"
  }
})

export default instanceAPI;