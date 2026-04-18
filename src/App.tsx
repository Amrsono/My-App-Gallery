import { useEffect, useState } from 'react';
import './App.css';
import AppCard, { type RepoData } from './components/AppCard';
import Background3D from './components/Background3D';
import Footer from './components/Footer';

function App() {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const fetchRepos = (force = false) => {
    if (force) setSyncing(true);
    setErrorState(null);
    fetch(`/api/github/repos${force ? '?force=true' : ''}`)
      .then(async res => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          if (res.status === 403 || errData.error === 'RATE_LIMIT_EXCEEDED') {
            setErrorState('RATE_LIMIT_EXCEEDED');
          }
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
           setRepos(data);
        }
        setLoading(false);
        setSyncing(false);
      })
      .catch(err => {
        console.error("Failed to fetch repos", err);
        setLoading(false);
        setSyncing(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <Background3D />
      <div className="bg-mesh" style={{ opacity: 0.3 }}>
        <div className="bg-orb-3"></div>
      </div>
      
      <main className="app-container">
        <header className="header">
          <div className="header-top">
            <h1 className="title text-gradient neon-text-blue" style={{ fontSize: '3.5rem', fontWeight: 800, textTransform: 'none' }}>SoNo QuaNTuM HuB</h1>
            <button 
              className={`glass hover-lift neon-glow-blue ${syncing ? 'syncing' : ''}`} 
              style={{
                color: 'var(--neon-blue)', padding: '0.75rem 1.5rem', borderRadius: '9999px', cursor: 'pointer', fontWeight: 600, border: '1px solid var(--neon-blue)', transition: 'all 0.3s'
              }}
              onClick={() => fetchRepos(true)} 
              disabled={syncing}
            >
              {syncing ? '↻ S Y N C I N G . . .' : '↻ S Y N C   R E P O S'}
            </button>
          </div>
          <p className="subtitle" style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>
            A dynamic gallery of my repositories showcasing full-stack capabilities, architectures, and automated tech stacks pulled directly from the GitHub API.
          </p>
        </header>

        {loading ? (
          <div className="gallery-grid">
             {[1, 2, 3, 4, 5, 6].map(skeleton => (
                <div key={skeleton} className="glass-strong" style={{ height: '300px', borderRadius: '2rem', animation: 'pulse 1.5s infinite' }}></div>
             ))}
          </div>
        ) : errorState === 'RATE_LIMIT_EXCEEDED' ? (
          <div className="glass-strong" style={{ padding: '3rem', textAlign: 'center', borderRadius: '2rem', border: '1px solid var(--solar-yellow)', boxShadow: '0 0 20px rgba(255, 235, 59, 0.2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ color: 'var(--solar-yellow)', fontSize: '2rem', marginBottom: '1rem' }}>GitHub API Rate Limit Exceeded</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              You've exhausted the 60 requests per hour limit allowed for unauthenticated users. The backend scrapes your repositories and their language statistics rapidly. 
              <br/><br/>
              <b>To resume syncing</b>, please add a GitHub Personal Access Token to your `.env` file and restart the server, or wait until your IP rate limit resets.
            </p>
          </div>
        ) : (
          <div className="gallery-grid">
            {repos.length > 0 ? repos.map(app => (
              <AppCard key={app.id} app={app} />
            )) : <p style={{ color: 'var(--text-secondary)' }}>No repositories found.</p>}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
