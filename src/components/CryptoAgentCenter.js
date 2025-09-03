'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  HiOutlineChartBar, 
  HiOutlineDocumentSearch, 
  HiOutlineGlobeAlt, 
  HiOutlineUsers, 
  HiOutlineTrendingUp,
  HiArrowRight,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineStar,
  HiOutlineSparkles
} from 'react-icons/hi';

const QuantoraAgentCenter = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
  }, []);

  const triggerHaptic = (type = 'impact', style = 'medium') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      } else if (type === 'notification') {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(style);
      }
    }
  };

  const researchAgents = [
    { 
      id: 'tokenomics',
      title: 'Tokenomics Deep Dive', 
      subtitle: 'Supply & Economics Engine',
      description: 'Unlock the secrets of token economics with AI-powered supply analysis and inflation modeling',
      icon: HiOutlineChartBar,
      primaryColor: 'emerald-400',
      secondaryColor: 'green-300',
      accentColor: 'lime-400',
      bgGradient: 'from-emerald-500/20 via-green-400/15 to-lime-300/10',
      features: [
        { name: 'Supply Tracking', emoji: '📊', color: 'emerald-400', bg: 'emerald-500/20' },
        { name: 'Burn Analysis', emoji: '🔥', color: 'red-400', bg: 'red-500/20' },
        { name: 'Inflation Models', emoji: '📈', color: 'orange-400', bg: 'orange-500/20' },
        { name: 'Economics Report', emoji: '💰', color: 'yellow-400', bg: 'yellow-500/20' }
      ],
      stats: { accuracy: '94%', speed: '2.3s' }
    },
    { 
      id: 'unlocks',
      title: 'Unlock Intelligence', 
      subtitle: 'Vesting & Release Tracker',
      description: 'Stay ahead of major unlocks with predictive analysis of token release schedules and market impact',
      icon: HiOutlineDocumentSearch,
      primaryColor: 'cyan-400',
      secondaryColor: 'blue-300',
      accentColor: 'sky-400',
      bgGradient: 'from-cyan-500/20 via-blue-400/15 to-sky-300/10',
      features: [
        { name: 'Unlock Calendar', emoji: '📅', color: 'cyan-400', bg: 'cyan-500/20' },
        { name: 'Vest Tracking', emoji: '⏰', color: 'blue-400', bg: 'blue-500/20' },
        { name: 'Impact Forecast', emoji: '🎯', color: 'indigo-400', bg: 'indigo-500/20' },
        { name: 'Price Alerts', emoji: '🔔', color: 'purple-400', bg: 'purple-500/20' }
      ],
      stats: { accuracy: '91%', speed: '1.8s' }
    },
    { 
      id: 'investors',
      title: 'Smart Money Tracker', 
      subtitle: 'VC & Whale Intelligence',
      description: 'Follow the smart money with advanced VC backing analysis and whale movement detection',
      icon: HiOutlineUsers,
      primaryColor: 'purple-400',
      secondaryColor: 'violet-300',
      accentColor: 'fuchsia-400',
      bgGradient: 'from-purple-500/20 via-violet-400/15 to-fuchsia-300/10',
      features: [
        { name: 'VC Mapping', emoji: '🏢', color: 'purple-400', bg: 'purple-500/20' },
        { name: 'Whale Watch', emoji: '🐋', color: 'blue-400', bg: 'blue-500/20' },
        { name: 'Flow Analysis', emoji: '🌊', color: 'cyan-400', bg: 'cyan-500/20' },
        { name: 'Smart Alerts', emoji: '🧠', color: 'pink-400', bg: 'pink-500/20' }
      ],
      stats: { accuracy: '96%', speed: '3.1s' }
    },
    { 
      id: 'sentiment',
      title: 'Sentiment Pulse', 
      subtitle: 'Community & Social Engine',
      description: 'Feel the market pulse with real-time sentiment analysis from social media and community channels',
      icon: HiOutlineGlobeAlt,
      primaryColor: 'pink-400',
      secondaryColor: 'rose-300',
      accentColor: 'red-400',
      bgGradient: 'from-pink-500/20 via-rose-400/15 to-red-300/10',
      features: [
        { name: 'Social Pulse', emoji: '💭', color: 'pink-400', bg: 'pink-500/20' },
        { name: 'Buzz Tracking', emoji: '📱', color: 'violet-400', bg: 'violet-500/20' },
        { name: 'Trend Signals', emoji: '📡', color: 'blue-400', bg: 'blue-500/20' },
        { name: 'Hype Index', emoji: '🚀', color: 'green-400', bg: 'green-500/20' }
      ],
      stats: { accuracy: '89%', speed: '1.2s' }
    },
    { 
      id: 'risk-assessment',
      title: 'Risk Guardian', 
      subtitle: 'Security & Safety Engine',
      description: 'Protect your investments with comprehensive risk assessment covering all potential threat vectors',
      icon: HiOutlineShieldCheck,
      primaryColor: 'orange-400',
      secondaryColor: 'amber-300',
      accentColor: 'yellow-400',
      bgGradient: 'from-orange-500/20 via-amber-400/15 to-yellow-300/10',
      features: [
        { name: 'Tech Audit', emoji: '🔍', color: 'orange-400', bg: 'orange-500/20' },
        { name: 'Market Risk', emoji: '⚠️', color: 'red-400', bg: 'red-500/20' },
        { name: 'Regulatory Check', emoji: '⚖️', color: 'blue-400', bg: 'blue-500/20' },
        { name: 'Safety Score', emoji: '🛡️', color: 'green-400', bg: 'green-500/20' }
      ],
      stats: { accuracy: '93%', speed: '4.2s' }
    },
    { 
      id: 'realtime-alerts',
      title: 'Lightning Alerts', 
      subtitle: 'Real-Time Intelligence',
      description: 'Never miss a beat with instant notifications for critical market events and breaking developments',
      icon: HiOutlineLightningBolt,
      primaryColor: 'yellow-400',
      secondaryColor: 'lime-300',
      accentColor: 'green-400',
      bgGradient: 'from-yellow-500/20 via-lime-400/15 to-green-300/10',
      features: [
        { name: 'Live Monitor', emoji: '👁️', color: 'yellow-400', bg: 'yellow-500/20' },
        { name: 'Flash Alerts', emoji: '⚡', color: 'orange-400', bg: 'orange-500/20' },
        { name: 'Event Detection', emoji: '🎪', color: 'red-400', bg: 'red-500/20' },
        { name: 'Custom Triggers', emoji: '⚙️', color: 'gray-400', bg: 'gray-500/20' }
      ],
      stats: { accuracy: '97%', speed: '0.8s' }
    },
    { 
      id: 'comprehensive',
      title: 'Complete Research', 
      subtitle: 'All-in-One Intelligence',
      description: 'The ultimate research powerhouse combining all modules for comprehensive fundamental analysis',
      icon: HiOutlineTrendingUp,
      primaryColor: 'emerald-400',
      secondaryColor: 'cyan-300',
      accentColor: 'blue-400',
      bgGradient: 'from-emerald-500/25 via-cyan-400/20 via-blue-400/15 to-purple-300/10',
      features: [
        { name: 'Full Analysis', emoji: '🎯', color: 'emerald-400', bg: 'emerald-500/25' },
        { name: 'PDF Reports', emoji: '📄', color: 'blue-400', bg: 'blue-500/25' },
        { name: 'Data Export', emoji: '💾', color: 'purple-400', bg: 'purple-500/25' },
        { name: 'AI Summary', emoji: '🤖', color: 'cyan-400', bg: 'cyan-500/25' }
      ],
      stats: { accuracy: '95%', speed: '5.7s' }
    }
  ];

  return (
    <div className="mb-8">
      
      {/* Agent Cards */}
      <div className="space-y-5">
        {researchAgents.map((agent, index) => {
          const IconComponent = agent.icon;
          
          return (
            <motion.div
              key={agent.id}
              className={`glass relative overflow-hidden ${activeCard === agent.id ? 'scale-[1.02]' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15, 
                type: "spring", 
                stiffness: 100,
                damping: 15 
              }}
              onTouchStart={() => {
                setActiveCard(agent.id);
                triggerHaptic('impact', 'light');
              }}
              onTouchEnd={() => setActiveCard(null)}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/?tab=SPAI" className="block">
                {/* Colorful Content Inside Glass */}
                <div>
                  
                  {/* Floating Stats */}
                  <motion.div 
                    className="absolute top-4 right-4 gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.15) + 0.5, type: "spring" }}
                  >
                    <div className={`px-2 ring-1 ring-green-600 rounded-lg backdrop-blur-sm`}>
                      <span className={`text-${agent.primaryColor} text-xs font-bold`}>
                        {agent.stats.accuracy}
                      </span>
                    </div>
                    <div className={`px-2 ring-1 mt-2 ring-red-600 rounded-lg backdrop-blur-sm`}>
                      <span className={`text-${agent.accentColor} text-xs font-bold`}>
                        {agent.stats.speed}
                      </span>
                    </div>
                  </motion.div>

                  {/* Header Section */}
                  <div className="flex items-start space-x-4 mb-5">
                    <motion.div 
                      className={`
                        relative w-16 h-16 rounded-2xl 
                        ring ring-green-600/70
                        flex items-center justify-center flex-shrink-0
                        shadow-lg shadow-${agent.primaryColor}/50
                      `}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6, type: "spring" }
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0 mt-2">
                      <motion.h3 
                        className="text-white text-lg font-semibold leading-tight mb-1 tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (index * 0.15) + 0.3 }}
                      >
                        {agent.title}
                      </motion.h3>
                      <motion.p 
                        className={`text-${agent.primaryColor} font-medium text-sm`}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {agent.subtitle}
                      </motion.p>
                    </div>
                  </div>
                  <p className="text-white/95 text-xs mb-2.5 leading-relaxed font-medium">
                    {agent.description}
                  </p>

                  {/* Feature Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className={`text-${agent.accentColor} font-semibold text-sm uppercase tracking-wider`}>
                        Smart Features
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {agent.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className={`
                            relative p-3 rounded-xl border border-green-500/30
                            bg-${feature.bg} backdrop-blur-sm
                            group cursor-pointer overflow-hidden
                          `}
                          initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          transition={{ 
                            delay: (index * 0.15) + (idx * 0.1),
                            type: "spring",
                            stiffness: 200 
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -4,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          onHoverStart={() => setHoveredFeature(`${agent.id}-${idx}`)}
                          onHoverEnd={() => setHoveredFeature(null)}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-${feature.color} text-xs font-semibold`}>
                              {feature.name}
                            </span>
                          </div>
                          
                          {/* Hover Effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/20 to-transparent opacity-0 group-hover:opacity-100`}
                            initial={false}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced CTA */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <Link href="/?tab=SPAI">
          <motion.div
            className="glass-button w-full py-5 flex items-center justify-center gap-4 shadow-xl shadow-emerald-400/40"
            whileTap={{ scale: 0.98 }}
            onTap={() => triggerHaptic('notification', 'success')}
          >
            <span className="text-lg font-black tracking-wide">
              Launch Research Analysis
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default QuantoraAgentCenter;
