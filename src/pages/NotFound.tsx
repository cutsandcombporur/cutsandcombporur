import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';

/**
 * NotFound Page Component
 * 
 * Displays a 404 error page for invalid routes
 * Requirements: 10.1 - Handle invalid navigation routes
 */
function NotFound() {
  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-heading font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-heading font-semibold text-secondary-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 min-h-[44px]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;
