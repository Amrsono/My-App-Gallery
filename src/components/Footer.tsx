import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="glass-strong footer-card hover-lift">
        
        <h2 className="title text-gradient neon-text-blue footer-title">LET'S CONNECT</h2>
        
        <div className="footer-links">
          <a href="https://github.com/Amrsono" target="_blank" rel="noopener noreferrer" className="footer-btn glass hover-lift hover-neon-glow-blue">
            <span className="icon">👾</span> GitHub
          </a>
          
          <a href="https://www.linkedin.com/in/amr-sono/" target="_blank" rel="noopener noreferrer" className="footer-btn glass hover-lift hover-neon-glow-purple">
            <span className="icon">👔</span> LinkedIn
          </a>

          <a href="mailto:amrsono@gmail.com" className="footer-btn glass hover-lift hover-neon-glow-pink">
            <span className="icon">📧</span> amrsono@gmail.com
          </a>
        </div>
        
        <div className="footer-bottom">
          <p className="text-secondary">© {new Date().getFullYear()} SoNo QuaNTuM HuB. Engineered with React & WebGL.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
