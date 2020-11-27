// inspired by https://leanpub.com/redux-book
import axios from "axios";

import User from "../stores/User";

class ApiService {
  static api = axios.create({
    baseURL:"http://localhost:6666/api/"
  });

  constructor() {
    if (new.target === ApiService)
      throw new Error("Cannot create instance of abstract class");
  }

//   get api() {
//     // const token = User.getToken();

//     if (token) {
//       ApiService.api.defaults.headers.common["authorization"] = token;
//     } else if (ApiService.api.defaults.headers.common["authorization"]) {
//       delete ApiService.api.defaults.headers.common["authorization"];
//     }

//     return ApiService.api;
//   }

  getSlug() {
    throw new Error("abstract method");
  }

  async getAll() {
    const response = await this.api.get(this.getSlug());
    return response.data;
  }
  async create(data) {
    const response = await this.api.post(this.getSlug(), data);
    return response.data;
  }
  async delete(id) {
    const response = await this.api.delete(this.getSlug() + "/" + id);
    return response.data;
  }
  async update(id, data) {
    const response = await this.api.put(this.getSlug() + "/" + id, data);
    return response.data;
  }
  async get(id) {
    const response = await this.api.get(this.getSlug() + "/" + id);
    return response.data;
  }
}

export default 9;