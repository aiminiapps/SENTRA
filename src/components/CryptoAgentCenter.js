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
  Clock,
  Activity,
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';

const CryptoNewsSentra = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingNews, setIsGeneratingNews] = useState(false);

  // Haptic feedback for Telegram
  const vibrate = () => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  // Generate authentic cryptocurrency news using LLM
  const generateNewsWithLLM = async () => {
    setIsGeneratingNews(true);
    
    const newsPrompts = [
      "Bitcoin institutional adoption news",
      "Ethereum Layer 2 scaling solutions update",
      "DeFi protocol security audit results", 
      "Central bank digital currency development",
      "Cryptocurrency regulation policy changes",
      "NFT marketplace trading volume surge",
      "Altcoin market performance analysis",
      "Blockchain technology enterprise integration"
    ];

    const categories = ['Bitcoin', 'Ethereum', 'DeFi', 'Regulation', 'Altcoins', 'NFT', 'CBDC', 'Enterprise'];
    const authors = ['CryptoTimes', 'DeFi Weekly', 'FinTech Report', 'Blockchain News', 'Digital Assets Today', 'Market Analysis Pro'];

    try {
      const generatedNews = [];
      
      for (let i = 0; i < 6; i++) {
        const systemPrompt = `You are a professional cryptocurrency news generator for SENTRA. Create a realistic, authentic crypto news article.

REQUIREMENTS:
- Generate 1 complete news article with title and description
- Make it sound authentic and current (September 2025)
- Focus on: ${newsPrompts[i]}
- Category: ${categories[i]}
- Keep title under 80 characters
- Keep description 120-180 characters
- Use professional journalism tone
- Include specific numbers, percentages, or metrics when relevant
- Make it sound like breaking news or recent development

FORMAT YOUR RESPONSE EXACTLY AS:
TITLE: [Your news title here]
DESCRIPTION: [Your news description here]

NO additional text, explanations, or formatting.`;

        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Generate a ${categories[i]} news article about ${newsPrompts[i]}` }
            ]
          })
        });

        const data = await response.json();
        
        if (data.reply) {
          // Parse the LLM response
          const lines = data.reply.split('\n').filter(line => line.trim());
          let title = '';
          let description = '';
          
          lines.forEach(line => {
            if (line.startsWith('TITLE:')) {
              title = line.replace('TITLE:', '').trim();
            } else if (line.startsWith('DESCRIPTION:')) {
              description = line.replace('DESCRIPTION:', '').trim();
            }
          });

          // Fallback parsing if format isn't followed
          if (!title && !description) {
            const allText = data.reply.trim();
            const sentences = allText.split('. ');
            title = sentences[0]?.replace(/^(TITLE:|Breaking:|News:)/i, '').trim() || `${categories[i]} Market Update`;
            description = sentences.slice(1, 3).join('. ') || allText.substring(0, 150);
          }

          const newsItem = {
            id: `llm-news-${i}`,
            title: title || `${categories[i]} Market Development`,
            description: description || `Latest developments in the ${categories[i]} sector showing significant market activity.`,
            author: authors[Math.floor(Math.random() * authors.length)],
            publishedAt: new Date(Date.now() - (i * 15 + Math.random() * 30) * 60000).toISOString(),
            category: categories[i],
            trustScore: Math.floor(Math.random() * 25) + 75, // 75-100 for high quality
            riskLevel: Math.floor(Math.random() * 30) + 10, // 10-40
            sentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
            impact: Math.floor(Math.random() * 40) + 60, // 60-100
            confidence: Math.floor(Math.random() * 20) + 80, // 80-100
            analyzed: false,
            aiAnalysis: null
          };

          generatedNews.push(newsItem);
        }

        // Add delay between requests to avoid rate limiting
        if (i < 5) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      return generatedNews;
      
    } catch (error) {
      console.error('LLM news generation failed:', error);
      return [];
    } finally {
      setIsGeneratingNews(false);
    }
  };

  // Fallback mock news if LLM fails
  const generateFallbackNews = () => {
    return [
      {
        id: 'fallback-1',
        title: "Bitcoin Reaches New All-Time High Amid ETF Inflows",
        description: "Institutional demand drives BTC to unprecedented levels as spot ETF assets under management surpass $50 billion milestone.",
        author: "CryptoTimes",
        publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        category: 'Bitcoin',
        trustScore: 92,
        riskLevel: 15,
        sentiment: 'bullish',
        impact: 95,
        confidence: 88,
        analyzed: false,
        aiAnalysis: null
      },
      {
        id: 'fallback-2',
        title: "Ethereum Mainnet Upgrade Reduces Gas Fees by 40%",
        description: "Latest protocol improvement shows significant cost reductions across DeFi applications and NFT marketplaces.",
        author: "DeFi Weekly", 
        publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        category: 'Ethereum',
        trustScore: 89,
        riskLevel: 20,
        sentiment: 'bullish',
        impact: 82,
        confidence: 91,
        analyzed: false,
        aiAnalysis: null
      }
    ];
  };

  // Fetch and generate news data
  const fetchNewsData = async () => {
    setIsLoading(true);
    
    try {
      // Generate news using LLM
      const llmNews = await generateNewsWithLLM();
      
      if (llmNews.length > 0) {
        setNewsData(llmNews);
        console.log('Generated', llmNews.length, 'news articles using LLM');
      } else {
        // Use fallback news if LLM fails
        const fallbackNews = generateFallbackNews();
        setNewsData(fallbackNews);
        console.log('Using fallback news data');
      }
      
    } catch (error) {
      console.error('News generation error:', error);
      const fallbackNews = generateFallbackNews();
      setNewsData(fallbackNews);
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

  // Refresh news data
  const handleRefresh = () => {
    fetchNewsData();
    vibrate();
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-fit py-14 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold">
            {isGeneratingNews ? 'Generating Latest Intel...' : 'Loading Intelligence...'}
          </p>
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
                <p className="text-[10px] text-gray-400">AI-Generated Market Pulse ({newsData.length} stories)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleRefresh}
                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading || isGeneratingNews}
              >
                <RefreshCw className={`w-4 h-4 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
              </motion.button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">AI LIVE</span>
              </div>
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
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4">
                          <ReactMarkdown 
                            rehypePlugins={[rehypeRaw]}
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
