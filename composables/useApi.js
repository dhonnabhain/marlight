import axios from "axios";

async function apiUrl(config = {}) {
  const { ts, hash } = (await axios.get("/api/hash")).data;
  const key = useRuntimeConfig().public.MARVEL_PUBLIC;

  const entity = config.entity ? config.entity : "characters";
  const base = `https://gateway.marvel.com/v1/public/${entity}`;
  const id = config.id ? `/${config.id}` : "";
  const suffix = config.suffix ? `/${config.suffix}` : "";
  const offset = config.offset ? `&offset=${config.offset}` : "";
  const limit = config.limit ? `&limit=${config.limit}` : "";

  return `${base}${id}${suffix}?ts=${ts}&apikey=${key}&hash=${hash}${offset}${limit}`;
}

export default async function (config = {}) {
  const res = (await axios.get(await apiUrl(config))).data;

  console.log(res);

  return res;
}
