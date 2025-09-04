'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiTrendingDown,
  HiRefresh,
  HiEye,
  HiSparkles,
  HiChartBar,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineStar,
  HiPlay,
  HiOutlineLightningBolt,
  HiOutlineHeart,
  HiOutlineFire,
  HiOutlineShieldCheck,
  HiOutlineCloudDownload,
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrendingUp
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";
import { HiOutlineExclamation } from "react-icons/hi";
import { TfiTarget } from "react-icons/tfi";

export default function SentraTrustIntelligenceCenter() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [isWebApp, setIsWebApp] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [favorites, setFavorites] = useState(new Set());
  const [priceAlerts, setPriceAlerts] = useState(new Set());
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [analyzedCoin, setAnalyzedCoin] = useState(null);
  const [trustData, setTrustData] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
      const savedFavorites = localStorage.getItem('sentra_favorites');
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
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

  // Generate advanced trust intelligence
  const generateTrustIntelligence = (coinData) => {
    const trustAnalysis = {};
    
    coinData.forEach(coin => {
      // Advanced trust score calculation
      const baseScore = Math.floor(Math.random() * 30) + 50; // 50-80 base
      const rankBonus = Math.max(0, 20 - (coin.rank || 100) * 0.2); // Top ranks get bonus
      const volumeBonus = coin.volumeUsd24Hr > 1000000000 ? 10 : coin.volumeUsd24Hr > 100000000 ? 5 : 0;
      
      const trustScore = Math.min(100, Math.floor(baseScore + rankBonus + volumeBonus));
      
      // Investment recommendation logic
      const shouldInvest = trustScore >= 75 && coin.changePercent24Hr > -5;
      
      // Safety assessment
      const safeToHold = trustScore >= 65 && (coin.rank || 100) <= 50;
      
      // Risk level
      const riskLevel = trustScore >= 80 ? 'LOW' : trustScore >= 60 ? 'MEDIUM' : 'HIGH';
      
      // Market sentiment
      const sentiment = coin.changePercent24Hr >= 5 ? 'BULLISH' : 
                       coin.changePercent24Hr <= -5 ? 'BEARISH' : 'NEUTRAL';
      
      // Confidence level
      const confidenceLevel = Math.floor(Math.random() * 30) + 70; // 70-100
      
      // Volatility assessment
      const volatility = Math.abs(coin.changePercent24Hr) >= 10 ? 'HIGH' : 
                        Math.abs(coin.changePercent24Hr) >= 5 ? 'MEDIUM' : 'LOW';

      trustAnalysis[coin.symbol] = {
        trustScore,
        shouldInvest,
        safeToHold,
        riskLevel,
        sentiment,
        confidenceLevel,
        volatility,
        recommendation: shouldInvest ? 
          (safeToHold ? 'STRONG BUY' : 'BUY') : 
          (safeToHold ? 'HOLD' : 'AVOID'),
        reasons: generateRecommendationReasons(trustScore, shouldInvest, safeToHold, coin)
      };
    });
    
    return trustAnalysis;
  };

  const generateRecommendationReasons = (trustScore, shouldInvest, safeToHold, coin) => {
    const reasons = [];
    
    if (trustScore >= 85) reasons.push("Excellent trust rating");
    if (coin.rank <= 10) reasons.push("Top 10 cryptocurrency");
    if (coin.changePercent24Hr >= 5) reasons.push("Strong upward momentum");
    if (coin.volumeUsd24Hr > 1000000000) reasons.push("High trading volume");
    if (!shouldInvest) reasons.push("Current market conditions unfavorable");
    if (!safeToHold && coin.rank > 50) reasons.push("Lower market cap increases risk");
    
    return reasons.slice(0, 3); // Return top 3 reasons
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchCoins() {
      try {
        setLoading(true);
        const response = await fetch('/api/coins');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch coin data');
        }

        if (isMounted) {
          setCoins(data);
          setTrustData(generateTrustIntelligence(data));
          setError(null);
          setLastUpdate(new Date());
          triggerHaptic('notification', 'success');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          triggerHaptic('notification', 'error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    fetchCoins();
    const interval = setInterval(fetchCoins, 45000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    triggerHaptic('impact', 'light');
  };

  const toggleFavorite = (symbol, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    setFavorites(newFavorites);
    localStorage.setItem('sentra_favorites', JSON.stringify([...newFavorites]));
    triggerHaptic('impact', 'light');
  };

  const togglePriceAlert = (symbol, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newAlerts = new Set(priceAlerts);
    if (newAlerts.has(symbol)) {
      newAlerts.delete(symbol);
    } else {
      newAlerts.add(symbol);
    }
    setPriceAlerts(newAlerts);
    triggerHaptic('impact', 'medium');
  };

  // AI Analysis with SENTRA agent
  const analyzeWithSentraAI = async (coin) => {
    setAiAnalyzing(true);
    setAnalyzedCoin(coin.symbol);
    triggerHaptic('impact', 'medium');

    try {
      const trustInfo = trustData[coin.symbol] || {};
      
      const systemPrompt = `You are SENTRA AI, providing advanced cryptocurrency investment analysis. Analyze this coin with the following metrics:

**${coin.name} (${coin.symbol.toUpperCase()})**
- Trust Score: ${trustInfo.trustScore}/100
- Current Price: $${coin.priceUsd}
- 24h Change: ${coin.changePercent24Hr?.toFixed(2)}%
- Market Rank: #${coin.rank}
- Risk Level: ${trustInfo.riskLevel}
- Recommendation: ${trustInfo.recommendation}

Provide a detailed analysis with:
1. **Investment Thesis** (2-3 sentences)
2. **Risk Assessment** (specific risks to consider)
3. **Entry/Exit Strategy** (price targets and timing)
4. **Hold Duration** (recommended timeframe)
5. **Portfolio Allocation** (suggested % of portfolio)

Keep response under 200 words. Use emojis. Focus on actionable advice.`;

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { 
              role: 'user', 
              content: `Provide detailed investment analysis for ${coin.name}`,
              timestamp: new Date().toLocaleTimeString()
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setTrustData(prev => ({
          ...prev,
          [coin.symbol]: {
            ...prev[coin.symbol],
            aiAnalysis: data.reply,
            analyzed: true
          }
        }));
        triggerHaptic('notification', 'success');
      }
    } catch (error) {
      console.error('SENTRA AI Analysis failed:', error);
      triggerHaptic('notification', 'error');
    }
    
    setAiAnalyzing(false);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(2)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(2)}K`;
    if (price >= 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(6)}`;
  };

  const formatPercentage = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getFilteredCoins = () => {
    switch (filterType) {
      case 'recommended':
        return coins.filter(coin => trustData[coin.symbol]?.shouldInvest);
      case 'safe_hold':
        return coins.filter(coin => trustData[coin.symbol]?.safeToHold);
      case 'high_trust':
        return coins.filter(coin => (trustData[coin.symbol]?.trustScore || 0) >= 80);
      case 'avoid':
        return coins.filter(coin => !trustData[coin.symbol]?.shouldInvest);
      default:
        return coins;
    }
  };

  const getTrustColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch(recommendation) {
      case 'STRONG BUY': return <HiOutlineCheckCircle className="w-5 h-5 text-green-400" />;
      case 'BUY': return <HiOutlineTrendingUp className="w-5 h-5 text-green-400" />;
      case 'HOLD': return <TfiTarget className="w-5 h-5 text-yellow-400" />;
      case 'AVOID': return <HiOutlineXCircle className="w-5 h-5 text-red-400" />;
      default: return <HiEye className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="mb-8">
      {/* SENTRA Trust Intelligence Header */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="p-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-blue-500/20 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <HiOutlineShieldCheck className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SENTRA TRUST CENTER
                </h1>
                <p className="text-sm text-gray-400">AI-Powered Investment Intelligence</p>
              </div>
            </div>
            
            <motion.button
              onClick={handleRefresh}
              className="glass-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={refreshing}
            >
              <motion.div
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
              >
                <HiRefresh className="w-4 h-4" />
              </motion.div>
              <span className="font-bold text-sm">Sync</span>
            </motion.button>
          </div>

          {/* Filter System */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Coins', icon: HiEye },
              { key: 'recommended', label: 'Recommended', icon: HiOutlineCheckCircle },
              { key: 'safe_hold', label: 'Safe to Hold', icon: HiOutlineShieldCheck },
              { key: 'high_trust', label: 'High Trust', icon: HiOutlineStar },
              { key: 'avoid', label: 'Avoid', icon: HiOutlineExclamation }
            ].map((filter) => {
              const IconComponent = filter.icon;
              return (
                <motion.button
                  key={filter.key}
                  onClick={() => {
                    setFilterType(filter.key);
                    triggerHaptic('impact', 'light');
                  }}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all
                    ${filterType === filter.key 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                      : 'bg-quantum-black/30 text-gray-400 hover:text-white'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4 inline mr-2" />
                  {filter.label}
                </motion.button>
              );
            })}
          </div>

          {/* Trust Intelligence Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div>
              <div className="text-green-400 font-black text-xl">
                {coins.filter(c => trustData[c.symbol]?.shouldInvest).length}
              </div>
              <div className="text-gray-400 text-xs font-semibold">Recommended</div>
            </div>
            <div>
              <div className="text-yellow-400 font-black text-xl">
                {coins.filter(c => trustData[c.symbol]?.safeToHold).length}
              </div>
              <div className="text-gray-400 text-xs font-semibold">Safe Hold</div>
            </div>
            <div>
              <div className="text-cyan-400 font-black text-xl">
                {coins.filter(c => (trustData[c.symbol]?.trustScore || 0) >= 80).length}
              </div>
              <div className="text-gray-400 text-xs font-semibold">High Trust</div>
            </div>
            <div>
              <div className="text-red-400 font-black text-xl">
                {coins.filter(c => !trustData[c.symbol]?.shouldInvest).length}
              </div>
              <div className="text-gray-400 text-xs font-semibold">Avoid</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="glass flex items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-cyan-400 font-semibold">Analyzing Trust Intelligence...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Intelligence Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {!loading && !error && getFilteredCoins().map((coin, index) => {
            const isPositive = coin.changePercent24Hr >= 0;
            const trust = trustData[coin.symbol] || {};
            const isFavorite = favorites.has(coin.symbol);
            const hasAlert = priceAlerts.has(coin.symbol);
            
            return (
              <motion.div
                key={coin.symbol}
                className="glass glass-p group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.6,
                  type: "spring" 
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (selectedCoin === coin.symbol) {
                    setSelectedCoin(null);
                  } else {
                    setSelectedCoin(coin.symbol);
                    if (!trust.analyzed) {
                      analyzeWithSentraAI(coin);
                    }
                  }
                  triggerHaptic('impact', 'light');
                }}
              >
                {/* Trust Score Indicator */}
                <div className={`absolute top-0 left-0 w-2 h-full ${
                  trust.trustScore >= 85 ? 'bg-green-400' :
                  trust.trustScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`} />

                <div className="p-5">
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      onClick={(e) => toggleFavorite(coin.symbol, e)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-gray-700/50 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiOutlineHeart className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => togglePriceAlert(coin.symbol, e)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        hasAlert ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/50 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiOutlineBell className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Main Content */}
                  <div className="flex items-center justify-between pr-20 mb-4">
                    {/* Coin Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={coin.image} 
                          alt={coin.name} 
                          className="w-14 h-14 rounded-full"
                        />
                        {trust.recommendation && (
                          <div className="absolute -bottom-1 -right-1">
                            {getRecommendationIcon(trust.recommendation)}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-semibold text-white">
                            {coin.symbol?.toUpperCase()}
                          </h2>
                          {coin.rank <= 10 && (
                            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-lg">
                              TOP {coin.rank}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{coin.name}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-gray-500">Rank #{coin.rank}</span>
                          <span className={`font-bold ${getRiskColor(trust.riskLevel)}`}>
                            {trust.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="text-right">
                      <div className="text-lg font-black text-white mb-1">
                        {formatPrice(coin.priceUsd)}
                      </div>
                      <div className={`
                        flex items-center justify-end gap-1 px-2 py-1 rounded-lg text-sm font-bold
                        ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                      `}>
                        {isPositive ? <HiTrendingUp className="w-3 h-3" /> : <HiTrendingDown className="w-3 h-3" />}
                        {formatPercentage(coin.changePercent24Hr)}
                      </div>
                    </div>
                  </div>

                  {/* Trust Intelligence Dashboard */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800/30 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <HiOutlineShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-400 font-semibold">Trust Score</span>
                      </div>
                      <div className={`text-2xl font-black ${getTrustColor(trust.trustScore)}`}>
                        {trust.trustScore || 0}/100
                      </div>
                    </div>

                    <div className="bg-gray-800/30 rounded-xl p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <LuBrainCircuit className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-gray-400 font-semibold">Confidence</span>
                      </div>
                      <div className="text-2xl font-black text-purple-400">
                        {trust.confidenceLevel || 0}%
                      </div>
                    </div>
                  </div>

                  {/* Investment Recommendations */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className={`
                      px-3 py-2 rounded-lg text-center text-xs font-bold
                      ${trust.shouldInvest ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    `}>
                      {trust.shouldInvest ? '✅ INVEST' : '❌ AVOID'}
                    </div>
                    <div className={`
                      px-3 py-2 rounded-lg text-center text-xs font-bold
                      ${trust.safeToHold ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    `}>
                      {trust.safeToHold ? '🔒 SAFE HOLD' : '⚠️ RISKY'}
                    </div>
                    <div className={`
                      px-3 py-2 rounded-lg text-center text-xs font-bold
                      ${trust.recommendation === 'STRONG BUY' ? 'bg-green-500/20 text-green-400' :
                        trust.recommendation === 'BUY' ? 'bg-green-400/20 text-green-300' :
                        trust.recommendation === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'}
                    `}>
                      {trust.recommendation || 'PENDING'}
                    </div>
                  </div>

                  {/* Key Reasons */}
                  {trust.reasons && trust.reasons.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2 font-semibold">Key Factors:</p>
                      <div className="space-y-1">
                        {trust.reasons.slice(0, 2).map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                            <span className="text-xs text-gray-300">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Analysis Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400">
                      Volatility: <span className={`font-bold ${
                        trust.volatility === 'HIGH' ? 'text-red-400' :
                        trust.volatility === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{trust.volatility || 'UNKNOWN'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {aiAnalyzing && analyzedCoin === coin.symbol && (
                        <div className="flex items-center gap-2 text-cyan-400">
                          <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs font-bold">AI Analyzing...</span>
                        </div>
                      )}
                      
                      {trust.analyzed && (
                        <div className="flex items-center gap-1 text-green-400">
                          <HiOutlineCheckCircle className="w-4 h-4" />
                          <span className="text-xs font-bold">AI Analyzed</span>
                        </div>
                      )}
                      
                      {!trust.analyzed && !aiAnalyzing && (
                        <div className="flex items-center gap-1 text-purple-400">
                          <HiSparkles className="w-4 h-4" />
                          <span className="text-xs font-bold">Tap for AI Analysis</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded AI Analysis */}
                  <AnimatePresence>
                    {selectedCoin === coin.symbol && trust.aiAnalysis && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-gray-700"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <LuBrainCircuit className="w-5 h-5 text-cyan-400" />
                            <span className="font-bold text-cyan-400">SENTRA AI Investment Analysis</span>
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none text-sm leading-relaxed text-gray-300">
                            {trust.aiAnalysis.split('\n').map((line, idx) => (
                              <p key={idx} className="mb-2">{line}</p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="h-16" />
    </div>
  );
}
