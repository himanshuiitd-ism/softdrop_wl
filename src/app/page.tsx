import WaitlistClient from '@/components/WaitlistClient';

export const dynamic = 'force-dynamic';

export default function Home() {
  const founder = {
    name: process.env.FOUNDER_NAME,
    portfolio: process.env.FOUNDER_PORTFOLIO,
    bio: process.env.FOUNDER_BIO,
    photoUrl: process.env.FOUNDER_PHOTO_URL,
    college: process.env.FOUNDER_COLLEGE,
    instagramUrl: process.env.FOUNDER_INSTAGRAM_URL,
    linkedinUrl: process.env.FOUNDER_LINKEDIN_URL,
    twitterXUrl: process.env.FOUNDER_TWITTER_X_URL,
    whatsappUrl: process.env.FOUNDER_WHATSAPP_URL,
  };

  return <WaitlistClient founder={founder} />;
}
