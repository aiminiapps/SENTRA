'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useAccount, useBalance } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { 
  Wallet, 
  WalletCards, 
  Zap, 
  Brain, 
  Eye,
  ArrowRight,
  X,
  Settings,
  Sparkles,
  Shield,
  Target,
  Activity,
  TrendingUp,
  Cpu,
  Signal,
  Layers,
  Database,
  Orbit
} from 'lucide-react';

const SentraWalletSystem = ({ onComplete }) => {
  // Component States
  const [phase, setPhase] = useState('onboarding'); // 'onboarding' | 'floating'
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connectionPulse, setConnectionPulse] = useState(0);
  
  // Wallet Hooks
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({ address });
  const { open } = useWeb3Modal();
  const tonWallet = useTonWallet();
  
  const ballRef = useRef(null);
  const containerRef = useRef(null);
  
  // Computed Values
  const isWalletConnected = isConnected || tonWallet;
  const walletType = isConnected ? 'EVM' : tonWallet ? 'TON' : null;
  
  // Spring physics for smooth interactions
  const springConfig = { stiffness: 400, damping: 30 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);
  
  // Initialize floating position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setPosition({
        x: windowWidth - 90,
        y: windowHeight / 2 - 32
      });
    }
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (phase === 'onboarding') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [phase]);

  // Connection pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Handle wallet connection or skip
  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleSkip = () => {
    setPhase('floating');
    onComplete?.(false);
  };

  const handleWalletConnected = () => {
    setTimeout(() => {
      setPhase('floating');
      onComplete?.(true);
    }, 2000);
  };

  // Auto-transition when wallet connects
  useEffect(() => {
    if (isWalletConnected && phase === 'onboarding') {
      handleWalletConnected();
    }
  }, [isWalletConnected, phase]);

  // Auto-collapse expanded state
  useEffect(() => {
    let timer;
    if (isExpanded && !isDragging) {
      timer = setTimeout(() => setIsExpanded(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [isExpanded, isDragging]);

  // Drag constraints for floating ball
  const dragConstraints = {
    left: 10,
    right: typeof window !== 'undefined' ? window.innerWidth - 74 : 0,
    top: 10,
    bottom: typeof window !== 'undefined' ? window.innerHeight - 74 : 0
  };

  const getStatusColor = () => {
    if (balanceLoading) return '#FFD166';
    if (!isWalletConnected) return '#64748B';
    if (isConnected) return '#35C6FF';
    if (tonWallet) return '#00F5FF';
    return '#EF4444';
  };

  const formatBalance = () => {
    if (!balance) return '0.00';
    const value = parseFloat(balance.formatted);
    return value.toFixed(value > 1 ? 2 : 6);
  };

  const formatAddress = (addr) => {
    if (!addr) return 'Not Connected';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Parallax transform
  const parallaxX = useTransform(() => (mousePosition.x - window.innerWidth / 2) * 0.02);
  const parallaxY = useTransform(() => (mousePosition.y - window.innerHeight / 2) * 0.02);

  // ONBOARDING PHASE
  if (phase === 'onboarding') {
    return (
      <motion.div
        ref={containerRef}
        className="min-h-screen glass-content flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Enhanced Animated Background */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            x: parallaxX,
            y: parallaxY
          }}
        >
          {/* Floating orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full opacity-5"
              style={{
                background: `radial-gradient(circle, ${['#35C6FF', '#00F5FF', '#FFD166'][i % 3]} 0%, transparent 70%)`,
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 12)}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.15, 0.05],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>

        <div className="glass max-w-md w-full mx-4 relative z-10">
          <div className="glass-content p-10 text-center">
            {/* Enhanced Sentra Logo */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8"
              animate={{ 
                scale: [1, 1.03, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Core */}
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-0.5"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(53, 198, 255, 0.3)",
                    "0 0 40px rgba(53, 198, 255, 0.6)",
                    "0 0 20px rgba(53, 198, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Orbital dots */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-primary rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px',
                  }}
                  animate={{
                    x: [0, 50 * Math.cos(i * 120 * Math.PI / 180), 0],
                    y: [0, 50 * Math.sin(i * 120 * Math.PI / 180), 0],
                    scale: [0.5, 1, 0.5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Enhanced Title with Glitch Effect */}
            <motion.h1 
              className="terminal-header text-3xl mb-3 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="sentra-gradient-text relative z-10">
                SENTRA INTELLIGENCE
              </span>
              <motion.span
                className="absolute inset-0 sentra-gradient-text opacity-30"
                animate={{
                  x: [0, -2, 2, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
              >
                SENTRA INTELLIGENCE
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-secondary font-semibold mb-3 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              AI-Powered Crypto Sentiment Platform
            </motion.p>
            
            <motion.p 
              className="text-muted mb-10 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Monitor market emotions, detect pump & dumps, and trade with cutting-edge AI insights
            </motion.p>

            {/* Enhanced Feature highlights */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              {[
                { icon: Eye, label: 'Scanner', color: 'text-primary' },
                { icon: Zap, label: 'Alerts', color: 'text-warning' },
                { icon: Target, label: 'Insights', color: 'text-success' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-transaction text-center p-4 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                  >
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                  </motion.div>
                  <span className="text-sm font-medium">{item.label}</span>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0"
                    style={{ background: `linear-gradient(45deg, ${item.color.includes('primary') ? '#35C6FF' : item.color.includes('warning') ? '#FFD166' : '#10B981'}20, transparent)` }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Wallet Connection Highlight */}
            <motion.div
              className="glass-alert p-6 mb-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-warning/5 to-primary/5"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="w-8 h-8 text-warning flex-shrink-0" />
                </motion.div>
                <div className="text-left">
                  <p className="text-base font-bold text-primary mb-2">
                    Unlock Full Potential
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    Connect your wallet to access personalized AI agents and portfolio analysis
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <div className="space-y-5">
              {/* Connect Wallet Button */}
              <motion.button
                onClick={handleConnect}
                className="glass-button w-full flex items-center justify-center gap-4 relative overflow-hidden h-16 text-lg font-bold"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(53, 198, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isWalletConnected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {/* Animated background sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <motion.div
                  animate={isWalletConnected ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isWalletConnected ? 3 : 0 }}
                >
                  <Wallet className="w-6 h-6" />
                </motion.div>
                
                {isWalletConnected ? (
                  <span>✓ Wallet Connected</span>
                ) : (
                  <span>Connect Wallet</span>
                )}
                
                {!isWalletConnected && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.button>

              {/* TON Connect */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <TonConnectButton />
              </motion.div>

              {/* Skip Button */}
              <motion.button
                onClick={handleSkip}
                className="glass-button-secondary w-full h-14 text-base"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(53, 198, 255, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                Continue Without Wallet
              </motion.button>
            </div>

            {/* Enhanced Connection Success State */}
            <AnimatePresence>
              {isWalletConnected && (
                <motion.div
                  className="glass-transaction p-6 mt-8 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-success/10 to-primary/10"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <div className="flex items-center gap-3 text-success mb-3 relative z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 360, 0]
                      }}
                      transition={{ duration: 1, repeat: 3 }}
                    >
                      <Shield className="w-6 h-6" />
                    </motion.div>
                    <span className="font-bold text-lg">Connection Successful!</span>
                  </div>
                  <p className="text-sm text-muted relative z-10">
                    Initializing personalized AI analysis...
                  </p>
                  
                  {/* Progress indicator */}
                  <motion.div
                    className="w-full h-1 bg-surface rounded-full mt-3 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-success to-primary rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // ENHANCED FLOATING PHASE
  return (
    <>
      {/* Main Enhanced Draggable Ball */}
      <motion.div
        ref={ballRef}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.15}
        onDragStart={() => {
          setIsDragging(true);
          setIsExpanded(false);
        }}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          
          // Smart edge snapping
          const newX = position.x + info.offset.x;
          const windowWidth = window.innerWidth;
          
          if (newX < windowWidth / 3) {
            setPosition(prev => ({ ...prev, x: 20 }));
          } else if (newX > (windowWidth * 2) / 3) {
            setPosition(prev => ({ ...prev, x: windowWidth - 84 }));
          }
        }}
        onTap={() => !isDragging && setIsExpanded(!isExpanded)}
        className="fixed z-50 cursor-grab active:cursor-grabbing select-none"
        style={{
          x: position.x,
          y: position.y,
          width: 72,
          height: 72
        }}
        initial={{ scale: 0, opacity: 0, rotate: 180 }}
        animate={{ 
          scale: isDragging ? 1.15 : 1,
          opacity: 1,
          rotate: isDragging ? 15 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          scale: { duration: 0.2 },
          rotate: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.08,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Enhanced Ball Container */}
        <motion.div
          className="w-18 h-18 rounded-full relative overflow-hidden backdrop-blur-xl border-2"
          style={{ 
            background: `conic-gradient(from ${connectionPulse * 3.6}deg, ${getStatusColor()}40, ${getStatusColor()}80, ${getStatusColor()}40)`,
            borderColor: getStatusColor()
          }}
          animate={{
            boxShadow: [
              `0 0 25px ${getStatusColor()}50`,
              `0 0 45px ${getStatusColor()}80`,
              `0 0 25px ${getStatusColor()}50`
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-1 rounded-full border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner content area */}
          <motion.div 
            className="absolute inset-3 rounded-full bg-background/95 flex items-center justify-center"
            animate={{
              background: isDragging ? 
                `radial-gradient(circle, ${getStatusColor()}20, rgba(11, 11, 12, 0.95))` :
                'rgba(11, 11, 12, 0.95)'
            }}
          >
            <motion.div
              animate={{ 
                rotate: balanceLoading ? 360 : 0,
                scale: isExpanded ? [1, 1.2, 1] : [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: balanceLoading ? Infinity : 0, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              {isWalletConnected ? (
                <Wallet className="w-7 h-7" style={{ color: getStatusColor() }} />
              ) : (
                <WalletCards className="w-7 h-7" style={{ color: getStatusColor() }} />
              )}
            </motion.div>
          </motion.div>

          {/* Enhanced Status Indicators */}
          <motion.div
            className="absolute top-1 right-1 w-4 h-4 rounded-full border-2 border-background"
            style={{ backgroundColor: isWalletConnected ? '#00FF88' : '#FF4444' }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />

          {/* Activity pulse */}
          {isWalletConnected && (
            <motion.div
              className="absolute bottom-1 left-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${getStatusColor()}40` }}
              animate={{ 
                scale: [0.8, 1.3, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-2 h-2" style={{ color: getStatusColor() }} />
            </motion.div>
          )}

          {/* Data flow indicators */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/60"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-2px',
                marginTop: '-2px',
              }}
              animate={{
                x: [0, 20 * Math.cos(i * 120 * Math.PI / 180), 0],
                y: [0, 20 * Math.sin(i * 120 * Math.PI / 180), 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Expanded Info Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed z-40"
            style={{
              x: position.x > window.innerWidth / 2 ? position.x - 240 : position.x + 90,
              y: Math.max(10, position.y - 60)
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.x > window.innerWidth / 2 ? 40 : -40,
              y: 30
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.x > window.innerWidth / 2 ? 40 : -40,
              y: 30
            }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="glass w-64 border-2 shadow-2xl relative overflow-hidden" 
              style={{ borderColor: getStatusColor() }}
              animate={{
                boxShadow: [
                  `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${getStatusColor()}30`,
                  `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px ${getStatusColor()}50`,
                  `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${getStatusColor()}30`
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  background: [
                    `linear-gradient(45deg, ${getStatusColor()}30, transparent)`,
                    `linear-gradient(135deg, ${getStatusColor()}30, transparent)`,
                    `linear-gradient(225deg, ${getStatusColor()}30, transparent)`,
                    `linear-gradient(315deg, ${getStatusColor()}30, transparent)`,
                    `linear-gradient(45deg, ${getStatusColor()}30, transparent)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="glass-content p-6 relative z-10">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-4 h-4 rounded-full relative" 
                      style={{ backgroundColor: isWalletConnected ? '#00FF88' : '#FF4444' }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          `0 0 5px ${isWalletConnected ? '#00FF88' : '#FF4444'}`,
                          `0 0 15px ${isWalletConnected ? '#00FF88' : '#FF4444'}`,
                          `0 0 5px ${isWalletConnected ? '#00FF88' : '#FF4444'}`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: isWalletConnected ? '#00FF88' : '#FF4444' }}
                        animate={{ 
                          scale: [1, 2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    <span className="text-sm font-bold text-primary">SENTRA STATUS</span>
                  </div>
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="w-7 h-7 rounded-full bg-surface flex items-center justify-center hover:bg-elevated transition-colors"
                    whileHover={{ 
                      scale: 1.15,
                      backgroundColor: "rgba(239, 68, 68, 0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-muted" />
                  </motion.button>
                </div>

                {/* Enhanced Wallet Info */}
                {isWalletConnected ? (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <motion.div 
                      className="flex items-center justify-between py-3 border-b border-border-secondary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="text-sm text-muted">Connection</span>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-2 h-2 bg-success rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-sm font-semibold text-success">
                          {walletType} Active
                        </span>
                      </div>
                    </motion.div>
                    
                    {address && (
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-sm text-muted">Address</span>
                        <motion.span 
                          className="text-sm font-mono text-secondary px-2 py-1 bg-surface rounded"
                          whileHover={{ scale: 1.05 }}
                        >
                          {formatAddress(address)}
                        </motion.span>
                      </motion.div>
                    )}
                    
                    {balance && (
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-sm text-muted">Balance</span>
                        <span className="text-sm font-semibold text-primary">
                          {formatBalance()} {balance.symbol}
                        </span>
                      </motion.div>
                    )}

                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm text-muted">AI Status</span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-sm font-semibold text-primary">Online</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <WalletCards className="w-12 h-12 text-muted mx-auto mb-4" />
                    </motion.div>
                    <p className="text-sm text-muted mb-2">No Wallet Connected</p>
                    <p className="text-sm text-warning font-semibold">
                      Basic Features Only
                    </p>
                  </motion.div>
                )}

                {/* Enhanced Quick Actions */}
                <motion.div 
                  className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-border-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { icon: Eye, label: 'Scan', color: 'text-primary', hoverColor: 'border-primary/50' },
                    { icon: Zap, label: 'Alerts', color: 'text-warning', hoverColor: 'border-warning/50' },
                    { icon: TrendingUp, label: 'Trends', color: 'text-success', hoverColor: 'border-success/50' }
                  ].map((action, i) => (
                    <motion.button 
                      key={i}
                      className="glass-transaction p-3 text-center transition-all duration-200"
                      whileHover={{ 
                        scale: 1.08,
                        y: -2,
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <action.icon className={`w-5 h-5 mx-auto mb-2 ${action.color}`} />
                      </motion.div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SentraWalletSystem;
