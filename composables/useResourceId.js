export default function(item) {
    return item.value.resourceURI.split("/").at(-1)
}