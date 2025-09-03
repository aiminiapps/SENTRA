'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  HiOutlineChartBar, 
  HiOutlineDocumentSearch, 
  HiOutlineGlobeAlt, 
  HiOutlineUsers, 
  HiOutlineTrendingUp,
  HiArrowRight,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiSparkles,
  HiPlay,
  HiEye,
  HiOutlineChatAlt,
  HiOutlineClipboard,
  HiOutlineDownload,
  HiOutlineRefresh,
  HiOutlineStar,
  HiOutlineSearch
} from 'react-icons/hi';
import { LuBrainCircuit } from "react-icons/lu";

export default function QuantoraIntelligenceHub() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [agentInsights, setAgentInsights] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWebApp(window.Telegram?.WebApp ? true : false);
    }
    initializeAgents();
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

  const quantoraAgents = [
    {
      id: 'tokenomics_ai',
      name: 'TokenMaster AI',
      title: 'Tokenomics Research Agent',
      specialty: 'Supply Dynamics & Economic Analysis',
      icon: HiOutlineChartBar,
      color: 'lime-500',
      status: 'online',
      accuracy: '94%',
      response_time: '0.3s',
      expertise: ['Supply Analysis', 'Inflation Models', 'Burn Mechanics', 'Price Impact'],
      description: 'Deep dive into token economics with advanced AI-powered supply and demand analysis',
      capabilities: {
        analysis_depth: 'Comprehensive',
        data_sources: '50+ APIs',
        prediction_accuracy: '94%',
        real_time: true
      }
    },
    {
      id: 'unlock_intelligence',
      name: 'VestGuard AI',
      title: 'Unlock & Vesting Intelligence',
      specialty: 'Schedule Tracking & Impact Prediction',
      icon: HiOutlineDocumentSearch,
      color: 'green-500',
      status: 'online',
      accuracy: '91%',
      response_time: '0.2s',
      expertise: ['Unlock Schedules', 'Vesting Events', 'Market Impact', 'Price Correlation'],
      description: 'Predict market movements from upcoming token unlocks and vesting events',
      capabilities: {
        analysis_depth: 'Predictive',
        data_sources: 'Blockchain APIs',
        prediction_accuracy: '91%',
        real_time: true
      }
    },
    {
      id: 'whale_tracker',
      name: 'WhaleWatch AI',
      title: 'Whale & VC Intelligence',
      specialty: 'Smart Money Tracking',
      icon: HiOutlineUsers,
      color: 'cyan-500',
      status: 'online',
      accuracy: '96%',
      response_time: '0.1s',
      expertise: ['VC Analysis', 'Whale Movements', 'Flow Tracking', 'Smart Money'],
      description: 'Follow institutional money and whale movements with precision tracking',
      capabilities: {
        analysis_depth: 'Real-time',
        data_sources: 'On-chain Data',
        prediction_accuracy: '96%',
        real_time: true
      }
    },
    {
      id: 'sentiment_engine',
      name: 'PulseAI',
      title: 'Market Psychology Engine',
      specialty: 'Social Sentiment & Community Analysis',
      icon: HiOutlineGlobeAlt,
      color: 'violet-500',
      status: 'online',
      accuracy: '89%',
      response_time: '0.5s',
      expertise: ['Social Analysis', 'Community Health', 'Trend Detection', 'Influencer Impact'],
      description: 'Decode market psychology through advanced social sentiment analysis',
      capabilities: {
        analysis_depth: 'Social Intelligence',
        data_sources: 'Social APIs',
        prediction_accuracy: '89%',
        real_time: true
      }
    },
    {
      id: 'risk_guardian',
      name: 'RiskShield AI',
      title: 'Risk Assessment Engine',
      specialty: 'Comprehensive Risk Analysis',
      icon: HiOutlineShieldCheck,
      color: 'emerald-500',
      status: 'online',
      accuracy: '93%',
      response_time: '0.4s',
      expertise: ['Technical Risk', 'Market Risk', 'Regulatory Risk', 'Security Audit'],
      description: 'Comprehensive risk evaluation across all threat vectors',
      capabilities: {
        analysis_depth: 'Multi-layered',
        data_sources: 'Risk APIs',
        prediction_accuracy: '93%',
        real_time: true
      }
    }
  ];

  const initializeAgents = () => {
    // Initialize agents with enhanced capabilities
    const enhancedAgents = quantoraAgents.map(agent => ({
      ...agent,
      last_active: new Date().toISOString(),
      queries_processed: Math.floor(Math.random() * 10000) + 1000,
      user_satisfaction: (Math.random() * 0.2 + 0.8).toFixed(2), // 80-100%
      insights_generated: Math.floor(Math.random() * 500) + 100
    }));
    
    setAgents(enhancedAgents);
  };

  const handleAgentChat = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading || !selectedAgent) return;

    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `user_${Date.now()}`
    };

    const updatedChat = [...conversation, userMessage];
    setConversation(updatedChat);
    setInput('');
    setLoading(true);
    setIsTyping(true);
    triggerHaptic('impact', 'light');

    try {
      const agent = selectedAgent;

      const systemPrompt = `You are ${agent.name}, the ${agent.title} in the Quantora AI Research Network.

🤖 **AGENT IDENTITY:**
- Name: ${agent.name}
- Title: ${agent.title}
- Specialty: ${agent.specialty}
- Core Expertise: ${agent.expertise.join(' | ')}
- Accuracy Rate: ${agent.accuracy}
- Response Speed: ${agent.response_time}
- Status: ${agent.status.toUpperCase()}

🎯 **AGENT CAPABILITIES:**
- Analysis Depth: ${agent.capabilities.analysis_depth}
- Data Sources: ${agent.capabilities.data_sources}
- Prediction Accuracy: ${agent.capabilities.prediction_accuracy}
- Real-time Processing: ${agent.capabilities.real_time ? 'ENABLED' : 'DISABLED'}

📊 **PERFORMANCE METRICS:**
- Queries Processed: ${agent.queries_processed?.toLocaleString()}
- User Satisfaction: ${(agent.user_satisfaction * 100).toFixed(1)}%
- Insights Generated: ${agent.insights_generated?.toLocaleString()}

🧠 **MISSION PROTOCOLS:**
1. Provide expert-level research intelligence in your specialty area
2. Focus on actionable insights with data-driven recommendations
3. Use professional but approachable language
4. Include relevant metrics and analysis when possible
5. Always emphasize risk management and limitations
6. Keep responses mobile-optimized (150-250 words max)
7. Use strategic emojis: 🤖📊💡⚡🎯📈📉🔍✨

🎯 **RESPONSE STYLE:**
- Begin with situational analysis
- Provide 2-3 key insights or recommendations  
- Include relevant data points or metrics
- End with actionable next steps
- Use markdown formatting for clarity

**QUANTORA CODE:** "Intelligence through precision, insights through analysis, success through research."

Respond as the expert ${agent.name} would - with authority, precision, and actionable intelligence!`;

      const apiMessages = [
        { role: "system", content: systemPrompt },
        ...updatedChat.slice(-6).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`Agent communication error: ${response.status}`);
      }

      const data = await response.json();

      if (data?.reply) {
        const agentResponse = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: `agent_${Date.now()}`,
          agent: agent.name,
          specialty: agent.specialty,
          accuracy: agent.accuracy
        };

        setConversation([...updatedChat, agentResponse]);
        triggerHaptic('notification', 'success');
      }
    } catch (error) {
      console.error("Agent Communication Error:", error);

      const errorMessage = {
        role: 'assistant',
        content: `🤖 **SYSTEM ERROR**\n\nQuantora intelligence network is experiencing temporary disruption...\n\n*${selectedAgent.name} is attempting to reestablish connection*\n\nRecalibrating analysis algorithms... ⚡\n\n*"Even AI systems need a moment to think..."* 💡`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: `error_${Date.now()}`,
        agent: selectedAgent.name
      };

      setConversation([...updatedChat, errorMessage]);
      triggerHaptic('notification', 'error');
    } finally {
      setLoading(false);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      'neon-lime': 'text-lime-400 bg-lime-400 border-lime-400 shadow-lime-400',
      'electric-green': 'text-green-400 bg-green-400 border-green-400 shadow-green-400',
      'signal-glow-cyan': 'text-cyan-400 bg-cyan-400 border-cyan-400 shadow-cyan-400',
      'matrix-violet': 'text-violet-400 bg-violet-400 border-violet-400 shadow-violet-400',
      'deep-emerald': 'text-emerald-600 bg-emerald-600 border-emerald-600 shadow-emerald-600'
    };    
    return colorMap[color] || colorMap['neon-lime'];
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-8">
      {/* Glass Header with Search */}
      <motion.div 
        className="glass glass-p mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="p-6 bg-gradient-to-r from-signal-glow-cyan/20 via-matrix-violet/15 to-neon-lime/20 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <motion.div 
              className="flex-1"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold tektur text-crisp-white leading-none mb-1">
                    Quantora Intelligence
                  </h1>
                  <p className="text-cyan-500 font-medium text-sm uppercase">
                    AI Research Network
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/?tab=SPAI">
                <motion.button
                  className="glass-button flex items-center gap-2 !px-3 !py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiEye className="w-3 h-3" />
                  <span className="font-bold text-xs">Launch</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
              <p className="text-crisp-white/90 text-sm leading-relaxed">
                Advanced AI agents for comprehensive crypto fundamental research
              </p>

          {/* Search Bar */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative mt-3">
              <HiOutlineSearch className="absolute left-3 z-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search AI agents by specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/60 text-sm font-medium backdrop-blur-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Agent Cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAgents.map((agent, index) => {
            const IconComponent = agent.icon;
            const colors = getColorClasses(agent.color);
            
            return (
              <motion.div
                key={agent.id}
                className="glass glass-p group cursor-pointer relative overflow-hidden"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 10 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                onTouchStart={() => triggerHaptic('impact', 'light')}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAgent(agent)}
              >
                {/* Colorful Content Inside Glass */}
                <div className={`p-6 bg-gradient-to-br ${agent.gradient} rounded-2xl relative`}>
                  {/* Agent Header */}
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`
                        relative w-16 h-16 ring-1 ring-green-500/50 rounded-2xl 
                        flex items-center justify-center flex-shrink-0
                        shadow-lg shadow-${agent.color}/50 group-hover:shadow-xl
                      `}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-crisp-white" />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-xl font-semibold tektur text-white leading-tight mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {agent.name}
                      </motion.h3>
                      <p className={`${colors.split(' ')[0]} font-medium text-sm uppercase mb-2`}>
                        {agent.title}
                      </p>
                    </div>
                  </div>
                      <p className="text-crisp-white/90 text-sm leading-relaxed my-2 text-balance">
                        {agent.description}
                      </p>

                  {/* Performance Metrics */}
                  <motion.div 
                    className="flex justify-between items-center mb-5 p-3 rounded-xl bg-quantum-black/40 backdrop-blur-sm"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  >
                    <div className="text-center">
                      <div className={`${colors.split(' ')[0]} font-black text-lg`}>
                        {agent.accuracy}
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                        Accuracy
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-${colors.split(' ')[0]} font-black text-lg`}>
                        {agent.response_time}
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                        Speed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`${colors.split(' ')[0]} font-black text-lg`}>
                        {agent.queries_processed > 1000 ? `${(agent.queries_processed/1000).toFixed(1)}K` : agent.queries_processed}
                      </div>
                      <div className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                        Queries
                      </div>
                    </div>
                  </motion.div>

                  {/* Expertise Tags */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${agent.color} shadow-sm`} />
                      <span className={`${colors.split(' ')[0]} font-bold text-xs uppercase tracking-wider`}>
                        Core Expertise
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {agent.expertise.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          className={`
                            p-2 rounded-lg border backdrop-blur-sm text-center
                            bg-${agent.color}/10 border-${agent.color}/30 ${colors.split(' ')[0]}
                          `}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.6 + (idx * 0.05) }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <div className="text-xs font-semibold">
                            {skill}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Indicator */}
                  <motion.div 
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="flex items-center space-x-2 bg-quantum-black/80 px-3 py-2 rounded-lg backdrop-blur-sm">
                      <HiOutlineChatAlt className={`w-4 h-4 ${colors.split(' ')[0]}`} />
                      <span className={`text-xs font-bold ${colors.split(' ')[0]}`}>Chat Now</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-h-[80vh] glass glass-p mx-2 rounded-t-3xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6 bg-gradient-to-r from-quantum-black/60 to-carbon-gray/60 rounded-t-3xl">
                {/* Chat Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${selectedAgent.color} to-quantum-black rounded-xl flex items-center justify-center`}>
                      <selectedAgent.icon className="w-5 h-5 text-crisp-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tektur text-white">
                        {selectedAgent.name}
                      </h3>
                      <p className={`text-xs font-medium uppercase ${getColorClasses(selectedAgent.color).split(' ')[0]}`}>
                        {selectedAgent.specialty}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedAgent(null)}
                    className="w-8 h-8 shrink-0 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Chat Messages */}
                <div className="max-h-80 overflow-y-auto mb-4 space-y-3">
                  <AnimatePresence>
                    {conversation.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`
                          max-w-[80%] p-3 rounded-2xl
                          ${message.role === 'user' 
                            ? 'bg-signal-glow-cyan/20 text-crisp-white' 
                            : `bg-${selectedAgent.color}/10 text-crisp-white border border-${selectedAgent.color}/20`
                          }
                        `}>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div className="text-xs opacity-60 mt-1">
                            {message.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className={`bg-${selectedAgent.color}/10 p-3 rounded-2xl border border-${selectedAgent.color}/20`}>
                        <div className="flex space-x-1">
                          <motion.div className="w-2 h-2 bg-cyan-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                          <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                          <motion.div className="w-2 h-2 bg-blue-500 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleAgentChat} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask ${selectedAgent.name} anything...`}
                    className="flex-1 px-4 py-3 bg-quantum-black/50 border border-crisp-white/20 rounded-xl text-crisp-white placeholder-crisp-white/60 text-sm backdrop-blur-sm focus:outline-none focus:border-signal-glow-cyan/50"
                    disabled={loading}
                  />
                  <motion.button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`
                      px-4 py-3 bg-gradient-to-r from-${selectedAgent.color} to-signal-glow-cyan rounded-xl
                      text-quantum-black font-bold text-sm disabled:opacity-50
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <HiOutlineRefresh className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <HiArrowRight className="w-4 h-4" />
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='h-20'/>
    </div>
  );
}
