export default function toLocalDateShort(date) {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d) ? "" : d.toLocaleDateString("fa-IR");
}
