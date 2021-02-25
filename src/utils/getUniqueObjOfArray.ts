export default function unique(arr: [], u_key: string) {
  let map = new Map();
  arr.forEach((item, index) => {
    if (!map.has(item[u_key])) {
      map.set(item[u_key], item);
    }
  });

  return Array.from(map.values());
}
