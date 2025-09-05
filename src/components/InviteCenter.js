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
  HiOutlineLightningBolt,
  HiOutlineChartBar
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";
import { AiOutlineTrophy } from "react-icons/ai";
import Image from 'next/image';

function SentraInviteCenter() {
  const [inviteCode] = useState('SENTRA2025');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isWebApp, setIsWebApp] = useState(false);
  const [totalInvites, setTotalInvites] = useState(0);
  const [earnedCredits, setEarnedCredits] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
      setTotalInvites(Math.floor(Math.random() * 15) + 8);
      setEarnedCredits(Math.floor(Math.random() * 8000) + 2500);
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

  const generateInviteLink = () => 'https://t.me/SentraAI_Bot';

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
      triggerHaptic('notification', 'success');
    } catch (err) {
      triggerHaptic('notification', 'error');
    }
  };

  const handleInviteShare = () => {
    const inviteLink = generateInviteLink();
    const shareText = `Join SENTRA AI - Next-Gen Crypto Intelligence Platform!

Access cutting-edge AI research agents, unlock premium sentiment analysis, and earn rewards through intelligent trading insights.

My invite code: ${inviteCode}

Join now: ${inviteLink}`;

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
      );
    } else if (navigator.share) {
      navigator.share({
        title: 'Join SENTRA AI Platform',
        text: shareText,
        url: inviteLink
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Invite message copied to clipboard!');
    }
    triggerHaptic('impact', 'medium');
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <motion.div 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-pink-500/5" />
        <div className="relative text-center">
          {/* Animated Header Icon */}
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 10 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(56, 189, 248, 0.4)',
                '0 0 30px rgba(147, 51, 234, 0.5)',
                '0 0 40px rgba(236, 72, 153, 0.4)',
                '0 0 20px rgba(56, 189, 248, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image src='/agent/agentlogo.png' alt='logo' width={100} height={100}/>
          </motion.div>

          <h1 className="text-xl font-bold text-cyan-400 mb-2">
            SENTRA INVITE CENTER
          </h1>
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
            Build Your Intelligence Network
          </p>
          <p className="text-white/90 text-xs text-balance max-w-sm mx-auto">
            Invite fellow crypto analysts and earn rewards together on the world's most advanced sentiment intelligence platform
          </p>
        </div>
      </motion.div>

      {/* Invite Code Section */}
      <motion.div 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/10" />
        <div className="relative">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
              <HiOutlineGift className="w-6 h-6" />
              Your Exclusive Invite Code
            </h3>
          </div>
          
          {/* Interactive Invite Code */}
          <motion.div 
            className="relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer group"
            onClick={handleCopyCode}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: '24px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/20 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative text-center">
              <div className="font-mono text-4xl font-black text-yellow-400 tracking-widest mb-2">
                {inviteCode}
              </div>
              <div className="text-sm text-gray-400 font-semibold">
                Tap to copy • Share with friends
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Copy Success Feedback */}
          <AnimatePresence>
            {copySuccess && (
              <motion.div
                className="text-center mt-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  <span className="font-bold">Code copied successfully!</span>
                  <HiOutlineHeart className="w-4 h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div 
        className="glass mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-purple-400 flex items-center justify-center gap-2">
              <HiOutlineLightningBolt className="w-6 h-6" />
              How Invites Work
            </h3>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Share Your Link',
                description: 'Send your invite code to crypto enthusiasts and analysts',
                icon: HiOutlineShare,
                color: 'text-cyan-400',
                bgColor: 'bg-cyan-400/10'
              },
              {
                step: '2',
                title: 'Friends Join Network',
                description: 'They register using your code and start using SENTRA AI',
                icon: HiOutlineUsers,
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10'
              },
              {
                step: '3',
                title: 'Earn Rewards',
                description: 'Get credits for each successful invite and unlock premium features',
                icon: AiOutlineTrophy,
                color: 'text-green-400',
                bgColor: 'bg-green-400/10'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex glass-dark items-center gap-4 bg-gray-900 rounded-xl"
                style={{ padding: '16px' }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold ${item.color}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Rewards Tier */}
      <motion.div 
        className="glass mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-orange-400 flex items-center justify-center gap-2">
              <HiOutlineStar className="w-6 h-6" />
              Reward Tiers
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center glass-light bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
              <div className="text-2xl font-black text-cyan-400 mb-2">100</div>
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Credits</div>
              <div className="text-cyan-400 text-xs font-bold">Per Invite</div>
            </div>
            
            <div className="text-center glass-light bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
              <div className="text-2xl font-black text-purple-400 mb-2">1K</div>
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Bonus</div>
              <div className="text-purple-400 text-xs font-bold">At 10 Invites</div>
            </div>
            
            <div className="text-center glass-light bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
              <div className="text-2xl font-black text-green-400 mb-2">VIP</div>
              <div className="text-xs text-gray-400 font-bold uppercase mb-1">Status</div>
              <div className="text-green-400 text-xs font-bold">Premium Access</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Primary Invite Button */}
        <motion.button
          onClick={handleInviteShare}
          className="w-full glass-button bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{ height: '60px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <HiOutlineShare className="w-6 h-6 relative z-10" />
          <span className="text-lg font-bold relative z-10">Share SENTRA AI</span>
        </motion.button>

        {/* Secondary Copy Button */}
        <motion.button
          onClick={handleCopyCode}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ height: '50px' }}
        >
          {copySuccess ? (
            <>
              <HiOutlineCheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Code Copied!</span>
            </>
          ) : (
            <>
              <HiOutlineClipboard className="w-5 h-5" />
              <span>Copy Invite Code</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <HiOutlineStar className="w-4 h-4 text-yellow-400" />
          <span>Powered by SENTRA AI Intelligence Platform</span>
        </div>
      </motion.div>

      {/* Bottom Safe Area */}
      <div style={{ height: '150px' }}></div>
    </div>
  );
}

export default SentraInviteCenter;
