const fs = require('fs');
const path = require('path');

// Manually parse .env.local like Next.js does
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || '';
    if (key === 'GOOGLE_PRIVATE_KEY' || key === 'GOOGLE_SERVICE_ACCOUNT_EMAIL') {
      console.log(`Raw value of ${key}:`, JSON.stringify(val));
      
      // Let's see what happens with Next.js parsing
      // Next.js strips quotes if they match.
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      console.log(`Next.js-like parsed ${key}:`, JSON.stringify(val));
      console.log(`Private key ends with:`, JSON.stringify(val.slice(-20)));
    }
  }
});
