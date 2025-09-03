'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineChartBar,
  HiOutlineDocumentSearch,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";
import Image from 'next/image';

const QuantoraLoader = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [progress, setProgress] = useState(0);
  const [currentAgent, setCurrentAgent] = useState(0);

  const loadingSteps = [
    { text: 'Connecting to Intelligence Network', agent: 'VestGuard AI' },
    { text: 'Loading AI Research Agents', agent: 'TokenMaster AI' }
  ];

  const agentIcons = [
    LuBrainCircuit,
    HiOutlineChartBar,
    HiOutlineDocumentSearch,
    HiOutlineUsers,
    HiOutlineGlobeAlt,
    HiOutlineShieldCheck
  ];

  // Loading progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Loading text progression
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentAgent((prev) => {
        const next = (prev + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[next].text);
        return next;
      });
    }, 400);

    return () => clearInterval(textInterval);
  }, []);

  const currentAgentData = loadingSteps[currentAgent];
  const CurrentIcon = agentIcons[currentAgent];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute w-32 h-32 bg-lime-400/20 rounded-full blur-3xl -top-8 -left-8"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl -bottom-8 -right-8"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute w-20 h-20 bg-violet-400/20 rounded-full blur-3xl top-1/4 right-1/4"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Quantum Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 255, 50, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 255, 50, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-6">
        
        {/* Main Logo with Canvas Shine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Image src='/logo.png' alt="Logo" width={300} height={150}/>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="w-80 max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-sm font-semibold">Loading Research Platform</span>
            <span className="text-lime-400 text-sm font-bold">{Math.round(progress)}%</span>
          </div>
          
          <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 rounded-full" />
            
            {/* Progress fill */}
            <motion.div 
              className="h-full bg-lime-400 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
        {/* Subtitle */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-white/70 text-balance text-sm font-medium leading-relaxed max-w-sm">
            Preparing institutional-grade crypto research and analysis platform
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default QuantoraLoader;
