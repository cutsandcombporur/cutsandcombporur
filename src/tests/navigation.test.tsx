/**
 * Navigation Tests
 * 
 * Tests for navigation functionality across all pages
 * Requirements: 10.2, 10.3
 * 
 * Validates:
 * - All navigation links work correctly
 * - Active page highlighting
 * - Page transitions are smooth (≤500ms)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import Navigation from '../components/layout/Navigation';

describe('Navigation Component', () => {
  describe('Navigation Links', () => {
    it('should render all navigation links', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      // Verify all required navigation links are present
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Offers')).toBeInTheDocument();
      expect(screen.getByText('Gallery')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should highlight the active page', () => {
      render(
        <MemoryRouter initialEntries={['/services']}>
          <Navigation />
        </MemoryRouter>
      );

      const servicesLink = screen.getByText('Services');
      
      // Active link should have primary color and border
      expect(servicesLink).toHaveClass('text-primary-600');
      expect(servicesLink).toHaveClass('border-b-2');
      expect(servicesLink).toHaveClass('border-primary-600');
    });

    it('should not highlight inactive pages', () => {
      render(
        <MemoryRouter initialEntries={['/services']}>
          <Navigation />
        </MemoryRouter>
      );

      const homeLink = screen.getByText('Home');
      
      // Inactive link should have secondary color
      expect(homeLink).toHaveClass('text-secondary-700');
      expect(homeLink).not.toHaveClass('border-b-2');
    });
  });

  describe('Mobile Navigation', () => {
    it('should show hamburger menu button on mobile', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const menuButton = screen.getByLabelText('Toggle menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveClass('md:hidden');
    });

    it('should toggle mobile menu when hamburger is clicked', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const menuButton = screen.getByLabelText('Toggle menu');
      
      // Menu should be closed initially
      expect(screen.queryByRole('link', { name: 'Home' })).toBeInTheDocument();
      
      // Click to open menu
      fireEvent.click(menuButton);
      
      // Menu should be visible
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(1); // Desktop + mobile
    });

    it('should close mobile menu when a link is clicked', () => {
      render(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      );

      const menuButton = screen.getByLabelText('Toggle menu');
      
      // Open menu
      fireEvent.click(menuButton);
      
      // Click a link
      const mobileLinks = screen.getAllByText('Services');
      fireEvent.click(mobileLinks[mobileLinks.length - 1]); // Click mobile link
      
      // Menu should close (only desktop links visible)
      const linksAfterClick = screen.getAllByText('Services');
      expect(linksAfterClick.length).toBe(1); // Only desktop link
    });
  });

  describe('Touch Target Sizes', () => {
    it('should have minimum 44x44px touch targets for mobile', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      // Get navigation links (excluding logo)
      const navLinks = screen.getAllByRole('link').filter(link => 
        ['Home', 'Services', 'Offers', 'Gallery', 'Contact'].includes(link.textContent || '')
      );
      
      navLinks.forEach(link => {
        // Check if link has min-h-[44px] class
        expect(link.className).toMatch(/min-h-\[44px\]/);
      });

      const menuButton = screen.getByLabelText('Toggle menu');
      expect(menuButton.className).toMatch(/min-h-\[44px\]/);
      expect(menuButton.className).toMatch(/min-w-\[44px\]/);
    });
  });
});

describe('Page Navigation Integration', () => {
  beforeEach(() => {
    // Reset URL to home before each test
    window.history.pushState({}, '', '/');
  });

  describe('Route Navigation', () => {
    it('should navigate to Home page', async () => {
      // Note: App component already includes BrowserRouter, so we don't wrap it
      // We'll test by checking if the home page content renders
      render(<App />);

      // Wait for lazy-loaded component
      await waitFor(() => {
        expect(screen.getByText(/Transform Your Look/i)).toBeInTheDocument();
      });
    });

    it('should navigate to Services page', async () => {
      // For testing specific routes, we need to modify the URL
      window.history.pushState({}, 'Services', '/services');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Our Services')).toBeInTheDocument();
      });
    });

    it('should navigate to Offers page', async () => {
      window.history.pushState({}, 'Offers', '/offers');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Special Offers')).toBeInTheDocument();
      });
    });

    it('should navigate to Gallery page', async () => {
      window.history.pushState({}, 'Gallery', '/gallery');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Our Gallery')).toBeInTheDocument();
      });
    });

    it('should navigate to Contact page', async () => {
      window.history.pushState({}, 'Contact', '/contact');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
      });
    });

    it('should show 404 page for invalid routes', async () => {
      window.history.pushState({}, 'Invalid', '/invalid-route');
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Performance', () => {
    it('should complete navigation within 500ms', async () => {
      const startTime = performance.now();
      
      render(<App />);

      // Wait for page to load
      await waitFor(() => {
        expect(screen.getByText(/Transform Your Look/i)).toBeInTheDocument();
      });

      const endTime = performance.now();
      const navigationTime = endTime - startTime;

      // Navigation should complete within 500ms (Requirement 10.2)
      expect(navigationTime).toBeLessThan(500);
    });
  });

  describe('Scroll Behavior', () => {
    it('should scroll to top when navigating between pages', async () => {
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;

      render(<App />);

      // Wait for initial page load
      await waitFor(() => {
        expect(screen.getByText(/Transform Your Look/i)).toBeInTheDocument();
      });

      // Click navigation link (get the one in the nav, not footer)
      const servicesLinks = screen.getAllByText('Services');
      const navServicesLink = servicesLinks.find(link => 
        link.className.includes('font-medium')
      );
      
      if (navServicesLink) {
        fireEvent.click(navServicesLink);
      }

      // Verify scrollTo was called
      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});

describe('Layout Integration', () => {
  it('should render Navigation component on all pages', async () => {
    const routes = ['/', '/services', '/offers', '/gallery', '/contact'];

    for (const route of routes) {
      window.history.pushState({}, '', route);
      const { unmount } = render(<App />);

      // Navigation should be present
      expect(screen.getByText('Cuts & Comb')).toBeInTheDocument();
      
      unmount();
    }
  });

  it('should render WhatsApp button on all pages', async () => {
    const routes = ['/', '/services', '/offers', '/gallery', '/contact'];

    for (const route of routes) {
      window.history.pushState({}, '', route);
      const { unmount } = render(<App />);

      // WhatsApp button should be present (use getAllByLabelText since Contact page has multiple)
      const whatsappButtons = screen.getAllByLabelText('Chat on WhatsApp');
      expect(whatsappButtons.length).toBeGreaterThan(0);
      
      unmount();
    }
  });

  it('should render Footer on all pages', async () => {
    const routes = ['/', '/services', '/offers', '/gallery', '/contact'];

    for (const route of routes) {
      window.history.pushState({}, '', route);
      const { unmount } = render(<App />);

      // Wait for page to load
      await waitFor(() => {
        // Footer contains "Quick Links" text (use getAllByText since it may appear multiple times)
        const quickLinks = screen.getAllByText('Quick Links');
        expect(quickLinks.length).toBeGreaterThan(0);
      });
      
      unmount();
    }
  });
});
