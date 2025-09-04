'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUsers,
  HiOutlineFire,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiSparkles,
  HiOutlineLightningBolt
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";

export default function SentraCommunityHub() {
  const [activeUsers, setActiveUsers] = useState(117234);
  const [topAnalysts, setTopAnalysts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWebApp, setIsWebApp] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
  }, []);

  const hapticFeedback = useCallback((type = 'light') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
  }, [isWebApp]);

  const generateAvatar = useCallback((seed, index) => {
    const backgrounds = ['35C6FF', '00F5FF', '00AFFF', 'A855F7', 'EC4899', 'F59E0B', '10B981'];
    const bgColor = backgrounds[index % backgrounds.length];
    return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bgColor}&size=64`;
  }, []);

  const topAnalystsData = [
    {
      id: 1,
      rank: 1,
      username: "@crypto_whale_hunter",
      displayName: "Alex M.",
      score: 9847,
      specialty: "Whale Intelligence",
      status: "online",
      verified: true,
      level: "Pro"
    },
    {
      id: 2,
      rank: 2,
      username: "@defi_sentiment_ai",
      displayName: "Sarah K.",
      score: 9234,
      specialty: "DeFi Sentiment",
      status: "online",
      verified: true,
      level: "Expert"
    },
    {
      id: 3,
      rank: 3,
      username: "@onchain_analytics",
      displayName: "Mike R.",
      score: 8956,
      specialty: "On-Chain Analysis",
      status: "active",
      verified: true,
      level: "Pro"
    },
    {
      id: 4,
      rank: 4,
      username: "@risk_assessment_pro",
      displayName: "Emma L.",
      score: 8734,
      specialty: "Risk Assessment",
      status: "online",
      verified: false,
      level: "Advanced"
    },
    {
      id: 5,
      rank: 5,
      username: "@token_unlock_tracker",
      displayName: "David C.",
      score: 8521,
      specialty: "Token Unlocks",
      status: "active",
      verified: true,
      level: "Pro"
    },
    {
      id: 6,
      rank: 6,
      username: "@market_pulse_ai",
      displayName: "Lisa W.",
      score: 8234,
      specialty: "Market Pulse",
      status: "online",
      verified: true,
      level: "Expert"
    },
    {
      id: 7,
      rank: 7,
      username: "@social_sentiment_bot",
      displayName: "Tom H.",
      score: 7998,
      specialty: "Social Sentiment",
      status: "active",
      verified: false,
      level: "Advanced"
    },
    {
      id: 8,
      rank: 8,
      username: "@yield_farming_guru",
      displayName: "Anna P.",
      score: 7756,
      specialty: "Yield Farming",
      status: "online",
      verified: true,
      level: "Pro"
    },
    {
      id: 9,
      rank: 9,
      username: "@nft_market_intel",
      displayName: "Jack B.",
      score: 7543,
      specialty: "NFT Intelligence",
      status: "active",
      verified: false,
      level: "Advanced"
    },
    {
      id: 10,
      rank: 10,
      username: "@governance_tracker",
      displayName: "Maya S.",
      score: 7321,
      specialty: "Governance Analysis",
      status: "online",
      verified: true,
      level: "Expert"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopAnalysts(topAnalystsData);
      setLoading(false);
    }, 1200);

    // Real-time user count updates
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const change = Math.floor(Math.random() * 20) - 10; // -10 to +10
        const newCount = prev + change;
        // Keep between 115k and 120k
        return Math.max(115000, Math.min(120000, newCount));
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';  
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'neon-lime' : 'signal-glow-cyan';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'deep-emerald';
      case 'Pro': return 'signal-glow-cyan';
      case 'Advanced': return 'matrix-violet';
      default: return 'crisp-white';
    }
  };

  return (
    <div className="pb-20 space-y-6">
      {/* Header Section */}
      <motion.div 
        className="glass relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="corner-markers"></div>
        <div className="glass-content p-6 text-center">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-signal-glow-cyan to-matrix-violet rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <HiOutlineUsers className="w-8 h-8 text-crisp-white" />
          </motion.div>
          
          <h1 className="text-3xl font-black sentra-gradient-text mb-2">
            SENTRA COMMUNITY
          </h1>
          <p className="text-signal-glow-cyan font-bold text-sm terminal-header mb-3">
            TOP INTELLIGENCE ANALYSTS
          </p>
          
          {/* Live User Count */}
          <motion.div 
            className="flex items-center justify-center gap-3"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="status-indicator w-3 h-3 bg-neon-lime rounded-full shadow-lg" />
            <span className="text-crisp-white/90 text-lg font-bold">
              {activeUsers.toLocaleString()} Active Analysts
            </span>
            <div className="status-indicator w-3 h-3 bg-signal-glow-cyan rounded-full shadow-lg" />
          </motion.div>
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="glass flex flex-col items-center justify-center py-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="corner-markers"></div>
            <div className="glass-content text-center">
              <div className="relative mb-6">
                <motion.div 
                  className="w-20 h-20 border-4 border-signal-glow-cyan/20 border-t-signal-glow-cyan rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <LuBrainCircuit className="w-10 h-10 text-signal-glow-cyan absolute top-5 left-5" />
              </div>
              <p className="text-signal-glow-cyan font-bold text-xl mb-2 terminal-header">
                LOADING TOP ANALYSTS
              </p>
              <p className="text-crisp-white/70 text-sm font-medium">
                Analyzing community intelligence rankings...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top 10 Analysts Grid */}
      {!loading && (
        <div className="space-y-4">
          <motion.h2 
            className="text-xl font-black terminal-header text-center text-signal-glow-cyan mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            🏆 TOP 10 INTELLIGENCE ANALYSTS
          </motion.h2>

          <div className="space-y-3">
            <AnimatePresence>
              {topAnalysts.map((analyst, index) => (
                <motion.div
                  key={analyst.id}
                  className="glass group cursor-pointer relative overflow-hidden"
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onTap={() => hapticFeedback('light')}
                >
                  <div className="corner-markers"></div>
                  
                  {/* Rank Indicator */}
                  <div className={`absolute top-0 left-0 w-2 h-full ${
                    analyst.rank <= 3 ? 'bg-neon-lime' : 'bg-signal-glow-cyan'
                  } opacity-60`} />
                  
                  <div className="glass-content p-4">
                    <div className="flex items-center justify-between">
                      {/* Left Section - User Info */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Rank Badge */}
                        <motion.div 
                          className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg
                            ${analyst.rank <= 3 
                              ? 'bg-gradient-to-r from-neon-lime to-electric-green text-quantum-black' 
                              : 'bg-gradient-to-r from-signal-glow-cyan to-matrix-violet text-crisp-white'
                            }
                          `}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {getRankIcon(analyst.rank)}
                        </motion.div>

                        {/* Avatar and Info */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={generateAvatar(analyst.username, index)}
                              alt={`${analyst.displayName} avatar`}
                              width={48}
                              height={48}
                              className="rounded-xl shadow-lg"
                              loading="lazy"
                            />
                            <div className={`status-indicator absolute -bottom-1 -right-1 w-4 h-4 bg-${getStatusColor(analyst.status)} rounded-full border-2 border-quantum-black shadow-lg`} />
                            {analyst.verified && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-lime rounded-full flex items-center justify-center">
                                <HiOutlineShieldCheck className="w-3 h-3 text-quantum-black" />
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-crisp-white font-bold text-sm">
                                {analyst.displayName}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-lg text-xs font-bold bg-${getLevelColor(analyst.level)}/20 text-${getLevelColor(analyst.level)}`}>
                                {analyst.level}
                              </span>
                            </div>
                            <p className="text-crisp-white/60 text-xs font-mono mb-1">
                              {analyst.username}
                            </p>
                            <p className="text-crisp-white/80 text-xs font-medium">
                              {analyst.specialty}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Score */}
                      <div className="text-right">
                        <motion.div 
                          className="flex items-center gap-1 text-neon-lime text-xl font-black mb-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          <HiSparkles className="w-5 h-5" />
                          <span>{analyst.score.toLocaleString()}</span>
                        </motion.div>
                        <p className="text-crisp-white/50 text-xs font-medium terminal-header">
                          INTELLIGENCE SCORE
                        </p>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-crisp-white/10">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-${getStatusColor(analyst.status)} rounded-full animate-pulse`} />
                        <span className={`text-${getStatusColor(analyst.status)} text-xs font-bold terminal-header`}>
                          {analyst.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {analyst.verified && (
                          <div className="flex items-center gap-1 text-neon-lime">
                            <HiOutlineShieldCheck className="w-3 h-3" />
                            <span className="text-xs font-bold">VERIFIED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-signal-glow-cyan/5 via-matrix-violet/5 to-neon-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Community Stats */}
      {!loading && (
        <motion.div 
          className="glass relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="corner-markers"></div>
          <div className="glass-content p-6">
            <h3 className="text-lg font-black terminal-header text-center text-signal-glow-cyan mb-4">
              COMMUNITY INTELLIGENCE METRICS
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-neon-lime font-black text-2xl mb-1">
                  {Math.floor(activeUsers * 0.12).toLocaleString()}
                </div>
                <div className="text-crisp-white/70 text-xs font-semibold terminal-header">
                  DAILY ANALYSES
                </div>
              </div>
              <div>
                <div className="text-signal-glow-cyan font-black text-2xl mb-1">
                  {Math.floor(activeUsers * 0.08).toLocaleString()}
                </div>
                <div className="text-crisp-white/70 text-xs font-semibold terminal-header">
                  ALERTS SENT
                </div>
              </div>
              <div>
                <div className="text-matrix-violet font-black text-2xl mb-1">
                  {Math.floor(activeUsers * 0.15).toLocaleString()}
                </div>
                <div className="text-crisp-white/70 text-xs font-semibold terminal-header">
                  CREDITS EARNED
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
