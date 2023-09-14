import axios from "axios";

export default axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  // headers: {
  //   "x-content-type-options": "error",
  // },
});
