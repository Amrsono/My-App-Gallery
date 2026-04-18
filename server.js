import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const GITHUB_USERNAME = 'Amrsono';
const PORT = process.env.PORT || 3000;

// Simple cache to prevent hitting rate limit on every reload
let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

app.get('/api/github/repos', async (req, res) => {
  try {
    const force = req.query.force === 'true';
    const now = Date.now();
    if (!force && cachedRepos && (now - lastFetchTime < CACHE_TTL)) {
      console.log('Serving from cache');
      return res.json(cachedRepos);
    }

    console.log(force ? 'Force syncing live data from GitHub API...' : 'Fetching live data from GitHub API...');
    
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    const { data: repos } = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`, { headers });
    
    const processedRepos = await Promise.all(
      repos.filter(repo => !repo.fork).map(async (repo) => {
        let languages = [];
        try {
          // Fetch languages for tech stack
          const { data: langData } = await axios.get(repo.languages_url, { headers });
          languages = Object.keys(langData);
        } catch (err) {
          console.error(`Failed to fetch languages for ${repo.name}:`, err.message);
        }

        return {
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || 'A software project developed by Amrsono.',
          url: repo.html_url,
          homepage: repo.homepage,
          stars: repo.stargazers_count,
          languages: languages.length > 0 ? languages : ['Unknown'],
          topics: repo.topics || [],
          updated_at: repo.updated_at
        };
      })
    );

    cachedRepos = processedRepos;
    lastFetchTime = now;
    
    res.json(processedRepos);
  } catch (error) {
    console.error('Error fetching from GitHub:', error.message);
    if (error.response && (error.response.status === 403 || error.response.status === 429)) {
       return res.status(403).json({ error: 'RATE_LIMIT_EXCEEDED', message: 'GitHub API rate limit exceeded.' });
    }
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
