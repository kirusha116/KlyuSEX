
export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ru-ru", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}