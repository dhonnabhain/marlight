import axios from "axios";

async function apiUrl(config = {}) {
  const { ts, hash } = (await axios.get("/api/hash")).data;
  const key = useRuntimeConfig().public.MARVEL_PUBLIC;

  const entity = config.entity ? config.entity : "characters";
  const base = `http://gateway.marvel.com/v1/public/${entity}`;
  const id = config.id ? `/${config.id}` : "";
  const offset = config.offset ? `&offset=${config.offset}` : "";

  return `${base}${id}?ts=${ts}&apikey=${key}&hash=${hash}${offset}`;
}

export default async function (config = {}) {
  const res = (await axios.get(await apiUrl(config))).data;

  console.log(res);

  return res;
}
