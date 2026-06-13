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

async function clearSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Waitlist';

  const cleanEmail = clientEmail.replace(/^["']|["']$/g, '');
  const cleanPrivateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: cleanEmail,
        private_key: cleanPrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Clearing sheet columns A:Z for rows 2 to 100...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId: sheetId,
      range: `${tabName}!A2:Z100`,
    });
    console.log('Sheet cleared successfully!');
  } catch (err) {
    console.error('Failed to clear sheet:', err);
  }
}

clearSheet();
