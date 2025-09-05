'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const VerticalTiles = ({ children }) => {
  const [tiles, setTiles] = useState([]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const calculateTiles = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth: width } = containerRef.current;
      const tileCount = Math.max(8, Math.floor(width / 50));
      const tileWidth = width / tileCount + 2;
      const newTiles = Array.from({ length: tileCount }, (_, index) => ({
        id: index,
        width: tileWidth,
        order: Math.abs(index - Math.floor((tileCount - 1) / 2)),
      }));
      setTiles(newTiles);
    }
  }, []);

  useEffect(() => {
    calculateTiles();
    const resizeObserver = new ResizeObserver(calculateTiles);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [calculateTiles]);

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full">
      {children}
      <div className="absolute inset-0 flex">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            className=""
            style={{
              width: tile.width,
              position: "absolute",
              left: `${(tile.id * 100) / tiles.length}%`,
              top: 0,
              height: "100%",
            }}
            initial={{ y: 0 }}
            animate={isInView ? { y: "100%" } : { y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2.0 + tile.order * 0.12,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SentraLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
        <div className="min-h-screen w-full bg-black relative flex items-center justify-center">
          
          {/* Animated Background Elements */}
          <motion.div 
            className="absolute w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, 60, 0],
              y: [0, -40, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '15%', left: '15%' }}
          />
          
          <motion.div 
            className="absolute w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.6, 0.2],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ bottom: '25%', right: '20%' }}
          />

          <motion.div 
            className="absolute w-64 h-64 bg-pink-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: '45%', right: '25%' }}
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-400/40 to-pink-400/30 rounded-2xl blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                animate={{ 
                  y: [0, -8, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="SENTRA AI Logo" 
                  width={220} 
                  height={130}
                  className="drop-shadow-2xl relative z-10"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-gray-400 text-sm font-medium">
                Initializing Crypto Intelligence Platform
              </p>
            </motion.div>

            {/* Loading Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default SentraLoader;
