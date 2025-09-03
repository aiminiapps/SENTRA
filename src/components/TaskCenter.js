'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/storage';
import { 
  HiOutlineGift,
  HiOutlineShare,
  HiOutlineUsers,
  HiOutlineHeart,
  HiSparkles,
  HiOutlineTrendingUp,
  HiOutlineClipboard,
  HiOutlineClock,
  HiOutlineStar,
  HiPlay
} from 'react-icons/hi';
import { BsTwitterX } from "react-icons/bs";
import { LuBrainCircuit } from "react-icons/lu";
const QuantoraTaskCenter = () => {
  const {
    tasks,
    purchasePass,
    completeTask,
    setTwitterFollowCompleted,
  } = useStore();
  const [error, setError] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
    // Count completed tasks
    const completed = Object.values(tasks).filter(task => task.completed).length;
    setCompletedToday(completed);
  }, [tasks]);

  const triggerHaptic = (type = 'impact', style = 'medium') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      } else if (type === 'notification') {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred(style);
      }
    }
  };

  const handlePurchasePass = (count) => {
    const success = purchasePass(count);
    if (!success) {
      setError('Insufficient Research Credits');
      setTimeout(() => setError(null), 3000);
      triggerHaptic('notification', 'error');
    } else {
      triggerHaptic('notification', 'success');
    }
  };

  const handleTask = (taskName, points, action) => {
    if (!tasks[taskName].completed) {
      completeTask(taskName, points);
      triggerHaptic('impact', 'medium');
      if (action) action();
    }
  };

  const QuantoraIcon = ({ className = "w-12 h-12" }) => (
    <div className={`${className} bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg`}>
      <LuBrainCircuit className="w-6 h-6 text-white" />
    </div>
  );

  const dailyTasks = [
    {
      id: 'dailyReward',
      title: 'Daily Research Bonus',
      description: 'Claim your daily research credits',
      points: 100,
      icon: HiOutlineGift,
      color: 'lime-400',
      gradient: 'from-lime-400 to-green-500',
      action: null
    },
    {
      id: 'rtPost',
      title: 'Share Quantora Research',
      description: 'Retweet our latest analysis',
      points: 1000,
      icon: HiOutlineShare,
      color: 'cyan-400',
      gradient: 'from-cyan-400 to-blue-500',
      action: () => window.open('https://x.com/RevX_officialX/status/1934413183164600476', '_blank')
    }
  ];

  const optionalTasks = [
    {
      id: 'followX',
      title: 'Follow X',
      description: 'Stay updated with research insights',
      points: 1000,
      icon: BsTwitterX,
      color: 'violet-400',
      gradient: 'from-black to-black',
      action: () => {
        setTwitterFollowCompleted(true);
        window.open('https://x.com/RevX_officialX', '_blank');
      }
    },
    {
      id: 'inviteFive',
      title: 'Invite 5 Researchers',
      description: 'Share Quantora with fellow analysts',
      points: 5000,
      icon: HiOutlineUsers,
      color: 'emerald-600',
      gradient: 'from-emerald-600 to-green-400',
      action: null
    }
  ];

  return (
    <div className="pb-20">
      {/* Enhanced Header */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold tektur text-white leading-none mb-1">
                  Research Missions
                </h1>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-black text-lime-400">
                {completedToday}/4
              </div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                Today
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Daily Progress</span>
              <span className="text-lime-400 font-bold">{Math.round((completedToday/4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-sm h-4">
              <motion.div 
                className="bg-lime-400 h-4 rounded-sm"
                initial={{ width: 0 }}
                animate={{ width: `${(completedToday/4) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed">
            Complete missions to earn research credits and unlock premium AI research agents
          </p>
        </div>
      </motion.div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass glass-p mb-6"
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400">⚠️</span>
                </div>
                <p className="text-red-400 font-semibold">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit Purchase Section */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-3">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h3 className="text-lg font-black tektur text-white">
                Research Credits Store
              </h3>
              <p className="text-cyan-400 text-sm font-semibold">
                Unlock premium AI agents instantly
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => handlePurchasePass(1)}
              className="glass-button flex-1 !py-4 flex flex-col items-center gap-2"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onTap={() => triggerHaptic('impact', 'light')}
            >
              <span className="text-lg font-black">1 Credit</span>
              <span className="text-xs opacity-80">500 Points</span>
            </motion.button>
            
            <motion.button
              onClick={() => handlePurchasePass(5)}
              className="glass-button flex-1 !py-4 flex flex-col items-center gap-2 relative"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onTap={() => triggerHaptic('impact', 'light')}
            >
              <span className="text-lg font-black">5 Credits</span>
              <span className="text-xs opacity-80">2K Points</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Daily Missions */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Daily Missions</h3>
            <p className="text-lime-400 text-sm font-semibold">Reset every 24 hours</p>
          </div>
        </div>

        <div className="space-y-3">
          {dailyTasks.map((task, index) => {
            const IconComponent = task.icon;
            const isCompleted = tasks[task.id].completed;
            
            return (
              <motion.div
                key={task.id}
                className="glass glass-p group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                whileHover={{ x: 4 }}
              >
                <div className={`p-3`}>
                  
                  {/* Completion Glow */}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl" />
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div 
                        className={`
                          w-12 h-12 bg-gradient-to-r ${task.gradient} rounded-2xl 
                          flex items-center justify-center shadow-lg
                          ${isCompleted ? 'ring-2 ring-green-400' : ''}
                        `}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg leading-tight mb-1">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <HiSparkles className={`w-4 h-4 text-${task.color}`} />
                          <span className={`text-${task.color} font-bold text-sm`}>
                            +{task.points.toLocaleString()} Points
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Task Toggle */}
                    <div className="flex flex-col items-end gap-2">
                      <motion.div 
                        className={`
                          w-14 h-7 rounded-full p-1 transition-all duration-300 cursor-pointer
                          ${isCompleted ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-white transition-all duration-300"
                          animate={{ x: isCompleted ? 28 : 0 }}
                        />
                      </motion.div>
                      
                      {isCompleted && (
                        <motion.span 
                          className="text-green-400 text-xs font-bold uppercase tracking-wider"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Completed
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {!isCompleted && (
                    <motion.button
                      onClick={() => handleTask(task.id, task.points, task.action)}
                      className="w-full mt-4 glass-button !py-3 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiPlay className="w-4 h-4" />
                      <span className="font-bold">
                        {task.action ? 'Complete & Claim' : 'Claim Reward'}
                      </span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Optional Missions */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Bonus Missions</h3>
            <p className="text-violet-400 text-sm font-semibold">One-time rewards</p>
          </div>
        </div>

        <div className="space-y-3">
          {optionalTasks.map((task, index) => {
            const IconComponent = task.icon;
            const isCompleted = tasks[task.id].completed;
            
            return (
              <motion.div
                key={task.id}
                className="glass glass-p group cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                whileHover={{ x: 4 }}
              >
                <div className={`p-3`}>
                  
                  {/* Completion Glow */}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl" />
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div 
                        className={`
                          w-12 h-12 bg-gradient-to-r ${task.gradient} rounded-2xl 
                          flex items-center justify-center shadow-lg
                          ${isCompleted ? 'ring-2 ring-green-400' : ''}
                        `}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-black text-lg leading-tight mb-1">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <HiSparkles className={`w-4 h-4 text-${task.color}`} />
                          <span className={`text-${task.color} font-bold text-sm`}>
                            +{task.points.toLocaleString()} Points
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Task Toggle */}
                    <div className="flex flex-col items-end gap-2">
                      <motion.div 
                        className={`
                          w-14 h-7 rounded-full p-1 transition-all duration-300 cursor-pointer
                          ${isCompleted ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-white transition-all duration-300"
                          animate={{ x: isCompleted ? 28 : 0 }}
                        />
                      </motion.div>
                      
                      {isCompleted && (
                        <motion.span 
                          className="text-green-400 text-xs font-bold uppercase tracking-wider"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Completed
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {!isCompleted && (
                    <motion.button
                      onClick={() => task.action ? handleTask(task.id, task.points, task.action) : null}
                      disabled={!task.action}
                      className={`
                        w-full mt-4 glass-button !py-3 flex items-center justify-center gap-2
                        ${!task.action ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      whileHover={task.action ? { scale: 1.02 } : {}}
                      whileTap={task.action ? { scale: 0.98 } : {}}
                    >
                      <HiPlay className="w-4 h-4" />
                      <span className="font-bold">
                        {task.action ? 'Complete & Claim' : 'Coming Soon'}
                      </span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Summary */}
      <motion.div 
        className="glass glass-p"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="p-3">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HiOutlineClipboard className="w-5 h-5 text-lime-400" />
            <h4 className="text-lg font-black tektur text-white">
              Mission Summary
            </h4>
          </div>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
            Complete all missions to maximize your research credits and unlock premium AI agents for institutional-grade analysis
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QuantoraTaskCenter;
