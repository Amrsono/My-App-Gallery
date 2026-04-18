import fs from 'fs';
import https from 'https';

https.get('https://store-2090.vercel.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('site.html', data);
    console.log('Saved site.html');
  });
}).on('error', err => console.log('Error: ', err.message));
