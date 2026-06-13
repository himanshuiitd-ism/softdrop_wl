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

async function testDrive() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !clientEmail || !privateKey) {
    console.error('Error: Missing environment variables');
    return;
  }

  const cleanEmail = clientEmail.replace(/^["']|["']$/g, '');
  const cleanPrivateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: cleanEmail,
        private_key: cleanPrivateKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.readonly'
      ],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    console.log('Attempting to get file metadata from Google Drive API for ID:', sheetId);
    const res = await drive.files.get({
      fileId: sheetId,
      fields: 'id, name, mimeType',
    });
    console.log('Success! File Details:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Drive API failed with response:', err.response.status, err.response.statusText, JSON.stringify(err.response.data));
    } else {
      console.error('Drive API failed to connect:', err);
    }
  }
}

testDrive();
