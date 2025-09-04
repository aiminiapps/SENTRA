'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Zap, 
  Shield, 
  AlertTriangle,
  ExternalLink,
  Clock,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';
import Image from 'next/image';

const CryptoNewsSentra = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Haptic feedback for Telegram
  const vibrate = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  // Generate mock news data with proper structure
  const generateMockNews = () => {
    const newsItems = [
      {
        id: 'news-1',
        title: "Bitcoin ETF Approval Drives Institutional Adoption",
        description: "Major financial institutions are rushing to offer Bitcoin ETF products as regulatory clarity improves market confidence and accessibility.",
        url: "https://example.com/bitcoin-etf-news",
        author: "CryptoTimes",
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
        category: 'Bitcoin'
      },
      {
        id: 'news-2', 
        title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
        description: "Polygon, Arbitrum, and Optimism process millions of transactions as users seek lower gas fees and faster settlement times.",
        url: "https://example.com/ethereum-l2-volume",
        author: "DeFi Weekly",
        publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
        category: 'Ethereum'
      },
      {
        id: 'news-3',
        title: "Central Bank Digital Currencies Gain Global Momentum", 
        description: "Over 90 countries are now exploring or piloting CBDCs as digital payment infrastructure becomes a national priority worldwide.",
        url: "https://example.com/cbdc-momentum",
        author: "FinTech Report",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        category: 'CBDC'
      },
      {
        id: 'news-4',
        title: "DeFi Protocol Launches Cross-Chain Yield Farming",
        description: "Revolutionary multi-chain architecture enables seamless yield farming across Ethereum, Solana, and Avalanche networks with automated strategies.",
        url: "https://example.com/defi-cross-chain",
        author: "DeFi Pulse",
        publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
        category: 'DeFi'
      },
      {
        id: 'news-5',
        title: "Regulatory Framework Provides Clarity for Crypto Markets",
        description: "New comprehensive guidelines from financial regulators establish clear operating standards for cryptocurrency exchanges and digital asset services.",
        url: "https://example.com/crypto-regulation",
        author: "Regulatory News",
        publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        category: 'Regulation'
      },
      {
        id: 'news-6',
        title: "NFT Gaming Sector Experiences Renaissance",
        description: "Major gaming studios announce blockchain integration plans as play-to-earn mechanics and digital ownership drive new user adoption waves.",
        url: "https://example.com/nft-gaming-renaissance", 
        author: "GameFi Today",
        publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(), // 2.5 hours ago
        category: 'NFT'
      }
    ];

    // Add dynamic metrics to each news item
    return newsItems.map(item => ({
      ...item,
      trustScore: Math.floor(Math.random() * 40) + 60, // 60-100
      riskLevel: Math.floor(Math.random() * 30) + 10, // 10-40
      sentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
      impact: Math.floor(Math.random() * 50) + 50, // 50-100
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100
      analyzed: false,
      aiAnalysis: null
    }));
  };

  // Fetch real crypto news with fallback
  const fetchRealNews = async () => {
    setIsLoading(true);
    try {
      // Try to fetch real news first
      const response = await fetch('https://api.coingecko.com/api/v3/news');
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const formattedNews = data.data.slice(0, 6).map((item, index) => ({
            id: item.id || `real-news-${index}`,
            title: item.title,
            description: item.description || item.title,
            url: item.url,
            author: item.author || 'CryptoNews',
            publishedAt: item.created_at,
            category: ['Bitcoin', 'Ethereum', 'DeFi', 'Altcoins', 'Regulation'][Math.floor(Math.random() * 5)],
            trustScore: Math.floor(Math.random() * 40) + 60,
            riskLevel: Math.floor(Math.random() * 30) + 10,
            sentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
            impact: Math.floor(Math.random() * 50) + 50,
            confidence: Math.floor(Math.random() * 30) + 70,
            analyzed: false,
            aiAnalysis: null
          }));
          
          setNewsData(formattedNews);
          console.log('Loaded real news:', formattedNews.length, 'items');
          return;
        }
      }
      
      // Fallback to mock data if API fails
      throw new Error('API response invalid');
      
    } catch (error) {
      console.log('Using mock data due to API error:', error.message);
      const mockNews = generateMockNews();
      setNewsData(mockNews);
      console.log('Loaded mock news:', mockNews.length, 'items');
    }
    
    setIsLoading(false);
  };

  // Generate mini chart data
  const generateChartData = (score) => {
    return Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: Math.max(0, Math.min(100, score + (Math.random() - 0.5) * 20))
    }));
  };

  // AI Analysis function
  const analyzeWithAI = async (news) => {
    setIsAnalyzing(true);
    vibrate();

    try {
      const systemPrompt = `You are SENTRA AI. Analyze this crypto news with exact metrics:

📊 TRUST SCORE: ${news.trustScore}/100
🎯 RISK ASSESSMENT: ${news.riskLevel}/100  
📈 MARKET IMPACT: ${news.impact}/100
🔍 CONFIDENCE LEVEL: ${news.confidence}/100
💭 SENTIMENT: ${news.sentiment.toUpperCase()}

Provide detailed markdown analysis with:
- Market implications
- Trading signals
- Risk warnings
- Actionable insights

Keep response under 200 words, use emojis, and focus on actionable intelligence.`;

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { 
              role: 'user', 
              content: `${news.title}\n\n${news.description}`,
              timestamp: new Date().toLocaleTimeString()
            }
          ]
        })
      });

      const data = await response.json();
      
      // Update specific news item with analysis
      setNewsData(prevNews => 
        prevNews.map(item => 
          item.id === news.id 
            ? { ...item, aiAnalysis: data.reply, analyzed: true }
            : item
        )
      );
      
    } catch (error) {
      console.error('AI Analysis failed:', error);
      // Add fallback analysis
      setNewsData(prevNews => 
        prevNews.map(item => 
          item.id === news.id 
            ? { 
                ...item, 
                aiAnalysis: `## 🔍 Analysis Failed\n\nUnable to connect to AI service. Please try again later.\n\n**Manual Assessment:**\n- Trust Score: ${news.trustScore}/100\n- Risk Level: ${news.riskLevel}/100\n- Market Impact: ${news.impact}/100`, 
                analyzed: true 
              }
            : item
        )
      );
    }
    
    setIsAnalyzing(false);
  };

  // Mini Line Chart Component
  const MiniChart = ({ data, color, height = 30 }) => {
    if (!data || data.length === 0) return null;
    
    const points = data.map((point, index) => 
      `${(index / (data.length - 1)) * 100},${100 - (point.y / 100) * 100}`
    ).join(' ');

    return (
      <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          fill={`url(#gradient-${color.replace('#', '')})`}
          stroke="none"
          points={`0,100 ${points} 100,100`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const getTimeAgo = (date) => {
    const minutes = Math.floor((new Date() - new Date(date)) / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'bullish': return '#00ff88';
      case 'bearish': return '#ff3366';
      default: return '#ffaa00';
    }
  };

  const getRiskColor = (risk) => {
    if (risk < 20) return '#00ff88';
    if (risk < 35) return '#ffaa00';
    return '#ff3366';
  };

  useEffect(() => {
    fetchRealNews();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold">Loading Intelligence...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="py-4">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <Image src='/agent/agentlogo.png' alt='Logo' width={50} height={50}/>
              </div>
              <div>
                <h1 className="text-xl font-bold text-cyan-400">
                  SENTRA Intel
                </h1>
                <p className="text-xs text-gray-400">Real-time Market Pulse ({newsData.length} stories)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">LIVE</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* News Stream */}
      <div className="py-4 space-y-4">
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <motion.div
              key={news.id}
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Main News Card */}
              <div 
                className="relative glass overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                onClick={() => {
                  if (selectedNews === news.id) {
                    setSelectedNews(null);
                  } else if (!news.analyzed) {
                    analyzeWithAI(news);
                    setSelectedNews(news.id);
                  } else {
                    setSelectedNews(news.id);
                  }
                  vibrate();
                }}
              > 
                <div className="relative">
                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold">
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(news.publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold leading-tight mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {news.title}
                      </h3>
                    </div>
                    
                    {/* Sentiment Indicator */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{ 
                          backgroundColor: `${getSentimentColor(news.sentiment)}20`,
                          border: `2px solid ${getSentimentColor(news.sentiment)}`
                        }}
                      >
                        {news.sentiment === 'bullish' ? 
                          <TrendingUp className="w-6 h-6" style={{ color: getSentimentColor(news.sentiment) }} /> :
                          news.sentiment === 'bearish' ?
                          <TrendingDown className="w-6 h-6" style={{ color: getSentimentColor(news.sentiment) }} /> :
                          <Activity className="w-6 h-6" style={{ color: getSentimentColor(news.sentiment) }} />
                        }
                      </div>
                      <span className="text-xs mt-1 font-semibold" style={{ color: getSentimentColor(news.sentiment) }}>
                        {news.sentiment.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3 -mt-3">
                            {news.description}
                  </p>

                  {/* Metrics Dashboard */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Shield className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400 font-bold text-sm">{news.trustScore}</span>
                      </div>
                      <p className="text-xs text-gray-400">Trust</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <AlertTriangle className="w-4 h-4 mr-1" style={{ color: getRiskColor(news.riskLevel) }} />
                        <span className="font-bold text-sm" style={{ color: getRiskColor(news.riskLevel) }}>
                          {news.riskLevel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Risk</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 font-bold text-sm">{news.impact}</span>
                      </div>
                      <p className="text-xs text-gray-400">Impact</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-blue-400 font-bold text-sm">{news.confidence}</span>
                      </div>
                      <p className="text-xs text-gray-400">Confidence</p>
                    </div>
                  </div>

                  {/* Mini Charts Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-green-400 font-semibold">Trust Trend</span>
                        <BarChart3 className="w-3 h-3 text-green-400" />
                      </div>
                      <MiniChart data={generateChartData(news.trustScore)} color="#00ff88" />
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-red-400 font-semibold">Risk Level</span>
                        <BarChart3 className="w-3 h-3 text-red-400" />
                      </div>
                      <MiniChart data={generateChartData(news.riskLevel)} color="#ff3366" />
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-yellow-400 font-semibold">Impact Score</span>
                        <BarChart3 className="w-3 h-3 text-yellow-400" />
                      </div>
                      <MiniChart data={generateChartData(news.impact)} color="#ffaa00" />
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-600/30">
                    <span className="text-xs text-gray-400">
                      Source: <span className="text-cyan-400">{news.author}</span>
                    </span>
                    
                    <div className="flex items-center gap-3">
                      {isAnalyzing && selectedNews === news.id && (
                        <div className="flex items-center gap-2 text-cyan-400">
                          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs">Analyzing...</span>
                        </div>
                      )}
                      
                      {!news.analyzed && !isAnalyzing && (
                        <span className="text-xs text-cyan-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Tap to Analyze
                        </span>
                      )}
                      
                      {news.analyzed && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Analyzed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Analysis */}
                  <AnimatePresence>
                    {selectedNews === news.id && news.aiAnalysis && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-slate-600/30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 mb-3">
                          <ReactMarkdown 
                            rehypePlugins={[rehypeRaw]}
                            className="prose prose-invert prose-sm max-w-none"
                            components={{
                              h1: ({ children }) => <h1 className="text-lg font-bold text-cyan-400 mb-2">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-semibold text-white mb-2">{children}</h2>,
                              p: ({ children }) => <p className="text-gray-300 mb-2 text-sm leading-relaxed">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-2 space-y-1">{children}</ul>,
                              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>
                            }}
                          >
                            {news.aiAnalysis}
                          </ReactMarkdown>
                        </div>
                        
                        <button
                          className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(news.url, '_blank');
                            vibrate();
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Read Full Article
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No news articles available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoNewsSentra;
