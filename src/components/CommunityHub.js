'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineChartBar,
  HiOutlineDocumentSearch,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiSparkles,
  HiOutlineLightningBolt,
  HiOutlineEye,
  HiOutlineGlobe
} from 'react-icons/hi';
import Link from 'next/link';
import { LuBrainCircuit } from "react-icons/lu";


export default function QuantoraCommunityHub() {
  const [totalUsers, setTotalUsers] = useState(127543);
  const [activeAnalysts, setActiveAnalysts] = useState(89234);
  const [reportsGenerated, setReportsGenerated] = useState(156789);
  const [totalCreditsEarned, setTotalCreditsEarned] = useState(2847392);
  const [loading, setLoading] = useState(true);
  const [researchActivities, setResearchActivities] = useState([]);
  const [isWebApp, setIsWebApp] = useState(false);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
  }, []);

  // Haptic feedback for mobile
  const hapticFeedback = useCallback((type = 'light') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    } else if ('vibrate' in navigator) {
      const patterns = { light: 10, medium: 50, heavy: 100 };
      navigator.vibrate(patterns[type] || 10);
    }
  }, [isWebApp]);

  // Optimized avatar generation using Dicebear API
  const generateAvatar = useCallback((seed, index) => {
    const backgrounds = ['b6e3f4', 'c0aede', 'd1d4f9'];
    const bgColor = backgrounds[index % backgrounds.length];
    return `https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=${bgColor}&size=48`;
  }, []);

  // Mock research activities with performance optimization
  const mockActivities = useMemo(() => [
    {
      id: 1,
      username: "Sarah K.",
      action: "Tokenomics analysis completed",
      credits: 125,
      timeAgo: "2 mins ago",
      type: "tokenomics",
      agent: "TokenMaster AI"
    },
    {
      id: 2,
      username: "Mike R.",
      action: "Whale tracking report finished",
      credits: 89,
      timeAgo: "5 mins ago",
      type: "whale",
      agent: "WhaleWatch AI"
    },
    {
      id: 3,
      username: "Alex Chen",
      action: "Vesting schedule analyzed",
      credits: 67,
      timeAgo: "8 mins ago",
      type: "vesting",
      agent: "VestGuard AI"
    },
    {
      id: 4,
      username: "Emma J.",
      action: "Market sentiment report generated",
      credits: 156,
      timeAgo: "12 mins ago",
      type: "sentiment",
      agent: "PulseAI"
    },
    {
      id: 5,
      username: "David L.",
      action: "Risk assessment completed",
      credits: 234,
      timeAgo: "15 mins ago",
      type: "risk",
      agent: "RiskShield AI"
    }
  ], []);

  // Optimized user avatars with memoization
  const userAvatars = useMemo(() => [
    { name: "Sarah", seed: "sarah-analyst", role: "Lead Researcher" },
    { name: "Mike", seed: "mike-trader", role: "Whale Tracker" },
    { name: "Alex", seed: "alex-dev", role: "Risk Analyst" },
    { name: "Emma", seed: "emma-crypto", role: "Sentiment Expert" },
    { name: "David", seed: "david-quant", role: "Quant Researcher" },
    { name: "Lisa", seed: "lisa-defi", role: "DeFi Specialist" },
    { name: "Tom", seed: "tom-blockchain", role: "Blockchain Analyst" },
    { name: "Anna", seed: "anna-markets", role: "Market Strategist" }
  ], []);

  useEffect(() => {
    // Optimized initialization
    const timer = setTimeout(() => {
      setResearchActivities(mockActivities);
      setLoading(false);
    }, 800);

    // Optimized real-time updates with reduced frequency
    const interval = setInterval(() => {
      // Batch state updates for better performance
      const updates = {
        users: Math.floor(Math.random() * 15) + 5,
        analysts: Math.floor(Math.random() * 12) + 3,
        reports: Math.floor(Math.random() * 20) + 8,
        credits: Math.floor(Math.random() * 80) + 40
      };

      setTotalUsers(prev => prev + updates.users);
      setActiveAnalysts(prev => prev + updates.analysts);
      setReportsGenerated(prev => prev + updates.reports);
      setTotalCreditsEarned(prev => prev + updates.credits);

      // Occasionally add new activity (reduced frequency for performance)
      if (Math.random() > 0.7) {
        const activities = [
          "Tokenomics deep dive completed",
          "Whale movement detected",
          "Unlock schedule mapped",
          "Social sentiment analyzed",
          "Risk metrics updated",
          "AI research generated"
        ];
        
        const agents = ["TokenMaster AI", "WhaleWatch AI", "VestGuard AI", "PulseAI", "RiskShield AI"];
        const types = ["tokenomics", "whale", "vesting", "sentiment", "risk"];
        
        const newActivity = {
          id: Date.now(),
          username: `Researcher${Math.floor(Math.random() * 999)}`,
          action: activities[Math.floor(Math.random() * activities.length)],
          credits: Math.floor(Math.random() * 150) + 50,
          timeAgo: "Just now",
          type: types[Math.floor(Math.random() * types.length)],
          agent: agents[Math.floor(Math.random() * agents.length)]
        };
        
        setResearchActivities(prev => [newActivity, ...prev.slice(0, 3)]);
      }
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [mockActivities]);

  const getActivityIcon = useCallback((type) => {
    const icons = {
      tokenomics: <HiOutlineChartBar className="w-4 h-4" />,
      whale: <HiOutlineUsers className="w-4 h-4" />,
      vesting: <HiOutlineDocumentSearch className="w-4 h-4" />,
      sentiment: <HiOutlineGlobe className="w-4 h-4" />,
      risk: <HiOutlineShieldCheck className="w-4 h-4" />
    };
    return icons[type] || <LuBrainCircuit className="w-4 h-4" />;
  }, []);

  const getTypeColor = useCallback((type) => {
    const colors = {
      tokenomics: 'lime-400',
      whale: 'cyan-400',
      vesting: 'emerald-400',
      sentiment: 'violet-400',
      risk: 'orange-400'
    };
    return colors[type] || 'lime-400';
  }, []);

  return (
    <div className="pb-20 -mt-14">
      {/* Premium Header */}
      <motion.div 
        className="glass mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-3 rounded-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 -mt-5">
              <h1 className="text-2xl font-black tektur text-white">
                Research Community
              </h1>
            </div>
            <p className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
              Global Intelligence Network
            </p>
            <p className="text-white/80 text-sm">
              Join {(totalUsers/1000).toFixed(1)}K+ analysts conducting institutional-grade crypto research
            </p>
          </div>
        </div>
      </motion.div>

      {/* Optimized User Avatars with Dicebear */}
      <motion.div 
        className="glass mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="p-3 rounded-2xl">
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center -space-x-3">
                {userAvatars.slice(0, 6).map((user, index) => (
                  <motion.div
                    key={user.seed}
                    className="relative w-12 h-12 rounded-full border-3 border-lime-400/30 shadow-lg overflow-hidden bg-white"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 50, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onTap={() => hapticFeedback('light')}
                  >
                    <img
                      src={generateAvatar(user.seed, index)}
                      alt={`${user.name} avatar`}
                      width={48}
                      height={48}
                      className="rounded-full"
                      loading="lazy"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${getTypeColor('tokenomics')} rounded-full border-2 border-gray-800`} />
                  </motion.div>
                ))}
                
                <motion.div
                  className="w-16 h-12 rounded-full border-2 border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xs font-black shadow-lg bg-gradient-to-r from-cyan-400/10 to-violet-400/10 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  +{Math.floor((totalUsers - 6)/1000)}K
                </motion.div>
              </div>
              
              <div className="text-center mt-4">
                <motion.div
                  className="text-white/90 text-sm font-semibold flex items-center justify-center gap-2"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                  <span>{totalUsers.toLocaleString()} active researchers</span>
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optimized Stats Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {[
          { 
            label: "Total Researchers", 
            value: totalUsers, 
            icon: HiOutlineUsers, 
            color: "lime-400",
            gradient: "from-lime-400/20 to-green-500/20"
          },
          { 
            label: "Active Analysts", 
            value: activeAnalysts, 
            icon: HiOutlineEye, 
            color: "cyan-400",
            gradient: "from-cyan-400/20 to-blue-500/20"
          },
          { 
            label: "Reports Generated", 
            value: reportsGenerated, 
            icon: HiOutlineTrendingUp, 
            color: "violet-400",
            gradient: "from-violet-400/20 to-purple-500/20"
          },
          { 
            label: "Credits Earned", 
            value: totalCreditsEarned, 
            icon: HiSparkles, 
            color: "emerald-400",
            gradient: "from-emerald-400/20 to-teal-500/20"
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="glass"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-3 rounded-2xl text-center`}>
                <div className={`text-${stat.color} text-xl font-black mb-1`}>
                  {stat.value > 999999 
                    ? `${(stat.value/1000000).toFixed(1)}M` 
                    : stat.value > 999 
                      ? `${(stat.value/1000).toFixed(1)}K`
                      : stat.value.toLocaleString()
                  }
                </div>
                <div className="text-white/70 text-xs mb-2 font-semibold">
                  {stat.label}
                </div>
                <IconComponent className={`w-4 h-4 text-${stat.color} mx-auto`} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="glass flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative mb-4">
              <motion.div 
                className="w-12 h-12 border-3 border-cyan-400/30 border-t-cyan-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <HiOutlineLightningBolt className="w-6 h-6 text-cyan-400 absolute top-3 left-3" />
            </div>
            <p className="text-white/80 text-sm font-semibold">Loading research activities...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Live Activity Feed */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="w-3 h-3 bg-lime-400 rounded-full shadow-lg shadow-lime-400/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h2 className="text-lg font-black tektur text-white">
            Live Research Activity
          </h2>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {!loading && researchActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="glass group cursor-pointer"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onTap={() => hapticFeedback('light')}
              >
                <div className={`p-3 rounded-2xl`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={generateAvatar(activity.username, Math.floor(Math.random() * 3))}
                          alt={`${activity.username} avatar`}
                          width={40}
                          height={40}
                          className="rounded-xl"
                          loading="lazy"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${getTypeColor(activity.type)} rounded-full border-2 border-gray-800`} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">
                          {activity.username}
                        </h3>
                        <p className="text-white/70 text-xs">
                          {activity.action}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-${getTypeColor(activity.type)} text-sm font-bold mb-1`}>
                        <HiSparkles className="w-3 h-3" />
                        <span>+{activity.credits}</span>
                      </div>
                      <p className="text-white/50 text-xs">
                        {activity.timeAgo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className={`flex items-center gap-2 text-${getTypeColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                      <span className="text-xs font-bold">
                        {activity.agent}
                      </span>
                    </div>
                    <div className="text-xs text-white/60">
                      Research Complete
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Link href="/?tab=SPAI">
          <motion.button
            className="glass-button px-6 py-3 flex items-center gap-3 mx-auto shadow-xl shadow-lime-400/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onTap={() => hapticFeedback('medium')}
          >
            <LuBrainCircuit className="w-5 h-5" />
            <span className="font-bold">Join Research Network</span>
            <HiSparkles className="w-4 h-4" />
          </motion.button>
        </Link>
        <p className="text-white/60 text-xs mt-3 font-medium">
          Start earning credits with institutional-grade crypto research
        </p>
      </motion.div>
    </div>
  );
}
