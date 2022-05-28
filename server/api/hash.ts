import md5 from "crypto-js/md5";

export default defineEventHandler((event) => {
  const {
    public: { MARVEL_PUBLIC },
    marvelSecret,
  } = useRuntimeConfig();
  const ts = Date.now();

  return {
    ts,
    hash: md5(ts + marvelSecret + MARVEL_PUBLIC).toString(),
  };
});
