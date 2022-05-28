import { useCharactersStore } from "@@/stores/characters";

export default async function () {
  const store = useCharactersStore();

  return store.fetch(0);
}
