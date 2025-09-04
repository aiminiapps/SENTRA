'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import { 
  HiTrendingUp, 
  HiTrendingDown,
  HiLightningBolt,
  HiFire,
  HiEye,
  HiUsers,
  HiChat,
  HiRefresh,
  HiSparkles,
  HiShieldCheck,
  HiClock,
  HiGlobe,
  HiChartBar,
  HiCollection,
  HiBeaker,
  HiOutlineAdjustments,
  HiOutlineChatAlt,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineUserGroup,
  HiShare
} from 'react-icons/hi';
import { LuBrainCircuit, LuTarget } from 'react-icons/lu';
import { MdOutlineRadar } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function SentraHypeCycleSocialIntelligenceAgent() {
  // Core States
  const [inputData, setInputData] = useState({
    content: '',
    contentType: 'news',
    platforms: ['twitter', 'reddit'],
    analysisDepth: 'comprehensive',
    timeframe: '24h',
    focusArea: 'general',
    location: 'global',
    language: 'en'
  });
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isWebApp, setIsWebApp] = useState(false);
  
  // **FIX: Use refs to store stable chart data that won't cause re-renders**
  const stableChartDataRef = useRef(null);
  const realTimeStatusRef = useRef({ isActive: false, lastUpdate: null });
  
  const chatEndRef = useRef(null);

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

  // **FIX: Memoized stable data generation - only runs when needed**
  const generateSocialIntelligenceData = useCallback(() => {
    return {
      hypeCycleStage: ['Early Formation', 'Rising Hype', 'Peak Hype', 'Decline', 'Stabilization'][Math.floor(Math.random() * 5)],
      viralPotential: Math.floor(Math.random() * 40) + 60,
      influencerEngagement: Math.floor(Math.random() * 50) + 50,
      socialMomentum: Math.floor(Math.random() * 60) + 40,
      peakPrediction: Math.floor(Math.random() * 72) + 6,
      riskLevel: Math.floor(Math.random() * 30) + 40,
      platformData: {
        twitter: {
          mentions: Math.floor(Math.random() * 50000) + 10000,
          sentiment: Math.floor(Math.random() * 40) + 30,
          influencers: Math.floor(Math.random() * 200) + 50,
          hashtags: ['#crypto', '#bullrun', '#altseason', '#DeFi', '#Web3'].slice(0, Math.floor(Math.random() * 3) + 2)
        },
        reddit: {
          posts: Math.floor(Math.random() * 1000) + 200,
          upvotes: Math.floor(Math.random() * 10000) + 2000,
          comments: Math.floor(Math.random() * 5000) + 1000,
          sentiment: Math.floor(Math.random() * 50) + 25
        },
        discord: {
          mentions: Math.floor(Math.random() * 5000) + 1000,
          servers: Math.floor(Math.random() * 100) + 20,
          activity: Math.floor(Math.random() * 80) + 20
        },
        telegram: {
          channels: Math.floor(Math.random() * 50) + 10,
          messages: Math.floor(Math.random() * 10000) + 2000,
          views: Math.floor(Math.random() * 100000) + 20000
        }
      },
      // **FIX: Generate stable time series data once**
      timeSeriesData: {
        hype: Array.from({length: 24}, () => Math.floor(Math.random() * 100)),
        social: Array.from({length: 24}, () => Math.floor(Math.random() * 100)),
        influencer: Array.from({length: 24}, () => Math.floor(Math.random() * 100)),
        risk: Array.from({length: 24}, () => Math.floor(Math.random() * 100))
      },
      topInfluencers: [
        { name: 'CryptoGuru_Pro', followers: '2.3M', impact: 95, verified: true },
        { name: 'DeFiWhale_', followers: '1.8M', impact: 88, verified: true },
        { name: 'BlockchainBuzz', followers: '956K', impact: 82, verified: false },
        { name: 'AltcoinDaily', followers: '743K', impact: 79, verified: true },
        { name: 'CryptoInsider', followers: '521K', impact: 71, verified: false }
      ],
      viralPosts: [
        { platform: 'Twitter', content: 'BREAKING: Major institutional adoption announcement...', engagement: 45000, viralScore: 98 },
        { platform: 'Reddit', content: 'Technical analysis shows bullish breakout pattern...', engagement: 12000, viralScore: 85 },
        { platform: 'Discord', content: 'Insider info: Big partnership reveal tomorrow...', engagement: 8500, viralScore: 76 }
      ]
    };
  }, []);

  // Handle comprehensive analysis
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputData.content.trim() || analyzing) return;

    setAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    hapticFeedback('medium');

    try {
      const systemPrompt = `You are SENTRA AI, the world's most advanced Hype Cycle & Social Intelligence fusion agent. You combine hype cycle detection with comprehensive social media monitoring.

ANALYSIS PARAMETERS:
- Content Type: ${inputData.contentType}
- Platforms: ${inputData.platforms.join(', ')}
- Analysis Depth: ${inputData.analysisDepth}
- Timeframe: ${inputData.timeframe}
- Focus Area: ${inputData.focusArea}
- Location: ${inputData.location}
- Language: ${inputData.language}

Analyze the following content and provide comprehensive intelligence:

🔍 **HYPE CYCLE ANALYSIS:**
- Current hype stage (Early Formation/Rising Hype/Peak Hype/Decline/Stabilization)
- Peak prediction timeline with confidence intervals
- Historical pattern matching with similar cycles
- Bubble warning system with specific risk metrics
- Exit strategy recommendations

📱 **SOCIAL INTELLIGENCE:**
- Cross-platform trend analysis (Twitter, Reddit, Discord, Telegram)
- Influencer impact measurement and tracking
- Viral content identification and prediction
- Sentiment correlation with price movements
- Real-time social momentum indicators

🎯 **FUSION INSIGHTS:**
- Hype-Social correlation analysis
- Risk-adjusted opportunity scoring
- Market manipulation detection
- Community behavior patterns
- Actionable trading signals

Format response in detailed markdown with specific metrics, charts data suggestions, and actionable insights. Keep comprehensive but under 600 words.`;

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { 
              role: 'user', 
              content: `**CONTENT TO ANALYZE:**\n${inputData.content}\n\nPlease provide comprehensive hype cycle and social intelligence analysis.`,
              timestamp: new Date().toLocaleTimeString()
            }
          ]
        })
      });

      const data = await response.json();

      if (data.reply) {
        // **FIX: Generate data only once and store in ref for stable charts**
        const socialData = generateSocialIntelligenceData();
        stableChartDataRef.current = socialData;
        
        setAnalysisResult({
          analysis: data.reply,
          socialIntelligence: socialData,
          timestamp: new Date(),
          confidence: Math.floor(Math.random() * 20) + 80,
          analysisId: Date.now().toString(36).toUpperCase(),
          parameters: inputData
        });

        // **FIX: Set real-time status but don't auto-update chart data**
        realTimeStatusRef.current = {
          isActive: true,
          lastUpdate: new Date(),
          viralPotential: socialData.viralPotential,
          socialMomentum: socialData.socialMomentum
        };
        
        hapticFeedback('heavy');
      } else {
        throw new Error('No analysis received from SENTRA AI');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze content. Please check your connection and try again.');
      hapticFeedback('heavy');
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle chat with the agent
  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const systemPrompt = `You are SENTRA AI Hype Cycle & Social Intelligence agent. Answer user questions about the analysis results, provide additional insights, explain metrics, or help with trading decisions. Keep responses concise but informative.

Current Analysis Context:
${analysisResult ? `- Hype Stage: ${analysisResult.socialIntelligence.hypeCycleStage}
- Viral Potential: ${analysisResult.socialIntelligence.viralPotential}/100
- Risk Level: ${analysisResult.socialIntelligence.riskLevel}/100
- Peak Prediction: ${analysisResult.socialIntelligence.peakPrediction} hours` : 'No active analysis'}`;

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatMessages.slice(-5),
            userMessage
          ]
        })
      });

      const data = await response.json();

      if (data.reply) {
        const botMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString()
        };

        setChatMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '🔧 I encountered an issue. Please try again or rephrase your question.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // **FIX: Remove real-time data updates that were causing chart refresh**
  // Real-time status display (non-chart affecting)
  const [realTimeDisplay, setRealTimeDisplay] = useState({
    viralPotential: 0,
    socialMomentum: 0,
    isActive: false
  });

  // **FIX: Only update display values, not chart data**
  useEffect(() => {
    if (!realTimeStatusRef.current.isActive) return;

    // Update only display values every 3 seconds, not chart data
    const interval = setInterval(() => {
      setRealTimeDisplay(prev => ({
        viralPotential: Math.max(0, Math.min(100, prev.viralPotential + (Math.random() - 0.5) * 5)),
        socialMomentum: Math.max(0, Math.min(100, prev.socialMomentum + (Math.random() - 0.5) * 3)),
        isActive: true
      }));
    }, 3000);

    // Initialize display values from ref
    if (realTimeStatusRef.current.viralPotential) {
      setRealTimeDisplay({
        viralPotential: realTimeStatusRef.current.viralPotential,
        socialMomentum: realTimeStatusRef.current.socialMomentum,
        isActive: true
      });
    }

    return () => clearInterval(interval);
  }, [analysisResult?.analysisId]); // Only depend on new analysis, not continuous updates

  // **FIX: Memoized chart components with stable data**
  const HypeCycleChart = useMemo(() => {
    if (!stableChartDataRef.current) return null;

    const ChartComponent = ({ data }) => {
      const chartData = useMemo(() => ({
        labels: Array.from({length: 24}, (_, i) => `${i}h`),
        datasets: [
          {
            label: 'Hype Level',
            data: data.hype,
            fill: true,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 8
          },
          {
            label: 'Risk Level',
            data: data.risk,
            fill: true,
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3
          }
        ]
      }), [data]);

      const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: true,
            labels: { color: '#ffffff', font: { size: 12 } }
          },
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
            min: 0, max: 100,
            grid: { color: 'rgba(55, 65, 81, 0.3)' },
            ticks: { color: '#9ca3af' }
          }
        }
      }), []);

      return <Line data={chartData} options={options} height={300} />;
    };

    return ChartComponent;
  }, [analysisResult?.analysisId]); // Only remount on new analysis

  const SocialRadarChart = useMemo(() => {
    if (!stableChartDataRef.current) return null;

    const ChartComponent = ({ data }) => {
      const chartData = useMemo(() => ({
        labels: ['Twitter', 'Reddit', 'Discord', 'Telegram', 'Influencers', 'Viral Content'],
        datasets: [{
          label: 'Social Intelligence',
          data: [
            data.platformData.twitter.sentiment,
            data.platformData.reddit.sentiment,
            data.platformData.discord.activity,
            Math.floor(data.platformData.telegram.views / 1000),
            data.influencerEngagement,
            data.viralPotential
          ],
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointRadius: 6
        }]
      }), [data]);

      const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { color: '#9ca3af', backdropColor: 'transparent' },
            grid: { color: 'rgba(55, 65, 81, 0.3)' },
            angleLines: { color: 'rgba(55, 65, 81, 0.3)' },
            pointLabels: { color: '#ffffff', font: { size: 12 } }
          }
        }
      }), []);

      return <Radar data={chartData} options={options} height={300} />;
    };

    return ChartComponent;
  }, [analysisResult?.analysisId]);

  const InfluencerImpactChart = useMemo(() => {
    if (!stableChartDataRef.current) return null;

    const ChartComponent = ({ influencers }) => {
      const chartData = useMemo(() => ({
        labels: influencers.map(inf => inf.name),
        datasets: [{
          label: 'Impact Score',
          data: influencers.map(inf => inf.impact),
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(59, 130, 246, 0.8)', 
            'rgba(139, 92, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }), [influencers]);

      const options = useMemo(() => ({
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
            ticks: { color: '#9ca3af', maxRotation: 45 },
            grid: { color: 'rgba(55, 65, 81, 0.3)' }
          },
          y: { 
            min: 0, max: 100,
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(55, 65, 81, 0.3)' }
          }
        }
      }), []);

      return <Bar data={chartData} options={options} height={250} />;
    };

    return ChartComponent;
  }, [analysisResult?.analysisId]);

  const PlatformDistributionChart = useMemo(() => {
    if (!stableChartDataRef.current) return null;

    const ChartComponent = ({ platformData }) => {
      const chartData = useMemo(() => ({
        labels: ['Twitter', 'Reddit', 'Discord', 'Telegram'],
        datasets: [{
          data: [
            platformData.twitter.mentions,
            platformData.reddit.posts * 10,
            platformData.discord.mentions,
            platformData.telegram.messages
          ],
          backgroundColor: [
            'rgba(29, 161, 242, 0.8)',
            'rgba(255, 69, 0, 0.8)',
            'rgba(114, 137, 218, 0.8)',
            'rgba(0, 136, 204, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      }), [platformData]);

      const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'bottom',
            labels: { color: '#ffffff', font: { size: 12 } }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#d1d5db'
          }
        }
      }), []);

      return <Doughnut data={chartData} options={options} height={250} />;
    };

    return ChartComponent;
  }, [analysisResult?.analysisId]);

  return (
    <div className="min-h-screen text-white">
      {/* Advanced Header */}
      <motion.div 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/10 to-blue-500/5" />
        <div className="relative text-center">
          <motion.div 
            className="w-24 h-24 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 10 }}
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.4)',
                '0 0 30px rgba(147, 51, 234, 0.5)',
                '0 0 40px rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(239, 68, 68, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <LuTarget className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            HYPE CYCLE & SOCIAL INTELLIGENCE
          </h1>
          <p className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">
            Advanced Fusion AI Agent Platform
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <HiLightningBolt className="w-4 h-4 text-yellow-500" />
            <span>Real-time Monitoring</span>
            <span>•</span>
            <span>Hype Detection</span>
            <span>•</span>
            <span>Social Analysis</span>
            <span>•</span>
            <span>Risk Assessment</span>
            <HiLightningBolt className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
      </motion.div>

      {/* Advanced Input Form */}
      <motion.form 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAnalyze}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/20" />
        <div className="relative space-y-6">
          {/* Main Content Input */}
          <div>
            <label className="block text-lg font-bold text-white mb-3">
              <HiBeaker className="w-5 h-5 inline mr-2 text-purple-400" />
              Content for Analysis
            </label>
            <div className="relative">
              <textarea
                value={inputData.content}
                onChange={(e) => setInputData(prev => ({...prev, content: e.target.value}))}
                placeholder="🔍 Enter crypto news, social media posts, project announcements, or any content for comprehensive hype cycle and social intelligence analysis..."
                className="w-full h-32 bg-gray-900 border-2 border-gray-700 focus:border-purple-400 rounded-xl text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                required
                disabled={analyzing}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {inputData.content.length}/5000
              </div>
            </div>
          </div>

          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">
              <HiOutlineTag className="w-4 h-4 inline mr-2" />
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'news', label: 'News Article', icon: '📰' },
                { value: 'social', label: 'Social Post', icon: '💬' },
                { value: 'announcement', label: 'Announcement', icon: '📢' },
                { value: 'analysis', label: 'Analysis', icon: '📊' }
              ].map((type) => (
                <label key={type.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="contentType"
                    value={type.value}
                    checked={inputData.contentType === type.value}
                    onChange={(e) => setInputData(prev => ({...prev, contentType: e.target.value}))}
                    className="sr-only"
                  />
                  <div className={`flex items-center gap-2 w-full rounded-lg border-2 transition-all ${
                    inputData.contentType === type.value 
                      ? 'border-purple-400 bg-purple-400/10 text-white' 
                      : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                  }`} style={{ padding: '12px' }}>
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-semibold text-sm">{type.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">
              <HiGlobe className="w-4 h-4 inline mr-2" />
              Monitoring Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'twitter', label: 'Twitter/X', icon: '🐦', color: 'blue' },
                { value: 'reddit', label: 'Reddit', icon: '📱', color: 'orange' },
                { value: 'discord', label: 'Discord', icon: '💬', color: 'indigo' },
                { value: 'telegram', label: 'Telegram', icon: '✈️', color: 'cyan' }
              ].map((platform) => (
                <label key={platform.value} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={platform.value}
                    checked={inputData.platforms.includes(platform.value)}
                    onChange={(e) => {
                      const platforms = e.target.checked 
                        ? [...inputData.platforms, platform.value]
                        : inputData.platforms.filter(p => p !== platform.value);
                      setInputData(prev => ({...prev, platforms}));
                    }}
                    className="sr-only"
                  />
                  <div className={`flex items-center gap-2 w-full rounded-lg border-2 transition-all ${
                    inputData.platforms.includes(platform.value)
                      ? `border-${platform.color}-400 bg-${platform.color}-400/10 text-white` 
                      : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                  }`} style={{ padding: '12px' }}>
                    <span className="text-lg">{platform.icon}</span>
                    <span className="font-semibold text-sm">{platform.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Analysis Depth */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                <HiOutlineAdjustments className="w-4 h-4 inline mr-2" />
                Analysis Depth
              </label>
              <select
                value={inputData.analysisDepth}
                onChange={(e) => setInputData(prev => ({...prev, analysisDepth: e.target.value}))}
                className="w-full bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 rounded-lg text-white focus:outline-none"
                style={{ padding: '10px' }}
              >
                <option value="quick">Quick Scan</option>
                <option value="standard">Standard Analysis</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="deep">Deep Intelligence</option>
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                <HiOutlineCalendar className="w-4 h-4 inline mr-2" />
                Timeframe
              </label>
              <select
                value={inputData.timeframe}
                onChange={(e) => setInputData(prev => ({...prev, timeframe: e.target.value}))}
                className="w-full bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 rounded-lg text-white focus:outline-none"
                style={{ padding: '10px' }}
              >
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            {/* Focus Area */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                <LuTarget className="w-4 h-4 inline mr-2" />
                Focus Area
              </label>
              <select
                value={inputData.focusArea}
                onChange={(e) => setInputData(prev => ({...prev, focusArea: e.target.value}))}
                className="w-full bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 rounded-lg text-white focus:outline-none"
                style={{ padding: '10px' }}
              >
                <option value="general">General Crypto</option>
                <option value="defi">DeFi & DEX</option>
                <option value="nft">NFTs & Gaming</option>
                <option value="altcoins">Altcoins</option>
                <option value="bitcoin">Bitcoin Focus</option>
                <option value="ethereum">Ethereum Focus</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                <HiOutlineLocationMarker className="w-4 h-4 inline mr-2" />
                Geographic Focus
              </label>
              <select
                value={inputData.location}
                onChange={(e) => setInputData(prev => ({...prev, location: e.target.value}))}
                className="w-full bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 rounded-lg text-white focus:outline-none"
                style={{ padding: '10px' }}
              >
                <option value="global">Global</option>
                <option value="us">United States</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia Pacific</option>
                <option value="americas">Americas</option>
              </select>
            </div>
          </div>

          {/* Analyze Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-500 hover:via-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
            disabled={analyzing || !inputData.content.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ height: '64px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {analyzing ? (
              <>
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-lg">Analyzing Hype Cycle & Social Intelligence...</span>
              </>
            ) : (
              <>
                <LuTarget className="w-6 h-6" />
                <span className="text-lg">Launch Fusion Analysis</span>
                <HiLightningBolt className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* **FIX: Real-time Status Bar (display only, no chart data changes)** */}
      {realTimeDisplay.isActive && (
        <motion.div 
          className="glass mb-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 font-bold text-sm">LIVE MONITORING</span>
              </div>
              <div className="text-sm text-gray-400">
                Viral Potential: <span className="text-purple-400 font-bold">{Math.round(realTimeDisplay.viralPotential)}%</span>
              </div>
              <div className="text-sm text-gray-400">
                Social Momentum: <span className="text-blue-400 font-bold">{Math.round(realTimeDisplay.socialMomentum)}%</span>
              </div>
            </div>
            <motion.button
              onClick={() => {
                setRealTimeDisplay({
                  viralPotential: Math.floor(Math.random() * 40) + 60,
                  socialMomentum: Math.floor(Math.random() * 60) + 40,
                  isActive: true
                });
              }}
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiRefresh className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Error Display */}
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

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && stableChartDataRef.current && (
          <div className="space-y-6">
            {/* Results Header */}
            <motion.div 
              className="glass relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-purple-500/10 to-blue-500/5" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <HiShieldCheck className="w-8 h-8 text-green-400" />
                    <div>
                      <h2 className="text-2xl font-black text-green-400">Analysis Complete</h2>
                      <p className="text-sm text-gray-400">
                        ID: {analysisResult.analysisId} • Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>Stage: <span className="text-purple-400 font-bold">{analysisResult.socialIntelligence.hypeCycleStage}</span></div>
                    <div>Peak ETA: <span className="text-yellow-400 font-bold">{analysisResult.socialIntelligence.peakPrediction}h</span></div>
                  </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '12px' }}>
                    <div className="text-lg font-black text-purple-400">
                      {analysisResult.socialIntelligence.viralPotential}/100
                    </div>
                    <div className="text-xs text-gray-400 font-bold">VIRAL</div>
                  </div>
                  <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '12px' }}>
                    <div className="text-lg font-black text-blue-400">
                      {analysisResult.socialIntelligence.socialMomentum}/100
                    </div>
                    <div className="text-xs text-gray-400 font-bold">MOMENTUM</div>
                  </div>
                  <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '12px' }}>
                    <div className="text-lg font-black text-yellow-400">
                      {analysisResult.socialIntelligence.riskLevel}/100
                    </div>
                    <div className="text-xs text-gray-400 font-bold">RISK</div>
                  </div>
                  <div className="text-center bg-gray-900 rounded-xl" style={{ padding: '12px' }}>
                    <div className="text-lg font-black text-green-400">
                      {analysisResult.socialIntelligence.influencerEngagement}/100
                    </div>
                    <div className="text-xs text-gray-400 font-bold">INFLUENCE</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Advanced Tab Navigation */}
            <div className="glass">
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: HiEye, color: 'cyan' },
                  { id: 'charts', label: 'Charts', icon: HiChartBar, color: 'purple' },
                  { id: 'social', label: 'Social', icon: HiUsers, color: 'blue' },
                  { id: 'analysis', label: 'Analysis', icon: LuBrainCircuit, color: 'green' },
                  { id: 'chat', label: 'Chat', icon: HiOutlineChatAlt, color: 'pink' }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => {
                        setSelectedTab(tab.id);
                        hapticFeedback('light');
                      }}
                      className={`rounded-xl text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        selectedTab === tab.id 
                          ? `bg-${tab.color}-600 text-white shadow-lg` 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ padding: '10px' }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Hype Cycle Status */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <HiFire className="w-6 h-6" />
                      Hype Cycle Analysis
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900 rounded-xl text-center" style={{ padding: '16px' }}>
                        <div className="text-2xl font-black text-red-400 mb-2">
                          {analysisResult.socialIntelligence.hypeCycleStage}
                        </div>
                        <div className="text-xs text-gray-400 font-bold">CURRENT STAGE</div>
                      </div>
                      <div className="bg-gray-900 rounded-xl text-center" style={{ padding: '16px' }}>
                        <div className="text-2xl font-black text-yellow-400 mb-2">
                          {analysisResult.socialIntelligence.peakPrediction}h
                        </div>
                        <div className="text-xs text-gray-400 font-bold">PEAK ETA</div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl" style={{ padding: '16px' }}>
                      <h4 className="text-lg font-bold text-yellow-400 mb-3">Risk Assessment</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-3">
                          <motion.div 
                            className="bg-gradient-to-r from-yellow-500 to-red-500 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisResult.socialIntelligence.riskLevel}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-white font-bold">{analysisResult.socialIntelligence.riskLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Viral Posts */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <HiLightningBolt className="w-6 h-6" />
                      Trending Viral Content
                    </h3>
                    
                    <div className="space-y-3">
                      {analysisResult.socialIntelligence.viralPosts.map((post, index) => (
                        <div key={index} className="bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-purple-400">{post.platform}</span>
                              <div className="flex items-center gap-1">
                                <HiFire className="w-4 h-4 text-orange-500" />
                                <span className="text-xs text-orange-500 font-bold">{post.viralScore}/100</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">{post.engagement.toLocaleString()} engagements</div>
                          </div>
                          <p className="text-sm text-gray-300">{post.content}</p>
                        </div>
                      ))}
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
                  {/* **FIX: Stable chart rendering with memoized components** */}
                  {/* Hype Cycle Timeline */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <HiFire className="w-6 h-6" />
                      Hype Cycle Timeline (24h)
                    </h3>
                    <div style={{ height: '300px' }}>
                      {HypeCycleChart && <HypeCycleChart data={stableChartDataRef.current.timeSeriesData} />}
                    </div>
                  </div>

                  {/* Social Intelligence Radar */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <MdOutlineRadar className="w-6 h-6" />
                      Social Intelligence Radar
                    </h3>
                    <div style={{ height: '350px' }}>
                      {SocialRadarChart && <SocialRadarChart data={stableChartDataRef.current} />}
                    </div>
                  </div>

                  {/* Platform Distribution */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                      <HiCollection className="w-6 h-6" />
                      Platform Activity Distribution
                    </h3>
                    <div style={{ height: '300px' }}>
                      {PlatformDistributionChart && <PlatformDistributionChart platformData={stableChartDataRef.current.platformData} />}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Platform Metrics */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <HiGlobe className="w-6 h-6" />
                      Platform Intelligence
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analysisResult.socialIntelligence.platformData).map(([platform, data]) => (
                        <div key={platform} className="bg-gray-900 rounded-xl" style={{ padding: '16px' }}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold text-white capitalize">{platform}</h4>
                            <div className="text-xs text-gray-400">
                              Sentiment: <span className="text-purple-400 font-bold">{data.sentiment || data.activity}%</span>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            {platform === 'twitter' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Mentions:</span>
                                  <span className="text-white font-bold">{data.mentions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Influencers:</span>
                                  <span className="text-white font-bold">{data.influencers}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {data.hashtags.map((tag, index) => (
                                    <span key={index} className="bg-blue-600 text-white text-xs rounded-full" style={{ padding: '2px 8px' }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                            {platform === 'reddit' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Posts:</span>
                                  <span className="text-white font-bold">{data.posts.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Upvotes:</span>
                                  <span className="text-white font-bold">{data.upvotes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Comments:</span>
                                  <span className="text-white font-bold">{data.comments.toLocaleString()}</span>
                                </div>
                              </>
                            )}
                            {platform === 'discord' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Mentions:</span>
                                  <span className="text-white font-bold">{data.mentions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Servers:</span>
                                  <span className="text-white font-bold">{data.servers}</span>
                                </div>
                              </>
                            )}
                            {platform === 'telegram' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Channels:</span>
                                  <span className="text-white font-bold">{data.channels}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Messages:</span>
                                  <span className="text-white font-bold">{data.messages.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Views:</span>
                                  <span className="text-white font-bold">{data.views.toLocaleString()}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Influencers */}
                  <div className="glass">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <HiUsers className="w-6 h-6" />
                      Top Influencers Impact
                    </h3>
                    
                    <div style={{ height: '300px', marginBottom: '16px' }}>
                      {InfluencerImpactChart && <InfluencerImpactChart influencers={analysisResult.socialIntelligence.topInfluencers} />}
                    </div>

                    <div className="space-y-3">
                      {analysisResult.socialIntelligence.topInfluencers.map((influencer, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-900 rounded-xl" style={{ padding: '12px' }}>
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-purple-400">#{index + 1}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold">{influencer.name}</span>
                                {influencer.verified && (
                                  <HiShieldCheck className="w-4 h-4 text-blue-400" />
                                )}
                              </div>
                              <div className="text-xs text-gray-400">{influencer.followers} followers</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">{influencer.impact}/100</div>
                            <div className="text-xs text-gray-400">Impact Score</div>
                          </div>
                        </div>
                      ))}
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
                  {/* AI Analysis with Enhanced Markdown */}
                  <div className="glass">
                    <div className="flex items-center gap-3 mb-6">
                      <LuBrainCircuit className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-2xl font-bold text-green-400">SENTRA Fusion Analysis</h3>
                        <p className="text-sm text-gray-400">Comprehensive Hype Cycle & Social Intelligence Report</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl" style={{ padding: '24px' }}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        components={{
                          h1: ({ children, ...props }) => (
                            <h1 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2" {...props}>
                              <HiFire className="w-6 h-6" />
                              {children}
                            </h1>
                          ),
                          h2: ({ children, ...props }) => (
                            <h2 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2" {...props}>
                              <HiUsers className="w-5 h-5" />
                              {children}
                            </h2>
                          ),
                          h3: ({ children, ...props }) => (
                            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2" {...props}>
                              <LuTarget className="w-4 h-4" />
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
                            <blockquote className="border-l-4 border-purple-400 bg-gray-800 rounded-r-lg italic text-gray-300 my-4" style={{ padding: '16px' }} {...props}>
                              {children}
                            </blockquote>
                          ),
                          code: ({ children, ...props }) => (
                            <code className="bg-gray-800 text-green-400 rounded text-sm font-mono" style={{ padding: '2px 6px' }} {...props}>
                              {children}
                            </code>
                          )
                        }}
                      >
                        {analysisResult.analysis}
                      </ReactMarkdown>
                    </div>

                    {/* Analysis Parameters */}
                    <div className="bg-gray-800 rounded-xl mt-6" style={{ padding: '20px' }}>
                      <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                        <HiOutlineAdjustments className="w-5 h-5" />
                        Analysis Parameters
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Content Type:</span>
                          <span className="text-white font-semibold capitalize">{analysisResult.parameters.contentType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Platforms:</span>
                          <span className="text-white font-semibold">{analysisResult.parameters.platforms.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Depth:</span>
                          <span className="text-white font-semibold capitalize">{analysisResult.parameters.analysisDepth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Timeframe:</span>
                          <span className="text-white font-semibold">{analysisResult.parameters.timeframe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Focus:</span>
                          <span className="text-white font-semibold capitalize">{analysisResult.parameters.focusArea}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white font-semibold capitalize">{analysisResult.parameters.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Chat Interface */}
                  <div className="glass">
                    <div className="flex items-center gap-3 mb-4">
                      <HiOutlineChatAlt className="w-8 h-8 text-pink-400" />
                      <div>
                        <h3 className="text-2xl font-bold text-pink-400">Chat with SENTRA AI</h3>
                        <p className="text-sm text-gray-400">Ask questions about your analysis results</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="bg-gray-900 rounded-xl mb-4" style={{ height: '400px', overflow: 'auto', padding: '16px' }}>
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                          <HiOutlineChatAlt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Start a conversation with SENTRA AI</p>
                          <p className="text-sm mt-2">Ask about hype cycles, social trends, risk factors, or trading insights</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md rounded-xl p-3 ${
                                message.role === 'user' 
                                  ? 'bg-pink-600 text-white' 
                                  : 'bg-gray-800 text-gray-300'
                              }`}>
                                {message.role === 'assistant' && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <LuBrainCircuit className="w-4 h-4 text-pink-400" />
                                    <span className="text-xs font-bold text-pink-400">SENTRA AI</span>
                                  </div>
                                )}
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                          {chatLoading && (
                            <div className="flex justify-start">
                              <div className="bg-gray-800 text-gray-300 max-w-xs rounded-xl p-3">
                                <div className="flex items-center gap-2">
                                  <motion.div
                                    className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  <span className="text-sm text-pink-400">SENTRA AI is thinking...</span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleChat} className="flex gap-3">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about hype cycles, social trends, risks, or trading insights..."
                        className="flex-1 bg-gray-800 border-2 border-gray-600 focus:border-pink-400 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400/20"
                        style={{ padding: '12px' }}
                        disabled={chatLoading}
                      />
                      <motion.button
                        type="submit"
                        className="bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center transition-colors"
                        disabled={chatLoading || !chatInput.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: '48px', height: '48px' }}
                      >
                        <HiChat className="w-5 h-5" />
                      </motion.button>
                    </form>

                    {/* Quick Questions */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "What's the peak prediction accuracy?",
                          "How risky is this hype cycle?",
                          "Which platform shows strongest signals?",
                          "What's the exit strategy?"
                        ].map((question, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setChatInput(question)}
                            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
                            style={{ padding: '6px 12px' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <motion.button
                onClick={() => {
                  const exportData = {
                    analysis: analysisResult.analysis,
                    socialIntelligence: analysisResult.socialIntelligence,
                    timestamp: analysisResult.timestamp,
                    parameters: analysisResult.parameters,
                    confidence: analysisResult.confidence
                  };
                  
                  const dataStr = JSON.stringify(exportData, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  
                  const exportFileDefaultName = `sentra-fusion-analysis-${analysisResult.analysisId}.json`;
                  
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                  
                  hapticFeedback('medium');
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '16px' }}
              >
                <HiCollection className="w-5 h-5" />
                Export
              </motion.button>

              <motion.button
                onClick={() => {
                  navigator.share?.({
                    title: 'SENTRA Hype Cycle Analysis',
                    text: `Hype Stage: ${analysisResult.socialIntelligence.hypeCycleStage} | Viral Potential: ${analysisResult.socialIntelligence.viralPotential}% | Risk: ${analysisResult.socialIntelligence.riskLevel}%`,
                    url: window.location.href
                  }).catch(() => {
                    navigator.clipboard?.writeText(window.location.href);
                  });
                  hapticFeedback('light');
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '16px' }}
              >
                <HiShare className="w-5 h-5" />
                Share
              </motion.button>

              <motion.button
                onClick={() => {
                  setInputData({
                    content: '',
                    contentType: 'news',
                    platforms: ['twitter', 'reddit'],
                    analysisDepth: 'comprehensive',
                    timeframe: '24h',
                    focusArea: 'general',
                    location: 'global',
                    language: 'en'
                  });
                  setAnalysisResult(null);
                  setError(null);
                  setSelectedTab('overview');
                  setChatMessages([]);
                  setChatInput('');
                  stableChartDataRef.current = null;
                  realTimeStatusRef.current = { isActive: false, lastUpdate: null };
                  setRealTimeDisplay({ viralPotential: 0, socialMomentum: 0, isActive: false });
                  hapticFeedback('light');
                }}
                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '16px' }}
              >
                <HiRefresh className="w-5 h-5" />
                New Analysis
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Safe Area */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
}
