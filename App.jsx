import React, { useState } from 'react';

// Simple router implementation (no external dependencies needed)
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return children(currentPath);
};

const Link = ({ to, children, style, ...props }) => (
  <a 
    href={`#${to}`} 
    style={{ textDecoration: 'none', ...style }}
    {...props}
  >
    {children}
  </a>
);

// Color palette
const palette = {
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  primaryLight: '#A78BFA',
  accent: '#EC4899',
  background: '#FDFBFF',
  surface: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB'
};

// Shared styles
const styles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(167, 139, 250, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${palette.border}`,
    padding: '1.25rem 0'
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  navLink: {
    color: palette.text,
    fontSize: '0.875rem',
    fontWeight: 500,
    position: 'relative',
    padding: '0.5rem 0',
    transition: 'color 0.2s'
  },
  button: {
    padding: '0.625rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'white',
    background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark})`,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.2s',
    display: 'inline-block'
  },
  section: {
    padding: '5rem 0',
    minHeight: 'calc(100vh - 200px)'
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: 700,
    color: palette.text,
    marginBottom: '1.5rem'
  },
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 600,
    backgroundColor: `${palette.primary}15`,
    color: palette.primary,
    marginBottom: '2rem'
  },
  card: {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: palette.surface,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s'
  }
};

// Navigation Component
const Nav = ({ currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' }
  ];
  
  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <span>🌸</span>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: palette.text }}>
              Sweet Serenity Group
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: palette.primary }}>
              Where calm becomes creation
            </div>
          </div>
        </Link>

        <div style={{ ...styles.navLinks, ...(window.innerWidth < 768 ? { display: 'none' } : {}) }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                color: currentPath === item.path ? palette.primary : palette.text,
                fontWeight: currentPath === item.path ? 700 : 500
              }}
              onMouseEnter={(e) => e.target.style.color = palette.primary}
              onMouseLeave={(e) => e.target.style.color = currentPath === item.path ? palette.primary : palette.text}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            Get Started
          </Link>
        </div>

        <div 
          style={{ 
            cursor: 'pointer',
            padding: '0.5rem',
            color: palette.primary,
            fontSize: '1.5rem',
            ...(window.innerWidth < 768 ? { display: 'block' } : { display: 'none' })
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </div>
      </div>

      {mobileMenuOpen && window.innerWidth < 768 && (
        <div style={{ padding: '1rem', borderTop: `1px solid ${palette.border}` }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{ 
                display: 'block', 
                padding: '0.75rem 1rem', 
                color: currentPath === item.path ? palette.primary : palette.text,
                fontWeight: currentPath === item.path ? 700 : 400
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

// Home Page
const HomePage = () => (
  <div style={{ ...styles.section, padding: '5rem 0', backgroundColor: palette.background }}>
    <div style={styles.container}>
      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={styles.badge}>
            ✨ Creative Excellence Since 2024
          </div>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, color: palette.text, marginBottom: '1.5rem' }}>
            Where Creativity
            <span style={{
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}> Meets Serenity</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: palette.textLight, marginBottom: '2rem', maxWidth: '600px' }}>
            We create calm, intentional spaces for creatives and communities — from studios and collectives to publishing and events.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/services"
              style={{ ...styles.button, padding: '0.875rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              Explore Services →
            </Link>
            <Link
              to="/portfolio"
              style={{
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                fontWeight: 600,
                backgroundColor: palette.surface,
                color: palette.text,
                border: `2px solid ${palette.primary}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=1200&q=80" 
            alt="Creative studio space" 
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            right: '2rem',
            padding: '1.5rem',
            borderRadius: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: palette.primary }}>100+</div>
                <div style={{ fontSize: '0.875rem', color: palette.textLight }}>Projects</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: palette.primary }}>50+</div>
                <div style={{ fontSize: '0.875rem', color: palette.textLight }}>Creators</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: palette.primary }}>25+</div>
                <div style={{ fontSize: '0.875rem', color: palette.textLight }}>Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// About Page
const AboutPage = () => (
  <div style={{ ...styles.section, backgroundColor: palette.surface }}>
    <div style={styles.container}>
      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ ...styles.badge, backgroundColor: `${palette.accent}15`, color: palette.accent }}>
            About Us
          </div>
          
          <h2 style={styles.sectionTitle}>
            Nurturing Creativity in Every Form
          </h2>
          
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: palette.textLight, marginBottom: '2rem' }}>
            Founded to give creatives, writers, and changemakers a sanctuary to grow, Sweet Serenity Group houses a publishing arm, studio spaces (LunaMuse), and community initiatives (Serenity House Collective).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              'Creative residencies & workshops',
              'Boutique publishing for poets and essayists',
              'Community events and curated showcases'
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '0.5rem',
                  backgroundColor: `${palette.primary}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: palette.primary,
                  fontWeight: 700
                }}>
                  →
                </div>
                <span style={{ paddingTop: '0.25rem', color: palette.text }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            ...styles.card,
            background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark})`,
            color: 'white'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
              To provide nurturing creative infrastructure and platforms for gentle, powerful storytelling that transforms communities.
            </p>
          </div>
          
          <div style={styles.card}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: palette.text }}>Our Vision</h3>
            <p style={{ lineHeight: 1.6, color: palette.textLight }}>
              A world where calm, deliberate creativity shapes resilient communities and inspires lasting change.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Services Page
const ServicesPage = () => {
  const ServiceCard = ({ title, desc, icon }) => (
    <div 
      style={{
        padding: '2rem',
        borderRadius: '1rem',
        backgroundColor: palette.surface,
        border: `2px solid ${palette.border}`,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '1rem',
        background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        marginBottom: '1.5rem'
      }}>
        {icon}
      </div>
      
      <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: palette.text }}>
        {title}
      </h4>
      <p style={{ lineHeight: 1.6, color: palette.textLight, marginBottom: '1.5rem' }}>
        {desc}
      </p>
      
      <Link 
        to="/contact"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: palette.primary, fontWeight: 600 }}
      >
        Learn More →
      </Link>
    </div>
  );

  return (
    <div style={{ ...styles.section, backgroundColor: palette.background }}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div style={styles.badge}>
            Our Services
          </div>
          
          <h3 style={styles.sectionTitle}>What We Offer</h3>
          <p style={{ fontSize: '1.25rem', color: palette.textLight }}>
            Tailored services to support creators and communities in their journey to excellence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? 'repeat(3, 1fr)' : window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr', gap: '2rem' }}>
          <ServiceCard 
            title="Publishing" 
            desc="Boutique poetry & short-form publishing, editorial support, and distribution for emerging voices." 
            icon="✍"
          />
          <ServiceCard 
            title="Studios & Residencies" 
            desc="Creative studio space rentals, residencies, and comprehensive project support for artists." 
            icon="🏠"
          />
          <ServiceCard 
            title="Events & Workshops" 
            desc="Curated workshops, open mics, and community showcases that bring creators together." 
            icon="🎤"
          />
        </div>
      </div>
    </div>
  );
};

// Portfolio Page
const PortfolioPage = () => {
  const projects = [
    {
      title: "Poetry Collection Launch",
      desc: "A successful anthology featuring 12 emerging poets from across the region.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Creative Residency Program",
      desc: "6-month residency supporting visual artists and writers in their craft.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Community Art Showcase",
      desc: "Monthly exhibition featuring local talent and fostering community connections.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Writing Workshop Series",
      desc: "Interactive workshops helping writers refine their craft and find their voice.",
      image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Open Mic Nights",
      desc: "Weekly gatherings celebrating spoken word and performance poetry.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Artist Collaboration",
      desc: "Cross-disciplinary project uniting musicians, writers, and visual artists.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div style={{ ...styles.section, backgroundColor: palette.surface }}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div style={{ ...styles.badge, backgroundColor: `${palette.accent}15`, color: palette.accent }}>
            Portfolio
          </div>
          
          <h3 style={styles.sectionTitle}>Recent Projects</h3>
          <p style={{ fontSize: '1.25rem', color: palette.textLight }}>
            Showcasing our creative collaborations and community impact across various initiatives.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? 'repeat(3, 1fr)' : window.innerWidth > 640 ? 'repeat(2, 1fr)' : '1fr', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                backgroundColor: palette.surface,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              <img 
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '224px', objectFit: 'cover' }}
              />
              
              <div style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: palette.text }}>
                  {project.title}
                </h4>
                <p style={{ lineHeight: 1.6, color: palette.textLight }}>
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  return (
    <div style={{ ...styles.section, backgroundColor: palette.background }}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div style={styles.badge}>
            Contact Us
          </div>
          
          <h3 style={styles.sectionTitle}>Let's Create Together</h3>
          <p style={{ fontSize: '1.25rem', color: palette.textLight }}>
            Reach out about partnerships, residencies, or publishing inquiries.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr', gap: '3rem' }}>
          <div style={{ ...styles.card, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 640 ? '1fr 1fr' : '1fr', gap: '1rem' }}>
                <input 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${palette.border}`,
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your name"
                />
                <input 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${palette.border}`,
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your email" 
                  type="email"
                />
              </div>
              
              <input 
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${palette.border}`,
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="Subject"
              />
              
              <textarea 
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${palette.border}`,
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                rows={6} 
                placeholder="Your message"
              />
              
              <button 
                onClick={() => {
                  alert('Thanks for reaching out! This is a demo form.');
                  setContactForm({ name: '', email: '', subject: '', message: '' });
                }}
                style={{ ...styles.button, width: '100%', padding: '1rem', fontSize: '1rem' }}
              >
                📧 Send Message
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  backgroundColor: `${palette.primary}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📍
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: palette.text }}>Location</h4>
                  <p style={{ color: palette.textLight }}>Blantyre, Malawi</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  backgroundColor: `${palette.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: palette.text }}>Email</h4>
                  <a 
                    href="mailto:hello@sweetserenity.example"
                    style={{ color: palette.primary, textDecoration: 'none' }}
                  >
                    hello@sweetserenity.example
                  </a>
                </div>
              </div>
            </div>

            <div style={{
              ...styles.card,
              background: `linear-gradient(135deg, ${palette.primary}, ${palette.primaryDark})`,
              color: 'white'
            }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>Newsletter</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                Get updates on events and publications.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  type="email" 
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '0.875rem'
                  }}
                  placeholder="Your email"
                />
                <button 
                  onClick={() => {
                    alert(`Thank you for subscribing with: ${newsletterEmail}`);
                    setNewsletterEmail('');
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: palette.primary,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer style={{
    padding: '3rem 0',
    borderTop: `1px solid ${palette.border}`,
    backgroundColor: palette.surface
  }}>
    <div style={styles.container}>
      <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '0.75rem',
            background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            🌸
          </div>
          <div>
            <div style={{ fontWeight: 700, color: palette.text }}>Sweet Serenity Group</div>
            <div style={{ fontSize: '0.75rem', color: palette.textLight }}>Creative excellence since 2024</div>
          </div>
        </div>
        
        <div style={{ textAlign: window.innerWidth < 768 ? 'center' : 'right' }}>
          <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: palette.text }}>
            © {new Date().getFullYear()} Sweet Serenity Group. All rights reserved.
          </div>
          <div style={{ fontSize: '0.75rem', color: palette.textLight }}>
            Designed with ♥ for calm creativity
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// Main App Component with Router
export default function SweetSerenitySite() {
  return (
    <Router>
      {(currentPath) => (
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: palette.background,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          <Nav currentPath={currentPath} />
          <main>
            {currentPath === '/' && <HomePage />}
            {currentPath === '/about' && <AboutPage />}
            {currentPath === '/services' && <ServicesPage />}
            {currentPath === '/portfolio' && <PortfolioPage />}
            {currentPath === '/contact' && <ContactPage />}
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}