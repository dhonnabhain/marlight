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
    async loadFromEntity({ id, entity, limit }) {
      try {
        let offset = 0;
        let comics = [];
        const groups = Math.floor(limit / 20);

        if (limit > 20) {
          for (let idx = 0; idx < Math.floor(limit / 20) ?? 1; idx++) {
            const {
              data: { results },
            } = await useApi({
              id,
              entity,
              offset,
              suffix: "comics",
            });

            comics = [...comics, ...results];

            offset = offset + 20;
          }
        } else {
          const {
            data: { results },
          } = await useApi({
            id,
            entity,
            offset,
            suffix: "comics",
          });

          comics = results;
        }

        comics.forEach((comic) => (this.comics[comic.id] = comic));

        return comics;

        // const {
        //   data: { results },
        // } = await useApi({
        //   id,
        //   entity,
        //   limit: limit > 100 ? 100 : limit,
        //   suffix: "comics",
        // });

        // results.forEach((comic) => (this.comics[comic.id] = comic));

        // return results;
      } catch (e) {
        console.log("Ooops", e);
      }
    },
  },
});
