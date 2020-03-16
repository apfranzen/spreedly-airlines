export function parseDate(date) {
  const dateTime = new Date(date);
  return `${dateTime.toLocaleDateString()} - ${dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

export function toDollars(curr) {
  return `$${(curr / 100).toFixed(2)}`;
}
