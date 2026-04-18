import './AppCard.css';

export interface RepoData {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  languages: string[];
  stars: number;
}

interface AppCardProps {
  app: RepoData;
}

const AppCard = ({ app }: AppCardProps) => {
  return (
    <div className="glass-strong hover-lift" style={{ borderRadius: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'all 0.4s' }}>
      
      {/* Inner hover glow */}
      <div className="absolute-glow" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--neon-blue), var(--quantum-purple))', opacity: 0, transition: 'opacity 0.4s', pointerEvents: 'none', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <span className="glass" style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 1rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--neon-blue)' }}>
          {app.languages[0] || 'Code'}
        </span>
        <div className="gradient-modern neon-glow-blue hover-lift" style={{ width: '3rem', height: '3rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem' }}>
          {app.name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      <h3 className="neon-text-blue" style={{ position: 'relative', zIndex: 10, fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', transition: 'all 0.3s', minHeight: '3rem' }}>
        {app.name}
      </h3>
      <p style={{ position: 'relative', zIndex: 10, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1 }}>{app.description}</p>
      
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
        {app.languages.map(lang => (
          <span key={lang} className="glass" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>{lang}</span>
        ))}
      </div>
      
      <div style={{ position: 'relative', zIndex: 10, marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href={app.url} target="_blank" rel="noopener noreferrer" className="glass hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', color: 'white' }}>View Code</a>
        {app.homepage && <a href={app.homepage} target="_blank" rel="noopener noreferrer" className="gradient-modern neon-glow-purple hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>Live App</a>}
      </div>
    </div>
  );
};

export default AppCard;
