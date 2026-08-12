import { Link } from 'react-router';

const technologies = [
  'React',
  'TypeScript',
  'NestJS',
  'Prisma',
  'PostgreSQL',
  'JWT',
];

const capabilities = [
  {
    title: 'Secure authentication',
    description:
      'JWT-based authentication with protected routes and session recovery.',
  },
  {
    title: 'Order management',
    description:
      'Create, monitor, update and remove customer orders from a unified interface.',
  },
  {
    title: 'Persistent data',
    description:
      'PostgreSQL persistence through Prisma ORM and Neon cloud database.',
  },
  {
    title: 'Documented API',
    description:
      'REST endpoints documented and testable through Swagger OpenAPI.',
  },
];

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
        <span className="hero-badge">
          Full Stack Engineering Portfolio
        </span>

        <p className="hero-author">
          Designed &amp; Developed by
          <strong> Karen Olave</strong>
        </p>

          <h1>
            Enterprise
            <span> Order Management</span>
          </h1>

          <p className="home-hero-description">
            A modern full-stack SaaS platform demonstrating scalable
            frontend architecture, secure backend APIs and persistent
            cloud data.
          </p>

          <div className="home-actions">
            <Link
              className="button button--primary"
              to="/orders"
            >
              Explore platform
            </Link>

            <a
              className="button button--secondary"
              href="http://localhost:3000/api/docs"
              target="_blank"
              rel="noreferrer"
            >
              View API documentation
            </a>
          </div>

          <div className="technology-list">
            {technologies.map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </div>

        <aside className="architecture-card">
          <div className="platform-metrics">
            <div>
              <span>API</span>
              <strong>Online</strong>
            </div>

            <div>
              <span>Auth</span>
              <strong>JWT</strong>
            </div>

            <div>
              <span>Database</span>
              <strong>PostgreSQL</strong>
            </div>
          </div>


          <div className="architecture-card-header">
            <span>Platform overview</span>
            <span className="system-status">
              <span className="system-status-dot" />
              Online
            </span>
          </div>

          <div className="architecture-grid">
            <div className="architecture-item">
              <span>Frontend</span>
              <strong>React + TypeScript</strong>
            </div>

            <div className="architecture-item">
              <span>Backend</span>
              <strong>NestJS REST API</strong>
            </div>

            <div className="architecture-item">
              <span>Database</span>
              <strong>PostgreSQL / Neon</strong>
            </div>

            <div className="architecture-item">
              <span>Security</span>
              <strong>JWT Authentication</strong>
            </div>
          </div>

          <div className="architecture-flow">
            <span>React</span>
            <span>→</span>
            <span>NestJS</span>
            <span>→</span>
            <span>Prisma</span>
            <span>→</span>
            <span>PostgreSQL</span>
          </div>
        </aside>
      </section>

      <section className="capabilities-section">
        <div className="section-heading">
          <span className="eyebrow">Platform capabilities</span>
          <h2>Built beyond a basic CRUD</h2>

          <p>
            The project demonstrates frontend engineering, backend
            architecture, security and persistence working as a single
            platform.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="capability-card"
            >
              <div className="capability-icon">
                {capability.title.charAt(0)}
              </div>

              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-project">
        <div className="about-project-content">
          <span className="eyebrow">
            Engineering portfolio
          </span>

          <h2>
            Designed as a real-world software architecture
          </h2>

          <p>
            OrderFlow is a personal engineering portfolio project created
            by Karen Olave to demonstrate modern frontend development,
            backend architecture, authentication, API design and cloud
            persistence.
          </p>

          <p>
            The application is intentionally structured as an evolving SaaS
            product rather than a standalone coding exercise.
          </p>
        </div>

        <div className="about-stack">
          <div>
            <span>Frontend</span>
            <strong>React + TypeScript</strong>
          </div>

          <div>
            <span>Backend</span>
            <strong>NestJS</strong>
          </div>

          <div>
            <span>ORM</span>
            <strong>Prisma 7</strong>
          </div>

          <div>
            <span>Database</span>
            <strong>PostgreSQL / Neon</strong>
          </div>

          <div>
            <span>Security</span>
            <strong>JWT</strong>
          </div>

          <div>
            <span>API</span>
            <strong>REST + OpenAPI</strong>
          </div>
        </div>
      </section>

    </div>
  );
}