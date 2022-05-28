import { defineStore } from "pinia";

export const useSeriesStore = defineStore({
  id: "series-store",
  state: () => {
    return {
      series: {},
    };
  },
  actions: {
    async fetch(config) {
      if (this.series[config.id]) return;

      try {
        const {
          data: { results },
        } = await useApi({ id: config.id, entity: "series" });

        this.series[config.id] = results[0];
      } catch (e) {
        console.log("Ooops", e);
      }
    },
    async getSerie(id) {
      if (Object.keys(this.series).length === 0) await this.fetch({ id });

      return this.series[id];
    },
  },
});
