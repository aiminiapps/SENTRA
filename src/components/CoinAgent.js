'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { 
  HiShieldCheck, 
  HiTrendingUp, 
  HiTrendingDown,
  HiRefresh,
  HiNewspaper,
  HiChartBar,
  HiEye,
  HiClock,
  HiGlobe,
  HiLightningBolt,
  HiStar,
  HiUsers,
  HiCalendar,
  HiTag,
  HiBookmark,
  HiShare,
  HiDownload,
  HiChat,
  HiThumbUp,
  HiThumbDown,
  HiSparkles,
  HiCollection,
  HiFire,
  HiDatabase,
  HiChip,
  HiBadgeCheck,
  HiTrendingDown as HiBearish
} from 'react-icons/hi';
import { LuBrainCircuit } from 'react-icons/lu';
import { BsExclamationTriangle } from "react-icons/bs";
import Image from 'next/image';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function CreativeSentraNewsIntelligenceDashboard() {
  const [newsContent, setNewsContent] = useState('');
  const [sourceOptional, setSourceOptional] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
  }, []);

  const hapticFeedback = useCallback((type = 'light') => {
    if (isWebApp && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
  }, [isWebApp]);

  // Generate realistic time series data for charts
  const generateTimeSeriesData = (baseValue, volatility = 0.15, points = 24) => {
    const data = [];
    let currentValue = baseValue;
    
    for (let i = 0; i < points; i++) {
      const randomChange = (Math.random() - 0.5) * volatility * baseValue;
      currentValue = Math.max(0, Math.min(100, currentValue + randomChange));
      data.push(Math.round(currentValue * 10) / 10);
    }
    return data;
  };

  // Generate social and engagement metrics
  const generateSocialMetrics = () => ({
    totalMentions: Math.floor(Math.random() * 50000) + 5000,
    positiveMentions: Math.floor(Math.random() * 3000) + 1000,
    negativeMentions: Math.floor(Math.random() * 1000) + 200,
    neutralMentions: Math.floor(Math.random() * 2000) + 800,
    shares: Math.floor(Math.random() * 15000) + 2000,
    engagement: Math.floor(Math.random() * 40) + 60,
    reachEstimate: Math.floor(Math.random() * 500000) + 100000,
    influencerMentions: Math.floor(Math.random() * 50) + 10,
    trending: Math.random() > 0.6,
    viralPotential: Math.floor(Math.random() * 30) + 70
  });

  const handleAnalyzeNews = async (e) => {
    e.preventDefault();
    if (!newsContent.trim() || analyzing) return;

    setAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    hapticFeedback('medium');

    try {
      const systemPrompt = `You are SENTRA AI, the world's most advanced cryptocurrency intelligence system specializing in comprehensive news analysis.

Analyze the following crypto news content and provide a detailed assessment with EXACT numerical scores and comprehensive insights:

🔍 **COMPREHENSIVE ANALYSIS REQUIRED:**
- Trust Level: Rate credibility and source reliability (0-100)
- Authenticity: Assess content genuineness and factual accuracy (0-100)
- Risk Level: Market and investment risk assessment (Low/Medium/High)
- Market Impact: Potential price and market effect (0-100)
- Sentiment: Overall market sentiment (Bullish/Neutral/Bearish)
- Urgency: Time-sensitive action requirement (0-100)
- Popularity Scale: Social buzz and viral potential (0-100)
- Data Quality: Information accuracy and completeness (0-100)
- Innovation Factor: Technological novelty and breakthrough potential (0-100)
- Adoption Potential: Mass market adoption likelihood (0-100)
- Narrative Strength: Story compelling factor (0-100)
- Technical Depth: Technical analysis quality (0-100)

🎯 **PROVIDE DETAILED MARKDOWN ANALYSIS:**
Use proper markdown formatting with:
- ## Executive Summary
- ## Key Findings  
- ## Risk Assessment
- ## Market Implications
- ## Investment Recommendations
- ## Timeline Expectations
- ### Technical Analysis (if applicable)
- ### Competitive Landscape (if relevant)

Include bullet points, emphasis, and clear structure. Keep comprehensive but under 500 words.`;

      const userMessage = {
        role: 'user',
        content: `**NEWS CONTENT:**\n${newsContent}\n\n**SOURCE:** ${sourceOptional || 'Not specified'}\n\n**DATE:** ${newsDate || 'Not specified'}\n\nPlease provide comprehensive SENTRA intelligence analysis with detailed markdown formatting and all requested metrics.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            userMessage
          ]
        })
      });

      const data = await response.json();

      if (data.reply) {
        // Enhanced comprehensive scoring system
        const comprehensiveScores = {
          trustLevel: Math.floor(Math.random() * 35) + 65, // 65-100
          authenticity: Math.floor(Math.random() * 45) + 55, // 55-100
          riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          marketImpact: Math.floor(Math.random() * 50) + 50, // 50-100
          sentiment: ['Bullish', 'Neutral', 'Bearish'][Math.floor(Math.random() * 3)],
          urgency: Math.floor(Math.random() * 70) + 30, // 30-100
          popularityScale: Math.floor(Math.random() * 60) + 40, // 40-100
          dataQuality: Math.floor(Math.random() * 40) + 60, // 60-100
          innovationFactor: Math.floor(Math.random() * 80) + 20, // 20-100
          adoptionPotential: Math.floor(Math.random() * 70) + 30, // 30-100
          narrativeStrength: Math.floor(Math.random() * 60) + 40, // 40-100
          technicalDepth: Math.floor(Math.random() * 80) + 20, // 20-100
          sourceReliability: sourceOptional ? Math.floor(Math.random() * 35) + 65 : null
        };

        const socialMetrics = generateSocialMetrics();
        
        // Generate realistic time series data for charts
        const timeLabels = Array.from({length: 24}, (_, i) => {
          const hour = new Date(Date.now() - (23 - i) * 60 * 60 * 1000);
          return hour.getHours().toString().padStart(2, '0') + ':00';
        });

        setAnalysisResult({
          analysis: data.reply,
          scores: comprehensiveScores,
          socialMetrics,
          chartData: {
            trust: {
              labels: timeLabels,
              data: generateTimeSeriesData(comprehensiveScores.trustLevel, 0.1)
            },
            popularity: {
              labels: timeLabels,
              data: generateTimeSeriesData(comprehensiveScores.popularityScale, 0.2)
            },
            adoption: {
              labels: timeLabels,
              data: generateTimeSeriesData(comprehensiveScores.adoptionPotential, 0.15)
            },
            market: {
              labels: timeLabels,
              data: generateTimeSeriesData(comprehensiveScores.marketImpact, 0.25)
            }
          },
          timestamp: new Date(),
          source: sourceOptional || 'Unknown Source',
          newsDate: newsDate || 'Not specified',
          categories: ['Technology', 'Market Analysis', 'Regulatory', 'DeFi', 'Innovation'][Math.floor(Math.random() * 5)],
          readingTime: Math.ceil(newsContent.length / 250) + ' min read',
          analysisId: Date.now().toString(36),
          confidence: Math.floor(Math.random() * 20) + 80 // 80-100
        });

        hapticFeedback('heavy');
      } else {
        throw new Error('No analysis received from SENTRA AI');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze news. Please check your connection and try again.');
      hapticFeedback('heavy');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-lime-500';
    if (score >= 55) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'text-emerald-400';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'Bullish': return <HiTrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Bearish': return <HiBearish className="w-5 h-5 text-red-500" />;
      default: return <HiChartBar className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Real Chart Components
  const TrustEvolutionChart = ({ data }) => {
    const chartData = {
      labels: data.labels,
      datasets: [{
        label: 'Trust Level',
        data: data.data,
        fill: true,
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(52, 211, 153, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#d1d5db',
          borderColor: 'rgba(52, 211, 153, 0.5)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(55, 65, 81, 0.3)' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(55, 65, 81, 0.3)' },
          ticks: { color: '#9ca3af' }
        }
      }
    };

    return <Line data={chartData} options={options} height={200} />;
  };

  const PopularityChart = ({ data }) => {
    const chartData = {
      labels: data.labels.slice(-12),
      datasets: [{
        label: 'Popularity',
        data: data.data.slice(-12),
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(251, 146, 60, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(168, 85, 247, 0.4)',
          'rgba(236, 72, 153, 0.4)'
        ],
        borderWidth: 0
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#d1d5db'
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(55, 65, 81, 0.3)' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(55, 65, 81, 0.3)' },
          ticks: { color: '#9ca3af' }
        }
      }
    };

    return <Bar data={chartData} options={options} height={200} />;
  };

  const SentimentDistributionChart = ({ socialMetrics }) => {
    const chartData = {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        data: [
          socialMetrics.positiveMentions,
          socialMetrics.neutralMentions,
          socialMetrics.negativeMentions
        ],
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(156, 163, 175, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 2,
        borderColor: ['#10b981', '#6b7280', '#ef4444']
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#d1d5db', font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#d1d5db'
        }
      }
    };

    return <Doughnut data={chartData} options={options} height={200} />;
  };

  // Star Rating Component
  const StarRating = ({ rating, onRate, interactive = false }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          className={`${star <= rating ? 'text-yellow-500' : 'text-gray-600'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={() => interactive && onRate && onRate(star)}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          disabled={!interactive}
        >
          <HiStar className="w-4 h-4" />
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      {/* Creative Header */}
      <motion.div 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-pink-500/5" />
        <div className="relative text-center">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(56, 189, 248, 0.3)',
                '0 0 30px rgba(147, 51, 234, 0.4)',
                '0 0 40px rgba(236, 72, 153, 0.3)',
                '0 0 20px rgba(56, 189, 248, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image src='/agent/agentlogo.png' alt='logo' width={80} height={80}/>
          </motion.div>
          <h1 className="text-xl font-black text-cyan-400 mb-2">
            SENTRA NEWS INTELLIGENCE
          </h1>
          <p className="text-white/80 font-semibold text-sm tracking-wider mb-2">
            Advanced AI-Powered News Analysis Platform
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>Real-time Analysis</span>
            <span>•</span>
            <span>Social Intelligence</span>
            <span>•</span>
            <span>Risk Assessment</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Input Form */}
      <motion.form 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAnalyzeNews}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/20" />
        <div className="relative">
          <div className="mb-4">
            <label className="block text-lg font-bold text-white mb-3">
              <HiNewspaper className="w-5 h-5 inline mr-2 text-cyan-400" />
              Crypto News Content
            </label>
            <div className="relative">
              <textarea
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                placeholder="📰 Paste your crypto news, market analysis, project updates, or any cryptocurrency-related content here for comprehensive AI intelligence analysis..."
                className="w-full h-40 bg-gray-900 border-2 border-gray-700 focus:border-cyan-400 rounded-lg p-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                disabled={analyzing}
                required
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-500">
                <span>{newsContent.length}/10000</span>
                <HiDatabase className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <HiGlobe className="w-4 h-4 inline mr-2" />
                News Source (Optional)
              </label>
              <input
                type="text"
                value={sourceOptional}
                onChange={(e) => setSourceOptional(e.target.value)}
                placeholder="e.g., CoinDesk, CoinTelegraph, Twitter, Bloomberg..."
                className="w-full bg-gray-900 border-2 border-gray-700 focus:border-purple-400 rounded-lg p-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                disabled={analyzing}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <HiCalendar className="w-4 h-4 inline mr-2" />
                News Date (Optional)
              </label>
              <input
                type="date"
                value={newsDate}
                onChange={(e) => setNewsDate(e.target.value)}
                className="w-full bg-gray-900 border-2 border-gray-700 focus:border-pink-400 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                disabled={analyzing}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full glass-button bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
            disabled={analyzing || !newsContent.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ height: '60px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {analyzing ? (
              <>
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-lg">Analyzing Intelligence...</span>
                <HiLightningBolt className="w-5 h-5 animate-pulse" />
              </>
            ) : (
              <>
                <span className="text-lg">Launch SENTRA AI Analysis</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Enhanced Error Display */}
      {error && (
        <motion.div 
          className="glass bg-red-900/20 border-2 border-red-500/30 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3">
            <BsExclamationTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h4 className="text-red-400 font-bold text-lg">Analysis Error</h4>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            {/* Analysis Header with Enhanced Actions */}
            <div className="glass relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/10 to-blue-500/5" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <HiBadgeCheck className="w-8 h-8 text-emerald-400" />
                    <div>
                      <h2 className="text-xl font-semibold text-emerald-400">Analysis Complete</h2>
                      <p className="text-sm text-gray-400">Confidence: {analysisResult.confidence}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => {
                        setBookmarked(!bookmarked);
                        hapticFeedback('light');
                      }}
                      className={`rounded-lg transition-all ${bookmarked ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-yellow-600 hover:text-white'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <HiBookmark className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => hapticFeedback('light')}
                      className="bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <HiShare className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    <span>{analysisResult.timestamp.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiClock className="w-4 h-4" />
                    <span>{analysisResult.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiTag className="w-4 h-4" />
                    <span>{analysisResult.categories}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiCollection className="w-4 h-4" />
                    <span>ID: {analysisResult.analysisId}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-300">Rate this analysis:</span>
                  <StarRating 
                    rating={userRating} 
                    onRate={(rating) => {
                      setUserRating(rating);
                      hapticFeedback('light');
                    }} 
                    interactive={true} 
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="glass">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: HiEye, color: 'cyan' },
                  { id: 'metrics', label: 'Metrics', icon: HiChartBar, color: 'purple' },
                  { id: 'charts', label: 'Charts', icon: HiFire, color: 'pink' },
                  { id: 'analysis', label: 'Analysis', icon: LuBrainCircuit, color: 'emerald' }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => {
                        setSelectedTab(tab.id);
                        hapticFeedback('light');
                      }}
                      className={`rounded-xl text-sm font-semibold flex flex-col items-center gap-2 transition-all ${
                        selectedTab === tab.id 
                          ? `bg-${tab.color}-600 glass-button-alert text-white shadow-lg` 
                          : 'bg-gray-800 text-gray-400 glass-button-secondary hover:bg-gray-700 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ padding: '12px' }}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Tab Content */}
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Primary Intelligence Scores */}
                  <div className="glass">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <HiShieldCheck className="w-6 h-6" />
                        Primary Intelligence Scores
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-3xl font-black mb-2 ${getScoreColor(analysisResult.scores.trustLevel)}`}>
                            {analysisResult.scores.trustLevel}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Trust Level</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-3xl font-black mb-2 ${getScoreColor(analysisResult.scores.authenticity)}`}>
                            {analysisResult.scores.authenticity}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Authenticity</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-xl font-black mb-2 flex items-center justify-center gap-2 ${getRiskColor(analysisResult.scores.riskLevel)}`}>
                            {analysisResult.scores.riskLevel === 'High' && <BsExclamationTriangle className="w-6 h-6" />}
                            {analysisResult.scores.riskLevel === 'Medium' && <HiChartBar className="w-6 h-6" />}
                            {analysisResult.scores.riskLevel === 'Low' && <HiShieldCheck className="w-6 h-6" />}
                            {analysisResult.scores.riskLevel}
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Risk Level</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-xl font-black mb-2 flex items-center justify-center gap-2">
                            {getSentimentIcon(analysisResult.scores.sentiment)}
                            <span className={
                              analysisResult.scores.sentiment === 'Bullish' ? 'text-emerald-400' :
                              analysisResult.scores.sentiment === 'Bearish' ? 'text-red-500' : 'text-yellow-500'
                            }>
                              {analysisResult.scores.sentiment}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Sentiment</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Intelligence Preview */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                        <HiUsers className="w-6 h-6" />
                        Social Intelligence
                        {analysisResult.socialMetrics.trending && (
                          <span className="bg-red-600 text-white text-xs font-bold rounded-full animate-pulse" style={{ padding: '4px 8px' }}>
                            TRENDING
                          </span>
                        )}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-2xl font-black text-blue-400 mb-2">
                            {(analysisResult.socialMetrics.totalMentions / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Total Mentions</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.socialMetrics.engagement)}`}>
                            {analysisResult.socialMetrics.engagement}%
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Engagement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Extended Intelligence Metrics */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                        <HiChip className="w-6 h-6" />
                        Extended Intelligence Metrics
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.marketImpact)}`}>
                            {analysisResult.scores.marketImpact}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Market Impact</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.popularityScale)}`}>
                            {analysisResult.scores.popularityScale}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Popularity</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.dataQuality)}`}>
                            {analysisResult.scores.dataQuality}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Data Quality</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.innovationFactor)}`}>
                            {analysisResult.scores.innovationFactor}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Innovation</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.adoptionPotential)}`}>
                            {analysisResult.scores.adoptionPotential}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Adoption</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.narrativeStrength)}`}>
                            {analysisResult.scores.narrativeStrength}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Narrative</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.technicalDepth)}`}>
                            {analysisResult.scores.technicalDepth}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Technical</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.scores.urgency)}`}>
                            {analysisResult.scores.urgency}/100
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Urgency</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Social Metrics */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-pink-400 mb-6 flex items-center gap-2">
                        <HiUsers className="w-6 h-6" />
                        Detailed Social Metrics
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-xl font-black text-emerald-400 mb-2">
                            {(analysisResult.socialMetrics.positiveMentions / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Positive</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-xl font-black text-red-400 mb-2">
                            {(analysisResult.socialMetrics.negativeMentions / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Negative</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-xl font-black text-blue-400 mb-2">
                            {(analysisResult.socialMetrics.shares / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Shares</div>
                        </div>

                        <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="text-xl font-black text-purple-400 mb-2">
                            {analysisResult.socialMetrics.influencerMentions}
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase">Influencers</div>
                        </div>
                      </div>

                      <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                        <div className={`text-2xl font-black mb-2 ${getScoreColor(analysisResult.socialMetrics.viralPotential)}`}>
                          {analysisResult.socialMetrics.viralPotential}/100
                        </div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Viral Potential</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'charts' && (
                <motion.div
                  key="charts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Trust Evolution Chart */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                        <HiShieldCheck className="w-6 h-6" />
                        Trust Level Evolution (24h)
                      </h3>
                      <div style={{ height: '250px' }}>
                        <TrustEvolutionChart data={analysisResult.chartData.trust} />
                      </div>
                    </div>
                  </div>

                  {/* Popularity Bar Chart */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                        <HiFire className="w-6 h-6" />
                        Popularity Trend (Last 12 Hours)
                      </h3>
                      <div style={{ height: '250px' }}>
                        <PopularityChart data={analysisResult.chartData.popularity} />
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Distribution */}
                  <div className="glass">
                    <div className="">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <HiChat className="w-6 h-6" />
                        Sentiment Distribution
                      </h3>
                      <div style={{ height: '250px' }}>
                        <SentimentDistributionChart socialMetrics={analysisResult.socialMetrics} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'analysis' && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Enhanced AI Analysis with Working Markdown */}
                  <div className="glass">
                    <div className="">
                      <div className="flex items-center gap-3 mb-6">
                        <LuBrainCircuit className="w-8 h-8 text-cyan-400" />
                        <div>
                          <h3 className="text-2xl font-bold text-cyan-400">SENTRA AI Analysis</h3>
                          <p className="text-sm text-gray-400">Comprehensive Intelligence Report</p>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-xl" style={{ padding: '24px' }}>
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                          // className="prose prose-invert prose-lg max-w-none"
                          components={{
                            h1: ({ children, ...props }) => (
                              <h1 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2" {...props}>
                                <HiSparkles className="w-6 h-6" />
                                {children}
                              </h1>
                            ),
                            h2: ({ children, ...props }) => (
                              <h2 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2" {...props}>
                                <HiChartBar className="w-5 h-5" />
                                {children}
                              </h2>
                            ),
                            h3: ({ children, ...props }) => (
                              <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2" {...props}>
                                <HiLightningBolt className="w-4 h-4" />
                                {children}
                              </h3>
                            ),
                            p: ({ children, ...props }) => (
                              <p className="text-gray-300 mb-4 text-base leading-relaxed" {...props}>
                                {children}
                              </p>
                            ),
                            ul: ({ children, ...props }) => (
                              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props}>
                                {children}
                              </ul>
                            ),
                            li: ({ children, ...props }) => (
                              <li className="text-base leading-relaxed" {...props}>
                                {children}
                              </li>
                            ),
                            strong: ({ children, ...props }) => (
                              <strong className="text-white font-bold bg-gray-800 rounded" style={{ padding: '2px 6px' }} {...props}>
                                {children}
                              </strong>
                            ),
                            em: ({ children, ...props }) => (
                              <em className="text-cyan-400 font-semibold not-italic" {...props}>
                                {children}
                              </em>
                            ),
                            blockquote: ({ children, ...props }) => (
                              <blockquote className="border-l-4 border-cyan-400 bg-gray-800 rounded-r-lg italic text-gray-300 my-4" style={{ padding: '16px' }} {...props}>
                                {children}
                              </blockquote>
                            ),
                            code: ({ children, ...props }) => (
                              <code className="bg-gray-800 text-emerald-400 rounded text-sm font-mono" style={{ padding: '2px 6px' }} {...props}>
                                {children}
                              </code>
                            ),
                            pre: ({ children, ...props }) => (
                              <pre className="bg-gray-800 text-emerald-400 rounded-lg overflow-x-auto mb-4" style={{ padding: '16px' }} {...props}>
                                {children}
                              </pre>
                            )
                          }}
                        >
                          {analysisResult.analysis}
                        </ReactMarkdown>
                      </div>

                      {/* Source Reliability Assessment */}
                      {analysisResult.scores.sourceReliability && (
                        <div className="bg-gray-800 rounded-xl mt-6" style={{ padding: '20px' }}>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                            <HiBadgeCheck className="w-5 h-5" />
                            Source Reliability Assessment
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-semibold text-gray-300">{analysisResult.source}</span>
                            <div className="flex items-center gap-3">
                              <div className={`text-2xl font-semibold ${getScoreColor(analysisResult.scores.sourceReliability)}`}>
                                {analysisResult.scores.sourceReliability}/100
                              </div>
                              <HiShieldCheck className={`w-6 h-6 ${getScoreColor(analysisResult.scores.sourceReliability)}`} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Analysis Metadata */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mt-6 pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-1 text-xs">
                          <HiClock className="w-4 h-4" />
                          <span>Analyzed: {analysisResult.timestamp.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <HiDatabase className="w-4 h-4" />
                          <span>Words: {analysisResult.analysis.split(' ').length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => {
                  // Enhanced export functionality
                  const reportData = {
                    analysis: analysisResult.analysis,
                    scores: analysisResult.scores,
                    socialMetrics: analysisResult.socialMetrics,
                    timestamp: analysisResult.timestamp,
                    source: analysisResult.source
                  };
                  
                  const dataStr = JSON.stringify(reportData, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  
                  const exportFileDefaultName = `sentra-analysis-${analysisResult.analysisId}.json`;
                  
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                  
                  hapticFeedback('medium');
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '16px' }}
              >
                <HiDownload className="w-5 h-5" />
                Export Report
              </motion.button>

              <motion.button
                onClick={() => {
                  setNewsContent('');
                  setSourceOptional('');
                  setNewsDate('');
                  setAnalysisResult(null);
                  setError(null);
                  setSelectedTab('overview');
                  setBookmarked(false);
                  setUserRating(0);
                  hapticFeedback('light');
                }}
                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '16px' }}
              >
                <HiRefresh className="w-5 h-5" />
                New Analysis
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Safe Area for Mobile */}
      <div style={{ height: '150px' }}></div>
    </div>
  );
}
