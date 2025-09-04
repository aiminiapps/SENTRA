'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  HiLightningBolt
} from 'react-icons/hi';
import { LuBrainCircuit } from 'react-icons/lu';
import { BsExclamationTriangle } from "react-icons/bs";

export default function SentraNewsIntelligenceDashboard() {
  const [newsContent, setNewsContent] = useState('');
  const [sourceOptional, setSourceOptional] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);

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

  // Generate mock chart data for visualization
  const generateChartData = (baseScore) => {
    const points = [];
    for (let i = 0; i < 24; i++) {
      const variation = (Math.random() - 0.5) * 20;
      const value = Math.max(0, Math.min(100, baseScore + variation));
      points.push(value);
    }
    return points;
  };

  const handleAnalyzeNews = async (e) => {
    e.preventDefault();
    if (!newsContent.trim() || analyzing) return;

    setAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    hapticFeedback('medium');

    try {
      const systemPrompt = `You are SENTRA AI, an advanced cryptocurrency intelligence system specializing in news analysis and market sentiment. 

Analyze the following crypto news content and provide a comprehensive assessment with EXACT scores and insights:

🔍 **ANALYSIS REQUEST:**
- Trust Level: Rate credibility (0-100)
- Authenticity: Assess genuineness (0-100)  
- Risk Level: Evaluate market risk (Low/Medium/High)
- Market Impact: Potential price impact (0-100)
- Sentiment: Overall sentiment (Bullish/Neutral/Bearish)
- Urgency: Time-sensitive rating (0-100)
- Source Reliability: If source provided, rate reliability (0-100)

🎯 **PROVIDE ANALYSIS WITH:**
- Brief summary of key findings
- Specific risk factors identified
- Market implications
- Recommended actions for traders
- Timeline expectations

Format response in clear sections with specific numerical scores. Keep analysis under 300 words but comprehensive.`;

      const userMessage = {
        role: 'user',
        content: `**NEWS CONTENT:**\n${newsContent}\n\n**SOURCE:** ${sourceOptional || 'Not specified'}\n\nPlease provide comprehensive SENTRA intelligence analysis.`,
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
        // Generate mock scores for demonstration (in production, parse from AI response)
        const mockScores = {
          trustLevel: Math.floor(Math.random() * 40) + 60, // 60-100
          authenticity: Math.floor(Math.random() * 50) + 50, // 50-100
          riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          marketImpact: Math.floor(Math.random() * 60) + 40, // 40-100
          sentiment: ['Bullish', 'Neutral', 'Bearish'][Math.floor(Math.random() * 3)],
          urgency: Math.floor(Math.random() * 80) + 20, // 20-100
          sourceReliability: sourceOptional ? Math.floor(Math.random() * 40) + 60 : null
        };

        setAnalysisResult({
          analysis: data.reply,
          scores: mockScores,
          chartData: {
            trust: generateChartData(mockScores.trustLevel),
            impact: generateChartData(mockScores.marketImpact),
            urgency: generateChartData(mockScores.urgency)
          },
          timestamp: new Date(),
          source: sourceOptional || 'Unknown Source'
        });

        hapticFeedback('heavy');
      } else {
        throw new Error('No analysis received from SENTRA AI');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze news. Please try again.');
      hapticFeedback('heavy');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'Bullish': return <HiTrendingUp className="w-5 h-5 text-green-500" />;
      case 'Bearish': return <HiTrendingDown className="w-5 h-5 text-red-500" />;
      default: return <HiChartBar className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Mini Chart Component
  const MiniChart = ({ data, color, label }) => (
    <div className="bg-gray-800 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-400">{label}</span>
        <HiChartBar className={`w-4 h-4 ${color}`} />
      </div>
      <div className="h-12 flex items-end gap-1">
        {data.slice(0, 12).map((value, index) => (
          <motion.div
            key={index}
            className={`flex-1 bg-gradient-to-t from-gray-700 ${color.replace('text-', 'to-')} rounded-sm`}
            style={{ height: `${(value / 100) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / 100) * 100}%` }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto">
      {/* Header */}
      <motion.div 
        className="glass mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 text-center">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-3"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <LuBrainCircuit className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SENTRA NEWS INTEL
          </h1>
          <p className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
            AI-Powered News Analysis
          </p>
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.form 
        className="glass mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleAnalyzeNews}
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              <HiNewspaper className="w-4 h-4 inline mr-2" />
              Crypto News Content
            </label>
            <textarea
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              placeholder="Paste your crypto news, analysis, or market updates here..."
              className="w-full h-32 bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              disabled={analyzing}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              <HiGlobe className="w-4 h-4 inline mr-2" />
              Source (Optional)
            </label>
            <input
              type="text"
              value={sourceOptional}
              onChange={(e) => setSourceOptional(e.target.value)}
              placeholder="e.g., Twitter, CoinDesk, Reuters..."
              className="w-full bg-gray-800 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              disabled={analyzing}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            disabled={analyzing || !newsContent.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {analyzing ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Analyzing Intelligence...
              </>
            ) : (
              <>
                <LuBrainCircuit className="w-5 h-5" />
                Analyze with SENTRA AI
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Error Display */}
      {error && (
        <motion.div 
          className="glass bg-red-900/20 border border-red-500/30 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="p-4 flex items-center gap-3">
            <BsExclamationTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <span className="text-red-400 font-medium">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            {/* Intelligence Overview */}
            <div className="glass">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <HiShieldCheck className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-cyan-400">Intelligence Overview</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className={`text-2xl font-black mb-1 ${getScoreColor(analysisResult.scores.trustLevel)}`}>
                      {analysisResult.scores.trustLevel}/100
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">TRUST LEVEL</div>
                  </div>

                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className={`text-2xl font-black mb-1 ${getScoreColor(analysisResult.scores.authenticity)}`}>
                      {analysisResult.scores.authenticity}/100
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">AUTHENTICITY</div>
                  </div>

                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className={`text-lg font-black mb-1 flex items-center justify-center gap-1 ${getRiskColor(analysisResult.scores.riskLevel)}`}>
                      {analysisResult.scores.riskLevel === 'High' && <BsExclamationTriangle className="w-5 h-5" />}
                      {analysisResult.scores.riskLevel === 'Medium' && <HiChartBar className="w-5 h-5" />}
                      {analysisResult.scores.riskLevel === 'Low' && <HiShieldCheck className="w-5 h-5" />}
                      {analysisResult.scores.riskLevel}
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">RISK LEVEL</div>
                  </div>

                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className="text-lg font-black mb-1 flex items-center justify-center gap-1">
                      {getSentimentIcon(analysisResult.scores.sentiment)}
                      <span className={
                        analysisResult.scores.sentiment === 'Bullish' ? 'text-green-500' :
                        analysisResult.scores.sentiment === 'Bearish' ? 'text-red-500' : 'text-yellow-500'
                      }>
                        {analysisResult.scores.sentiment}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">SENTIMENT</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className={`text-xl font-black mb-1 ${getScoreColor(analysisResult.scores.marketImpact)}`}>
                      {analysisResult.scores.marketImpact}/100
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">MARKET IMPACT</div>
                  </div>

                  <div className="text-center p-3 bg-gray-800 rounded-xl">
                    <div className={`text-xl font-black mb-1 ${getScoreColor(analysisResult.scores.urgency)}`}>
                      {analysisResult.scores.urgency}/100
                    </div>
                    <div className="text-xs text-gray-400 font-semibold">URGENCY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intelligence Charts */}
            <div className="glass">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <HiChartBar className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-purple-400">Intelligence Trends</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <MiniChart 
                    data={analysisResult.chartData.trust} 
                    color="text-green-500" 
                    label="Trust Evolution (24h)" 
                  />
                  <MiniChart 
                    data={analysisResult.chartData.impact} 
                    color="text-yellow-500" 
                    label="Impact Forecast" 
                  />
                  <MiniChart 
                    data={analysisResult.chartData.urgency} 
                    color="text-red-500" 
                    label="Urgency Timeline" 
                  />
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="glass">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <LuBrainCircuit className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-cyan-400">SENTRA AI Analysis</h2>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="prose prose-invert prose-sm max-w-none">
                    {analysisResult.analysis.split('\n').map((line, index) => (
                      <p key={index} className="mb-2 text-gray-300 leading-relaxed text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <HiClock className="w-4 h-4" />
                    <span>Analyzed: {analysisResult.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiGlobe className="w-4 h-4" />
                    <span>Source: {analysisResult.source}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Source Reliability (if source provided) */}
            {analysisResult.scores.sourceReliability && (
              <div className="glass">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <HiShieldCheck className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-400">Source Reliability</h3>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className={`text-3xl font-black mb-2 ${getScoreColor(analysisResult.scores.sourceReliability)}`}>
                      {analysisResult.scores.sourceReliability}/100
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">
                      {analysisResult.source} Reliability Score
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <motion.button
              onClick={() => {
                setNewsContent('');
                setSourceOptional('');
                setAnalysisResult(null);
                setError(null);
                hapticFeedback('light');
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiRefresh className="w-5 h-5" />
              Analyze New Content
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Safe Area */}
      <div className="h-20"></div>
    </div>
  );
}
