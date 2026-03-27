/**
 * Opens WhatsApp with pre-filled message
 * @param phoneNumber - WhatsApp phone number with country code
 * @param message - Pre-filled message text
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
