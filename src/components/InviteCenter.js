'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUsers, 
  HiOutlineClipboard, 
  HiOutlineShare, 
  HiOutlineCheckCircle,
  HiSparkles,
  HiOutlineGift,
  HiOutlineHeart,
  HiOutlineStar,
  HiPlay,
  HiOutlineChartBar
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";
import { HiOutlineTrophy } from "react-icons/hi2";

function QuantoraInviteCenter() {
  const [inviteCode] = useState('QTRA2025');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isWebApp, setIsWebApp] = useState(false);
  const [totalInvites, setTotalInvites] = useState(0);
  const [earnedCredits, setEarnedCredits] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
      // Initialize Telegram WebApp
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
      // Simulate user data
      setTotalInvites(Math.floor(Math.random() * 12) + 3);
      setEarnedCredits(Math.floor(Math.random() * 5000) + 1500);
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

  const generateInviteLink = () => {
    return 'https://t.me/Quantora_Research_Bot';
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      triggerHaptic('notification', 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      triggerHaptic('notification', 'error');
    }
  };

  const handleInviteResearchers = () => {
    const inviteLink = generateInviteLink();
    const shareText = `🤖 Join me on Quantora AI Research Platform!

🔬 Get institutional-grade crypto analysis
📊 Access advanced AI research agents  
💎 Earn research credits through missions
🎯 Unlock premium fundamental insights

Use my invite code: ${inviteCode}

Join now: ${inviteLink}`;

    if (window.Telegram?.WebApp) {
      // Use Telegram's native sharing
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
      );
    } else {
      // Fallback for web
      if (navigator.share) {
        navigator.share({
          title: 'Join Quantora Research Platform',
          text: shareText,
          url: inviteLink
        });
      } else {
        // Copy to clipboard as fallback
        navigator.clipboard.writeText(shareText);
        alert('Invite message copied to clipboard!');
      }
    }
    triggerHaptic('impact', 'medium');
  };

  const inviteSteps = [
    {
      id: 1,
      title: 'Share Your Research Link',
      description: 'Invite fellow analysts and investors to join Quantora\'s AI-powered research platform.',
      icon: HiOutlineShare,
      color: 'lime-400',
      gradient: 'from-lime-400 to-green-500'
    },
    {
      id: 2,
      title: 'Friends Join Research Network',
      description: 'They start using AI agents, conducting fundamental analysis, and earning research credits.',
      icon: HiOutlineUsers,
      color: 'cyan-400',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      id: 3,
      title: '1 Researcher = 1 Research Credit',
      description: 'Each successful referral grants you premium research credits to unlock advanced AI analysis.',
      icon: HiOutlineTrophy,
      color: 'violet-400',
      gradient: 'from-violet-400 to-pink-500'
    }
  ];

  return (
    <div className="pb-20">
      {/* Enhanced Header */}
      <motion.div 
        className="glass hidden glass-p mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-black tektur text-white leading-none mb-1">
                  Research Network
                </h1>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-black text-lime-400">
                {totalInvites}
              </div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                Invited
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm mb-4">
            <div className="text-center">
              <div className="text-lime-400 font-black text-lg">{totalInvites}</div>
              <div className="text-white/70 text-xs font-semibold uppercase">Total Invites</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-black text-lg">{earnedCredits.toLocaleString()}</div>
              <div className="text-white/70 text-xs font-semibold uppercase">Credits Earned</div>
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed">
            Share Quantora with fellow analysts and earn research credits together
          </p>
        </div>
      </motion.div>

      {/* Character Illustration */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-3">
          <motion.div
            className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-lime-400/20 to-cyan-400/20 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-full flex items-center justify-center">
              <HiOutlineUsers className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h3 className="text-lg font-black tektur text-white mb-2">
            Build Your Research Network
          </h3>
          <p className="text-white/80 text-sm">
            Connect with fellow crypto researchers and analysts
          </p>
        </div>
      </motion.div>

      {/* How It Works Steps */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold text-white">How It Works</h3>
        </div>

        <div className="space-y-4">
          {inviteSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                className="glass glass-p group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                whileHover={{ x: 4 }}
              >
                <div className={`p-3`}>
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`
                        w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-2xl 
                        flex items-center justify-center shadow-lg flex-shrink-0
                      `}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-black text-${step.color} text-lg`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Invite Code Section */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="p-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HiOutlineGift className="w-5 h-5 text-violet-400" />
              <h3 className="text-lg font-black tektur text-white">
                Your Research Invite Code
              </h3>
            </div>
            
            <motion.div 
              className="relative p-4 bg-gray-900/50 rounded-2xl border-2 border-dashed border-lime-400/50 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="font-mono text-2xl text-lime-400 tracking-wider font-black">
                {inviteCode}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-cyan-400/10 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <p className="text-white/80 text-sm">
              Share this code with fellow researchers to earn credits
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={handleInviteResearchers}
          className="glass-button w-full !py-5 flex items-center justify-center gap-3 shadow-xl shadow-lime-400/30"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg font-black tektur">Invite Researchers</span>
        </motion.button>

        <motion.button
          onClick={handleCopyCode}
          className={`
            glass-button w-full !py-4 flex items-center justify-center gap-3 transition-all
            ${copySuccess ? 'shadow-green-500/30' : 'shadow-violet-400/30'}
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {copySuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <HiOutlineCheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-bold text-green-400">Code Copied!</span>
                <HiOutlineHeart className="w-4 h-4 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <HiOutlineClipboard className="w-5 h-5" />
                <span className="font-bold">Copy Invite Code</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Rewards Showcase */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="p-3">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HiOutlineTrophy className="w-5 h-5 text-lime-400" />
              <h4 className="text-lg font-black tektur text-white">
                Referral Rewards
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-lime-400/10 border border-lime-400/20">
              <div className="text-lime-400 font-black text-lg mb-1">1</div>
              <div className="text-white/70 text-xs font-semibold uppercase">Credit</div>
              <div className="text-lime-400 text-xs font-bold mt-1">Per Invite</div>
            </div>
            
            <div className="text-center p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
              <div className="text-cyan-400 font-black text-lg mb-1">5</div>
              <div className="text-white/70 text-xs font-semibold uppercase">Bonus</div>
              <div className="text-cyan-400 text-xs font-bold mt-1">At 10 Invites</div>
            </div>
            
            <div className="text-center p-3 rounded-xl bg-violet-400/10 border border-violet-400/20">
              <div className="text-violet-400 font-black text-lg mb-1">∞</div>
              <div className="text-white/70 text-xs font-semibold uppercase">Premium</div>
              <div className="text-violet-400 text-xs font-bold mt-1">VIP Status</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <HiOutlineStar className="w-4 h-4 text-lime-400" />
          <p className="text-white/80 text-sm font-semibold">
            Share Quantora Research Platform
          </p>
          <HiOutlineStar className="w-4 h-4 text-lime-400" />
        </div>
      </motion.div>
      <div className='h-14'/>
    </div>
  );
}

export default QuantoraInviteCenter;
