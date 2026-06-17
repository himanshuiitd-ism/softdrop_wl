'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Sparkles, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  BadgePercent, 
  UserCheck, 
  Layers, 
  Globe2, 
  HelpCircle,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  Check,
  X
} from 'lucide-react';

const ThreeBackground = dynamic(
  () => import('@/components/ThreeBackground'),
  { ssr: false }
);

interface FounderData {
  name?: string;
  portfolio?: string;
  bio?: string;
  photoUrl?: string;
  college?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterXUrl?: string;
  whatsappUrl?: string;
}

interface WaitlistClientProps {
  founder: FounderData;
}

// Custom inline SVG icons for brands since lucide-react 1.x has no brand icons
interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const LinkedInIcon = ({ size = 16, className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 16, className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterXIcon = ({ size = 16, className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const WhatsAppIcon = ({ size = 16, className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.244 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.526 1.897 14.053.872 11.417.872c-5.446 0-9.873 4.42-9.877 9.866-.001 1.77.461 3.5 1.338 5.025l-1.01 3.686 3.78-.991zm13.596-7.85c-.3-.15-1.771-.875-2.04-.972-.27-.099-.465-.148-.66.15-.195.297-.753.951-.923 1.149-.17.197-.341.221-.64.072-1.04-.52-1.875-1.015-2.616-1.637-.195-.164-.396-.327-.584-.492-.6-.525-1.12-1.082-1.485-1.637-.17-.297-.018-.459.13-.607.135-.133.301-.352.451-.527.15-.175.2-.297.3-.497.102-.199.051-.375-.025-.524-.075-.15-.658-1.584-.9-2.167-.237-.574-.497-.495-.68-.504-.176-.008-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-.1.525.075 1.15 1.34 1.7 4.225 3.425 4.8 3.65.275.1.525.1.725.075.27-.035 1.771-.875 2.019-1.721.249-.846.249-1.571.173-1.72-.075-.15-.27-.249-.57-.399z"/>
  </svg>
);

const TikTokIcon = ({ size = 16, className, style }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);


// Simple Count Up animation component for stats
const CountUp = ({ value, duration = 1.5 }: { value: string; duration?: number }) => {
  const numberPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.match(/^[^\d]+/)?.[0] || '';
  const suffix = value.match(/[^\d]+$/)?.[0] || '';

  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (isNaN(numberPart)) return;
    let start = 0;
    const end = numberPart;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numberPart, duration]);

  return (
    <span>{prefix}{isNaN(numberPart) ? value : count}{suffix}</span>
  );
};

// Left / Right / Bottom Scroll entrance transitions (Antigravity spatial movement)
const fadeInLeft = {
  initial: { opacity: 0, x: -70 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 70 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const fadeInBottom = {
  initial: { opacity: 0, y: 70 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};

export default function WaitlistClient({ founder }: WaitlistClientProps) {
  // Form State
  const [role, setRole] = useState<'developer' | 'influencer' | 'buyer'>('developer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');
  
  // Social accounts
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [x, setX] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activePersona, setActivePersona] = useState<'developer' | 'influencer' | 'buyer'>('developer');

  const developerSell = [
    "Website templates ",
    "Mobile app templates ",
    "Chrome & browser extensions",
    "SaaS boilerplates & starter kits",
    "Python/Node scripts & automation tools",
    "UI component libraries & design systems",
    "REST APIs & backend microservices",
    "Notion & productivity templates",
    "WordPress themes & plugins",
    "Landing page & portfolio templates"
  ];

  const developerGet = [
    "Platform-verified seller/buyer badge",
    "MRR/ARR dashboard connected to payment gateway",
    "Real-time buyer chat built in",
    "Escrow protection on every deal",
    "Free modification rounds tracking",
    "Maintenance period display on listings",
    "Zero platform fees (founding 100)"
  ];

  const developerTags = [
    "Next.js", "React", "Python", "Flutter", "Chrome Extensions", "SaaS", "Node.js", "Laravel", "WordPress"
  ];

  const influencerAdd = [
    "Developer templates at wholesale price",
    "SaaS tools and subscriptions",
    "Chrome extensions",
    "UI kits and design assets",
    "Productivity tools and scripts",
    "Any product from the dropship catalog"
  ];

  const influencerHowItWorks = [
    { title: "Producer lists product", desc: "Producer lists product at base price" },
    { title: "Influencer adds to storefront", desc: "Influencer adds it to storefront at their markup" },
    { title: "Audience buys", desc: "Audience buys from influencer's store" },
    { title: "Payout split automatic", desc: "Payout split is automatic — influencer gets markup difference instantly" }
  ];

  const influencerGet = [
    "Personal storefront URL (softdrop.in/store/[username])",
    "Private catalog of dropshippable products",
    "Automatic Razorpay payout on every sale",
    "No need to handle delivery or support",
    "Analytics on store performance"
  ];

  const influencerTags = [
    "Instagram", "YouTube", "Twitter/X", "Telegram", "LinkedIn", "Podcast"
  ];

  const buyerBuy = [
    "Ready-to-deploy website templates",
    "Mobile app source code",
    "Chrome extensions (source included)",
    "SaaS starter kits with full codebase",
    "UI kits and Figma design files",
    "Python automation scripts",
    "API integrations and backend tools",
    "Notion and productivity templates",
    "WordPress plugins and themes",
    "Digital business acquisitions (V4)"
  ];

  const buyerTrust = [
    "Seller's verified MRR pulled from payment gateways",
    "Total sales count on each listing",
    "Seller star rating and public reviews",
    "Free modification rounds offered",
    "Maintenance period duration",
    "Delivery time estimate",
    "Escrow — money held until delivery confirmed",
    "Real-time chat with seller before purchase"
  ];

  const buyerTags = [
    "Templates", "Tools", "SaaS", "Extensions", "Scripts", "APIs", "Design Assets"
  ];

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          role,
          platform: role === 'influencer' ? platform : undefined,
          instagram: instagram || undefined,
          linkedin: linkedin || undefined,
          tiktok: tiktok || undefined,
          x: x || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
      } else {
        setSuccessMsg("You're on the list! We'll be in touch soon.");
        setSubmitSuccess(true);
        setFullName('');
        setEmail('');
        setPlatform('');
        setInstagram('');
        setLinkedin('');
        setTiktok('');
        setX('');
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="relative min-h-screen overflow-x-hidden text-gray-200">
      {/* 3D Particle Space Background & Watermark */}
      <ThreeBackground isSuccess={submitSuccess} />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-3/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-[#080808]/60 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Softdrop
            </span>
          </div>
          <a 
            href="#problem-solution" 
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-wider font-semibold flex items-center gap-1"
          >
            Explore Design <span className="animate-bounce">↓</span>
          </a>
        </div>
      </header>

      {/* 2. Hero & Lead Capture Section (ABOVE THE FOLD) */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-24 md:pt-16 md:pb-28 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Copy Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-950/25 text-orange-400 text-xs font-semibold w-fit"
            >
              <Sparkles size={12} className="animate-pulse" />
              India's 1st Gateway-Verified Hub
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              India's First <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Revenue-Verified</span> Digital Marketplace
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              The only platform built specifically for Indian builders and creators. Buy, sell, and dropship digital assets with gateway-verified metrics and escrow-payout protection.
            </motion.p>

            {founder.whatsappUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a 
                  href={founder.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 hover:text-orange-400 text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-orange-500/10 w-fit"
                >
                  <WhatsAppIcon size={16} className="text-orange-500" />
                  Join my group
                </a>
              </motion.div>
            )}


            {/* Trust Pills Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1"
            >
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm shadow-sm hover:border-orange-500/20 transition-all duration-300">
                <span className="text-lg">🎓</span>
                <span className="text-xs font-semibold text-gray-300">Built by an IIT (ISM) founder</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm shadow-sm hover:border-orange-500/20 transition-all duration-300">
                <span className="text-lg">✅</span>
                <span className="text-xs font-semibold text-gray-300">Razorpay-verified payouts</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm shadow-sm hover:border-orange-500/20 transition-all duration-300">
                <span className="text-lg">🇮🇳</span>
                <span className="text-xs font-semibold text-gray-300">India-first, INR pricing</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm shadow-sm hover:border-orange-500/20 transition-all duration-300">
                <span className="text-lg">🔒</span>
                <span className="text-xs font-semibold text-gray-300">Escrow-protected transactions</span>
              </div>
            </motion.div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 md:p-8 rounded-3xl border border-white/[0.08] bg-black/40 backdrop-blur-xl shadow-2xl shadow-orange-500/5 hover:border-orange-500/20 transition-all duration-500"
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-orange-500/20 rounded-full blur-md pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-2">Secure Your Early Access</h3>
              <p className="text-xs text-gray-400 mb-6">Join the waitlist now. No fees, priority setup access.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Role Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Your Role</label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                    <button
                      type="button"
                      onClick={() => setRole('developer')}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                        role === 'developer'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Code2 size={14} />
                      Developer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('influencer')}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                        role === 'influencer'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Sparkles size={14} />
                      Influencer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                        role === 'buyer'
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <ShoppingCart size={14} />
                      Buyer
                    </button>
                  </div>
                </div>

                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-sm text-white transition-all"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-sm text-white transition-all"
                  />
                </div>

                {/* Platform Input (Conditional with animation) */}
                <AnimatePresence initial={false}>
                  {role === 'influencer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1.5 pt-1 pb-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform & Followers</label>
                        <input
                          type="text"
                          required={role === 'influencer'}
                          value={platform}
                          onChange={(e) => setPlatform(e.target.value)}
                          placeholder="e.g. Instagram · 12k followers"
                          className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-sm text-white transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Social Profiles Grid */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Social Handles {role === 'influencer' ? '(Instagram Required)' : '(Optional)'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Instagram */}
                    <div className="flex flex-col gap-1">
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-400">
                          <InstagramIcon size={14} />
                        </div>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="Instagram"
                          required={role === 'influencer'}
                          className="w-full pl-9 pr-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-xs text-white transition-all"
                        />
                        {role === 'influencer' && (
                          <span className="absolute right-3 text-[10px] text-orange-500 font-bold">*</span>
                        )}
                      </div>
                    </div>

                    {/* Twitter/X */}
                    <div className="flex flex-col gap-1">
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-400">
                          <TwitterXIcon size={14} />
                        </div>
                        <input
                          type="text"
                          value={x}
                          onChange={(e) => setX(e.target.value)}
                          placeholder="Twitter / X"
                          className="w-full pl-9 pr-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-xs text-white transition-all"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex flex-col gap-1">
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-400">
                          <LinkedInIcon size={14} />
                        </div>
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="LinkedIn"
                          className="w-full pl-9 pr-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-xs text-white transition-all"
                        />
                      </div>
                    </div>

                    {/* TikTok */}
                    <div className="flex flex-col gap-1">
                      <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-400">
                          <TikTokIcon size={14} />
                        </div>
                        <input
                          type="text"
                          value={tiktok}
                          onChange={(e) => setTiktok(e.target.value)}
                          placeholder="TikTok"
                          className="w-full pl-9 pr-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-orange-500/50 rounded-xl outline-none text-xs text-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Messages */}
                {errorMsg && (
                  <div className="text-red-400 text-xs font-semibold px-2 py-2 rounded bg-red-950/20 border border-red-500/20">
                    ❌ {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="text-emerald-400 text-xs font-semibold px-2 py-2 rounded bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="shrink-0 animate-bounce" />
                    {successMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 py-3.5 px-4 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Contacting the team...
                    </>
                  ) : (
                    <>
                      🚀 contact the team
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Profiles and Counter */}
                <div className="flex items-center justify-center gap-3 mt-4 pt-2 border-t border-white/[0.04]">
                  <div className="flex -space-x-2.5">
                    <img 
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0c0c0c] object-cover" 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="User avatar" 
                    />
                    <img 
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0c0c0c] object-cover" 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                      alt="User avatar" 
                    />
                    <img 
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0c0c0c] object-cover" 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                      alt="User avatar" 
                    />
                    <img 
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0c0c0c] object-cover" 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                      alt="User avatar" 
                    />
                    <img 
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0c0c0c] object-cover" 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80" 
                      alt="User avatar" 
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-medium">64 more</span>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. Problem & Solution Section (Dynamic Left/Right scroll entrance) */}
      <section id="problem-solution" className="py-24 border-t border-white/[0.06] bg-[#0c0c0c]/40 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Problem card - Left slide in */}
            <motion.div 
              {...fadeInLeft}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              className="p-8 rounded-3xl border border-white/[0.06] bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚨</span>
                <h3 className="text-xl font-extrabold text-white">The Problem We Solve</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                India has no trusted marketplace for digital products. Existing global giants are US-first, charge heavy fees in USD, and offer no revenue verification. 
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mt-4">
                Indian developers and creators are forced to use generic, unoptimized systems. Buyers have no way to verify if a seller's numbers are legitimate — anyone can claim any revenue amount. Influencers lack an automated structure to monetize their audiences without inventory headache.
              </p>
            </motion.div>

            {/* Solution card - Right slide in */}
            <motion.div 
              {...fadeInRight}
              whileHover={{ y: -6, rotateX: -2, rotateY: 2 }}
              className="p-8 rounded-3xl border border-orange-500/20 bg-orange-950/5 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-extrabold text-white">The Softdrop Solution</h3>
              </div>
              <ul className="flex flex-col gap-3 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>INR Pricing & Razorpay:</strong> No more USD conversion headaches. Payouts directly in INR.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Gateway-Verified Revenue:</strong> Real-time seller MRR/ARR pulled straight from Stripe and Razorpay gateway.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Influencer Storefronts:</strong> Creators add digital goods to their shop at their own markup. Payout splits are automatic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Escrow Protection:</strong> Customer payments are held safely until delivery is fully confirmed.</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Four Core Pillars (Elaborated content - Left, Bottom, Bottom, Right animations) */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <motion.h2 
              {...fadeInBottom}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
            >
              Our Four Core Pillars
            </motion.h2>
            <motion.p 
              {...fadeInBottom}
              className="text-gray-400 text-sm md:text-base"
            >
              Engineered to bring trust, scalability, and seamless monetization to the Indian digital economy.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 - Left */}
            <motion.div 
              {...fadeInLeft}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#0d0d12]/75 hover:border-orange-500/30 hover:bg-[#0d0d12]/90 backdrop-blur-md transition-all flex flex-col gap-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Code2 size={20} />
              </div>
              <h3 className="text-base font-bold text-white">1. Template Marketplace</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Developers and agencies list digital templates, boilerplates, plugins, and SaaS frameworks. Every listing details sales numbers, delivery SLA timelines, modifications, and support periods.
              </p>
            </motion.div>

            {/* Pillar 2 - Bottom */}
            <motion.div 
              {...fadeInBottom}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#0d0d12]/75 hover:border-orange-500/30 hover:bg-[#0d0d12]/90 backdrop-blur-md transition-all flex flex-col gap-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold text-white">2. Dropshipping Engine</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Influencers host storefronts with white-labeled digital products at custom markup values. Payout splits happen dynamically at sale. Zero inventory, pure digital margin on creator trust.
              </p>
            </motion.div>

            {/* Pillar 3 - Bottom */}
            <motion.div 
              {...fadeInBottom}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#0d0d12]/75 hover:border-orange-500/30 hover:bg-[#0d0d12]/90 backdrop-blur-md transition-all flex flex-col gap-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Globe2 size={20} />
              </div>
              <h3 className="text-base font-bold text-white">3. Verified MRR Dashboard</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Sellers connect gateway accounts to display verified MRR and ARR figures directly on profile pages. Buyers browse transparent history logs instead of self-reported metrics.
              </p>
            </motion.div>

            {/* Pillar 4 - Right */}
            <motion.div 
              {...fadeInRight}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl border border-white/[0.08] bg-[#0d0d12]/75 hover:border-orange-500/30 hover:bg-[#0d0d12]/90 backdrop-blur-md transition-all flex flex-col gap-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-base font-bold text-white">4. Business Acquisition</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                A structured channel for listing and buying entire digital properties, websites, and profitable micro-SaaS businesses. Acquire verified assets with secure escrow closing.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. 3D Isometric Comparison Table Section (Antigravity Isometric Snapping design) */}
      <section className="py-24 border-t border-white/[0.06] bg-[#0c0c0c]/40 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">How We Stack Up</h2>
            <p className="text-gray-400 text-sm md:text-base">Why Softdrop is the premier launchpad for Indian developers and creators.</p>
          </div>

          {/* 3D Glassmorphic Table Container */}
          <motion.div 
            {...fadeInBottom}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 6, // 3D isometric styling
              transition: { duration: 0.8 }
            }}
            className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-black/40 backdrop-blur-xl p-4 shadow-2xl"
            style={{ perspective: 1000 }}
          >
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-gray-400">
                  <th className="p-4 font-bold uppercase tracking-wider">Feature</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-orange-400 bg-orange-950/10">Softdrop</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Gumroad</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Lemon Squeezy</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Instamojo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-gray-300">
                <tr>
                  <td className="p-4 font-semibold text-white">India-First INR Pricing</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-emerald-500 font-semibold"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Gateway-Verified Revenue</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Influencer Dropshipping</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Escrow Protection</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Built-in Seller Chat</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">MRR Dashboard</td>
                  <td className="p-4 bg-orange-950/10 text-emerald-500 font-bold"><Check size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                  <td className="p-4 text-red-500"><X size={18} /></td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 6. Who Is This For Section (Interactive Segmented Showcase Deck) */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Who Is Softdrop For?</h2>
            <p className="text-gray-400 text-sm md:text-base">Connecting the three corners of the digital economy.</p>
          </div>

          {/* 3D Glassmorphic Tabs */}
          <div className="flex justify-center gap-3 md:gap-4 mb-10 flex-wrap">
            <button
              onClick={() => setActivePersona('developer')}
              className={`px-5 py-2.5 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activePersona === 'developer'
                  ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                  : 'bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              🧑‍💻 Developers & Agencies
            </button>
            <button
              onClick={() => setActivePersona('influencer')}
              className={`px-5 py-2.5 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activePersona === 'influencer'
                  ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              📱 Influencers & Creators
            </button>
            <button
              onClick={() => setActivePersona('buyer')}
              className={`px-5 py-2.5 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activePersona === 'buyer'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              🛒 Digital Asset Buyers
            </button>
          </div>

          {/* Interactive Deck Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`p-6 md:p-10 rounded-3xl border bg-[#0d0d12]/85 backdrop-blur-lg shadow-2xl transition-all duration-300 ${
                activePersona === 'developer'
                  ? 'border-orange-500/20 shadow-orange-500/5'
                  : activePersona === 'influencer'
                  ? 'border-purple-500/20 shadow-purple-500/5'
                  : 'border-emerald-500/20 shadow-emerald-500/5'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Column 1: Info and Tags (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6 text-left">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      activePersona === 'developer'
                        ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                        : activePersona === 'influencer'
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      {activePersona === 'developer' ? 'SELL CODE' : activePersona === 'influencer' ? 'DROPSHIP' : 'ACQUIRE'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mt-4 leading-tight">
                      {activePersona === 'developer' 
                        ? 'Have templates, boilerplates, widgets, or SaaS modules but no good Indian platform to sell them?'
                        : activePersona === 'influencer'
                        ? 'Have audiences and community trust but no digital product of your own?'
                        : 'Acquire verified codebases, templates, and SaaS tools directly from Indian builders.'}
                    </h3>
                    <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                      {activePersona === 'developer'
                        ? 'List your digital assets in INR, build instant credibility with gateway-verified revenue, and earn securely — with escrow protection on every transaction.'
                        : activePersona === 'influencer'
                        ? 'Choose items from our private dropship catalog, set your own markup pricing, and sell instantly via automated payout splits — no inventory, no shipping, pure margin.'
                        : 'Pay in INR via standard payment routes, enjoy transaction escrow protection, and buy with confidence — every seller\'s revenue is gateway-verified before they list.'}
                    </p>
                  </div>
                  
                  {/* Persona specific Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                    {(activePersona === 'developer' ? developerTags : activePersona === 'influencer' ? influencerTags : buyerTags).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                          activePersona === 'developer'
                            ? 'bg-orange-950/20 text-orange-400 border-orange-500/10'
                            : activePersona === 'influencer'
                            ? 'bg-purple-950/20 text-purple-400 border-purple-500/10'
                            : 'bg-emerald-950/20 text-emerald-400 border-emerald-500/10'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 2: Inventory scope / Addables (4 cols) */}
                <div className="lg:col-span-4 text-left flex flex-col gap-6">
                  {activePersona === 'influencer' ? (
                    <>
                      <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-white/[0.05] pb-2">
                          What to ADD to store
                        </h4>
                        <ul className="flex flex-col gap-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                          {influencerAdd.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-purple-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-white/[0.05] pb-2">
                          What you GET
                        </h4>
                        <ul className="flex flex-col gap-2">
                          {influencerGet.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                              <CheckCircle2 size={13} className="text-purple-500 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-white/[0.05] pb-2">
                        {activePersona === 'developer' ? 'What you can SELL' : 'What you can BUY'}
                      </h4>
                      <ul className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                        {(activePersona === 'developer' ? developerSell : buyerBuy).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                              activePersona === 'developer' ? 'bg-orange-500' : 'bg-emerald-500'
                            }`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Column 3: What they get / How it works (4 cols) */}
                <div className="lg:col-span-4 text-left flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-white/[0.05] pb-2">
                    {activePersona === 'developer' ? 'What you GET' : activePersona === 'influencer' ? 'How it works' : 'Trust signals'}
                  </h4>
                  
                  {activePersona === 'influencer' ? (
                    // Influencer Step Timeline
                    <div className="flex flex-col gap-4">
                      {influencerHowItWorks.map((step, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] flex items-center justify-center font-bold text-purple-400 shrink-0">
                              {idx + 1}
                            </div>
                            {idx < influencerHowItWorks.length - 1 && (
                              <div className="w-[1px] h-9 bg-purple-500/20 my-1" />
                            )}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-white leading-none mt-1">{step.title}</span>
                            <span className="text-[10px] text-gray-400 leading-normal mt-0.5">{step.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Dev and Buyer benefits list with checkmarks
                    <ul className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                      {(activePersona === 'developer' ? developerGet : buyerTrust).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                          <CheckCircle2 size={13} className={`mt-0.5 shrink-0 ${
                            activePersona === 'developer' ? 'text-orange-500' : 'text-emerald-500'
                          }`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 7. Traction Goals & Founding Benefits (Left / Right split) */}
      <section className="py-24 border-t border-white/[0.06] bg-[#0c0c0c]/40 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div {...fadeInLeft} className="lg:col-span-6 flex flex-col gap-5 text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Join the Founding 100</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Be among the first 100 members to shape the Indian digital marketplace. Get priority features, zero fees, and active direct roadmap consultation with the founder.
              </p>
              
              <div className="flex flex-col gap-3 mt-2 text-xs md:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span>Permanent <strong>Founding Member badge</strong> displayed on profile pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span><strong>Zero platform transaction fees</strong> for the first 6 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span>
                    {founder.whatsappUrl ? (
                      <a href={founder.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 hover:border-emerald-500/20 border border-transparent bg-white/[0.02] hover:bg-emerald-950/10 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-2 font-semibold group cursor-pointer">
                        <WhatsAppIcon size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                        Join the WhatsApp Group Link
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-gray-500">
                        <WhatsAppIcon size={16} className="text-gray-500" />
                        Direct <strong>WhatsApp access</strong> to the founder
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span>First-mover catalog placement before public release</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInRight} className="lg:col-span-6 grid grid-cols-2 gap-4">
              {/* Fact 1 */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-orange-500/20 transition-all text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">
                  <CountUp value="4" />
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Core Pillars</p>
              </div>

              {/* Fact 2 */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-orange-500/20 transition-all text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">
                  <CountUp value="100%" />
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Revenue Verified</p>
              </div>

              {/* Fact 3 */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-orange-500/20 transition-all text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">
                  <CountUp value="₹0" />
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Founding Fees</p>
              </div>

              {/* Fact 4 */}
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-orange-500/20 transition-all text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">
                  <CountUp value="1" />
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">India First</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 8. Tech Stack & Platform Credentials */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Our Tech Infrastructure</h2>
            <p className="text-gray-400 text-sm md:text-base">Robust systems built using modern stack choices to support scalable marketplace pipelines.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
            {['Next.js 16', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Clerk Auth', 'Razorpay API', 'Socket.io', 'Cloudinary', 'Neon Database', 'SMTP Nodemailer'].map((tech) => (
              <div key={tech} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] flex items-center justify-center gap-2 group transition-all">
                <Cpu size={14} className="text-orange-500 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xs font-bold text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. About the Founder Section (Dynamically rendered with social portfolio handles) */}
      {founder.name && (
        <section className="py-24 border-t border-white/[0.06] bg-[#0c0c0c]/40 backdrop-blur-sm relative">
          <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-6">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Meet the Founder</h3>
            
            {founder.photoUrl && (
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500/50 p-1 shadow-lg shadow-orange-500/10">
                <img 
                  src={founder.photoUrl} 
                  alt={founder.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            
            <div className="flex flex-col gap-1 items-center">
              <h4 className="text-xl font-bold text-white">{founder.name}</h4>
              {founder.college && (
                <span className="text-xs font-semibold text-orange-400 bg-orange-950/20 border border-orange-500/10 px-2.5 py-0.5 rounded-full">
                  {founder.college}
                </span>
              )}
            </div>

            {founder.bio && (
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                {founder.bio}
              </p>
            )}

            {/* Founder Social Links & Portfolio */}
            <div className="flex items-center gap-4 mt-2">
              {founder.portfolio && (
                <a href={founder.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-orange-500 border border-white/[0.08] hover:border-orange-500/30 bg-white/[0.02] px-4 py-2 rounded-lg transition-all font-bold uppercase tracking-wider">
                  Portfolio Website
                </a>
              )}
              {founder.linkedinUrl && (
                <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-white/[0.08] hover:border-orange-500/30 bg-white/[0.02] hover:bg-white/[0.04] text-gray-400 hover:text-orange-500 flex items-center justify-center transition-all">
                  <LinkedInIcon size={18} />
                </a>
              )}
              {founder.instagramUrl && (
                <a href={founder.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-white/[0.08] hover:border-orange-500/30 bg-white/[0.02] hover:bg-white/[0.04] text-gray-400 hover:text-orange-500 flex items-center justify-center transition-all">
                  <InstagramIcon size={18} />
                </a>
              )}
              {founder.twitterXUrl && (
                <a href={founder.twitterXUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-white/[0.08] hover:border-orange-500/30 bg-white/[0.02] hover:bg-white/[0.04] text-gray-400 hover:text-orange-500 flex items-center justify-center transition-all">
                  <TwitterXIcon size={18} />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 10. Footer */}
      <footer className="py-8 border-t border-white/[0.06] text-center bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6 text-[10px] md:text-xs text-gray-500 tracking-wider">
          &copy; 2026 Softdrop &middot; India's first revenue-verified digital marketplace
        </div>
      </footer>
    </div>
  );
}
