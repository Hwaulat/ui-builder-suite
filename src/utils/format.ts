export function formatTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}
