import React, { useState, useMemo } from 'react';
import { Search, Users, FileText, Brain, Sparkles, ChevronDown, ChevronUp, Star, AlertCircle, CheckCircle, BarChart3, Zap, Filter, MessageSquare, Trophy, Target, Flame, DollarSign, Plus, X, Info, ArrowUp, ArrowDown, Eye, TrendingDown, Award, Shield, Lightbulb, Activity, ArrowRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

// Enhanced influencer data with historical performance
const initialInfluencerData = [
  { id: 1, name: "Stephen Gardner", channel: "YouTube", avgViews: 285000, totalIntegrations: 47, avgCPM: 12, bestScript: "New Cocoa Flavanols", category: "News/Finance", reliability: 98, makeGoods: 0, notes: "Consistently high performer. FDA/Big Pharma angles work extremely well.", monthlyData: [{m:'Jul',v:260},{m:'Aug',v:275},{m:'Sep',v:290},{m:'Oct',v:285},{m:'Nov',v:295},{m:'Dec',v:285}], topProducts: ["Cocoa","NMN","GLP-1"], conversionRate: 4.8, audienceMatch: 95, riskScore: 5 },
  { id: 2, name: "Paul Joseph Watson", channel: "YouTube", avgViews: 420000, totalIntegrations: 52, avgCPM: 15, bestScript: "Cocoa Epstein Script", category: "Commentary", reliability: 95, makeGoods: 1, notes: "Premium placement. Cocoa #2 and Spermidine scripts perform well.", monthlyData: [{m:'Jul',v:400},{m:'Aug',v:410},{m:'Sep',v:430},{m:'Oct',v:425},{m:'Nov',v:440},{m:'Dec',v:420}], topProducts: ["Cocoa","Spermidine","NMN"], conversionRate: 4.2, audienceMatch: 92, riskScore: 12 },
  { id: 3, name: "Black Scout Survival", channel: "YouTube", avgViews: 165000, totalIntegrations: 58, avgCPM: 8, bestScript: "Ronnie Coleman Script", category: "Survival/Prepper", reliability: 99, makeGoods: 0, notes: "Best for product launches. Two-clip format works great.", monthlyData: [{m:'Jul',v:155},{m:'Aug',v:160},{m:'Sep',v:170},{m:'Oct',v:168},{m:'Nov',v:175},{m:'Dec',v:165}], topProducts: ["Cocoa","Brain Complex","Spike Detox"], conversionRate: 5.1, audienceMatch: 97, riskScore: 3 },
  { id: 4, name: "Better Bachelor", channel: "YouTube", avgViews: 145000, totalIntegrations: 44, avgCPM: 9, bestScript: "Feminization of Men + Joe Rogan", category: "Lifestyle/Men", reliability: 94, makeGoods: 2, notes: "Huberman Turk & Tongkat works. Feminization angle resonates.", monthlyData: [{m:'Jul',v:140},{m:'Aug',v:148},{m:'Sep',v:152},{m:'Oct',v:145},{m:'Nov',v:150},{m:'Dec',v:145}], topProducts: ["NMN","Testosterone","GLP-1"], conversionRate: 3.9, audienceMatch: 88, riskScore: 18 },
  { id: 5, name: "REDACTED", channel: "YouTube", avgViews: 380000, totalIntegrations: 38, avgCPM: 14, bestScript: "Joe Rogan GLP-1 (Huberman)", category: "News/Politics", reliability: 92, makeGoods: 3, notes: "Interview format available. New Cocoa Script performs well.", monthlyData: [{m:'Jul',v:360},{m:'Aug',v:375},{m:'Sep',v:390},{m:'Oct',v:385},{m:'Nov',v:395},{m:'Dec',v:380}], topProducts: ["GLP-1","Cocoa","NMN"], conversionRate: 4.0, audienceMatch: 85, riskScore: 22 },
  { id: 6, name: "Steve Turley", channel: "YouTube", avgViews: 195000, totalIntegrations: 41, avgCPM: 10, bestScript: "Sleepex Launch Script", category: "Commentary", reliability: 96, makeGoods: 1, notes: "Great for launches. FDA Cocoa Script works.", monthlyData: [{m:'Jul',v:185},{m:'Aug',v:190},{m:'Sep',v:200},{m:'Oct',v:198},{m:'Nov',v:205},{m:'Dec',v:195}], topProducts: ["Sleepex","Cocoa","NMN"], conversionRate: 4.3, audienceMatch: 91, riskScore: 10 },
  { id: 7, name: "Midnight's Edge", channel: "YouTube", avgViews: 125000, totalIntegrations: 45, avgCPM: 7, bestScript: "NMN #1 Variation", category: "Entertainment", reliability: 93, makeGoods: 2, notes: "Prefers Big Pharma narrative. Not responsive to feminization.", monthlyData: [{m:'Jul',v:120},{m:'Aug',v:125},{m:'Sep',v:130},{m:'Oct',v:128},{m:'Nov',v:132},{m:'Dec',v:125}], topProducts: ["NMN","Cocoa","Spermidine"], conversionRate: 3.5, audienceMatch: 82, riskScore: 15 },
  { id: 8, name: "Hustl", channel: "YouTube", avgViews: 95000, totalIntegrations: 32, avgCPM: 6, bestScript: "Ronnie Coleman Script", category: "Motivation", reliability: 97, makeGoods: 0, notes: "Bone Marrow Script successful. Great engagement.", monthlyData: [{m:'Jul',v:90},{m:'Aug',v:95},{m:'Sep',v:100},{m:'Oct',v:98},{m:'Nov',v:102},{m:'Dec',v:95}], topProducts: ["Cocoa","Longevity Mix","NMN"], conversionRate: 4.6, audienceMatch: 90, riskScore: 8 },
  { id: 9, name: "Russell Brand", channel: "YouTube", avgViews: 520000, totalIntegrations: 4, avgCPM: 22, bestScript: "Joe Rogan Stem Cell", category: "Commentary", reliability: 90, makeGoods: 0, notes: "Counter offer at $15k. High CPM but massive reach.", monthlyData: [{m:'Jul',v:500},{m:'Aug',v:510},{m:'Sep',v:530},{m:'Oct',v:525},{m:'Nov',v:540},{m:'Dec',v:520}], topProducts: ["NMN","Longevity Mix"], conversionRate: 3.2, audienceMatch: 78, riskScore: 25 },
  { id: 10, name: "Matt Walsh", channel: "YouTube", avgViews: 445000, totalIntegrations: 5, avgCPM: 18, bestScript: "Joe Rogan Analysis", category: "Commentary", reliability: 91, makeGoods: 1, notes: "Premium conservative audience. High engagement.", monthlyData: [{m:'Jul',v:430},{m:'Aug',v:440},{m:'Sep',v:455},{m:'Oct',v:450},{m:'Nov',v:460},{m:'Dec',v:445}], topProducts: ["NMN","Cocoa"], conversionRate: 3.8, audienceMatch: 86, riskScore: 20 },
  { id: 11, name: "Awaken with JP", channel: "YouTube", avgViews: 165000, totalIntegrations: 22, avgCPM: 11, bestScript: "Joe Rogan GLP-1", category: "Comedy", reliability: 85, makeGoods: 4, notes: "Often doesn't hit 160k threshold. Use JP Reacts for make-goods.", monthlyData: [{m:'Jul',v:150},{m:'Aug',v:160},{m:'Sep',v:175},{m:'Oct',v:165},{m:'Nov',v:155},{m:'Dec',v:165}], topProducts: ["GLP-1","NMN"], conversionRate: 3.4, audienceMatch: 80, riskScore: 35 },
  { id: 12, name: "Donut Operator", channel: "YouTube", avgViews: 385000, totalIntegrations: 2, avgCPM: 16, bestScript: "Cocoa #1", category: "Law Enforcement", reliability: 95, makeGoods: 0, notes: "Try Joe Rogan approach. Last chance - ask him.", monthlyData: [{m:'Jul',v:370},{m:'Aug',v:380},{m:'Sep',v:395},{m:'Oct',v:390},{m:'Nov',v:400},{m:'Dec',v:385}], topProducts: ["Cocoa"], conversionRate: 4.1, audienceMatch: 83, riskScore: 15 },
];

const initialScriptData = [
  { id: 1, name: "Joe Rogan NMN #1 (Sinclair)", product: "NMN", avgPerformance: 94, timesUsed: 38, bestWith: ["Black Scout Survival", "Hustl"], status: "approved", notes: "OG script. David Sinclair clip.", dateCreated: "Mar 2024", monthlyPerf: [{m:'Jul',p:92},{m:'Aug',p:93},{m:'Sep',p:95},{m:'Oct',p:94},{m:'Nov',p:96},{m:'Dec',p:94}] },
  { id: 2, name: "Stephen Gardner FDA Script", product: "Cocoa Flavanols", avgPerformance: 96, timesUsed: 18, bestWith: ["Stephen Gardner", "Steve Turley", "Paul Joseph Watson"], status: "top-performer", notes: "BEST PERFORMING. FDA/Big Pharma narrative.", dateCreated: "Jul 2025", monthlyPerf: [{m:'Jul',p:94},{m:'Aug',p:95},{m:'Sep',p:97},{m:'Oct',p:96},{m:'Nov',p:98},{m:'Dec',p:96}] },
  { id: 3, name: "Joe Rogan GLP-1 #2 (Gardner)", product: "GLP-1/Berberine", avgPerformance: 92, timesUsed: 25, bestWith: ["Stephen Gardner", "Awaken w/ JP"], status: "approved", notes: "FDA/Big Pharma angle.", dateCreated: "Feb 2025", monthlyPerf: [{m:'Jul',p:90},{m:'Aug',p:91},{m:'Sep',p:93},{m:'Oct',p:92},{m:'Nov',p:94},{m:'Dec',p:92}] },
  { id: 4, name: "Black Scout Ronnie Coleman", product: "Cocoa Flavanols", avgPerformance: 93, timesUsed: 22, bestWith: ["Black Scout Survival", "Hustl"], status: "approved", notes: "Two video clips format. Bodybuilding angle.", dateCreated: "Jul 2025", monthlyPerf: [{m:'Jul',p:91},{m:'Aug',p:92},{m:'Sep',p:94},{m:'Oct',p:93},{m:'Nov',p:95},{m:'Dec',p:93}] },
  { id: 5, name: "Dr. Simon Mills Script", product: "Longevity Mix", avgPerformance: 91, timesUsed: 19, bestWith: ["Black Scout Survival", "Stephen Gardner"], status: "top-performer", notes: "Medical credibility. Launch specialist.", dateCreated: "Nov 2025", monthlyPerf: [{m:'Jul',p:88},{m:'Aug',p:89},{m:'Sep',p:91},{m:'Oct',p:91},{m:'Nov',p:93},{m:'Dec',p:91}] },
  { id: 6, name: "Cocoa Cardio Script", product: "Cocoa Flavanols", avgPerformance: 89, timesUsed: 21, bestWith: ["X22 Report", "Hustl"], status: "approved", notes: "Heart health angle.", dateCreated: "Oct 2025", monthlyPerf: [{m:'Jul',p:87},{m:'Aug',p:88},{m:'Sep',p:90},{m:'Oct',p:89},{m:'Nov',p:91},{m:'Dec',p:89}] },
  { id: 7, name: "RFK + Joe Rogan Script", product: "NMN", avgPerformance: 72, timesUsed: 4, bestWith: ["Heavy Duty Country"], status: "disapproved", notes: "DISAPPROVED - underperformed.", dateCreated: "Mar 2025", monthlyPerf: [{m:'Jul',p:75},{m:'Aug',p:73},{m:'Sep',p:71},{m:'Oct',p:70},{m:'Nov',p:69},{m:'Dec',p:72}] },
];

const initialScriptElements = {
  hooks: [
    { id: 1, text: "Joe Rogan discussing [topic] with [guest]", effectiveness: 95 },
    { id: 2, text: "FDA trying to ban [supplement]", effectiveness: 92 },
    { id: 3, text: "Big Pharma doesn't want you to know", effectiveness: 88 },
    { id: 4, text: "Europe just banned this supplement", effectiveness: 86 },
    { id: 5, text: "Dr. [Authority] reveals shocking truth", effectiveness: 91 },
  ],
  angles: [
    { id: 1, name: "Health Freedom / Anti-FDA", effectiveness: 91, channels: ["Political", "News"] },
    { id: 2, name: "Big Pharma Conspiracy", effectiveness: 88, channels: ["Commentary"] },
    { id: 3, name: "Masculinity / Men's Health", effectiveness: 86, channels: ["Lifestyle"] },
    { id: 4, name: "Longevity / Anti-Aging", effectiveness: 89, channels: ["Health"] },
  ],
  products: [
    { id: 1, name: "NMN" }, { id: 2, name: "Cocoa Flavanols" }, { id: 3, name: "GLP-1/Berberine" },
    { id: 4, name: "Spermidine" }, { id: 5, name: "Sleepex" }, { id: 6, name: "Longevity Mix" },
  ],
  promos: [
    { id: 1, type: "BOGO (Buy One Get One)", avgConversion: 4.2 },
    { id: 2, type: "45% OFF Flash Sale", avgConversion: 4.5 },
    { id: 3, type: "40% OFF Storewide", avgConversion: 3.8 },
  ]
};

// Build context for AI
const buildDataContext = (influencers, scripts, elements) => {
  return `You are the Script Brain for Black Forest Supplements influencer marketing. You have access to comprehensive performance data.

TOP INFLUENCERS:
${influencers.slice(0, 10).map(i => `- ${i.name}: ${i.avgViews.toLocaleString()} avg views, $${i.avgCPM} CPM, ${i.reliability}% reliability, ${i.makeGoods} make-goods. Best script: "${i.bestScript}". Notes: ${i.notes}`).join('\n')}

TOP SCRIPTS:
${scripts.map(s => `- "${s.name}" (${s.product}): ${s.avgPerformance}% effectiveness, used ${s.timesUsed}x. Status: ${s.status}. Best with: ${s.bestWith.join(', ')}. Notes: ${s.notes}`).join('\n')}

BEST HOOKS: ${elements.hooks.map(h => `"${h.text}" (${h.effectiveness}%)`).join(', ')}
BEST ANGLES: ${elements.angles.map(a => `${a.name} (${a.effectiveness}%)`).join(', ')}
PROMOS: ${elements.promos.map(p => `${p.type} (${p.avgConversion}% conv)`).join(', ')}

KEY INSIGHTS:
1. Stephen Gardner FDA Script is the BEST EVER performer (96%)
2. Joe Rogan clips are the strongest hooks (94-95%)
3. Black Scout Survival is best for launches (99% reliability)
4. Awaken w/ JP often needs make-goods (4 historical)
5. BOGO and 45% Flash Sales convert best

Be concise, specific, and data-driven in your responses.`;
};

// Deep Insights Engine
const generateInsights = (influencers, scripts) => {
  const insights = [];
  
  const highRiskInfluencers = influencers.filter(i => i.makeGoods >= 3 || i.reliability < 88);
  if (highRiskInfluencers.length > 0) {
    insights.push({
      type: 'warning', priority: 'high', title: 'Make-Good Risk Alert',
      detail: `${highRiskInfluencers.map(i => i.name).join(', ')} have elevated make-good risk. Consider backup channels.`,
      action: 'Review contracts', metric: `${highRiskInfluencers.length} at-risk`
    });
  }
  
  const underutilized = influencers.filter(i => i.avgViews > 300000 && i.totalIntegrations < 10);
  if (underutilized.length > 0) {
    const potentialRevenue = underutilized.reduce((sum, i) => sum + (i.avgViews * 0.04 * 10), 0);
    insights.push({
      type: 'opportunity', priority: 'high', title: 'Untapped High-Reach Channels',
      detail: `${underutilized.map(i => i.name).join(', ')} have massive reach but few integrations.`,
      action: 'Increase booking', metric: `$${Math.round(potentialRevenue/1000)}k potential`
    });
  }
  
  const topInfluencers = influencers.filter(i => i.reliability >= 96);
  const commonProducts = {};
  topInfluencers.forEach(i => i.topProducts?.forEach(p => commonProducts[p] = (commonProducts[p] || 0) + 1));
  const bestProduct = Object.entries(commonProducts).sort((a,b) => b[1] - a[1])[0];
  if (bestProduct) {
    insights.push({
      type: 'insight', priority: 'medium', title: 'Product-Influencer Fit Pattern',
      detail: `${bestProduct[0]} performs exceptionally well with your most reliable influencers.`,
      action: 'Optimize allocation', metric: `${bestProduct[1]}/${topInfluencers.length} top performers`
    });
  }
  
  insights.push({
    type: 'insight', priority: 'low', title: 'Best Integration Timing',
    detail: 'Tuesday-Thursday uploads get 18% higher engagement. Black Scout performs best with video in first 10 minutes.',
    action: 'Schedule optimization', metric: '+18% engagement'
  });
  
  const mostEfficient = [...influencers].sort((a,b) => (b.avgViews/b.avgCPM) - (a.avgViews/a.avgCPM)).slice(0, 3);
  insights.push({
    type: 'opportunity', priority: 'medium', title: 'Best CPM Efficiency',
    detail: `${mostEfficient.map(i => i.name).join(', ')} deliver the highest views per dollar.`,
    action: 'Rebalance budget', metric: `${Math.round(mostEfficient[0]?.avgViews/mostEfficient[0]?.avgCPM/1000)}k views/$1`
  });
  
  return insights;
};

// Main Component
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'avgViews', direction: 'desc' });
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [newItemForm, setNewItemForm] = useState({});
  const [showTooltip, setShowTooltip] = useState(null);
  
  const [influencerData, setInfluencerData] = useState(initialInfluencerData);
  const [scriptData, setScriptData] = useState(initialScriptData);
  const [scriptElements, setScriptElements] = useState(initialScriptElements);
  
  const [scriptConfig, setScriptConfig] = useState({
    product: 'NMN', influencer: '', angle: '', hook: '', promo: 'BOGO (Buy One Get One)', customInstructions: ''
  });

  const totalIntegrations = influencerData.reduce((sum, inf) => sum + inf.totalIntegrations, 0);
  const avgCPM = (influencerData.reduce((sum, inf) => sum + inf.avgCPM, 0) / influencerData.length).toFixed(1);
  const totalReach = influencerData.reduce((sum, inf) => sum + (inf.avgViews * inf.totalIntegrations), 0);
  const insights = useMemo(() => generateInsights(influencerData, scriptData), [influencerData, scriptData]);

  const sortData = (data, config) => [...data].sort((a, b) => {
    if (a[config.key] < b[config.key]) return config.direction === 'asc' ? -1 : 1;
    if (a[config.key] > b[config.key]) return config.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredInfluencers = useMemo(() => {
    let result = influencerData;
    if (searchTerm) {
      result = result.filter(inf => 
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inf.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return sortData(result, sortConfig);
  }, [searchTerm, sortConfig, influencerData]);

  // Real API call for Script Brain
  const handleChat = async (query) => {
    setChatMessages(prev => [...prev, { role: 'user', content: query }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: buildDataContext(influencerData, scriptData, scriptElements),
          messages: [...chatMessages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: query }]
        })
      });
      
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content || data.error || 'No response' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Real API call for Script Generator
  const handleGenerateScript = async () => {
    setIsGenerating(true);
    const influencer = influencerData.find(i => i.name === scriptConfig.influencer);
    const baseScript = scriptData.find(s => s.product === scriptConfig.product && s.status !== 'disapproved');

    const prompt = `Generate a high-converting influencer script for Black Forest Supplements.

CONFIGURATION:
- Product: ${scriptConfig.product}
- Target Influencer: ${scriptConfig.influencer || 'General'}${influencer ? ` (${influencer.category}, ${influencer.avgViews.toLocaleString()} avg views, best script: "${influencer.bestScript}")` : ''}
- Angle: ${scriptConfig.angle || 'Auto-select best'}
- Hook: ${scriptConfig.hook || 'Auto-select best'}
- Promo: ${scriptConfig.promo}
${scriptConfig.customInstructions ? `- Custom Instructions: ${scriptConfig.customInstructions}` : ''}

BASE ON THIS TOP PERFORMER: "${baseScript?.name}" (${baseScript?.avgPerformance}% effectiveness)

Generate a script with these EXACT sections in JSON format:
{
  "hook": "Opening hook (15-30 seconds) - attention grabbing opener",
  "problem": "Problem awareness section (30-45 seconds) - what's wrong",
  "solution": "Introduce Black Forest Supplements as solution (30 seconds)",
  "proof": "Social proof and credibility (20-30 seconds)",
  "cta": "Call to action with promo details (15-20 seconds)",
  "tips": ["Tip 1 for the influencer", "Tip 2", "Tip 3"]
}

Make it natural, conversational, and optimized for the specific influencer's style.`;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: buildDataContext(influencerData, scriptData, scriptElements),
          prompt: prompt
        })
      });
      
      const data = await response.json();
      const content = data.content || '';
      
      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const scriptContent = JSON.parse(jsonMatch[0]);
        setGeneratedScript({
          title: `${scriptConfig.product} Script - ${influencer?.name || 'General'}`,
          basedOn: baseScript?.name || 'Custom',
          confidence: Math.min(95, (baseScript?.avgPerformance || 80) + (influencer?.reliability || 85) / 20),
          structure: scriptContent,
          influencerNotes: influencer?.notes,
          warnings: influencer?.makeGoods >= 3 ? [`⚠️ ${influencer.name} has ${influencer.makeGoods} historical make-goods`] : []
        });
      } else {
        setGeneratedScript({
          title: `${scriptConfig.product} Script`,
          basedOn: 'AI Generated',
          confidence: 85,
          structure: { hook: content.slice(0, 500), problem: '', solution: '', proof: '', cta: '', tips: [] },
          influencerNotes: null,
          warnings: ['Could not parse structured response']
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddItem = (type) => {
    if (!newItemForm.name && !newItemForm.text && !newItemForm.type) return;
    switch(type) {
      case 'product':
        if (newItemForm.name) setScriptElements(prev => ({ ...prev, products: [...prev.products, { id: Date.now(), name: newItemForm.name }] }));
        break;
      case 'hook':
        if (newItemForm.text) setScriptElements(prev => ({ ...prev, hooks: [...prev.hooks, { id: Date.now(), text: newItemForm.text, effectiveness: parseInt(newItemForm.effectiveness) || 80 }] }));
        break;
      case 'angle':
        if (newItemForm.name) setScriptElements(prev => ({ ...prev, angles: [...prev.angles, { id: Date.now(), name: newItemForm.name, effectiveness: parseInt(newItemForm.effectiveness) || 80, channels: (newItemForm.channels || '').split(',').map(c => c.trim()) }] }));
        break;
      case 'promo':
        if (newItemForm.type) setScriptElements(prev => ({ ...prev, promos: [...prev.promos, { id: Date.now(), type: newItemForm.type, avgConversion: parseFloat(newItemForm.avgConversion) || 3.5 }] }));
        break;
    }
    setShowAddModal(null);
    setNewItemForm({});
  };

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899'];

  const MetricTooltip = ({ id, children }) => (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      {children}
      <Info style={{ width: '14px', height: '14px', color: '#737373', cursor: 'help' }} onMouseEnter={() => setShowTooltip(id)} onMouseLeave={() => setShowTooltip(null)} />
      {showTooltip === id && (
        <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px', padding: '12px', backgroundColor: '#262626', border: '1px solid #404040', borderRadius: '8px', fontSize: '12px', color: '#e5e5e5', width: '220px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          {id === 'reliability' && "Percentage of integrations that hit view targets without needing make-goods."}
          {id === 'risk' && "Composite score based on make-good history and reliability variance. Lower = safer."}
        </div>
      )}
    </span>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#f0f0f0', fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Add Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={() => setShowAddModal(null)}>
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '16px', padding: '28px', width: '400px', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '700' }}>Add New {showAddModal}</h3>
              <button onClick={() => setShowAddModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X style={{ color: '#999', width: '20px', height: '20px' }} /></button>
            </div>
            
            {showAddModal === 'product' && (
              <div>
                <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Product Name</label>
                <input type="text" placeholder="e.g. New Supplement" value={newItemForm.name || ''} onChange={e => setNewItemForm({...newItemForm, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            )}
            
            {showAddModal === 'hook' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Hook Text</label>
                  <input type="text" placeholder="e.g. Scientists discovered..." value={newItemForm.text || ''} onChange={e => setNewItemForm({...newItemForm, text: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Effectiveness %</label>
                  <input type="number" placeholder="80" value={newItemForm.effectiveness || ''} onChange={e => setNewItemForm({...newItemForm, effectiveness: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
            
            {showAddModal === 'angle' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Angle Name</label>
                  <input type="text" placeholder="e.g. Biohacking" value={newItemForm.name || ''} onChange={e => setNewItemForm({...newItemForm, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Effectiveness %</label>
                  <input type="number" placeholder="80" value={newItemForm.effectiveness || ''} onChange={e => setNewItemForm({...newItemForm, effectiveness: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
            
            {showAddModal === 'promo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Promo Type</label>
                  <input type="text" placeholder="e.g. 50% OFF" value={newItemForm.type || ''} onChange={e => setNewItemForm({...newItemForm, type: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ccc', marginBottom: '8px', fontSize: '14px' }}>Avg Conversion %</label>
                  <input type="number" step="0.1" placeholder="3.5" value={newItemForm.avgConversion || ''} onChange={e => setNewItemForm({...newItemForm, avgConversion: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setShowAddModal(null)} style={{ flex: 1, padding: '12px', backgroundColor: '#262626', border: 'none', borderRadius: '8px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button onClick={() => handleAddItem(showAddModal)} style={{ flex: 1, padding: '12px', backgroundColor: '#f59e0b', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Influencer Detail Modal */}
      {selectedInfluencer && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setSelectedInfluencer(null)}>
          <div style={{ backgroundColor: '#111', borderRadius: '20px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'auto', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '16px', background: 'linear-gradient(135deg, #f59e0b, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#000' }}>{selectedInfluencer.name.charAt(0)}</div>
                  <div>
                    <h2 style={{ color: '#fff', margin: '0 0 6px', fontSize: '26px', fontWeight: '700' }}>{selectedInfluencer.name}</h2>
                    <p style={{ color: '#888', margin: 0, fontSize: '15px' }}>{selectedInfluencer.category} • {selectedInfluencer.channel}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedInfluencer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X style={{ color: '#888', width: '24px', height: '24px' }} /></button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Avg Views', value: `${(selectedInfluencer.avgViews/1000).toFixed(0)}k`, color: '#3b82f6' },
                  { label: 'Reliability', value: `${selectedInfluencer.reliability}%`, color: selectedInfluencer.reliability >= 95 ? '#10b981' : '#f59e0b' },
                  { label: 'CPM', value: `$${selectedInfluencer.avgCPM}`, color: '#8b5cf6' },
                  { label: 'Risk Score', value: selectedInfluencer.riskScore, color: selectedInfluencer.riskScore < 15 ? '#10b981' : '#ef4444' },
                ].map((m, i) => (
                  <div key={i} style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '18px', border: '1px solid #262626' }}>
                    <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>{m.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '20px', border: '1px solid #262626', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>View Performance (6 Months)</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={selectedInfluencer.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="m" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={v => `${v}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="v" stroke="#f59e0b" fill="rgba(245,158,11,0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '20px', border: '1px solid #262626' }}>
                  <h4 style={{ color: '#fff', margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>Details</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {selectedInfluencer.topProducts?.map((p, i) => (
                      <span key={i} style={{ padding: '6px 14px', backgroundColor: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '20px', color: '#93c5fd', fontSize: '13px' }}>{p}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Best Script</span><span style={{ color: '#fff', fontSize: '13px' }}>{selectedInfluencer.bestScript}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Total Integrations</span><span style={{ color: '#fff', fontSize: '13px' }}>{selectedInfluencer.totalIntegrations}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Make-Goods</span><span style={{ color: selectedInfluencer.makeGoods === 0 ? '#10b981' : '#f59e0b', fontSize: '13px' }}>{selectedInfluencer.makeGoods}</span></div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '20px', border: '1px solid #262626' }}>
                  <h4 style={{ color: '#fff', margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>Performance Radar</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={[
                      { metric: 'Reliability', value: selectedInfluencer.reliability },
                      { metric: 'Conversion', value: selectedInfluencer.conversionRate * 20 },
                      { metric: 'Audience', value: selectedInfluencer.audienceMatch },
                      { metric: 'Value', value: 100 - selectedInfluencer.avgCPM * 4 },
                    ]}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="metric" stroke="#666" fontSize={11} />
                      <Radar dataKey="value" stroke="#f59e0b" fill="rgba(245,158,11,0.3)" strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Lightbulb style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                  <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '14px' }}>Notes</span>
                </div>
                <p style={{ color: '#fef3c7', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{selectedInfluencer.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ borderBottom: '1px solid #262626', padding: '18px 28px', background: 'linear-gradient(to right, #0a0a0a, #151510, #0a0a0a)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🌲</div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0 }}>Black Forest Intelligence</h1>
              <p style={{ fontSize: '13px', color: '#f59e0b', margin: 0 }}>Influencer Marketing Command Center</p>
            </div>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#4ade80', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }}></span>
            {influencerData.length} Active Channels
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #262626', backgroundColor: '#0f0f0f', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'influencers', label: 'Influencers', icon: Users },
            { id: 'scripts', label: 'Scripts', icon: FileText },
            { id: 'insights', label: 'Deep Insights', icon: Lightbulb },
            { id: 'brain', label: 'Script Brain', icon: Brain },
            { id: 'mastermind', label: 'Generator', icon: Sparkles },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px', fontSize: '14px', fontWeight: '600', background: activeTab === tab.id ? 'rgba(245,158,11,0.1)' : 'transparent', borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent', color: activeTab === tab.id ? '#fcd34d' : '#888', border: 'none', cursor: 'pointer' }}>
              <tab.icon style={{ width: '16px', height: '16px' }} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px' }}>
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[
                { label: 'Total Integrations', value: totalIntegrations, icon: Target, color: '#f59e0b', change: '+12%' },
                { label: 'Avg CPM', value: `$${avgCPM}`, icon: DollarSign, color: '#10b981', change: '-3%' },
                { label: 'Total Reach', value: `${(totalReach/1000000).toFixed(1)}M`, icon: Eye, color: '#3b82f6', change: '+8%' },
                { label: 'Active Scripts', value: scriptData.filter(s => s.status !== 'disapproved').length, icon: FileText, color: '#8b5cf6', change: '+2' },
              ].map((m, i) => (
                <div key={i} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ color: '#888', fontSize: '13px', margin: '0 0 10px' }}>{m.label}</p>
                      <p style={{ color: '#fff', fontSize: '32px', fontWeight: '700', margin: 0 }}>{m.value}</p>
                      <p style={{ color: m.change.startsWith('+') ? '#4ade80' : '#f87171', fontSize: '13px', margin: '8px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {m.change.startsWith('+') ? <ArrowUp style={{ width: '12px', height: '12px' }} /> : <ArrowDown style={{ width: '12px', height: '12px' }} />}
                        {m.change} vs last month
                      </p>
                    </div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <m.icon style={{ width: '24px', height: '24px', color: m.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
                <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: '16px', fontWeight: '600' }}>Performance Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={[{month:'Jul',views:2.8,conv:4.1},{month:'Aug',views:3.1,conv:4.3},{month:'Sep',views:3.4,conv:4.5},{month:'Oct',views:3.2,conv:4.4},{month:'Nov',views:3.6,conv:4.6},{month:'Dec',views:3.5,conv:4.5}]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="views" name="Views (M)" stroke="#3b82f6" fill="rgba(59,130,246,0.2)" strokeWidth={2} />
                    <Area type="monotone" dataKey="conv" name="Conv %" stroke="#10b981" fill="rgba(16,185,129,0.2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
                <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: '16px', fontWeight: '600' }}>Product Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={[{name:'Cocoa',value:35},{name:'NMN',value:30},{name:'GLP-1',value:20},{name:'Other',value:15}]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                      {[0,1,2,3].map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Lightbulb style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
                <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: '600' }}>Priority Insights</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {insights.slice(0, 3).map((insight, i) => (
                  <div key={i} style={{ padding: '16px', backgroundColor: insight.type === 'warning' ? 'rgba(239,68,68,0.1)' : insight.type === 'opportunity' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)', border: `1px solid ${insight.type === 'warning' ? 'rgba(239,68,68,0.3)' : insight.type === 'opportunity' ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)'}`, borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      {insight.type === 'warning' ? <AlertCircle style={{ width: '16px', height: '16px', color: '#f87171' }} /> : <Award style={{ width: '16px', height: '16px', color: '#4ade80' }} />}
                      <span style={{ color: insight.type === 'warning' ? '#fca5a5' : '#86efac', fontWeight: '600', fontSize: '14px' }}>{insight.title}</span>
                    </div>
                    <p style={{ color: '#ccc', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.5' }}>{insight.detail.slice(0, 100)}...</p>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: insight.type === 'warning' ? '#f87171' : '#4ade80' }}>{insight.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Influencers Tab */}
        {activeTab === 'influencers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Influencer Leaderboard</h2>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#666' }} />
                <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px', width: '220px' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #262626', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a0a0a' }}>
                    {[{key:'name',label:'Influencer'},{key:'avgViews',label:'Avg Views'},{key:'avgCPM',label:'CPM'},{key:'reliability',label:'Reliability'},{key:'riskScore',label:'Risk'},{key:'totalIntegrations',label:'Integrations'}].map(col => (
                      <th key={col.key} onClick={() => setSortConfig({ key: col.key, direction: sortConfig.key === col.key && sortConfig.direction === 'desc' ? 'asc' : 'desc' })} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '1px solid #262626' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {col.label}
                          {sortConfig.key === col.key && (sortConfig.direction === 'desc' ? <ChevronDown style={{ width: '14px', height: '14px' }} /> : <ChevronUp style={{ width: '14px', height: '14px' }} />)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredInfluencers.map((inf, i) => (
                    <tr key={inf.id} onClick={() => setSelectedInfluencer(inf)} style={{ cursor: 'pointer', borderBottom: '1px solid #1a1a1a' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#1a1a1a'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(180,83,9,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fcd34d' }}>{i + 1}</span>
                          <div>
                            <p style={{ color: '#fff', margin: 0, fontWeight: '500', fontSize: '15px' }}>{inf.name}</p>
                            <p style={{ color: '#666', margin: '2px 0 0', fontSize: '12px' }}>{inf.category}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#e5e5e5', fontFamily: 'monospace' }}>{(inf.avgViews/1000).toFixed(0)}k</td>
                      <td style={{ padding: '16px 20px', color: '#4ade80', fontWeight: '600', fontFamily: 'monospace' }}>${inf.avgCPM}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '60px', height: '6px', backgroundColor: '#262626', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', backgroundColor: inf.reliability >= 95 ? '#10b981' : inf.reliability >= 90 ? '#f59e0b' : '#ef4444', width: `${inf.reliability}%` }} />
                          </div>
                          <span style={{ color: '#ccc', fontSize: '13px', fontFamily: 'monospace' }}>{inf.reliability}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', backgroundColor: inf.riskScore < 15 ? 'rgba(16,185,129,0.2)' : inf.riskScore < 25 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)', color: inf.riskScore < 15 ? '#4ade80' : inf.riskScore < 25 ? '#fbbf24' : '#f87171' }}>
                          {inf.riskScore < 15 ? 'Low' : inf.riskScore < 25 ? 'Med' : 'High'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '13px', backgroundColor: 'rgba(59,130,246,0.2)', color: '#93c5fd' }}>{inf.totalIntegrations}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>Click any row to view detailed profile</p>
          </div>
        )}

        {/* Scripts Tab */}
        {activeTab === 'scripts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Script Performance</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {scriptData.sort((a,b) => b.avgPerformance - a.avgPerformance).map((script, i) => (
                <div key={script.id} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: script.status === 'top-performer' ? '2px solid rgba(245,158,11,0.5)' : script.status === 'disapproved' ? '1px solid rgba(239,68,68,0.3)' : '1px solid #262626', opacity: script.status === 'disapproved' ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: script.status === 'top-performer' ? 'linear-gradient(135deg, #f59e0b, #b45309)' : script.status === 'disapproved' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: script.status === 'top-performer' ? '#000' : script.status === 'disapproved' ? '#fca5a5' : '#6ee7b7' }}>{i + 1}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h3 style={{ color: '#fff', margin: 0, fontSize: '17px', fontWeight: '600' }}>{script.name}</h3>
                          {script.status === 'top-performer' && <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(245,158,11,0.2)', color: '#fcd34d', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Star style={{ width: '12px', height: '12px' }} /> TOP</span>}
                        </div>
                        <p style={{ color: '#888', margin: '0 0 12px', fontSize: '14px' }}>{script.notes}</p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#666' }}>
                          <span>Product: <span style={{ color: '#ccc' }}>{script.product}</span></span>
                          <span>Created: <span style={{ color: '#ccc' }}>{script.dateCreated}</span></span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '140px' }}>
                      <div style={{ fontSize: '36px', fontWeight: '700', color: '#4ade80', fontFamily: 'monospace' }}>{script.avgPerformance}%</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>{script.timesUsed}x used</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Insights Tab */}
        {activeTab === 'insights' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lightbulb style={{ width: '28px', height: '28px', color: '#fbbf24' }} />
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Deep Insights Engine</h2>
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered analysis revealing hidden patterns</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {insights.map((insight, i) => (
                <div key={i} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626', borderLeft: `4px solid ${insight.type === 'warning' ? '#ef4444' : insight.type === 'opportunity' ? '#10b981' : '#3b82f6'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        {insight.type === 'warning' && <AlertCircle style={{ width: '20px', height: '20px', color: '#f87171' }} />}
                        {insight.type === 'opportunity' && <Award style={{ width: '20px', height: '20px', color: '#4ade80' }} />}
                        {insight.type === 'insight' && <Activity style={{ width: '20px', height: '20px', color: '#60a5fa' }} />}
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '17px' }}>{insight.title}</span>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', backgroundColor: insight.priority === 'high' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)', color: insight.priority === 'high' ? '#fca5a5' : '#fcd34d' }}>{insight.priority.toUpperCase()}</span>
                      </div>
                      <p style={{ color: '#ccc', margin: '0 0 16px', fontSize: '15px', lineHeight: '1.6' }}>{insight.detail}</p>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '13px' }}>
                        <ArrowRight style={{ width: '14px', height: '14px' }} /> Recommended: {insight.action}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: insight.type === 'warning' ? '#f87171' : '#4ade80' }}>{insight.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Script Brain */}
        {activeTab === 'brain' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain style={{ width: '26px', height: '26px', color: '#fff' }} />
              </div>
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Script Brain</h2>
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered Q&A about your data</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #262626', height: '500px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chatMessages.length === 0 ? (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Brain style={{ width: '64px', height: '64px', color: '#333', marginBottom: '16px' }} />
                    <p style={{ color: '#ccc', fontSize: '16px', marginBottom: '8px' }}>Ask me anything about your data</p>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>I know all your scripts, influencers, and performance metrics</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                      {["What's our best script?", "Who are top NMN influencers?", "Who needs make-goods?", "Best promos?", "Launch strategy?"].map(q => (
                        <button key={q} onClick={() => handleChat(q)} style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontSize: '13px', cursor: 'pointer' }}>{q}</button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '75%', padding: '14px 18px', borderRadius: '16px', backgroundColor: msg.role === 'user' ? 'rgba(245,158,11,0.2)' : '#1a1a1a', border: msg.role === 'user' ? '1px solid rgba(245,158,11,0.3)' : '1px solid #333', color: msg.role === 'user' ? '#fef3c7' : '#e5e5e5' }}>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ padding: '14px 18px', borderRadius: '16px', backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#888' }}>Thinking...</div>
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid #262626' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && chatInput && !isLoading && handleChat(chatInput)} placeholder="Ask about scripts, influencers, strategy..." disabled={isLoading} style={{ flex: 1, padding: '14px 18px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', color: '#fff', fontSize: '14px' }} />
                  <button onClick={() => chatInput && !isLoading && handleChat(chatInput)} disabled={isLoading} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isLoading ? 0.5 : 1 }}>
                    <MessageSquare style={{ width: '16px', height: '16px' }} /> Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Script Generator */}
        {activeTab === 'mastermind' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles style={{ width: '26px', height: '26px', color: '#fff' }} />
              </div>
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Script Generator</h2>
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered script generation based on your data</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter style={{ width: '18px', height: '18px', color: '#fbbf24' }} /> Configuration
                </h3>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ color: '#ccc', fontSize: '14px' }}>Product</label>
                    <button onClick={() => setShowAddModal('product')} style={{ fontSize: '12px', color: '#fbbf24', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus style={{ width: '12px', height: '12px' }} /> Add</button>
                  </div>
                  <select value={scriptConfig.product} onChange={e => setScriptConfig({...scriptConfig, product: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px' }}>
                    {scriptElements.products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '14px', marginBottom: '8px' }}>Target Influencer</label>
                  <select value={scriptConfig.influencer} onChange={e => setScriptConfig({...scriptConfig, influencer: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px' }}>
                    <option value="">General (any influencer)</option>
                    {influencerData.map(i => <option key={i.id} value={i.name}>{i.name} ({i.category})</option>)}
                  </select>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ color: '#ccc', fontSize: '14px' }}>Angle</label>
                    <button onClick={() => setShowAddModal('angle')} style={{ fontSize: '12px', color: '#fbbf24', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus style={{ width: '12px', height: '12px' }} /> Add</button>
                  </div>
                  <select value={scriptConfig.angle} onChange={e => setScriptConfig({...scriptConfig, angle: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px' }}>
                    <option value="">Auto-select best</option>
                    {scriptElements.angles.map(a => <option key={a.id} value={a.name}>{a.name} ({a.effectiveness}%)</option>)}
                  </select>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ color: '#ccc', fontSize: '14px' }}>Promo</label>
                    <button onClick={() => setShowAddModal('promo')} style={{ fontSize: '12px', color: '#fbbf24', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus style={{ width: '12px', height: '12px' }} /> Add</button>
                  </div>
                  <select value={scriptConfig.promo} onChange={e => setScriptConfig({...scriptConfig, promo: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px' }}>
                    {scriptElements.promos.map(p => <option key={p.id} value={p.type}>{p.type} ({p.avgConversion}%)</option>)}
                  </select>
                </div>

                <button onClick={handleGenerateScript} disabled={isGenerating} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: isGenerating ? 0.6 : 1 }}>
                  {isGenerating ? 'Generating...' : <><Sparkles style={{ width: '18px', height: '18px' }} /> Generate Script</>}
                </button>
              </div>

              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626', maxHeight: '600px', overflow: 'auto' }}>
                {!generatedScript ? (
                  <div style={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Sparkles style={{ width: '64px', height: '64px', color: '#333', marginBottom: '16px' }} />
                    <p style={{ color: '#ccc', fontSize: '16px' }}>Configure and generate</p>
                    <p style={{ color: '#666', fontSize: '13px' }}>Scripts based on your best performers</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ color: '#fff', margin: 0, fontSize: '17px', fontWeight: '600' }}>{generatedScript.title}</h3>
                      <span style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>{generatedScript.confidence.toFixed(0)}% confidence</span>
                    </div>

                    <div style={{ fontSize: '13px', color: '#888' }}>Based on: <span style={{ color: '#fbbf24' }}>{generatedScript.basedOn}</span></div>

                    {generatedScript.influencerNotes && (
                      <div style={{ padding: '14px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '10px', fontSize: '13px', color: '#93c5fd' }}>
                        <strong>Influencer Notes:</strong> {generatedScript.influencerNotes}
                      </div>
                    )}

                    {[{key:'hook',label:'HOOK',color:'#fbbf24'},{key:'problem',label:'PROBLEM',color:'#f87171'},{key:'solution',label:'SOLUTION',color:'#4ade80'},{key:'proof',label:'PROOF',color:'#60a5fa'},{key:'cta',label:'CTA',color:'#c4b5fd'}].map(s => generatedScript.structure[s.key] && (
                      <div key={s.key} style={{ padding: '16px', backgroundColor: '#0a0a0a', borderRadius: '10px', border: '1px solid #262626' }}>
                        <p style={{ fontSize: '11px', color: s.color, marginBottom: '8px', fontWeight: '700', letterSpacing: '0.5px' }}>{s.label}</p>
                        <p style={{ color: '#e5e5e5', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{generatedScript.structure[s.key]}</p>
                      </div>
                    ))}

                    {generatedScript.structure.tips?.length > 0 && (
                      <div style={{ borderTop: '1px solid #262626', paddingTop: '16px' }}>
                        <p style={{ fontSize: '11px', color: '#888', marginBottom: '12px', fontWeight: '700' }}>TIPS</p>
                        {generatedScript.structure.tips.map((tip, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '10px' }}>
                            <CheckCircle style={{ width: '16px', height: '16px', color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                            <span style={{ color: '#ccc', fontSize: '13px' }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedScript.warnings?.map((w, i) => (
                      <div key={i} style={{ padding: '12px', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', color: '#fbbf24', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle style={{ width: '16px', height: '16px' }} /> {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        select option { background-color: #111; color: #fff; }
        input::placeholder { color: #555; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
}
