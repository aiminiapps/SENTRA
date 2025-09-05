'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  HiPlay,
  HiOutlineCheckCircle,
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineFire
} from 'react-icons/hi';
import { BsTwitterX } from "react-icons/bs";
import { LuBrainCircuit } from "react-icons/lu";
import { AiOutlineTrophy } from "react-icons/ai";

const SentraTaskCenter = () => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [error, setError] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
      
      // Load saved data
      const saved = JSON.parse(localStorage.getItem('sentraTasksData') || '{}');
      setCompletedTasks(saved.completed || {});
      setTotalPoints(saved.points || 0);
      setStreak(saved.streak || 1);
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

  const saveData = (completed, points, streakCount) => {
    const data = { completed, points, streak: streakCount };
    localStorage.setItem('sentraTasksData', JSON.stringify(data));
  };

  const handleCompleteTask = (taskId, points, action) => {
    if (completedTasks[taskId]) return;

    const newCompleted = { ...completedTasks, [taskId]: true };
    const newPoints = totalPoints + points;
    
    setCompletedTasks(newCompleted);
    setTotalPoints(newPoints);
    
    if (action) action();
    
    saveData(newCompleted, newPoints, streak);
    triggerHaptic('notification', 'success');
  };

  const dailyTasks = [
    {
      id: 'dailyLogin',
      title: 'Daily Check-in',
      description: 'Login daily to maintain your research streak',
      points: 50,
      icon: HiOutlineClock,
      color: 'text-blue-400',
      gradient: 'from-blue-500 to-cyan-500',
      action: null
    },
    {
      id: 'shareAnalysis',
      title: 'Share SENTRA Intelligence',
      description: 'Share our latest AI sentiment analysis',
      points: 200,
      icon: HiOutlineShare,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      action: () => window.open('https://twitter.com/share?text=Just discovered SENTRA AI - the most advanced crypto sentiment intelligence platform! 🤖📊 #SentraAI #CryptoAI&url=https://sentra.ai', '_blank')
    }
  ];

  const bonusTasks = [
    {
      id: 'followTwitter',
      title: 'Follow SENTRA AI',
      description: 'Stay updated with latest AI research insights',
      points: 300,
      icon: BsTwitterX,
      color: 'text-sky-400',
      gradient: 'from-gray-900 to-gray-900',
      action: () => window.open('https://x.com/SentraAI', '_blank')
    },
    {
      id: 'inviteNetwork',
      title: 'Build Research Network',
      description: 'Invite 5 analysts to join SENTRA platform',
      points: 1000,
      icon: HiOutlineUsers,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-green-500',
      action: null
    },
    {
      id: 'useAIAgent',
      title: 'Try Hype Cycle Agent',
      description: 'Use our advanced hype detection system',
      points: 500,
      icon: LuBrainCircuit,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-500',
      action: () => {
        // Navigate to AI agent
        window.location.href = '/hype-agent';
      }
    }
  ];

  const totalTasks = dailyTasks.length + bonusTasks.length;
  const completedCount = Object.keys(completedTasks).length;
  const progressPercent = (completedCount / totalTasks) * 100;

  return (
    <div className="min-h-screen text-white">
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="glass bg-red-900/20 border-2 border-red-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center gap-3">
              <HiOutlineCheckCircle className="w-6 h-6 text-red-400" />
              <span className="text-red-400 font-semibold">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Tasks */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <HiOutlineClock className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="text-xl font-bold text-blue-400">Daily Missions</h3>
            <p className="text-gray-400 text-sm">Reset every 24 hours</p>
          </div>
        </div>

        <div className="space-y-4">
          {dailyTasks.map((task, index) => {
            const IconComponent = task.icon;
            const isCompleted = completedTasks[task.id];
            
            return (
              <motion.div
                key={task.id}
                className="glass group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCompleteTask(task.id, task.points, task.action)}
              >
                {/* Completion Overlay */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" />
                )}
                
                <div className="relative flex items-center gap-4">
                  {/* Task Icon */}
                  <motion.div 
                    className={`size-[46px] bg-gradient-to-r ${task.gradient} rounded-xl flex items-center justify-center shadow-lg ${isCompleted ? 'ring-2 ring-green-400' : ''}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  {/* Task Info */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-[16px] mb-1">
                      {task.title}
                    </h4>
                    <p className="text-gray-400 hidden text-xs mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <HiSparkles className={`w-4 h-4 ${task.color}`} />
                      <span className={`${task.color} font-bold text-sm`}>
                        +{task.points} points
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center">
                    {isCompleted ? (
                      <motion.div
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <HiPlay className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bonus Tasks */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AiOutlineTrophy className="w-6 h-6 text-yellow-400" />
          <div>
            <h3 className="text-xl font-bold text-yellow-400">Bonus Missions</h3>
            <p className="text-gray-400 text-sm">Extra rewards & one-time tasks</p>
          </div>
        </div>

        <div className="space-y-4">
          {bonusTasks.map((task, index) => {
            const IconComponent = task.icon;
            const isCompleted = completedTasks[task.id];
            
            return (
              <motion.div
                key={task.id}
                className="glass group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCompleteTask(task.id, task.points, task.action)}
              >
                {/* Completion Overlay */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" />
                )}
                
                <div className="relative flex items-center gap-4">
                  {/* Task Icon */}
                  <motion.div 
                    className={`size-[46px] bg-gradient-to-r ${task.gradient} rounded-xl flex items-center justify-center shadow-lg ${isCompleted ? 'ring-2 ring-green-400' : ''}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  {/* Task Info */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-[16px] mb-1">
                      {task.title}
                    </h4>
                    <p className="text-gray-400 text-sm hidden mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <HiSparkles className={`w-4 h-4 ${task.color}`} />
                      <span className={`${task.color} font-bold text-sm`}>
                        +{task.points} points
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center">
                    {isCompleted ? (
                      <motion.div
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <HiOutlineCheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <HiPlay className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>


      {/* Footer */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <HiOutlineStar className="w-4 h-4 text-yellow-400" />
          <span>SENTRA AI Intelligence Platform</span>
        </div>
      </motion.div>

      {/* Bottom Safe Area */}
      <div style={{ height: '150px' }}></div>
    </div>
  );
};

export default SentraTaskCenter;
