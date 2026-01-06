export default function truncateText(str = "", len) {
  if (str.length <= len) return str;
  return str.slice(0, len) + "...";
}
