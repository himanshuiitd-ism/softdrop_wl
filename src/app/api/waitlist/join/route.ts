import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// SETUP:
// 1. Google Cloud Console → new project
// 2. Enable Google Sheets API
// 3. Create Service Account → download JSON
// 4. Copy client_email → GOOGLE_SERVICE_ACCOUNT_EMAIL
// 5. Copy private_key → GOOGLE_PRIVATE_KEY
// 6. Create Google Sheet manually
// 7. Share sheet with service account email (Editor)
// 8. Copy Sheet ID from URL → GOOGLE_SHEET_ID
// 9. Add row 1 headers manually:
//    Timestamp | Full Name | Email | Role | Platform & Followers

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { fullName, email, role, platform, instagram, linkedin, tiktok, x } = body;

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim() === '') {
      return NextResponse.json({ error: 'Full Name is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid Email Address is required' }, { status: 400 });
    }

    const validRoles = ['developer', 'influencer', 'buyer'];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json({ error: 'Role must be developer, influencer, or buyer' }, { status: 400 });
    }

    if (role === 'influencer') {
      if (!platform || typeof platform !== 'string' || platform.trim() === '') {
        return NextResponse.json({ error: 'Platform & Followers details are required for influencers' }, { status: 400 });
      }
      if (!instagram || typeof instagram !== 'string' || instagram.trim() === '') {
        return NextResponse.json({ error: 'Instagram handle is required for influencers' }, { status: 400 });
      }
    }


    // Format IST Timestamp: DD MMM YYYY, HH:MM IST
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + 3600000 * 5.5); // Add 5.5 hours for IST
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(istTime.getDate()).padStart(2, '0');
    const month = months[istTime.getMonth()];
    const year = istTime.getFullYear();
    const hours = String(istTime.getHours()).padStart(2, '0');
    const minutes = String(istTime.getMinutes()).padStart(2, '0');
    const timestamp = `${day} ${month} ${year}, ${hours}:${minutes} IST`;

    // 1. Google Sheets Append
    try {
      const sheetId = process.env.GOOGLE_SHEET_ID;
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;
      const tabName = process.env.GOOGLE_SHEET_TAB_NAME || 'Waitlist';

      if (sheetId && clientEmail && privateKey) {
        const cleanSheetId = sheetId.trim().replace(/^["']|["']$/g, '');
        const cleanEmail = clientEmail.trim().replace(/^["']|["']$/g, '');
        const cleanPrivateKey = privateKey.trim().replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: cleanEmail,
            private_key: cleanPrivateKey,
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: cleanSheetId,
          range: `${tabName}!A:A`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[
              timestamp,
              fullName.trim(),
              email.trim().toLowerCase(),
              role,
              role === 'influencer' ? platform.trim() : '',
              instagram ? instagram.trim() : '',
              linkedin ? linkedin.trim() : '',
              tiktok ? tiktok.trim() : '',
              x ? x.trim() : ''
            ]],
          },
        });
      } else {
        console.warn('Google Sheets configuration missing.');
      }
    } catch (sheetError) {
      console.error('Google Sheets append failed:', sheetError);
      // Do not fail the request if Google Sheets fails
    }

    // 2. Email Confirmation to the User
    try {
      const senderEmail = process.env.WAITLIST_NOTIFY_EMAIL;
      const gmailPassword = process.env.GMAIL_APP_PASSWORD;
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

      if (senderEmail && gmailPassword) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: senderEmail,
            pass: gmailPassword,
          },
        });

        const emailContent = `Hi ${fullName},\n\nThanks for joining the Softdrop waitlist.\nWe'll notify you when we launch.\n\nBest regards,\nThe Softdrop Team`;

        const emailHtml = `
          <div style="background-color: #080808; color: #d1d5db; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255, 255, 255, 0.08);">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #f97316; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">Softdrop</h1>
              <p style="color: #9ca3af; font-size: 14px; margin-top: 4px;">India's first revenue-verified digital marketplace</p>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.02); padding: 24px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.04);">
              <h2 style="color: #ffffff; font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">Hi ${fullName},</h2>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px; color: #e5e7eb;">Thanks for joining the Softdrop waitlist.</p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 0; color: #e5e7eb;">We'll notify you when we launch.</p>
            </div>
            <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #6b7280;">
              &copy; 2026 Softdrop &middot; Built in Public
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Softdrop Waitlist" <${senderEmail}>`,
          to: email.trim().toLowerCase(),
          subject: `You're on the list! Welcome to Softdrop 🚀`,
          text: emailContent,
          html: emailHtml,
        });
      } else {
        console.warn('Nodemailer configuration missing.');
      }
    } catch (emailError) {
      console.error('Nodemailer sending failed:', emailError);
      // Do not fail the request if Email fails
    }

    return NextResponse.json({ message: "You're on the list!" }, { status: 200 });

  } catch (error: any) {
    console.error('General Waitlist API Error:', error);
    // Never return a 500 error to the client, return a 400 or handle gracefully
    return NextResponse.json({ error: 'Something went wrong, but your attempt has been logged.' }, { status: 400 });
  }
}
