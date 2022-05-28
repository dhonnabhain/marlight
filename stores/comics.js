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
      if (this.comics[config.id]) return;

      try {
        const {
          data: { results },
        } = await useApi({ id: config.id, entity: "comics" });

        this.comics[config.id] = results[0];
        
        return results[0]
      } catch (e) {
        console.log("Ooops", e);
      }
    },
  },
});
