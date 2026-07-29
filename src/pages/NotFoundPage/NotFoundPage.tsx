import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>

      <p>The requested page could not be found.</p>

      <Link to="/">Return home</Link>
    </section>
  );
}