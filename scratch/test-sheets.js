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

async function testSheets() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Waitlist';

  console.log('Sheet ID:', sheetId);
  console.log('Client Email:', clientEmail);
  console.log('Private Key length:', privateKey ? privateKey.length : 0);

  if (!sheetId || !clientEmail || !privateKey) {
    console.error('Error: Missing environment variables');
    return;
  }

  // Clean strings
  const cleanEmail = clientEmail.replace(/^["']|["']$/g, '');
  const cleanPrivateKey = privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

  console.log('Cleaned Client Email:', JSON.stringify(cleanEmail));
  console.log('Cleaned Private Key ends with \\n?:', cleanPrivateKey.endsWith('\n'));

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: cleanEmail,
        private_key: cleanPrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Attempting to append a test row (with empty fields) to sheet using range A:A...');
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          'Test Name 1',
          'test1@example.com',
          'developer',
          '', // Empty Platform & Followers
          'insta_val',
          '', // Empty LinkedIn
          '', // Empty TikTok
          'x_val'
        ]],
      },
    });
    console.log('Success 1!', res.data);

    console.log('Attempting to append a second test row (with empty fields) to sheet using range A:A...');
    const res2 = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          'Test Name 2',
          'test2@example.com',
          'influencer',
          'Instagram - 50k', 
          'insta_val_2',
          'linkedin_val_2', 
          'tiktok_val_2',
          '' // Empty X
        ]],
      },
    });
    console.log('Success 2!', res2.data);
  } catch (err) {
    if (err.response) {
      console.error('Failed with response:', err.response.status, err.response.statusText, JSON.stringify(err.response.data));
    } else {
      console.error('Failed to connect:', err);
    }
  }
}


testSheets();
