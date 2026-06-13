const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || '';
    process.env[key] = val;
  }
});

async function trySheetId(sheetId, label) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const cleanEmail = clientEmail.replace(/^["']|["']$/g, '');
  const cleanPrivateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: cleanEmail,
      private_key: cleanPrivateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    console.log(`[SUCCESS] Combination ${label} worked! Title:`, res.data.properties.title);
    return true;
  } catch (err) {
    console.log(`[FAILED] Combination ${label} (${sheetId}):`, err.response ? err.response.status : err.message);
    return false;
  }
}

async function runTests() {
  // Original: 1LDrLkgJamwTqywIAlsAWHcDhbD72AV8Dnc0SAr7WwBg
  // Let's replace the 'I' (index 15) and 'l' (index 17) with both I/l
  const base = "1LDrLkgJamwTqyw_AlsAWHcDhbD72AV8Dnc0SAr7WwBg";
  // We want to test different combinations for the 16th character (index 15) and 18th character (index 17)
  const choices = ['I', 'l', '1'];
  
  for (let c1 of choices) {
    for (let c2 of choices) {
      const id = `1LDrLkgJamwTqyw${c1}A${c2}sAWHcDhbD72AV8Dnc0SAr7WwBg`;
      await trySheetId(id, `16th=${c1}, 18th=${c2}`);
    }
  }
}

runTests();
