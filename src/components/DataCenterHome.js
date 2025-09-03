'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
  HiOutlineBell
} from 'react-icons/hi';

export default function QuantoraMarketCenter() {
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
  const [viewMode, setViewMode] = useState('detailed'); // detailed, compact, chart
  const [sortBy, setSortBy] = useState('rank'); // rank, price, change, volume
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [marketMood, setMarketMood] = useState('neutral');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem('quantora_favorites');
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

  // Calculate market mood based on overall performance
  const calculateMarketMood = (coinData) => {
    const positive = coinData.filter(coin => coin.changePercent24Hr >= 0).length;
    const total = coinData.length;
    const ratio = positive / total;
    
    if (ratio >= 0.7) return 'bullish';
    if (ratio >= 0.4) return 'neutral';
    return 'bearish';
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
          setError(null);
          setLastUpdate(new Date());
          setMarketMood(calculateMarketMood(data));
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
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchCoins, 30000);
    
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
    localStorage.setItem('quantora_favorites', JSON.stringify([...newFavorites]));
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

  const getCoinIcon = (symbol) => {
    const icons = {
      'BTC': '₿', 'ETH': 'Ξ', 'ADA': '₳', 'DOT': '●',
      'LINK': '⬡', 'LTC': 'Ł', 'XRP': '◆', 'BNB': '◊',
      'SOL': '◎', 'MATIC': '⬟', 'AVAX': '▲'
    };
    return icons[symbol?.toUpperCase()] || '◉';
  };

  const getCoinColors = (symbol, isPositive, changePercent) => {
    const intensity = Math.abs(changePercent);
    
    if (isPositive) {
      if (intensity >= 10) {
        return {
          gradient: 'from-neon-lime/30 via-electric-green/25 to-deep-emerald/20',
          accent: 'neon-lime',
          icon: 'bg-gradient-to-r from-neon-lime to-electric-green',
          glow: 'shadow-neon-lime/70',
          intensity: 'high'
        };
      } else if (intensity >= 5) {
        return {
          gradient: 'from-neon-lime/20 via-electric-green/15 to-deep-emerald/10',
          accent: 'electric-green',
          icon: 'bg-gradient-to-r from-electric-green to-neon-lime',
          glow: 'shadow-electric-green/50',
          intensity: 'medium'
        };
      } else {
        return {
          gradient: 'from-electric-green/15 via-deep-emerald/10 to-neon-lime/5',
          accent: 'deep-emerald',
          icon: 'bg-gradient-to-r from-deep-emerald to-electric-green',
          glow: 'shadow-deep-emerald/30',
          intensity: 'low'
        };
      }
    } else {
      if (intensity >= 10) {
        return {
          gradient: 'from-red-500/30 via-pink-500/25 to-orange-500/20',
          accent: 'red-500',
          icon: 'bg-gradient-to-r from-red-500 to-pink-500',
          glow: 'shadow-red-500/70',
          intensity: 'high'
        };
      } else if (intensity >= 5) {
        return {
          gradient: 'from-red-500/20 via-pink-500/15 to-orange-500/10',
          accent: 'pink-500',
          icon: 'bg-gradient-to-r from-pink-500 to-red-500',
          glow: 'shadow-pink-500/50',
          intensity: 'medium'
        };
      } else {
        return {
          gradient: 'from-red-500/15 via-pink-500/10 to-orange-500/5',
          accent: 'orange-500',
          icon: 'bg-gradient-to-r from-orange-500 to-red-500',
          glow: 'shadow-orange-500/30',
          intensity: 'low'
        };
      }
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(2)}K`;
    } else if (price >= 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatPercentage = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getFilteredAndSortedCoins = () => {
    let filtered = coins;
    
    // Apply filters
    switch (filterType) {
      case 'gainers':
        filtered = coins.filter(coin => coin.changePercent24Hr >= 0);
        break;
      case 'losers':
        filtered = coins.filter(coin => coin.changePercent24Hr < 0);
        break;
      case 'favorites':
        filtered = coins.filter(coin => favorites.has(coin.symbol));
        break;
      case 'hot':
        filtered = coins.filter(coin => Math.abs(coin.changePercent24Hr) >= 5);
        break;
      default:
        filtered = coins;
    }

    // Apply sorting
    switch (sortBy) {
      case 'price':
        return filtered.sort((a, b) => b.priceUsd - a.priceUsd);
      case 'change':
        return filtered.sort((a, b) => Math.abs(b.changePercent24Hr) - Math.abs(a.changePercent24Hr));
      case 'volume':
        return filtered.sort((a, b) => (b.volumeUsd24Hr || 0) - (a.volumeUsd24Hr || 0));
      default:
        return filtered;
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'bullish': return '🚀';
      case 'bearish': return '🐻';
      default: return '⚖️';
    }
  };

  const getAIInsight = (coin) => {
    const insights = [
      "Strong technical momentum detected",
      "Volume surge indicates institutional interest",
      "Breaking key resistance levels",
      "Consolidation pattern forming",
      "High volatility expected",
      "Support level holding strong"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  return (
    <div className="mb-8">
      {/* Enhanced Header with Market Mood */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="p-6 bg-gradient-to-r from-signal-glow-cyan/20 via-matrix-violet/15 to-neon-lime/20 rounded-2xl">
          {/* Market Mood Indicator */}
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${marketMood === 'bullish' ? 'bg-neon-lime/20' : 
                    marketMood === 'bearish' ? 'bg-red-500/20' : 'bg-matrix-violet/20'}
                `}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xl scale-110">{getMoodEmoji(marketMood)}</span>
              </motion.div>
              <div>
                <p className="text-xs text-crisp-white/70 uppercase tracking-wider">Market Mood</p>
                <p className={`
                  font-bold capitalize
                  ${marketMood === 'bullish' ? 'text-neon-lime' : 
                    marketMood === 'bearish' ? 'text-red-400' : 'text-matrix-violet'}
                `}>
                  {marketMood}
                </p>
              </div>
            </div>
            
            <motion.div
              className="text-right text-xs text-crisp-white/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
              <p>Auto-refresh: ON</p>
            </motion.div>
          </motion.div>
          <div className="flex justify-between items-start mb-4">
            
            <div className="w-full flex gap-2">
              <motion.button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className={`
                  px-3 py-2 rounded-xl text-xs font-bold transition-all
                  ${showAIInsights 
                    ? 'bg-matrix-violet/20 text-matrix-violet border border-green-600' 
                    : 'bg-quantum-black/30 text-crisp-white/70 border border-green-600/50'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiSparkles className="w-3 h-3 inline mr-1" />
                AI Insights
              </motion.button>
              
              <motion.button
                onClick={handleRefresh}
                className="glass-button flex items-center gap-2 !px-3 !py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={refreshing}
              >
                <motion.div
                  animate={{ rotate: refreshing ? 360 : 0 }}
                  transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                >
                  <HiRefresh className="w-3 h-3" />
                </motion.div>
                <span className="font-bold text-xs">
                  {refreshing ? 'Syncing' : 'Refresh'}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Filter System */}
          <div className="space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { key: 'all', label: 'All Assets', icon: HiEye },
                { key: 'gainers', label: 'Gainers', icon: HiTrendingUp },
                { key: 'losers', label: 'Losers', icon: HiTrendingDown },
                { key: 'favorites', label: 'Favorites', icon: HiOutlineHeart },
                { key: 'hot', label: 'Hot', icon: HiOutlineFire }
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
                      flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all
                      ${filterType === filter.key 
                        ? 'bg-neon-lime/20 text-neon-lime border border-neon-lime/30' 
                        : 'bg-quantum-black/30 text-crisp-white/70'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      <span>{filter.label}</span>
                      {filter.key === 'favorites' && favorites.size > 0 && (
                        <span className="bg-neon-lime/30 text-neon-lime px-1 rounded text-xs">
                          {favorites.size}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <span className="text-xs text-crisp-white/60 flex items-center">Sort by:</span>
              {[
                { key: 'rank', label: 'Rank' },
                { key: 'price', label: 'Price' },
                { key: 'change', label: 'Change' }
              ].map((sort) => (
                <motion.button
                  key={sort.key}
                  onClick={() => setSortBy(sort.key)}
                  className={`
                    px-2 py-1 rounded-lg text-xs font-semibold transition-all
                    ${sortBy === sort.key 
                      ? 'bg-signal-glow-cyan/20 text-signal-glow-cyan' 
                      : 'text-crisp-white/60 hover:text-crisp-white/90'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  {sort.label}
                </motion.button>
              ))}
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
                className="w-16 h-16 border-4 border-signal-glow-cyan/30 border-t-signal-glow-cyan rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-crisp-white/80 font-semibold">Syncing market data...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Coin Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {!loading && !error && getFilteredAndSortedCoins().map((coin, index) => {
            const isPositive = coin.changePercent24Hr >= 0;
            const colors = getCoinColors(coin.symbol, isPositive, coin.changePercent24Hr);
            const isFavorite = favorites.has(coin.symbol);
            const hasAlert = priceAlerts.has(coin.symbol);
            
            return (
              <motion.div
                key={`${coin.symbol}-${filterType}-${sortBy}`}
                className="glass glass-p group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 10 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                onTouchStart={() => {
                  setSelectedCoin(coin.symbol);
                  triggerHaptic('impact', 'medium');
                }}
                onTouchEnd={() => setSelectedCoin(null)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Intensity Indicator */}
                {colors.intensity === 'high' && (
                  <motion.div 
                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-lime to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <Link href="/?tab=SPAI" className="block">
                  <div>
                    {/* Action Buttons */}
                    <div className="absolute top-5 right-2 flex-col gap-2">
                      <motion.button
                        onClick={(e) => toggleFavorite(coin.symbol, e)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <HiOutlineHeart size={24} className={`
                          ${isFavorite 
                            ? 'fill-red-500 text-red-500' 
                            : 'fill-transparent'
                          }
                        `} />
                      </motion.button>
                      
                      <motion.button
                        onClick={(e) => togglePriceAlert(coin.symbol, e)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <HiOutlineBell size={24} className={`${hasAlert 
                            ? 'fill-yellow-600 text-yellow-400' 
                            : 'fill-transparent'
                          }`} />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between pr-10">
                      {/* Left Side - Enhanced Coin Info */}
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          
                          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          {coin.image ? (
                            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-xl scale-110" />
                          ) : (
                            getCoinIcon(coin.symbol)
                          )}
                          
                          {/* Performance Badge */}
                          {colors.intensity === 'high' && (
                            <motion.div 
                              className="absolute -bottom-1 -right-1 w-5 h-5 bg-neon-lime rounded-full flex items-center justify-center"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <HiOutlineFire className="w-3 h-3 text-quantum-black" />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-semibold leading-none">
                              {coin.symbol?.toUpperCase()}
                            </h2>
                            {coin.rank <= 10 && (
                              <span className="bg-neon-lime/20 text-neon-lime text-xs font-bold px-2 py-0.5 rounded-lg">
                                TOP {coin.rank}
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 text-sm font-semibold mb-1">
                            {coin.name}
                          </p>
                          
                          {/* AI Insight */}
                          {showAIInsights && (
                            <motion.p 
                              className="text-xs text-matrix-violet bg-matrix-violet/10 px-2 py-1 rounded-lg"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ delay: index * 0.05 }}
                            >
                              🤖 {getAIInsight(coin)}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Enhanced Price Info */}
                      <div className="text-right">
                        <motion.div 
                          className="text-lg font-black text-crisp-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                        >
                          {formatPrice(coin.priceUsd)}
                        </motion.div>
                        
                        <motion.div 
                          className={`
                            flex items-center justify-end space-x-2 px-3 py-0.5 rounded-lg backdrop-blur-sm mb-2
                            ${isPositive ? 'bg-neon-lime/20 text-neon-lime' : 'bg-red-500/20 text-red-400'}
                          `}
                          whileHover={{ scale: 1.05 }}
                        >
                          {isPositive ? (
                            <HiTrendingUp className="w-4 h-4" />
                          ) : (
                            <HiTrendingDown className="w-4 h-4" />
                          )}
                          <span className="text-sm font-bold">
                            {formatPercentage(coin.changePercent24Hr)}
                          </span>
                        </motion.div>

                        {/* Volume Info */}
                        {coin.volumeUsd24Hr && (
                          <div className="text-xs text-crisp-white/60">
                            Vol: {formatPrice(coin.volumeUsd24Hr)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Indicator */}
                    <AnimatePresence>
                      {selectedCoin === coin.symbol && (
                        <motion.div 
                          className="hidden bottom-3 left-5 right-5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <div className="flex items-center justify-between bg-quantum-black/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center space-x-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <HiPlay className="w-4 h-4 text-neon-lime" />
                              </motion.div>
                              <span className="text-sm font-bold text-neon-lime">Start Analysis</span>
                            </div>
                            <div className="flex gap-2">
                              <HiOutlineShieldCheck className="w-4 h-4 text-signal-glow-cyan" />
                              <HiOutlineCloudDownload className="w-4 h-4 text-matrix-violet" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Enhanced Bottom Action */}
      {!loading && !error && coins.length > 0 && (
        <motion.div 
          className="mt-8 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Quick Stats */}
          <motion.div 
            className="glass"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 bg-gradient-to-r from-quantum-black/40 to-carbon-gray/40 rounded-2xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-neon-lime font-black text-lg">
                    {coins.filter(c => c.changePercent24Hr >= 0).length}
                  </div>
                  <div className="text-crisp-white/70 text-xs font-semibold">Gainers</div>
                </div>
                <div>
                  <div className="text-red-400 font-black text-lg">
                    {coins.filter(c => c.changePercent24Hr < 0).length}
                  </div>
                  <div className="text-crisp-white/70 text-xs font-semibold">Losers</div>
                </div>
                <div>
                  <div className="text-signal-glow-cyan font-black text-lg">
                    {favorites.size}
                  </div>
                  <div className="text-crisp-white/70 text-xs font-semibold">Favorites</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className='h-14'/>
    </div>
  );
}
