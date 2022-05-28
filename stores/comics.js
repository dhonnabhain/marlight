import { defineStore } from "pinia";

export const useComicsStore = defineStore({
  id: "comics-store",
  state: () => {
    return {
      comics: {},
    };
  },
  actions: {
    async fetch(config) {
      if (this.comics[config.id]) return this.comics[config.id];

      try {
        const {
          data: { results },
        } = await useApi({ id: config.id, entity: "comics" });

        this.comics[config.id] = results[0];

        return results[0];
      } catch (e) {
        console.log("Ooops", e);
      }
    },
    async loadFromSerie({ id, entity, limit }) {
      try {
        const {
          data: { results },
        } = await useApi({ id, entity, limit, suffix: "comics" });

        results.forEach((comic) => (this.comics[comic.id] = comic));

        return results;
      } catch (e) {
        console.log("Ooops", e);
      }
    },
  },
});
