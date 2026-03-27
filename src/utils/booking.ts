/**
 * Returns the booking page URL with optional pre-selected service
 * @param serviceId - Optional service ID to pre-select
 */
export function getBookingUrl(serviceId?: string): string {
  return serviceId ? `/booking?service=${serviceId}` : '/booking';
}

/**
 * Navigates to the booking page (fallback for non-component usage)
 * @param serviceId - Optional service ID to pre-select
 */
export function openBooking(serviceId?: string): void {
  window.location.href = getBookingUrl(serviceId);
}
