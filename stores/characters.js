import { defineStore } from "pinia";

export const useCharactersStore = defineStore({
  id: "characters-store",
  state: () => {
    return {
      currentOffset: 0,
      characters: {},
      currentCharacter: null,
      currentCharacterIdx: null,
      attribution: "",
      totalRecords: 0,
    };
  },
  actions: {
    async fetch() {
      if (this.characters[this.currentOffset]) return;

      try {
        const {
          attributionText,
          data: { total, results },
        } = await useApi({
          offset: this.currentOffset,
        });

        if (this.attribution === "") this.attribution = attributionText;
        if (this.totalRecords === 0) this.totalRecords = total;

        this.characters[this.currentOffset] = results;
      } catch (e) {
        console.log("Ooops", e);
      }
    },
    async fetchCharacter(id) {
      if (Object.keys(this.characters).length === 0) {
        try {
          this.currentCharacter = (await useApi({ id })).data.results[0];
        } catch (e) {
          console.log("Ooops", e);
        }

        this.fetch();
      } else {
        const characters = Object.values(this.characters).flat();

        this.currentCharacterIdx = characters.findIndex(
          (character) => character.id === parseInt(id)
        );
        this.currentCharacter = characters.find(
          (character) => character.id === parseInt(id)
        );
      }
    },

    setCurrentCharacter(previous) {
      const characters = Object.values(this.characters).flat();
      const currentIdx = characters.findIndex(
        (character) => character.id === this.currentCharacter.id
      );

      if (
        (currentIdx !== 0 && previous) ||
        (currentIdx !== this.totalRecords && !previous)
      ) {
        this.currentCharacterIdx = previous ? currentIdx - 1 : currentIdx + 1;
        this.currentCharacter = characters[this.currentCharacterIdx];
      }
    },
  },
});
