'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  TrendingUp
} from 'lucide-react';

const SentraWalletSystem = ({ onComplete }) => {
  // Component States
  const [phase, setPhase] = useState('onboarding'); // 'onboarding' | 'floating'
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showingDetails, setShowingDetails] = useState(false);
  
  // Wallet Hooks
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({ address });
  const { open } = useWeb3Modal();
  const tonWallet = useTonWallet();
  
  const ballRef = useRef(null);
  
  // Computed Values
  const isWalletConnected = isConnected || tonWallet;
  const walletType = isConnected ? 'EVM' : tonWallet ? 'TON' : null;
  
  // Initialize floating position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      setPosition({
        x: windowWidth - 80, // Right edge with margin
        y: windowHeight / 2 - 32 // Vertically centered
      });
    }
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
    }, 1500);
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
      timer = setTimeout(() => setIsExpanded(false), 4000);
    }
    return () => clearTimeout(timer);
  }, [isExpanded, isDragging]);

  // Drag constraints for floating ball
  const dragConstraints = {
    left: 0,
    right: typeof window !== 'undefined' ? window.innerWidth - 64 : 0,
    top: 0,
    bottom: typeof window !== 'undefined' ? window.innerHeight - 64 : 0
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
    return value.toFixed(value > 1 ? 2 : 4);
  };

  const formatAddress = (addr) => {
    if (!addr) return 'Not Connected';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // ONBOARDING PHASE
  if (phase === 'onboarding') {
    return (
      <motion.div
        className="min-h-screen glass-content flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #35C6FF 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #00F5FF 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, #FFD166 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, #35C6FF 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="glass max-w-md w-full mx-4">
          <div className="glass-content p-8 text-center">
            {/* Sentra Logo/Icon */}
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-0.5"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-primary" />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="terminal-header text-2xl mb-2 sentra-gradient-text">
              SENTRA INTELLIGENCE
            </h1>
            
            <p className="text-secondary font-semibold mb-2">
              AI-Powered Crypto Sentiment Platform
            </p>
            
            <p className="text-muted mb-8 text-sm leading-relaxed">
              Monitor market emotions, detect pump & dumps, and trade with AI insights
            </p>

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-transaction text-center p-3">
                <Eye className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs">Scanner</span>
              </div>
              <div className="glass-transaction text-center p-3">
                <Zap className="w-5 h-5 text-warning mx-auto mb-1" />
                <span className="text-xs">Alerts</span>
              </div>
              <div className="glass-transaction text-center p-3">
                <Target className="w-5 h-5 text-success mx-auto mb-1" />
                <span className="text-xs">Insights</span>
              </div>
            </motion.div>

            {/* Wallet Connection Highlight */}
            <motion.div
              className="glass-alert p-4 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-warning flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-primary mb-1">
                    Unlock Full Potential
                  </p>
                  <p className="text-xs text-muted">
                    Connect wallet to access personalized AI agents and portfolio analysis
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Connect Wallet Button */}
              <motion.button
                onClick={handleConnect}
                className="glass-button w-full flex items-center justify-center gap-3 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isWalletConnected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <Wallet className="w-5 h-5" />
                {isWalletConnected ? (
                  <span>✓ Wallet Connected</span>
                ) : (
                  <span>Connect Wallet</span>
                )}
                {!isWalletConnected && <ArrowRight className="w-4 h-4" />}
              </motion.button>

              {/* TON Connect for Telegram users */}
              <div className="flex justify-center">
                <TonConnectButton />
              </div>

              {/* Skip Button */}
              <motion.button
                onClick={handleSkip}
                className="glass-button-secondary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Continue Without Wallet
              </motion.button>
            </div>

            {/* Connection Success State */}
            <AnimatePresence>
              {isWalletConnected && (
                <motion.div
                  className="glass-transaction p-4 mt-6"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="flex items-center gap-2 text-success mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: 3 }}
                    >
                      <Shield className="w-5 h-5" />
                    </motion.div>
                    <span className="font-semibold">Connection Successful!</span>
                  </div>
                  <p className="text-xs text-muted">
                    Initializing personalized AI analysis...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // FLOATING PHASE
  return (
    <>
      {/* Main Draggable Ball */}
      <motion.div
        ref={ballRef}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        onDragStart={() => {
          setIsDragging(true);
          setIsExpanded(false);
        }}
        onDragEnd={() => setIsDragging(false)}
        onTap={() => !isDragging && setIsExpanded(!isExpanded)}
        className="fixed z-50 cursor-grab active:cursor-grabbing select-none"
        style={{
          x: position.x,
          y: position.y,
          width: 64,
          height: 64
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isDragging ? 1.1 : 1,
          opacity: 1,
          rotate: isDragging ? 10 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Ball Container */}
        <motion.div
          className="w-16 h-16 rounded-full relative overflow-hidden backdrop-blur-md border-2"
          style={{ 
            background: `linear-gradient(135deg, ${getStatusColor()}30, ${getStatusColor()}60)`,
            borderColor: getStatusColor()
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${getStatusColor()}40`,
              `0 0 30px ${getStatusColor()}70`,
              `0 0 20px ${getStatusColor()}40`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Main Icon */}
          <div className="absolute inset-2 rounded-full bg-background/90 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: balanceLoading ? 360 : 0,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 1.5, repeat: balanceLoading ? Infinity : 0, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              {isWalletConnected ? (
                <Wallet className="w-6 h-6" style={{ color: getStatusColor() }} />
              ) : (
                <WalletCards className="w-6 h-6" style={{ color: getStatusColor() }} />
              )}
            </motion.div>
          </div>

          {/* Status Dot */}
          <motion.div
            className="absolute top-1 right-1 w-3 h-3 rounded-full border border-background"
            style={{ 
              backgroundColor: isWalletConnected ? '#00FF88' : '#FF4444'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Activity Indicator */}
          {isWalletConnected && (
            <motion.div
              className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-2 h-2 text-primary" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Expanded Info Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed z-40"
            style={{
              x: position.x > window.innerWidth / 2 ? position.x - 220 : position.x + 80,
              y: position.y - 50
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.x > window.innerWidth / 2 ? 30 : -30,
              y: 20
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.x > window.innerWidth / 2 ? 30 : -30,
              y: 20
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div 
              className="glass w-56 border-2 shadow-2xl" 
              style={{ borderColor: getStatusColor() }}
            >
              <div className="glass-content p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: isWalletConnected ? '#00FF88' : '#FF4444' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs font-bold text-primary">SENTRA STATUS</span>
                  </div>
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="w-6 h-6 rounded-full bg-surface flex items-center justify-center hover:bg-elevated transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3 text-muted" />
                  </motion.button>
                </div>

                {/* Wallet Info */}
                {isWalletConnected ? (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between py-2 border-b border-border-secondary">
                      <span className="text-xs text-muted">Connection</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-success">
                          {walletType} Active
                        </span>
                      </div>
                    </div>
                    
                    {address && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted">Address</span>
                        <span className="text-xs font-mono text-secondary">
                          {formatAddress(address)}
                        </span>
                      </div>
                    )}
                    
                    {balance && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted">Balance</span>
                        <span className="text-xs font-semibold text-primary">
                          {formatBalance()} {balance.symbol}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">AI Status</span>
                      <div className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-primary" />
                        <span className="text-xs font-semibold text-primary">Online</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <WalletCards className="w-8 h-8 text-muted mx-auto mb-3" />
                    <p className="text-xs text-muted mb-1">No Wallet Connected</p>
                    <p className="text-xs text-warning font-semibold">
                      Basic Features Only
                    </p>
                  </motion.div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border-secondary">
                  <motion.button 
                    className="glass-transaction p-2 text-center hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <span className="text-xs">Scan</span>
                  </motion.button>
                  <motion.button 
                    className="glass-transaction p-2 text-center hover:border-warning/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap className="w-4 h-4 mx-auto mb-1 text-warning" />
                    <span className="text-xs">Alerts</span>
                  </motion.button>
                  <motion.button 
                    className="glass-transaction p-2 text-center hover:border-success/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TrendingUp className="w-4 h-4 mx-auto mb-1 text-success" />
                    <span className="text-xs">Trends</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SentraWalletSystem;
