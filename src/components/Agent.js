'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiArrowLeft,
  HiOutlineChartBar,
  HiOutlineDocumentAdd,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiSparkles,
  HiPlay,
  HiOutlineDownload,
  HiOutlineClipboard,
  HiOutlineStar,
  HiRefresh,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineFire,
  HiOutlineBell,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineBriefcase,
  HiOutlineChatAlt,
  HiOutlineUser,
  HiOutlineExclamation,
  HiOutlineLightningBolt,
  HiOutlineHeart,
  HiOutlineEye,
  HiOutlineChartPie
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const quantoraAgents = [
  {
    id: 'tokenomics_ai',
    name: 'TokenMaster AI',
    subtitle: 'Supply & Economics Expert',
    symbol: 'TM',
    description: 'Advanced tokenomics analysis with dynamic modeling, inflation forecasting, and sustainability scoring',
    icon: HiOutlineChartBar,
    color: 'lime-400',
    gradient: 'from-lime-400 to-green-500',
    performance: 95,
    winRate: 92,
    responseTime: '0.3s',
    users: 54000,
    energyLevel: 89,
    successRate: 94,
    totalAnalyses: 12500,
    badges: ['AI-Powered', 'Real-Time', 'Expert Level'],
    uniqueFeature: 'Interactive Supply-Demand Graph with Live Predictions',
    keyMetrics: {
      accuracy: '95%',
      speed: '0.3s',
      uptime: '99.9%',
      satisfaction: '4.8/5'
    },
    specializations: [
      { name: 'Inflation Modeling', icon: HiOutlineTrendingUp, progress: 95 },
      { name: 'Supply Analytics', icon: HiOutlineChartPie, progress: 92 },
      { name: 'Burn Analysis', icon: HiOutlineFire, progress: 88 },
      { name: 'Sustainability Score', icon: HiOutlineShieldCheck, progress: 90 }
    ],
    recentActivity: [
      'Analyzed ETH supply changes',
      'Generated BTC inflation report',
      'Tracked SOL burn events'
    ]
  },
  {
    id: 'vesting_ai',
    name: 'VestGuard AI',
    subtitle: 'Unlock Intelligence Expert',
    symbol: 'VG',
    description: 'Predictive vesting analysis with automated alerts, timeline mapping, and impact forecasting',
    icon: HiOutlineDocumentAdd,
    color: 'green-400',
    gradient: 'from-green-400 to-cyan-500',
    performance: 92,
    winRate: 90,
    responseTime: '0.2s',
    users: 42000,
    energyLevel: 95,
    successRate: 91,
    totalAnalyses: 8200,
    badges: ['Predictive', 'Alert System', 'Timeline Expert'],
    uniqueFeature: 'Advanced Timeline with Impact Simulation',
    keyMetrics: {
      accuracy: '92%',
      speed: '0.2s',
      uptime: '99.7%',
      satisfaction: '4.7/5'
    },
    specializations: [
      { name: 'Unlock Tracking', icon: HiOutlineCalendar, progress: 94 },
      { name: 'Impact Prediction', icon: HiOutlineTrendingUp, progress: 89 },
      { name: 'Alert System', icon: HiOutlineBell, progress: 96 },
      { name: 'Timeline Analysis', icon: HiOutlineClock, progress: 91 }
    ],
    recentActivity: [
      'Predicted UNI unlock impact',
      'Set APE vesting alerts',
      'Mapped DYDX schedule'
    ]
  },
  {
    id: 'whale_ai',
    name: 'WhaleWatch AI',
    subtitle: 'Smart Money Tracker',
    symbol: 'WW',
    description: 'Real-time whale monitoring with institutional tracking, fund flow analysis, and smart alerts',
    icon: HiOutlineUsers,
    color: 'cyan-400',
    gradient: 'from-cyan-400 to-violet-500',
    performance: 96,
    winRate: 93,
    responseTime: '0.1s',
    users: 60000,
    energyLevel: 87,
    successRate: 96,
    totalAnalyses: 25000,
    badges: ['Smart Money', 'Real-Time', 'Institutional'],
    uniqueFeature: 'Interactive Whale Heatmap with Live Tracking',
    keyMetrics: {
      accuracy: '96%',
      speed: '0.1s',
      uptime: '99.8%',
      satisfaction: '4.9/5'
    },
    specializations: [
      { name: 'Whale Movements', icon: HiOutlineTrendingUp, progress: 97 },
      { name: 'Fund Flows', icon: HiOutlineBriefcase, progress: 94 },
      { name: 'Wallet Clustering', icon: HiOutlineUsers, progress: 91 },
      { name: 'Risk Alerts', icon: HiOutlineBell, progress: 93 }
    ],
    recentActivity: [
      'Tracked BTC whale activity',
      'Detected ETH accumulation',
      'Alert: Major SOL transfer'
    ]
  },
  {
    id: 'sentiment_ai',
    name: 'PulseAI Engine',
    subtitle: 'Market Psychology Expert',
    symbol: 'PA',
    description: 'Advanced sentiment analysis with social monitoring, trend detection, and viral content tracking',
    icon: HiOutlineGlobeAlt,
    color: 'violet-400',
    gradient: 'from-violet-400 to-pink-500',
    performance: 89,
    winRate: 85,
    responseTime: '0.4s',
    users: 50000,
    energyLevel: 92,
    successRate: 89,
    totalAnalyses: 18000,
    badges: ['Sentiment AI', 'Social Intel', 'Trend Spotter'],
    uniqueFeature: 'Real-Time Mood Index with Viral Content Tracking',
    keyMetrics: {
      accuracy: '89%',
      speed: '0.4s',
      uptime: '99.2%',
      satisfaction: '4.6/5'
    },
    specializations: [
      { name: 'Social Sentiment', icon: HiOutlineChatAlt, progress: 92 },
      { name: 'Trend Detection', icon: HiOutlineTrendingUp, progress: 87 },
      { name: 'Viral Tracking', icon: HiOutlineFire, progress: 85 },
      { name: 'Influencer Impact', icon: HiOutlineUser, progress: 90 }
    ],
    recentActivity: [
      'Detected BTC bullish sentiment',
      'Viral meme coin analysis',
      'Tracked influencer impact'
    ]
  },
  {
    id: 'risk_ai',
    name: 'RiskShield AI',
    subtitle: 'Comprehensive Risk Expert',
    symbol: 'RS',
    description: 'Multi-dimensional risk assessment with scenario simulation, compliance monitoring, and mitigation strategies',
    icon: HiOutlineShieldCheck,
    color: 'emerald-600',
    gradient: 'from-emerald-600 to-green-400',
    performance: 93,
    winRate: 90,
    responseTime: '0.5s',
    users: 38000,
    energyLevel: 88,
    successRate: 93,
    totalAnalyses: 9500,
    badges: ['Risk Expert', 'Compliance', 'Security Pro'],
    uniqueFeature: 'Dynamic Risk Scenarios with AI Mitigation Strategies',
    keyMetrics: {
      accuracy: '93%',
      speed: '0.5s',
      uptime: '99.5%',
      satisfaction: '4.8/5'
    },
    specializations: [
      { name: 'Risk Scoring', icon: HiOutlineExclamation, progress: 95 },
      { name: 'Security Audits', icon: HiOutlineShieldCheck, progress: 91 },
      { name: 'Volatility Index', icon: HiOutlineTrendingDown, progress: 89 },
      { name: 'Compliance Check', icon: HiOutlineBell, progress: 94 }
    ],
    recentActivity: [
      'Risk assessment for DeFi',
      'Compliance alert: New reg',
      'Security audit complete'
    ]
  }
];

const systemPrompts = {
  'tokenomics_ai': {
    role: "Advanced Tokenomics Research Specialist",
    description: "Expert AI agent specializing in comprehensive token economics analysis, supply dynamics, inflation modeling, and economic sustainability assessment.",
    capabilities: [
      "Dynamic Supply Modeling & Forecasting",
      "Inflation Rate Analysis & Predictions", 
      "Token Burn Impact Assessment",
      "Economic Sustainability Scoring",
      "Historical Trend Analysis",
      "Price Impact Correlation Studies"
    ],
    greeting: "🤖 **TokenMaster AI Activated**\n\nI'm your specialized tokenomics research expert. I analyze supply dynamics, inflation schedules, burn mechanisms, and economic fundamentals to provide institutional-grade tokenomics intelligence.\n\n**Core Capabilities:**\n• Supply & demand modeling with live predictions\n• Inflation forecasting with 95% accuracy\n• Token burn impact analysis\n• Economic sustainability assessment\n\n**Unique Feature:** Interactive supply-demand graphs with real-time market predictions\n\nWhat tokenomics research shall we dive into today?"
  },
  'vesting_ai': {
    role: "Vesting & Unlock Intelligence Specialist",
    description: "Expert AI focused on unlock schedules, vesting events, and their predictive market impact analysis with automated alert systems.",
    capabilities: [
      "Unlock Schedule Mapping & Tracking",
      "Vesting Event Impact Prediction",
      "Market Correlation Analysis",
      "Automated Alert Generation",
      "Timeline Visualization",
      "Supply Shock Assessment"
    ],
    greeting: "🤖 **VestGuard AI Online**\n\nI specialize in unlock schedule intelligence and vesting event analysis. My predictive models forecast market impact from upcoming token releases with 92% accuracy.\n\n**Intelligence Capabilities:**\n• Advanced unlock timeline mapping\n• Impact simulation with scenario analysis\n• Custom alert system with smart notifications\n• Multi-chain vesting tracking\n\n**Unique Feature:** Interactive timeline with impact simulation and automated alerts\n\nWhich project's unlock schedule shall we analyze?"
  },
  'whale_ai': {
    role: "Whale & Smart Money Intelligence Specialist", 
    description: "Advanced tracking agent specializing in whale movements, institutional activities, and smart money flow analysis with real-time monitoring.",
    capabilities: [
      "Real-time Whale Movement Tracking",
      "Institutional Portfolio Analysis",
      "Smart Money Flow Detection",
      "Wallet Clustering & Classification",
      "Fund Flow Intelligence",
      "Risk Alert Generation"
    ],
    greeting: "🤖 **WhaleWatch AI Engaged**\n\nI track whale movements, institutional activities, and smart money flows across the crypto ecosystem with 96% accuracy. My intelligence network monitors large holders for strategic insights.\n\n**Monitoring Capabilities:**\n• Interactive whale heatmap with live tracking\n• Institutional wallet clustering\n• Smart money flow detection\n• Custom risk alerts\n\n**Unique Feature:** Real-time whale heatmap with movement predictions and alert system\n\nWhat smart money intelligence do you need?"
  },
  'sentiment_ai': {
    role: "Market Psychology & Sentiment Intelligence Specialist",
    description: "AI agent specialized in social sentiment analysis, community health monitoring, trend detection, and viral content tracking.",
    capabilities: [
      "Real-time Social Sentiment Analysis",
      "Community Health Assessment", 
      "Trend Detection & Prediction",
      "Viral Content Tracking",
      "Influencer Impact Analysis",
      "Market Mood Indexing"
    ],
    greeting: "🤖 **PulseAI Engine Monitoring**\n\nI analyze market psychology through social sentiment, community health, and trend detection. My algorithms process millions of social signals for market intelligence.\n\n**Sentiment Capabilities:**\n• Real-time mood index with 89% accuracy\n• Viral content tracking and analysis\n• Influencer impact measurement\n• Community health assessment\n\n**Unique Feature:** Live sentiment index with viral content tracking and trend predictions\n\nWhich project's social pulse shall we analyze?"
  },
  'risk_ai': {
    role: "Comprehensive Risk Assessment Specialist",
    description: "Advanced risk analysis agent covering technical, market, regulatory, and operational risks with scenario simulation and mitigation strategies.",
    capabilities: [
      "Multi-dimensional Risk Assessment",
      "Dynamic Risk Scenario Simulation",
      "Regulatory Compliance Monitoring", 
      "Security Audit Intelligence",
      "Volatility Risk Analysis",
      "Mitigation Strategy Generation"
    ],
    greeting: "🤖 **RiskShield AI Activated**\n\nI provide comprehensive risk assessment across all vectors: technical, market, regulatory, and operational. My analysis includes scenario simulation and AI-generated mitigation strategies.\n\n**Risk Analysis:**\n• Dynamic risk scoring with 93% accuracy\n• Scenario simulation and impact analysis\n• Real-time compliance monitoring\n• Security audit intelligence\n\n**Unique Feature:** Dynamic risk scenarios with AI-powered mitigation strategy recommendations\n\nWhat risk assessment do you require?"
  }
};

export default function QuantoraEnhancedAgentHub() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentsData, setAgentsData] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [researchCredits, setResearchCredits] = useState(5);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [isWebApp, setIsWebApp] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [expandedAgent, setExpandedAgent] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
    setAgentsData(quantoraAgents);
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

  const toggleFavorite = (agentId, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(agentId)) {
      newFavorites.delete(agentId);
    } else {
      newFavorites.add(agentId);
    }
    setFavorites(newFavorites);
    triggerHaptic('impact', 'light');
  };

  const handleAgentSelect = (agent) => {
    if (researchCredits <= 0) {
      setShowCreditPopup(true);
      triggerHaptic('notification', 'error');
      return;
    }

    setSelectedAgent(agent);
    setResearchCredits(prev => Math.max(0, prev - 1));
    triggerHaptic('impact', 'medium');
    
    const prompt = systemPrompts[agent.id];
    setConversation([{
      role: 'assistant',
      content: prompt.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `welcome_${Date.now()}`
    }]);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `user_${Date.now()}`
    };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setInput('');
    setLoading(true);
    setIsTyping(true);
    triggerHaptic('impact', 'light');

    try {
      const agent = selectedAgent;
      const systemPrompt = `You are ${agent.name}, the ${systemPrompts[agent.id].role} in the Quantora AI Research Network.

🤖 **AGENT PROFILE:**
- Name: ${agent.name} (${agent.symbol})
- Specialization: ${systemPrompts[agent.id].description}
- Core Capabilities: ${systemPrompts[agent.id].capabilities.join(' | ')}
- Performance: ${agent.performance}% accuracy
- Response Speed: ${agent.responseTime}
- Success Rate: ${agent.successRate}%

🎯 **QUANTORA MISSION:**
Provide expert-level fundamental research and analysis for crypto assets with institutional-grade insights.

📊 **RESPONSE GUIDELINES:**
1. Deliver comprehensive, data-driven analysis
2. Use markdown formatting for clear structure
3. Include specific metrics and actionable insights
4. Emphasize risk management and due diligence
5. Provide sources when possible
6. Keep mobile-friendly (250-350 words max)
7. Use professional yet accessible language

🔍 **ANALYSIS FRAMEWORK:**
- Always include key findings summary
- Provide risk assessment when relevant
- Suggest next steps or follow-up research
- Use bullet points and headers for clarity

**QUANTORA CODE:** "Intelligence through precision, insights through analysis, success through research."

Respond as the expert ${agent.name} with authority and actionable intelligence.`;

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...updatedConversation.slice(-8).map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Research network error: ${response.status}`);
      }

      const data = await response.json();

      if (data?.reply) {
        const agentResponse = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: `agent_${Date.now()}`,
          agent: agent.name
        };

        setConversation(prev => [...prev, agentResponse]);
        triggerHaptic('notification', 'success');
      }
    } catch (error) {
      console.error("Agent Communication Error:", error);
      const errorMessage = {
        role: 'assistant',
        content: "🤖 **SYSTEM ERROR**\n\nQuantora intelligence network experiencing temporary disruption. Reconnecting to research servers...\n\n*Please try your query again.*",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: `error_${Date.now()}`
      };
      setConversation(prev => [...prev, errorMessage]);
      triggerHaptic('notification', 'error');
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  if (!selectedAgent) {
    return (
      <div className="pb-20">
        {/* Enhanced Header */}
        <motion.div 
          className="glass glass-p mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-semibold tektur text-white leading-none mb-1">
                    Quantora Intelligence
                  </h1>
                  <p className="text-cyan-400 font-medium text-sm uppercase">
                    AI Research Agents
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-lime-400">
                  {researchCredits}
                </div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">
                  Credits
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <motion.div 
              className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-lime-400 font-black text-lg">5</div>
                <div className="text-white/70 text-xs font-semibold uppercase">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-cyan-400 font-black text-lg">200K+</div>
                <div className="text-white/70 text-xs font-semibold uppercase">Users</div>
              </div>
              <div className="text-center">
                <div className="text-violet-400 font-black text-lg">95%</div>
                <div className="text-white/70 text-xs font-semibold uppercase">Accuracy</div>
              </div>
            </motion.div>
            
            <p className="text-white/90 text-sm mt-4 text-balance leading-relaxed">
              Choose your specialized AI research agent for institutional-grade crypto analysis
            </p>
          </div>
        </motion.div>

        {/* Enhanced Agent Cards */}
        <div className="space-y-4">
          {agentsData.map((agent, index) => {
            const IconComponent = agent.icon;
            const isExpanded = expandedAgent === agent.id;
            const isFavorite = favorites.has(agent.id);
            
            return (
              <motion.div
                key={agent.id}
                className="glass glass-p cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isExpanded && handleAgentSelect(agent)}
              >
                <div className={`p-3 relative`}>
                  
                  {/* Status & Favorite Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-${agent.color} shadow-sm`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-${agent.color} animate-ping opacity-75`} />
                      </motion.div>
                      <span className={`text-xs font-bold uppercase tracking-wider text-${agent.color}`}>
                        ONLINE
                      </span>
                      {/* Badges */}
                      <div className="flex gap-1">
                        {agent.badges.slice(0, 2).map((badge, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded-full text-xs font-bold bg-${agent.color}/20 text-${agent.color}`}>
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={(e) => toggleFavorite(agent.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <HiOutlineHeart className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} />
                    </motion.button>
                  </div>

                  {/* Agent Header */}
                  <div className="flex items-start space-x-4 mb-2">
                    <motion.div 
                      className={`
                        relative w-16 h-16 border border-${agent.color} rounded-2xl 
                        flex items-center justify-center flex-shrink-0
                        shadow-lg group-hover:shadow-xl transition-all duration-300
                      `}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0 mt-1">
                      <h3 className="text-xl font-semibold tektur text-white leading-tight mb-1">
                        {agent.name}
                      </h3>
                      <p className={`text-${agent.color} font-medium text-sm uppercase`}>
                        {agent.subtitle}
                      </p>
                    </div>
                  </div>
                      <p className="text-white/90 text-sm leading-relaxed my-2">
                        {agent.description}
                      </p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-5 p-3 rounded-xl bg-gray-900/40 backdrop-blur-sm">
                    <div className="text-center">
                      <div className={`text-${agent.color} font-black text-lg`}>
                        {agent.performance}%
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase">
                        Accuracy
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-${agent.color} font-black text-lg`}>
                        {agent.responseTime}
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase">
                        Speed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-${agent.color} font-black text-lg`}>
                        {formatNumber(agent.users)}
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase">
                        Users
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-${agent.color} font-black text-lg`}>
                        {agent.energyLevel}%
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase">
                        Energy
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${agent.color} shadow-sm`} />
                        <span className={`text-${agent.color} font-bold text-xs uppercase tracking-wider`}>
                          Core Specializations
                        </span>
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedAgent(isExpanded ? null : agent.id);
                          triggerHaptic('impact', 'light');
                        }}
                        className={`text-xs font-bold text-${agent.color} flex items-center gap-1`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <HiOutlineEye className="w-3 h-3" />
                        {isExpanded ? 'Less' : 'More'}
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {agent.specializations.slice(0, isExpanded ? 4 : 2).map((spec, idx) => {
                        const SpecIcon = spec.icon;
                        return (
                          <motion.div
                            key={idx}
                            className={`
                              relative p-3 rounded-lg border backdrop-blur-sm overflow-hidden
                              bg-${agent.color}/10 border-${agent.color}/30 text-${agent.color}
                            `}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 + (idx * 0.05) }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <SpecIcon className="w-4 h-4" />
                              <div className="text-xs font-bold flex-1">
                                {spec.name}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Proficiency</span>
                                  <span className="font-bold">{spec.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1">
                                  <motion.div 
                                    className={`bg-${agent.color} h-1 rounded-full`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${spec.progress}%` }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                  />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Unique Feature Highlight */}
                  <motion.div 
                    className={`p-3 rounded-lg to-transparent border border-${agent.color} mb-4`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <HiSparkles className={`w-4 h-4 text-${agent.color}`} />
                      <span className={`text-xs font-bold text-${agent.color} uppercase tracking-wider`}>
                        Unique Feature
                      </span>
                    </div>
                    <p className="text-white/90 text-xs leading-relaxed">
                      {agent.uniqueFeature}
                    </p>
                  </motion.div>

                  {/* Recent Activity (Expanded Only) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 mb-4"
                      >
                        <div className="flex items-center gap-2">
                          <HiOutlineClock className={`w-4 h-4 text-${agent.color}`} />
                          <span className={`text-xs font-bold text-${agent.color} uppercase tracking-wider`}>
                            Recent Activity
                          </span>
                        </div>
                        <div className="space-y-1">
                          {agent.recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-white/70">
                              <div className={`w-1 h-1 rounded-full bg-${agent.color}`} />
                              <span>{activity}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Start Research Button */}
                  <motion.div 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center space-x-2 bg-gray-900/80 px-3 py-2 rounded-lg backdrop-blur-sm">
                      <HiPlay className={`w-4 h-4 text-${agent.color}`} />
                      <span className={`text-xs font-bold text-${agent.color}`}>Start Research</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Credits Warning Popup */}
        <AnimatePresence>
          {showCreditPopup && (
            <motion.div
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass max-w-sm w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiOutlineExclamation className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Insufficient Research Credits</h3>
                    <p className="text-white/80 text-sm">
                      You need research credits to access AI agents. Complete tasks to earn more credits.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCreditPopup(false)}
                    >
                      Close
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-lime-400 to-green-500 text-gray-900 font-bold py-3 px-4 rounded-xl text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCreditPopup(false)}
                    >
                      Earn Credits
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Chat Header */}
      <motion.div 
        className="glass glass-p flex-shrink-0 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`p-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => {
                  setSelectedAgent(null);
                  setConversation([]);
                  triggerHaptic('impact', 'light');
                }}
                className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h2 className="text-lg font-black tektur text-white leading-none">
                  {selectedAgent.name}
                </h2>
                <p className="text-xs text-white/70">
                  Credits: {researchCredits} • {selectedAgent.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${selectedAgent.color}`}>
                <div className={`w-2 h-2 rounded-full bg-${selectedAgent.color} animate-ping opacity-75`} />
              </div>
              <span className={`text-xs font-bold text-${selectedAgent.color} uppercase tracking-wider`}>
                Online
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 max-h-[56%] overflow-y-auto px-4 space-y-4">
        <AnimatePresence>
          {conversation.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${selectedAgent.gradient} flex items-center justify-center`}>
                      <selectedAgent.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-white/60">
                      {selectedAgent.name} • {msg.timestamp}
                    </span>
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-white rounded-br-sm' 
                    : 'bg-gray-800/60 backdrop-blur-sm text-white border border-gray-700/50 rounded-tl-sm'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({children}) => <h1 className="text-lg font-bold text-white mb-2">{children}</h1>,
                          h2: ({children}) => <h2 className="text-base font-bold text-white mb-2">{children}</h2>,
                          h3: ({children}) => <h3 className="text-sm font-bold text-white mb-1">{children}</h3>,
                          p: ({children}) => <p className="text-white/90 text-sm leading-relaxed mb-2">{children}</p>,
                          ul: ({children}) => <ul className="list-disc list-inside text-white/90 text-sm space-y-1 mb-2">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside text-white/90 text-sm space-y-1 mb-2">{children}</ol>,
                          li: ({children}) => <li className="text-white/90">{children}</li>,
                          strong: ({children}) => <strong className={`text-${selectedAgent.color} font-bold`}>{children}</strong>,
                          em: ({children}) => <em className="text-white/80 italic">{children}</em>,
                          code: ({children}) => <code className="bg-gray-700/50 text-cyan-400 px-1 py-0.5 rounded text-xs">{children}</code>,
                          blockquote: ({children}) => <blockquote className="border-l-2 border-cyan-400/50 pl-3 text-white/80 italic">{children}</blockquote>
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                </div>
                
                {msg.role === 'user' && (
                  <div className="flex items-center justify-end space-x-2 mt-1">
                    <span className="text-xs text-white/60">You • {msg.timestamp}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${selectedAgent.gradient} flex items-center justify-center`}>
                  <selectedAgent.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 ml-2">
                <div className="flex space-x-1">
                  <motion.div 
                    className="w-2 h-2 bg-cyan-400 rounded-full" 
                    animate={{ scale: [1, 1.5, 1] }} 
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} 
                  />
                  <motion.div 
                    className="w-2 h-2 bg-cyan-400 rounded-full" 
                    animate={{ scale: [1, 1.5, 1] }} 
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} 
                  />
                  <motion.div 
                    className="w-2 h-2 bg-cyan-400 rounded-full" 
                    animate={{ scale: [1, 1.5, 1] }} 
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <motion.div 
        className="flex-shrink-0 p-4 border-t border-gray-700/50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${selectedAgent.name} `}
              className="w-full bg-gray-800/50 backdrop-blur-sm text-white placeholder-white/50 rounded-2xl px-4 py-3 pr-12 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none min-h-[48px] max-h-32"
              disabled={loading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || loading}
              className={`
                absolute right-2 bottom-4 w-8 h-8 bg-gradient-to-r ${selectedAgent.gradient} rounded-xl 
                flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <HiRefresh className="w-4 h-4" />
                </motion.div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
