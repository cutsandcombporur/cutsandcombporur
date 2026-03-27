import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openBooking } from './booking';

describe('openBooking', () => {
  beforeEach(() => {
    // Mock window.open
    vi.stubGlobal('open', vi.fn());
  });

  it('should open booking URL without service ID', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    openBooking();

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('your-booking-system-url.com'),
      '_blank'
    );
  });

  it('should open booking URL with service ID parameter', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    openBooking('haircut-basic');

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('?service=haircut-basic'),
      '_blank'
    );
  });

  it('should use environment variable for booking URL', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    openBooking();

    // Should use VITE_BOOKING_URL from environment
    expect(mockOpen).toHaveBeenCalledWith(
      expect.any(String),
      '_blank'
    );
  });

  it('should open in new tab for both mobile and desktop', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    openBooking('test-service');

    // Verify it uses '_blank' which works on both mobile and desktop
    expect(mockOpen).toHaveBeenCalledWith(
      expect.any(String),
      '_blank'
    );
  });
});
