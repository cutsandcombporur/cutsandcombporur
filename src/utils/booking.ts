const BASE = import.meta.env.BASE_URL;

export function getBookingUrl(serviceId?: string): string {
  return serviceId ? `${BASE}booking?service=${serviceId}` : `${BASE}booking`;
}

export function openBooking(serviceId?: string): void {
  window.location.href = getBookingUrl(serviceId);
}
