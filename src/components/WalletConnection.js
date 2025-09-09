'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useBalance } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import { 
  Wallet, 
  Shield, 
  Zap, 
  Brain, 
  ArrowRight, 
  Check,
  Sparkles,
  Eye,
  Target
} from 'lucide-react';
import Image from 'next/image';

const SentraWalletOnboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const tonWallet = useTonWallet();
  const isWalletConnected = isConnected || tonWallet;

  const steps = [
    {
      title: "SENTRA INTELLIGENCE",
      subtitle: "AI-Powered Crypto Sentiment Platform",
      description: "Monitor market emotions, detect pump & dumps, and trade with AI insights",
      icon: Brain,
      gradient: "from-cyan-500 to-purple-600"
    },
    {
      title: "CONNECT WALLET",
      subtitle: "Enhanced Portfolio Intelligence", 
      description: "Link your wallet for personalized sentiment analysis and AI recommendations",
      icon: Wallet,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "READY TO SCAN",
      subtitle: "Market Intelligence Activated",
      description: "Your AI-powered sentiment tracking system is now online",
      icon: Eye,
      gradient: "from-green-500 to-blue-500"
    }
  ];

  useEffect(() => {
    if (isWalletConnected && currentStep === 1) {
      setTimeout(() => setCurrentStep(2), 1500);
    }
  }, [isWalletConnected, currentStep]);

  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => onComplete?.(isWalletConnected), 2000);
    }
  }, [currentStep, onComplete, isWalletConnected]);

  const handleSkip = () => {
    setIsSkipping(true);
    setTimeout(() => onComplete?.(false), 1000);
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1 && !isWalletConnected) {
      handleSkip();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen glass-content flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #35C6FF 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #00F5FF 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, #FFD166 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #35C6FF 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="glass max-w-md w-full mx-4 text-center">
        <div className="glass-content p-8">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 w-16 mx-1 rounded-full ${
                  index <= currentStep ? 'bg-primary' : 'bg-surface'
                }`}
                animate={{
                  backgroundColor: index <= currentStep ? '#35C6FF' : '#2A2A30'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${currentStepData.gradient} p-0.5`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: currentStep === 2 ? 360 : 0
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 2 }
                }}
              >
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <currentStepData.icon className="w-12 h-12 text-primary" />
                </div>
              </motion.div>

              {/* Content */}
              <h1 className="terminal-header text-2xl mb-2 sentra-gradient-text">
                {currentStepData.title}
              </h1>
              
              <h2 className="text-lg font-semibold text-secondary mb-4">
                {currentStepData.subtitle}
              </h2>
              
              <p className="text-muted mb-8 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Step-specific content */}
              {currentStep === 0 && (
                <motion.div
                  className="grid grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="glass-transaction text-center p-3">
                    <Shield className="w-6 h-6 text-success mx-auto mb-2" />
                    <span className="text-xs">Secure</span>
                  </div>
                  <div className="glass-transaction text-center p-3">
                    <Zap className="w-6 h-6 text-warning mx-auto mb-2" />
                    <span className="text-xs">Real-time</span>
                  </div>
                  <div className="glass-transaction text-center p-3">
                    <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                    <span className="text-xs">Accurate</span>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Wallet Connection Buttons */}
                  <motion.button
                    onClick={() => open()}
                    className="glass-button w-full flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isConnected}
                  >
                    <Wallet className="w-5 h-5" />
                    {isConnected ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Wallet Connected</span>
                      </>
                    ) : (
                      <span>Connect EVM Wallet</span>
                    )}
                  </motion.button>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-border-secondary"></div>
                    <span className="text-xs text-muted">OR</span>
                    <div className="flex-1 h-px bg-border-secondary"></div>
                  </div>

                  <div className="flex justify-center">
                    <TonConnectButton />
                  </div>

                  {isWalletConnected && (
                    <motion.div
                      className="glass-transaction p-4 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-2 text-success">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Wallet Connected Successfully!</span>
                      </div>
                      <p className="text-xs text-muted mt-1">
                        Preparing personalized AI analysis...
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="glass-transaction p-6">
                    <motion.div
                      className="flex items-center justify-center gap-2 text-success mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6" />
                      <span className="font-bold">System Online</span>
                    </motion.div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>AI Sentiment Engine</span>
                        <span className="text-success">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Market Scanner</span>
                        <span className="text-success">Monitoring</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Alert System</span>
                        <span className="text-success">Ready</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {currentStep < 2 && (
                  <motion.button
                    onClick={handleSkip}
                    className="glass-button-secondary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSkipping}
                  >
                    {isSkipping ? 'Skipping...' : 'Skip'}
                  </motion.button>
                )}
                
                {currentStep === 0 && (
                  <motion.button
                    onClick={handleNext}
                    className="glass-button flex-1 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Begin Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}

                {currentStep === 1 && !isWalletConnected && (
                  <motion.button
                    onClick={handleNext}
                    className="glass-button-secondary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Without Wallet
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SentraWalletOnboarding;
