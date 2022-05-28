export default function (item) {
  let urls = {};

  item.value.urls.forEach((url) => (urls[url.type] = url.url));

  return urls;
}
