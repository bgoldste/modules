import axios from "axios"
import { getGlobalOptions, getOptions } from "@options";

const global = getGlobalOptions();
const options = getOptions();
const BASE_URL = global.url + options.path;

const articlesAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export function article_list() {
  return articlesAPI.get(`/article/`)
}

export function article_read(id) {
  return articlesAPI.get(`/article/${id}/`)
}

export const api = {
  article_list,
  article_read
}
