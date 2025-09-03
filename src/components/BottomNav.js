'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  HiOutlineUsers,
} from 'react-icons/hi';
import { GoHome } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { LuWorkflow } from "react-icons/lu";

export default function QuantoraBottomNav({ activeTab, setActiveTab }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isWebApp, setIsWebApp] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
  }, []);

  const triggerHaptic = (type = 'impact', style = 'light') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      if (type === 'impact') {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      }
    }
  };

  const navItems = [
    { 
      id: 'home', 
      icon: GoHome, 
      label: 'Agents',
      color: 'lime-400',
      gradient: 'from-lime-400 to-green-500'
    },
    { 
      id: 'dataCenter', 
      icon: LuWorkflow, 
      label: 'Market Data',
      color: 'cyan-400',
      gradient: 'from-cyan-400 to-blue-500'
    },
    { 
      id: 'SPAI', 
      label: 'Research Hub',
      color: 'emerald-400',
      gradient: 'from-emerald-400 to-teal-500',
      isSpecial: true,
      // Using Image component instead of icon
      image: '/agent/agentlogo.png'
    },
    { 
        id: 'invite', 
        icon: HiOutlineUsers, 
        label: 'Network',
        color: 'pink-400',
        gradient: 'from-pink-400 to-rose-500'
    },
    { 
      id: 'task', 
      icon: GoTasklist, 
      label: 'Missions',
      color: 'violet-400',
      gradient: 'from-violet-400 to-purple-500'
    },
  ];

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
    >
      <div className="glass glass-p px-3 py-2 rounded-full shadow-2xl shadow-black/20">
        <div className="">
          <nav className={cn(
            "flex justify-center items-center transition-all duration-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}>
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <Link
                    href={`/?tab=${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      triggerHaptic('impact', 'light');
                    }}
                    className="relative flex flex-col items-center"
                  >
                    <motion.div
                      className={cn(
                        "relative flex items-center justify-center transition-all duration-300 rounded-2xl",
                        item.isSpecial 
                          ? "w-16 h-16 mx-1"
                          : "w-12 h-12 mx-2",
                        isActive && !item.isSpecial
                          ? `bg-${item.color}/20 shadow-lg shadow-${item.color}/30`
                          : "hover:bg-white/5"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        scale: isActive ? (item.isSpecial ? 1.15 : 1.05) : 1, 
                        rotate: isActive && item.isSpecial ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ 
                        scale: { duration: 0.3 },
                        rotate: { duration: 2, repeat: isActive ? Infinity : 0 }
                      }}
                    >
                      {item.isSpecial ? (
                        // Special SPAI tab with image
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl overflow-hidden",
                          isActive 
                            ? `bg-gradient-to-r ${item.gradient} shadow-${item.color}/50` 
                            : "bg-gradient-to-r from-gray-600 to-gray-700"
                        )}>
                          <Image 
                            src={item.image} 
                            alt={item.label} 
                            width={50} 
                            height={50}
                            className="rounded-xl"
                          />
                        </div>
                      ) : (
                        <IconComponent 
                          className={cn(
                            "w-6 h-6 transition-colors duration-300",
                            isActive 
                              ? `text-${item.color}` 
                              : "text-white/90"
                          )} 
                        />
                      )}

                      {/* Active Indicator */}
                      <AnimatePresence>
                        {isActive && !item.isSpecial && (
                          <motion.div
                            className={`absolute hidden -bottom-2 w-1 h-1 bg-${item.color} rounded-full shadow-lg shadow-${item.color}/50`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Label - Hidden but accessible */}
                    <span className="sr-only">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
