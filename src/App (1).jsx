import React, { useState, useMemo } from 'react';
import { Search, Users, FileText, Brain, Sparkles, ChevronDown, ChevronUp, Star, AlertCircle, CheckCircle, BarChart3, Zap, Filter, MessageSquare, Trophy, Target, Flame, DollarSign, Plus, X, Info, ArrowUp, ArrowDown, Eye, TrendingDown, TrendingUp, Award, Shield, Lightbulb, Activity, ArrowRight, Calendar, Clock, Play, BookOpen, Send, Loader, PieChart as PieChartIcon, GitBranch, Percent, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, ComposedChart, Legend } from 'recharts';

// Extended influencer data with 12 months of history
const initialInfluencerData = [
  { id: 1, name: "Stephen Gardner", channel: "YouTube", avgViews: 285000, totalIntegrations: 47, avgCPM: 12, bestScript: "stephen-fda", bestScriptName: "Stephen Gardner FDA Script", category: "News/Finance", reliability: 98, makeGoods: 0, notes: "Consistently high performer. FDA/Big Pharma angles work extremely well. Best days: Tue-Thu.", monthlyData: [{m:'Jan',v:245},{m:'Feb',v:250},{m:'Mar',v:255},{m:'Apr',v:262},{m:'May',v:268},{m:'Jun',v:272},{m:'Jul',v:260},{m:'Aug',v:275},{m:'Sep',v:290},{m:'Oct',v:285},{m:'Nov',v:295},{m:'Dec',v:285}], topProducts: ["Cocoa","NMN","GLP-1"], conversionRate: 4.8, audienceMatch: 95, riskScore: 5, revenue: 142000, spend: 28000 },
  { id: 2, name: "Paul Joseph Watson", channel: "YouTube", avgViews: 420000, totalIntegrations: 52, avgCPM: 15, bestScript: "cocoa-epstein", bestScriptName: "Cocoa Epstein Script", category: "Commentary", reliability: 95, makeGoods: 1, notes: "Premium placement. Cocoa #2 and Spermidine scripts perform well. Strong male 25-44 demo.", monthlyData: [{m:'Jan',v:380},{m:'Feb',v:385},{m:'Mar',v:390},{m:'Apr',v:395},{m:'May',v:398},{m:'Jun',v:402},{m:'Jul',v:400},{m:'Aug',v:410},{m:'Sep',v:430},{m:'Oct',v:425},{m:'Nov',v:440},{m:'Dec',v:420}], topProducts: ["Cocoa","Spermidine","NMN"], conversionRate: 4.2, audienceMatch: 92, riskScore: 12, revenue: 198000, spend: 39000 },
  { id: 3, name: "Black Scout Survival", channel: "YouTube", avgViews: 165000, totalIntegrations: 58, avgCPM: 8, bestScript: "ronnie-coleman", bestScriptName: "Ronnie Coleman Script", category: "Survival/Prepper", reliability: 99, makeGoods: 0, notes: "Best for product launches. Two-clip format works great. Extremely consistent delivery.", monthlyData: [{m:'Jan',v:140},{m:'Feb',v:142},{m:'Mar',v:145},{m:'Apr',v:148},{m:'May',v:150},{m:'Jun',v:152},{m:'Jul',v:155},{m:'Aug',v:160},{m:'Sep',v:170},{m:'Oct',v:168},{m:'Nov',v:175},{m:'Dec',v:165}], topProducts: ["Cocoa","Brain Complex","Spike Detox"], conversionRate: 5.1, audienceMatch: 97, riskScore: 3, revenue: 116000, spend: 23000 },
  { id: 4, name: "Better Bachelor", channel: "YouTube", avgViews: 145000, totalIntegrations: 44, avgCPM: 9, bestScript: "feminization-rogan", bestScriptName: "Feminization + Joe Rogan", category: "Lifestyle/Men", reliability: 94, makeGoods: 2, notes: "Huberman Turk & Tongkat works. Feminization angle resonates strongly with audience.", monthlyData: [{m:'Jan',v:130},{m:'Feb',v:132},{m:'Mar',v:135},{m:'Apr',v:138},{m:'May',v:140},{m:'Jun',v:142},{m:'Jul',v:140},{m:'Aug',v:148},{m:'Sep',v:152},{m:'Oct',v:145},{m:'Nov',v:150},{m:'Dec',v:145}], topProducts: ["NMN","Testosterone","GLP-1"], conversionRate: 3.9, audienceMatch: 88, riskScore: 18, revenue: 78000, spend: 19800 },
  { id: 5, name: "REDACTED", channel: "YouTube", avgViews: 380000, totalIntegrations: 38, avgCPM: 14, bestScript: "rogan-glp1", bestScriptName: "Joe Rogan GLP-1", category: "News/Politics", reliability: 92, makeGoods: 3, notes: "Interview format available. New Cocoa Script performs well. Higher variance in performance.", monthlyData: [{m:'Jan',v:340},{m:'Feb',v:345},{m:'Mar',v:350},{m:'Apr',v:355},{m:'May',v:358},{m:'Jun',v:362},{m:'Jul',v:360},{m:'Aug',v:375},{m:'Sep',v:390},{m:'Oct',v:385},{m:'Nov',v:395},{m:'Dec',v:380}], topProducts: ["GLP-1","Cocoa","NMN"], conversionRate: 4.0, audienceMatch: 85, riskScore: 22, revenue: 133000, spend: 26600 },
  { id: 6, name: "Steve Turley", channel: "YouTube", avgViews: 195000, totalIntegrations: 41, avgCPM: 10, bestScript: "sleepex-launch", bestScriptName: "Sleepex Launch Script", category: "Commentary", reliability: 96, makeGoods: 1, notes: "Great for launches. FDA Cocoa Script works. Strong older male demographic.", monthlyData: [{m:'Jan',v:170},{m:'Feb',v:172},{m:'Mar',v:175},{m:'Apr',v:178},{m:'May',v:180},{m:'Jun',v:182},{m:'Jul',v:185},{m:'Aug',v:190},{m:'Sep',v:200},{m:'Oct',v:198},{m:'Nov',v:205},{m:'Dec',v:195}], topProducts: ["Sleepex","Cocoa","NMN"], conversionRate: 4.3, audienceMatch: 91, riskScore: 10, revenue: 98000, spend: 20500 },
  { id: 7, name: "Midnight's Edge", channel: "YouTube", avgViews: 125000, totalIntegrations: 45, avgCPM: 7, bestScript: "nmn-variation", bestScriptName: "NMN #1 Variation", category: "Entertainment", reliability: 93, makeGoods: 2, notes: "Prefers Big Pharma narrative. Not responsive to feminization angles.", monthlyData: [{m:'Jan',v:110},{m:'Feb',v:112},{m:'Mar',v:114},{m:'Apr',v:116},{m:'May',v:118},{m:'Jun',v:120},{m:'Jul',v:120},{m:'Aug',v:125},{m:'Sep',v:130},{m:'Oct',v:128},{m:'Nov',v:132},{m:'Dec',v:125}], topProducts: ["NMN","Cocoa","Spermidine"], conversionRate: 3.5, audienceMatch: 82, riskScore: 15, revenue: 67500, spend: 15750 },
  { id: 8, name: "Hustl", channel: "YouTube", avgViews: 95000, totalIntegrations: 32, avgCPM: 6, bestScript: "ronnie-coleman", bestScriptName: "Ronnie Coleman Script", category: "Motivation", reliability: 97, makeGoods: 0, notes: "Bone Marrow Script successful. Great engagement rates. Younger demographic.", monthlyData: [{m:'Jan',v:78},{m:'Feb',v:80},{m:'Mar',v:82},{m:'Apr',v:84},{m:'May',v:86},{m:'Jun',v:88},{m:'Jul',v:90},{m:'Aug',v:95},{m:'Sep',v:100},{m:'Oct',v:98},{m:'Nov',v:102},{m:'Dec',v:95}], topProducts: ["Cocoa","Longevity Mix","NMN"], conversionRate: 4.6, audienceMatch: 90, riskScore: 8, revenue: 54000, spend: 9600 },
  { id: 9, name: "Russell Brand", channel: "YouTube", avgViews: 520000, totalIntegrations: 4, avgCPM: 22, bestScript: "rogan-stem", bestScriptName: "Joe Rogan Stem Cell", category: "Commentary", reliability: 90, makeGoods: 0, notes: "Counter offer at $15k. High CPM but massive reach. Use for major launches only.", monthlyData: [{m:'Jan',v:480},{m:'Feb',v:485},{m:'Mar',v:490},{m:'Apr',v:495},{m:'May',v:498},{m:'Jun',v:502},{m:'Jul',v:500},{m:'Aug',v:510},{m:'Sep',v:530},{m:'Oct',v:525},{m:'Nov',v:540},{m:'Dec',v:520}], topProducts: ["NMN","Longevity Mix"], conversionRate: 3.2, audienceMatch: 78, riskScore: 25, revenue: 45000, spend: 22000 },
  { id: 10, name: "Matt Walsh", channel: "YouTube", avgViews: 445000, totalIntegrations: 5, avgCPM: 18, bestScript: "rogan-analysis", bestScriptName: "Joe Rogan Analysis", category: "Commentary", reliability: 91, makeGoods: 1, notes: "Premium conservative audience. High engagement. Political angles work well.", monthlyData: [{m:'Jan',v:410},{m:'Feb',v:415},{m:'Mar',v:420},{m:'Apr',v:425},{m:'May',v:428},{m:'Jun',v:432},{m:'Jul',v:430},{m:'Aug',v:440},{m:'Sep',v:455},{m:'Oct',v:450},{m:'Nov',v:460},{m:'Dec',v:445}], topProducts: ["NMN","Cocoa"], conversionRate: 3.8, audienceMatch: 86, riskScore: 20, revenue: 40000, spend: 22500 },
  { id: 11, name: "Awaken with JP", channel: "YouTube", avgViews: 165000, totalIntegrations: 22, avgCPM: 11, bestScript: "rogan-glp1", bestScriptName: "Joe Rogan GLP-1", category: "Comedy", reliability: 85, makeGoods: 4, notes: "Often doesn't hit 160k threshold. Use JP Reacts for make-goods. Comedy angle works.", monthlyData: [{m:'Jan',v:155},{m:'Feb',v:158},{m:'Mar',v:160},{m:'Apr',v:162},{m:'May',v:158},{m:'Jun',v:155},{m:'Jul',v:150},{m:'Aug',v:160},{m:'Sep',v:175},{m:'Oct',v:165},{m:'Nov',v:155},{m:'Dec',v:165}], topProducts: ["GLP-1","NMN"], conversionRate: 3.4, audienceMatch: 80, riskScore: 35, revenue: 48000, spend: 12100 },
  { id: 12, name: "Donut Operator", channel: "YouTube", avgViews: 385000, totalIntegrations: 2, avgCPM: 16, bestScript: "cocoa-cardio", bestScriptName: "Cocoa Cardio Script", category: "Law Enforcement", reliability: 95, makeGoods: 0, notes: "Try Joe Rogan approach. Last chance - ask him. Strong engagement when posts.", monthlyData: [{m:'Jan',v:350},{m:'Feb',v:355},{m:'Mar',v:360},{m:'Apr',v:365},{m:'May',v:368},{m:'Jun',v:372},{m:'Jul',v:370},{m:'Aug',v:380},{m:'Sep',v:395},{m:'Oct',v:390},{m:'Nov',v:400},{m:'Dec',v:385}], topProducts: ["Cocoa"], conversionRate: 4.1, audienceMatch: 83, riskScore: 15, revenue: 15400, spend: 6160 },
];

// Full script content database
const scriptDatabase = {
  "stephen-fda": {
    id: "stephen-fda",
    name: "Stephen Gardner FDA Script",
    product: "Cocoa Flavanols",
    avgPerformance: 96,
    timesUsed: 18,
    status: "top-performer",
    dateCreated: "Jul 2025",
    bestWith: ["Stephen Gardner", "Steve Turley", "Paul Joseph Watson"],
    hook: "The FDA is trying to BAN this natural supplement that Big Pharma doesn't want you to know about. Joe Rogan just talked about this on his podcast with Dr. Rhonda Patrick...",
    problem: "For decades, pharmaceutical companies have pushed expensive medications while suppressing natural alternatives. Cocoa flavanols - the same compounds found in dark chocolate - have been shown in over 30 clinical studies to support healthy blood pressure, cognitive function, and cardiovascular health. But now the FDA wants to restrict access to concentrated forms of these compounds. Why? Follow the money.",
    solution: "Black Forest Supplements has created a pharmaceutical-grade Cocoa Flavanol extract that delivers 500mg of pure flavanols per serving - the exact dose used in clinical studies. No fillers, no additives, just pure bioavailable cocoa extract sourced from sustainable farms.",
    proof: "Over 47,000 customers have made the switch. Clinical studies from Harvard Medical School show flavanols can improve blood flow to the brain by up to 34%. The research is clear - this is one of the most studied natural compounds for heart and brain health.",
    cta: "Go to blackforestsupplements.com and use code [CREATOR] for 45% off your first order. This deal won't last - stock up before the FDA makes their move. Link in description.",
    tips: [
      "Emphasize the FDA angle early - it creates urgency",
      "Mention Joe Rogan in the first 10 seconds for retention",
      "Personal testimony about energy/focus works well here",
      "Keep the conspiracy angle subtle but present"
    ],
    notes: "BEST PERFORMING SCRIPT. FDA/Big Pharma narrative resonates extremely well with conservative audiences. The Joe Rogan hook consistently drives highest retention."
  },
  "ronnie-coleman": {
    id: "ronnie-coleman",
    name: "Ronnie Coleman Script",
    product: "Cocoa Flavanols",
    avgPerformance: 93,
    timesUsed: 22,
    status: "approved",
    dateCreated: "Jul 2025",
    bestWith: ["Black Scout Survival", "Hustl"],
    hook: "[CLIP: Ronnie Coleman 'Lightweight baby!'] You know what's NOT lightweight? The science behind what this 8-time Mr. Olympia used for recovery...",
    problem: "Most people don't realize that elite athletes have access to recovery protocols that the average person never hears about. Ronnie Coleman, despite multiple surgeries, maintained incredible cardiovascular health well into his 50s. His secret? Optimizing blood flow and nutrient delivery to muscles.",
    solution: "Cocoa flavanols have been shown to increase nitric oxide production by up to 40%, improving blood flow throughout your entire body. Black Forest Supplements delivers clinical-dose flavanols in every serving - the same protocol used by pro athletes.",
    proof: "Studies from the European Journal of Nutrition show improved exercise performance and faster recovery times. Plus, it tastes incredible - like premium dark chocolate without the sugar.",
    cta: "Hit the link below for 40% off your first order. Use code [CREATOR] at checkout. Whether you're hitting the gym or just want better energy throughout the day, this is the foundation.",
    tips: [
      "Lead with the Ronnie Coleman clip - high retention hook",
      "Works great with fitness/motivation content",
      "Emphasize the recovery angle over just 'health'",
      "Two-clip format: open with RC, close with personal take"
    ],
    notes: "Bodybuilding angle works well with fitness audiences. Two video clips format has highest engagement."
  },
  "rogan-glp1": {
    id: "rogan-glp1",
    name: "Joe Rogan GLP-1 Script",
    product: "GLP-1/Berberine",
    avgPerformance: 92,
    timesUsed: 25,
    status: "approved",
    dateCreated: "Feb 2025",
    bestWith: ["Stephen Gardner", "Awaken w/ JP", "REDACTED"],
    hook: "[JOE ROGAN CLIP about Ozempic] Everyone's talking about these weight loss drugs, but here's what they're NOT telling you about the natural alternative...",
    problem: "Ozempic and Wegovy cost $1,000+ per month and come with serious side effects - muscle loss, nausea, and potential thyroid issues. Celebrities are using them, but at what cost? The pharmaceutical industry is making BILLIONS while there's a natural compound that works on the same GLP-1 pathway.",
    solution: "Berberine has been called 'Nature's Ozempic' - it's been used in traditional medicine for centuries and modern research shows it activates the same metabolic pathways. Black Forest's Berberine Complex combines clinical-dose berberine with absorption enhancers for maximum effectiveness.",
    proof: "Multiple studies show berberine can support healthy blood sugar levels already in normal range and promote healthy weight management. Dr. Andrew Huberman has discussed berberine extensively on his podcast.",
    cta: "Skip the $1,000/month injections. Go to blackforestsupplements.com and use code [CREATOR] for BOGO free on your first order. Stock is limited.",
    tips: [
      "The Ozempic comparison is powerful - lean into it",
      "Mention the cost savings prominently",
      "Huberman reference adds credibility",
      "Works best with health/wellness focused channels"
    ],
    notes: "FDA/Big Pharma angle. Strong performer with news/commentary channels."
  },
  "cocoa-epstein": {
    id: "cocoa-epstein",
    name: "Cocoa Epstein Script",
    product: "Cocoa Flavanols",
    avgPerformance: 91,
    timesUsed: 15,
    status: "approved",
    dateCreated: "Aug 2025",
    bestWith: ["Paul Joseph Watson"],
    hook: "The elites have known about this for decades. While they're drinking high-cacao chocolate on private islands, they've been keeping the real science hidden from you...",
    problem: "Why do you think high-end dark chocolate costs $50 a bar in certain circles? It's not about taste - it's about the concentrated flavanols that support cognitive function and longevity. The wealthy have access to information and supplements that never make it to the mainstream.",
    solution: "Black Forest Supplements has democratized access to pharmaceutical-grade cocoa flavanols. The same concentration that costs hundreds in boutique health clinics is now available directly to you.",
    proof: "Research from top universities confirms what the elite have known: cocoa flavanols support brain health, cardiovascular function, and cellular longevity. This isn't conspiracy - it's published science they hoped you'd never find.",
    cta: "Take back control. Link below, code [CREATOR] for 45% off. Don't let them keep this from you any longer.",
    tips: [
      "Conspiracy angle should be suggestive, not explicit",
      "Works extremely well with PJW's audience",
      "Pair with current events when possible",
      "Elite vs. common people framing is key"
    ],
    notes: "Edgier script for commentary channels. High engagement with conspiracy-curious audiences."
  },
  "sleepex-launch": {
    id: "sleepex-launch",
    name: "Sleepex Launch Script",
    product: "Sleepex",
    avgPerformance: 91,
    timesUsed: 19,
    status: "approved",
    dateCreated: "Nov 2025",
    bestWith: ["Steve Turley", "Stephen Gardner"],
    hook: "I haven't slept this well in 20 years. And no, it's not melatonin - that stuff actually makes sleep WORSE long-term...",
    problem: "Here's what Big Pharma doesn't want you to know: melatonin supplements can actually suppress your body's natural melatonin production over time. You become dependent. The sleep industry is a $70 billion market built on products that create repeat customers, not healthy sleepers.",
    solution: "Sleepex uses a completely different approach - adaptogenic herbs and minerals that support your body's natural sleep architecture. No dependency, no grogginess, just deep restorative sleep.",
    proof: "After 3 weeks of testing, I'm waking up before my alarm feeling actually rested. The difference is night and day. Clinical studies show the key ingredients improve deep sleep duration by up to 25%.",
    cta: "If you've struggled with sleep, you need to try this. Link below, code [CREATOR] for 40% off your first order.",
    tips: [
      "Personal testimony is crucial for sleep products",
      "Anti-melatonin angle differentiates us",
      "Morning energy is a strong selling point",
      "Works well as a 'new product' launch announcement"
    ],
    notes: "Launch script - great for introducing new products. Personal angle works well."
  },
  "rogan-stem": {
    id: "rogan-stem",
    name: "Joe Rogan Stem Cell Script",
    product: "NMN",
    avgPerformance: 89,
    timesUsed: 8,
    status: "approved",
    dateCreated: "May 2025",
    bestWith: ["Russell Brand", "Matt Walsh"],
    hook: "[JOE ROGAN CLIP on longevity/stem cells] Joe Rogan just dropped $50,000 on stem cell therapy. But what if I told you there's something you can take daily that activates similar pathways for less than $2 a day?",
    problem: "The longevity industry is exploding, but most treatments cost tens of thousands of dollars and require flying to special clinics. Meanwhile, researchers have identified compounds that support cellular regeneration that anyone can access.",
    solution: "NMN - Nicotinamide Mononucleotide - is the precursor to NAD+, the molecule that powers cellular energy and repair. Studies from Harvard's David Sinclair show it can support healthy aging at the cellular level. Black Forest NMN is pharmaceutical-grade, third-party tested.",
    proof: "Dr. David Sinclair takes NMN daily and has been researching it for over a decade. The science is peer-reviewed and published in Nature and Cell. This isn't fringe - it's the cutting edge of longevity research.",
    cta: "Start your longevity protocol today. Link in description, code [CREATOR] for 45% off.",
    tips: [
      "Sinclair name-drop adds scientific credibility",
      "Cost comparison to stem cells is powerful",
      "Works best with higher-income demographics",
      "Longevity angle appeals to 35+ audience"
    ],
    notes: "Premium positioning for high-CPM channels. Longevity/biohacking angle."
  },
  "nmn-variation": {
    id: "nmn-variation",
    name: "NMN #1 Variation",
    product: "NMN",
    avgPerformance: 88,
    timesUsed: 20,
    status: "approved",
    dateCreated: "Mar 2024",
    bestWith: ["Midnight's Edge", "Various"],
    hook: "Big Pharma is terrified of this molecule. It's been called the 'fountain of youth' compound, and they can't patent it...",
    problem: "Aging isn't just about wrinkles - it's about cellular decline. NAD+ levels drop by 50% by age 50, leading to decreased energy, slower recovery, and cognitive decline. Pharmaceutical companies can't profit from natural compounds, so they push expensive drugs instead.",
    solution: "NMN directly converts to NAD+ in your body. Black Forest NMN uses a patented stabilization process to ensure maximum bioavailability. One capsule daily supports cellular energy production.",
    proof: "Harvard researchers have been studying NAD+ boosters for over 15 years. The evidence is overwhelming - this is one of the most promising areas of longevity science.",
    cta: "Don't wait until you feel old. Link below for 40% off with code [CREATOR].",
    tips: [
      "Big Pharma angle resonates across audiences",
      "Can be adapted for various channel styles",
      "Scientific credibility is important here",
      "Energy angle works for all ages"
    ],
    notes: "Versatile NMN script. Works across multiple channel types."
  },
  "rogan-analysis": {
    id: "rogan-analysis",
    name: "Joe Rogan Analysis Script",
    product: "NMN",
    avgPerformance: 87,
    timesUsed: 6,
    status: "approved",
    dateCreated: "Jun 2025",
    bestWith: ["Matt Walsh"],
    hook: "Let's break down what Joe Rogan actually takes every day. He's spent millions optimizing his health - here's the one thing you can actually afford...",
    problem: "Rogan's full supplement stack costs thousands per month. IV therapies, hormone optimization, stem cells - it's not realistic for most people. But there's one thing in his stack that delivers the most bang for your buck.",
    solution: "NMN is the foundation of any serious longevity protocol. It's what Rogan, Huberman, and Sinclair all agree on. Black Forest makes it accessible without the premium markup.",
    proof: "Every major longevity researcher is taking or studying NMN. The peer-reviewed research is extensive. This isn't speculation - it's science.",
    cta: "Build your foundation. Link in description, code [CREATOR] for your discount.",
    tips: [
      "Analysis angle works for commentary channels",
      "List other expensive treatments as contrast",
      "Rogan's routine is endlessly fascinating to audiences",
      "Keep it aspirational but accessible"
    ],
    notes: "Commentary/analysis format. Good for channels that do 'breakdowns'."
  },
  "cocoa-cardio": {
    id: "cocoa-cardio",
    name: "Cocoa Cardio Script",
    product: "Cocoa Flavanols",
    avgPerformance: 89,
    timesUsed: 21,
    status: "approved",
    dateCreated: "Oct 2025",
    bestWith: ["X22 Report", "Hustl", "Donut Operator"],
    hook: "Your heart is working 24/7. Here's what cardiologists aren't telling you about the easiest way to support it...",
    problem: "Heart disease is still the #1 killer, and most people just accept statins and hope for the best. But research shows that certain natural compounds can support cardiovascular function - without the side effects of pharmaceuticals.",
    solution: "Cocoa flavanols have more clinical evidence for heart health than almost any other natural supplement. They support healthy blood pressure, improve arterial flexibility, and enhance blood flow. Black Forest's concentrated formula delivers the clinical dose.",
    proof: "The European Food Safety Authority has approved health claims for cocoa flavanols - that's rare for any supplement. This isn't alternative medicine - it's proven science.",
    cta: "Your heart works hard for you. Support it back. Link below, code [CREATOR] for 40% off.",
    tips: [
      "Heart health angle works across demographics",
      "Less conspiratorial, more health-focused",
      "Good for channels with older audiences",
      "European approval is a strong credibility point"
    ],
    notes: "Straightforward health script. Less edgy, broader appeal."
  },
  "feminization-rogan": {
    id: "feminization-rogan",
    name: "Feminization of Men + Joe Rogan",
    product: "Testosterone Support",
    avgPerformance: 86,
    timesUsed: 12,
    status: "approved",
    dateCreated: "Apr 2025",
    bestWith: ["Better Bachelor"],
    hook: "[JOE ROGAN CLIP on testosterone decline] Testosterone levels in men have dropped 50% since the 1980s. This isn't natural - something is being done to us...",
    problem: "Plastics, processed foods, sedentary lifestyles - modern life is an assault on male hormones. The 'experts' tell you it's normal to feel tired, unmotivated, and weak. It's not. Your grandfather had twice your testosterone at your age.",
    solution: "Black Forest's Testosterone Support combines Tongkat Ali, Fadogia, and key minerals that clinical studies show can support healthy testosterone production. No synthetic hormones - just natural optimization.",
    proof: "Dr. Andrew Huberman has covered these exact compounds on his podcast. The research shows significant support for healthy T levels in just 8 weeks.",
    cta: "Reclaim what's yours. Link below, code [CREATOR] for your discount.",
    tips: [
      "Masculinity angle resonates strongly with men's channels",
      "Historical comparison is powerful",
      "Huberman reference adds credibility",
      "Avoid being too aggressive - confident, not angry"
    ],
    notes: "Men's health angle. Strong performer with lifestyle/men's content."
  }
};

const initialScriptData = Object.values(scriptDatabase).map((s, i) => ({
  id: i + 1,
  scriptId: s.id,
  name: s.name,
  product: s.product,
  avgPerformance: s.avgPerformance,
  timesUsed: s.timesUsed,
  bestWith: s.bestWith,
  status: s.status,
  notes: s.notes,
  dateCreated: s.dateCreated,
  monthlyPerf: [{m:'Jul',p:s.avgPerformance-4},{m:'Aug',p:s.avgPerformance-3},{m:'Sep',p:s.avgPerformance-1},{m:'Oct',p:s.avgPerformance},{m:'Nov',p:s.avgPerformance+1},{m:'Dec',p:s.avgPerformance}]
}));

const initialScriptElements = {
  hooks: [
    { id: 1, text: "Joe Rogan discussing [topic] with [guest]", effectiveness: 95 },
    { id: 2, text: "FDA trying to ban [supplement]", effectiveness: 92 },
    { id: 3, text: "Big Pharma doesn't want you to know", effectiveness: 88 },
    { id: 4, text: "Dr. [Authority] reveals shocking truth", effectiveness: 91 },
    { id: 5, text: "[Celebrity] secret protocol revealed", effectiveness: 85 },
  ],
  angles: [
    { id: 1, name: "Health Freedom / Anti-FDA", effectiveness: 91, channels: ["Political", "News"] },
    { id: 2, name: "Big Pharma Conspiracy", effectiveness: 88, channels: ["Commentary"] },
    { id: 3, name: "Masculinity / Men's Health", effectiveness: 86, channels: ["Lifestyle"] },
    { id: 4, name: "Longevity / Anti-Aging", effectiveness: 89, channels: ["Health", "Biohacking"] },
    { id: 5, name: "Elite Access / Democratization", effectiveness: 84, channels: ["Commentary"] },
  ],
  products: [
    { id: 1, name: "NMN" }, { id: 2, name: "Cocoa Flavanols" }, { id: 3, name: "GLP-1/Berberine" },
    { id: 4, name: "Spermidine" }, { id: 5, name: "Sleepex" }, { id: 6, name: "Longevity Mix" },
    { id: 7, name: "Testosterone Support" },
  ],
  promos: [
    { id: 1, type: "BOGO (Buy One Get One)", avgConversion: 4.2 },
    { id: 2, type: "45% OFF First Order", avgConversion: 4.5 },
    { id: 3, type: "40% OFF Storewide", avgConversion: 3.8 },
    { id: 4, type: "Free Shipping + 30% OFF", avgConversion: 3.5 },
  ]
};

// Build context for AI
const buildDataContext = (influencers, scripts, elements) => {
  return `You are the Script Brain for Black Forest Supplements influencer marketing. You're an expert strategist with deep knowledge of influencer performance, script optimization, and marketing psychology.

TOP PERFORMING INFLUENCERS:
${influencers.slice(0, 10).map(i => `- ${i.name} (${i.category}): ${i.avgViews.toLocaleString()} avg views, $${i.avgCPM} CPM, ${i.reliability}% reliability, ${i.makeGoods} make-goods, ROI: ${((i.revenue/i.spend)*100-100).toFixed(0)}%. Best script: "${i.bestScriptName}". Notes: ${i.notes}`).join('\n')}

TOP SCRIPTS BY PERFORMANCE:
${scripts.filter(s => s.status !== 'disapproved').slice(0,6).map(s => `- "${s.name}" (${s.product}): ${s.avgPerformance}% effectiveness, used ${s.timesUsed}x. Best with: ${s.bestWith?.join(', ')}. ${s.notes}`).join('\n')}

PROVEN HOOKS (by effectiveness): ${elements.hooks.map(h => `"${h.text}" (${h.effectiveness}%)`).join(', ')}

BEST ANGLES: ${elements.angles.map(a => `${a.name} (${a.effectiveness}%) - works with ${a.channels.join('/')}`).join('; ')}

PROMO PERFORMANCE: ${elements.promos.map(p => `${p.type}: ${p.avgConversion}% conversion`).join(', ')}

KEY STRATEGIC INSIGHTS:
1. Stephen Gardner FDA Script is the BEST EVER performer (96%) - FDA/Big Pharma narrative is extremely effective
2. Joe Rogan clips are the strongest hooks (94-95% retention)
3. Black Scout Survival is best for product launches (99% reliability, 0 make-goods)
4. Awaken w/ JP has 4 make-goods - use JP Reacts as backup
5. BOGO and 45% Flash Sales convert best
6. Conspiracy-adjacent angles outperform straight health claims
7. Huberman and Sinclair name-drops add credibility
8. Tuesday-Thursday uploads perform 18% better

Be strategic, specific, and data-driven. Provide actionable recommendations.`;
};

// Deep Insights Engine - Enhanced
const generateDeepInsights = (influencers, scripts) => {
  const insights = [];
  
  // Calculate totals
  const totalRevenue = influencers.reduce((s, i) => s + i.revenue, 0);
  const totalSpend = influencers.reduce((s, i) => s + i.spend, 0);
  const overallROI = ((totalRevenue / totalSpend) * 100 - 100).toFixed(0);
  
  // ROI Analysis
  const roiByInfluencer = influencers.map(i => ({
    ...i,
    roi: ((i.revenue / i.spend) * 100 - 100).toFixed(0)
  })).sort((a, b) => b.roi - a.roi);
  
  insights.push({
    type: 'metric',
    priority: 'high',
    title: 'Overall Campaign ROI',
    detail: `Total spend: $${(totalSpend/1000).toFixed(0)}k → Revenue: $${(totalRevenue/1000).toFixed(0)}k. Top ROI: ${roiByInfluencer[0].name} (${roiByInfluencer[0].roi}%), ${roiByInfluencer[1].name} (${roiByInfluencer[1].roi}%).`,
    metric: `${overallROI}% ROI`,
    action: 'Reallocate budget to top performers',
    data: roiByInfluencer.slice(0, 5)
  });
  
  // Make-good Risk Analysis
  const highRiskInfluencers = influencers.filter(i => i.makeGoods >= 3 || i.reliability < 88);
  if (highRiskInfluencers.length > 0) {
    const riskCost = highRiskInfluencers.reduce((s, i) => s + (i.makeGoods * i.avgCPM * 1000), 0);
    insights.push({
      type: 'warning',
      priority: 'high',
      title: 'Make-Good Risk Alert',
      detail: `${highRiskInfluencers.map(i => `${i.name} (${i.makeGoods} make-goods, ${i.reliability}% reliability)`).join('; ')}. Estimated risk exposure: $${(riskCost/1000).toFixed(0)}k in potential make-goods.`,
      metric: `$${(riskCost/1000).toFixed(0)}k at risk`,
      action: 'Require performance guarantees or reduce booking',
      data: highRiskInfluencers
    });
  }
  
  // Underutilized High-Performers
  const underutilized = influencers.filter(i => i.avgViews > 300000 && i.totalIntegrations < 10 && i.reliability >= 90);
  if (underutilized.length > 0) {
    const potentialReach = underutilized.reduce((s, i) => s + (i.avgViews * 10), 0);
    insights.push({
      type: 'opportunity',
      priority: 'high',
      title: 'Untapped High-Reach Channels',
      detail: `${underutilized.map(i => `${i.name} (${(i.avgViews/1000).toFixed(0)}k views, only ${i.totalIntegrations} integrations)`).join('; ')}. Potential additional reach: ${(potentialReach/1000000).toFixed(1)}M views.`,
      metric: `${(potentialReach/1000000).toFixed(1)}M potential`,
      action: 'Prioritize outreach and negotiate bulk deals',
      data: underutilized
    });
  }
  
  // Script-Influencer Correlation
  const topScripts = scripts.filter(s => s.avgPerformance >= 90);
  const scriptInfluencerMap = {};
  topScripts.forEach(s => {
    s.bestWith?.forEach(inf => {
      scriptInfluencerMap[inf] = (scriptInfluencerMap[inf] || 0) + 1;
    });
  });
  const versatileInfluencers = Object.entries(scriptInfluencerMap).filter(([_, count]) => count >= 2).sort((a, b) => b[1] - a[1]);
  if (versatileInfluencers.length > 0) {
    insights.push({
      type: 'insight',
      priority: 'medium',
      title: 'Most Versatile Influencers',
      detail: `${versatileInfluencers.map(([name, count]) => `${name} (works with ${count} top scripts)`).join('; ')}. These influencers successfully execute multiple script styles.`,
      metric: `${versatileInfluencers.length} versatile`,
      action: 'Use for A/B testing new scripts',
      data: versatileInfluencers
    });
  }
  
  // Growth Trend Analysis
  const growthAnalysis = influencers.map(i => {
    const recent = i.monthlyData.slice(-3).reduce((s, m) => s + m.v, 0) / 3;
    const earlier = i.monthlyData.slice(0, 3).reduce((s, m) => s + m.v, 0) / 3;
    const growth = ((recent - earlier) / earlier * 100).toFixed(1);
    return { ...i, growth: parseFloat(growth) };
  }).sort((a, b) => b.growth - a.growth);
  
  const fastestGrowing = growthAnalysis.filter(i => i.growth > 10);
  const declining = growthAnalysis.filter(i => i.growth < 0);
  
  if (fastestGrowing.length > 0) {
    insights.push({
      type: 'opportunity',
      priority: 'medium',
      title: 'Fastest Growing Channels',
      detail: `${fastestGrowing.slice(0, 3).map(i => `${i.name} (+${i.growth}% YoY)`).join('; ')}. These channels are gaining momentum - increase investment before CPMs rise.`,
      metric: `+${fastestGrowing[0]?.growth}% top growth`,
      action: 'Lock in rates with long-term deals',
      data: fastestGrowing.slice(0, 5)
    });
  }
  
  if (declining.length > 0) {
    insights.push({
      type: 'warning',
      priority: 'medium',
      title: 'Declining Channels',
      detail: `${declining.map(i => `${i.name} (${i.growth}%)`).join('; ')}. Consider reducing exposure or renegotiating rates.`,
      metric: `${declining.length} declining`,
      action: 'Renegotiate or reduce bookings',
      data: declining
    });
  }
  
  // CPM Efficiency Analysis
  const cpmEfficiency = influencers.map(i => ({
    ...i,
    viewsPerDollar: (i.avgViews / i.avgCPM / 1000).toFixed(1)
  })).sort((a, b) => b.viewsPerDollar - a.viewsPerDollar);
  
  insights.push({
    type: 'insight',
    priority: 'medium',
    title: 'Best Value Channels (Views per $1)',
    detail: `${cpmEfficiency.slice(0, 4).map(i => `${i.name}: ${i.viewsPerDollar}k views/$1`).join('; ')}. These channels deliver maximum reach for budget.`,
    metric: `${cpmEfficiency[0]?.viewsPerDollar}k best`,
    action: 'Prioritize for reach campaigns',
    data: cpmEfficiency.slice(0, 5)
  });
  
  // Product-Channel Fit Analysis
  const productChannelFit = {};
  influencers.forEach(i => {
    i.topProducts?.forEach(p => {
      if (!productChannelFit[p]) productChannelFit[p] = [];
      productChannelFit[p].push({ name: i.name, reliability: i.reliability, views: i.avgViews });
    });
  });
  
  const productInsights = Object.entries(productChannelFit).map(([product, channels]) => ({
    product,
    topChannels: channels.sort((a, b) => b.reliability - a.reliability).slice(0, 3),
    avgReliability: (channels.reduce((s, c) => s + c.reliability, 0) / channels.length).toFixed(0)
  }));
  
  insights.push({
    type: 'insight',
    priority: 'low',
    title: 'Product-Channel Optimization',
    detail: productInsights.slice(0, 3).map(p => `${p.product}: Best with ${p.topChannels.map(c => c.name).join(', ')} (${p.avgReliability}% avg reliability)`).join('. '),
    metric: 'Optimized',
    action: 'Match products to proven channels',
    data: productInsights
  });
  
  // Timing Optimization
  insights.push({
    type: 'insight',
    priority: 'low',
    title: 'Optimal Posting Schedule',
    detail: 'Data shows Tuesday-Thursday uploads get 18% higher engagement. Best performing time slots: 10am-12pm EST for news channels, 6pm-9pm EST for entertainment. Avoid Monday/Friday posts.',
    metric: '+18% Tue-Thu',
    action: 'Coordinate upload schedules',
    data: null
  });
  
  // Script Fatigue Detection
  const overusedScripts = scripts.filter(s => s.timesUsed > 30 && s.avgPerformance < 92);
  if (overusedScripts.length > 0) {
    insights.push({
      type: 'warning',
      priority: 'low',
      title: 'Potential Script Fatigue',
      detail: `${overusedScripts.map(s => `"${s.name}" (used ${s.timesUsed}x, ${s.avgPerformance}%)`).join('; ')}. High usage may be causing audience fatigue.`,
      metric: `${overusedScripts.length} fatigued`,
      action: 'Develop fresh variations',
      data: overusedScripts
    });
  }
  
  return insights;
};

// Main Component
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'avgViews', direction: 'desc' });
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [selectedScript, setSelectedScript] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [newItemForm, setNewItemForm] = useState({});
  const [timeframe, setTimeframe] = useState('6M');
  const [generatorChat, setGeneratorChat] = useState([]);
  const [generatorChatInput, setGeneratorChatInput] = useState('');
  const [isGeneratorChatLoading, setIsGeneratorChatLoading] = useState(false);
  
  const [influencerData] = useState(initialInfluencerData);
  const [scriptData] = useState(initialScriptData);
  const [scriptElements, setScriptElements] = useState(initialScriptElements);
  
  const [scriptConfig, setScriptConfig] = useState({
    product: 'NMN', influencer: '', angle: '', hook: '', promo: 'BOGO (Buy One Get One)', customInstructions: ''
  });

  const insights = useMemo(() => generateDeepInsights(influencerData, scriptData), [influencerData, scriptData]);
  
  // Timeframe filtering
  const getTimeframeData = (monthlyData) => {
    const monthsMap = { '1M': 1, '3M': 3, '6M': 6, '12M': 12 };
    const months = monthsMap[timeframe] || 6;
    return monthlyData.slice(-months);
  };
  
  const calculateGrowth = (monthlyData) => {
    const data = getTimeframeData(monthlyData);
    if (data.length < 2) return 0;
    const first = data[0].v;
    const last = data[data.length - 1].v;
    return ((last - first) / first * 100).toFixed(1);
  };

  const totalIntegrations = influencerData.reduce((sum, inf) => sum + inf.totalIntegrations, 0);
  const avgCPM = (influencerData.reduce((sum, inf) => sum + inf.avgCPM, 0) / influencerData.length).toFixed(1);
  const totalReach = influencerData.reduce((sum, inf) => sum + (inf.avgViews * inf.totalIntegrations), 0);
  const totalRevenue = influencerData.reduce((sum, inf) => sum + inf.revenue, 0);
  const totalSpend = influencerData.reduce((sum, inf) => sum + inf.spend, 0);

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

  // API call for Script Brain
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
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI. Please check your API key.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generator Chat
  const handleGeneratorChat = async (query) => {
    setGeneratorChat(prev => [...prev, { role: 'user', content: query }]);
    setGeneratorChatInput('');
    setIsGeneratorChatLoading(true);

    const context = `You're helping brainstorm and refine influencer marketing scripts for Black Forest Supplements.
Current configuration: Product: ${scriptConfig.product}, Target: ${scriptConfig.influencer || 'General'}, Angle: ${scriptConfig.angle || 'Auto'}, Promo: ${scriptConfig.promo}
${generatedScript ? `\nCurrent generated script:\nHOOK: ${generatedScript.structure?.hook}\nPROBLEM: ${generatedScript.structure?.problem}\nSOLUTION: ${generatedScript.structure?.solution}` : ''}

Help with ideas, refinements, or answer questions about script strategy. Be creative and specific.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: context,
          messages: [...generatorChat.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: query }]
        })
      });
      
      const data = await response.json();
      setGeneratorChat(prev => [...prev, { role: 'assistant', content: data.content || data.error }]);
    } catch (error) {
      setGeneratorChat(prev => [...prev, { role: 'assistant', content: 'Error connecting. Check API key.' }]);
    } finally {
      setIsGeneratorChatLoading(false);
    }
  };

  // Script Generator
  const handleGenerateScript = async () => {
    setIsGenerating(true);
    const influencer = influencerData.find(i => i.name === scriptConfig.influencer);
    const baseScript = scriptData.find(s => s.product === scriptConfig.product && s.status !== 'disapproved');

    const prompt = `Generate a high-converting influencer script for Black Forest Supplements.

CONFIGURATION:
- Product: ${scriptConfig.product}
- Target Influencer: ${scriptConfig.influencer || 'General'}${influencer ? ` (${influencer.category}, ${influencer.avgViews.toLocaleString()} avg views, notes: "${influencer.notes}")` : ''}
- Angle: ${scriptConfig.angle || 'Auto-select best performing'}
- Hook Style: ${scriptConfig.hook || 'Auto-select'}
- Promo: ${scriptConfig.promo}
${scriptConfig.customInstructions ? `- Special Instructions: ${scriptConfig.customInstructions}` : ''}

${baseScript ? `REFERENCE TOP PERFORMER: "${baseScript.name}" (${baseScript.avgPerformance}% effectiveness)` : ''}

Generate a complete script in JSON format:
{
  "hook": "Attention-grabbing opener (15-30 seconds) - make it specific and compelling",
  "problem": "Problem/pain point section (30-45 seconds) - create urgency and relevance", 
  "solution": "Introduce Black Forest as the solution (30 seconds) - be specific about benefits",
  "proof": "Social proof and credibility (20-30 seconds) - use specific claims and authorities",
  "cta": "Call to action with promo details (15-20 seconds) - clear and urgent",
  "tips": ["Delivery tip 1", "Delivery tip 2", "Tip specific to this influencer/angle"]
}

Make it feel natural, conversational, and optimized for the specific channel style. Include specific hooks, claims, and CTAs.`;

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

  const openScriptViewer = (scriptId) => {
    const script = scriptDatabase[scriptId];
    if (script) setSelectedScript(script);
  };

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899'];

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
              <input type="text" placeholder="Product Name" value={newItemForm.name || ''} onChange={e => setNewItemForm({...newItemForm, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
            )}
            
            {showAddModal === 'hook' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="text" placeholder="Hook Text" value={newItemForm.text || ''} onChange={e => setNewItemForm({...newItemForm, text: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
                <input type="number" placeholder="Effectiveness %" value={newItemForm.effectiveness || ''} onChange={e => setNewItemForm({...newItemForm, effectiveness: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0f0f0f', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setShowAddModal(null)} style={{ flex: 1, padding: '12px', backgroundColor: '#262626', border: 'none', borderRadius: '8px', color: '#ccc', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleAddItem(showAddModal)} style={{ flex: 1, padding: '12px', backgroundColor: '#f59e0b', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', fontWeight: '600' }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Script Viewer Modal */}
      {selectedScript && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setSelectedScript(null)}>
          <div style={{ backgroundColor: '#111', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h2 style={{ color: '#fff', margin: 0, fontSize: '22px', fontWeight: '700' }}>{selectedScript.name}</h2>
                    {selectedScript.status === 'top-performer' && (
                      <span style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(245,158,11,0.2)', color: '#fcd34d', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star style={{ width: '12px', height: '12px' }} /> TOP PERFORMER
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>{selectedScript.product} • {selectedScript.dateCreated} • Used {selectedScript.timesUsed}x</p>
                </div>
                <button onClick={() => setSelectedScript(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X style={{ color: '#888', width: '24px', height: '24px' }} />
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#4ade80' }}>{selectedScript.avgPerformance}%</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>Effectiveness</div>
                </div>
                <div style={{ padding: '16px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#60a5fa' }}>{selectedScript.timesUsed}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>Times Used</div>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px', fontWeight: '600' }}>BEST WITH</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedScript.bestWith?.map((name, i) => (
                    <span key={i} style={{ padding: '6px 12px', backgroundColor: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '20px', color: '#c4b5fd', fontSize: '13px' }}>{name}</span>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { key: 'hook', label: 'HOOK', color: '#fbbf24', icon: Play },
                  { key: 'problem', label: 'PROBLEM', color: '#f87171', icon: AlertTriangle },
                  { key: 'solution', label: 'SOLUTION', color: '#4ade80', icon: CheckCircle },
                  { key: 'proof', label: 'PROOF', color: '#60a5fa', icon: Award },
                  { key: 'cta', label: 'CALL TO ACTION', color: '#c4b5fd', icon: Zap },
                ].map(section => selectedScript[section.key] && (
                  <div key={section.key} style={{ padding: '20px', backgroundColor: '#0a0a0a', borderRadius: '12px', border: '1px solid #262626', borderLeft: `4px solid ${section.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <section.icon style={{ width: '16px', height: '16px', color: section.color }} />
                      <span style={{ fontSize: '11px', color: section.color, fontWeight: '700', letterSpacing: '0.5px' }}>{section.label}</span>
                    </div>
                    <p style={{ color: '#e5e5e5', margin: 0, fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedScript[section.key]}</p>
                  </div>
                ))}
              </div>
              
              {selectedScript.tips && selectedScript.tips.length > 0 && (
                <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Lightbulb style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
                    <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: '700' }}>DELIVERY TIPS</span>
                  </div>
                  {selectedScript.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '8px' }}>
                      <CheckCircle style={{ width: '14px', height: '14px', color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: '#fef3c7', fontSize: '13px' }}>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #262626' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '6px', fontWeight: '600' }}>INTERNAL NOTES</p>
                <p style={{ color: '#ccc', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{selectedScript.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Influencer Detail Modal with Timeframe */}
      {selectedInfluencer && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setSelectedInfluencer(null)}>
          <div style={{ backgroundColor: '#111', borderRadius: '20px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'auto', border: '1px solid #333' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '16px', background: 'linear-gradient(135deg, #f59e0b, #b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', color: '#000' }}>{selectedInfluencer.name.charAt(0)}</div>
                  <div>
                    <h2 style={{ color: '#fff', margin: '0 0 6px', fontSize: '26px', fontWeight: '700' }}>{selectedInfluencer.name}</h2>
                    <p style={{ color: '#888', margin: 0, fontSize: '15px' }}>{selectedInfluencer.category} • {selectedInfluencer.channel}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedInfluencer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X style={{ color: '#888', width: '24px', height: '24px' }} /></button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'Avg Views', value: `${(selectedInfluencer.avgViews/1000).toFixed(0)}k`, color: '#3b82f6' },
                  { label: 'Reliability', value: `${selectedInfluencer.reliability}%`, color: selectedInfluencer.reliability >= 95 ? '#10b981' : '#f59e0b' },
                  { label: 'CPM', value: `$${selectedInfluencer.avgCPM}`, color: '#8b5cf6' },
                  { label: 'ROI', value: `${((selectedInfluencer.revenue/selectedInfluencer.spend)*100-100).toFixed(0)}%`, color: '#10b981' },
                  { label: 'Risk', value: selectedInfluencer.riskScore < 15 ? 'Low' : selectedInfluencer.riskScore < 25 ? 'Med' : 'High', color: selectedInfluencer.riskScore < 15 ? '#10b981' : '#ef4444' },
                ].map((m, i) => (
                  <div key={i} style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '16px', border: '1px solid #262626', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{m.label}</div>
                    <div style={{ fontSize: '22px', fontWeight: '700', color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Timeframe Selector */}
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '20px', border: '1px solid #262626', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                    View Performance
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {['1M', '3M', '6M', '12M'].map(tf => (
                      <button key={tf} onClick={() => setTimeframe(tf)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', backgroundColor: timeframe === tf ? '#f59e0b' : '#262626', color: timeframe === tf ? '#000' : '#888', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>{tf}</button>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {parseFloat(calculateGrowth(selectedInfluencer.monthlyData)) >= 0 ? (
                      <TrendingUp style={{ width: '20px', height: '20px', color: '#4ade80' }} />
                    ) : (
                      <TrendingDown style={{ width: '20px', height: '20px', color: '#f87171' }} />
                    )}
                    <span style={{ fontSize: '24px', fontWeight: '700', color: parseFloat(calculateGrowth(selectedInfluencer.monthlyData)) >= 0 ? '#4ade80' : '#f87171' }}>
                      {calculateGrowth(selectedInfluencer.monthlyData) >= 0 ? '+' : ''}{calculateGrowth(selectedInfluencer.monthlyData)}%
                    </span>
                    <span style={{ fontSize: '14px', color: '#888' }}>growth ({timeframe})</span>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={getTimeframeData(selectedInfluencer.monthlyData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="m" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={v => `${v}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} formatter={(v) => [`${v}k views`, 'Views']} />
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#888', fontSize: '13px' }}>Best Script</span>
                      <button onClick={() => openScriptViewer(selectedInfluencer.bestScript)} style={{ color: '#fbbf24', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>{selectedInfluencer.bestScriptName}</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Total Integrations</span><span style={{ color: '#fff', fontSize: '13px' }}>{selectedInfluencer.totalIntegrations}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Make-Goods</span><span style={{ color: selectedInfluencer.makeGoods === 0 ? '#10b981' : '#f59e0b', fontSize: '13px' }}>{selectedInfluencer.makeGoods}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Revenue</span><span style={{ color: '#4ade80', fontSize: '13px' }}>${(selectedInfluencer.revenue/1000).toFixed(0)}k</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#888', fontSize: '13px' }}>Spend</span><span style={{ color: '#fff', fontSize: '13px' }}>${(selectedInfluencer.spend/1000).toFixed(0)}k</span></div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '20px', border: '1px solid #262626' }}>
                  <h4 style={{ color: '#fff', margin: '0 0 16px', fontSize: '15px', fontWeight: '600' }}>Performance Radar</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={[
                      { metric: 'Reliability', value: selectedInfluencer.reliability },
                      { metric: 'Conversion', value: selectedInfluencer.conversionRate * 20 },
                      { metric: 'Audience', value: selectedInfluencer.audienceMatch },
                      { metric: 'Value', value: Math.min(100, 100 - selectedInfluencer.avgCPM * 3) },
                      { metric: 'Safety', value: 100 - selectedInfluencer.riskScore * 2 },
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>${((totalRevenue/totalSpend)*100-100).toFixed(0)}% ROI</span>
            </div>
            <div style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#4ade80', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }}></span>
              {influencerData.length} Active Channels
            </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {[
                { label: 'Total Integrations', value: totalIntegrations, icon: Target, color: '#f59e0b', change: '+12%' },
                { label: 'Avg CPM', value: `$${avgCPM}`, icon: DollarSign, color: '#10b981', change: '-3%' },
                { label: 'Total Reach', value: `${(totalReach/1000000).toFixed(1)}M`, icon: Eye, color: '#3b82f6', change: '+8%' },
                { label: 'Revenue', value: `$${(totalRevenue/1000).toFixed(0)}k`, icon: TrendingUp, color: '#8b5cf6', change: '+15%' },
                { label: 'Overall ROI', value: `${((totalRevenue/totalSpend)*100-100).toFixed(0)}%`, icon: Percent, color: '#4ade80', change: '+5%' },
              ].map((m, i) => (
                <div key={i} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '20px', border: '1px solid #262626' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ color: '#888', fontSize: '12px', margin: '0 0 8px' }}>{m.label}</p>
                      <p style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>{m.value}</p>
                      <p style={{ color: m.change.startsWith('+') ? '#4ade80' : '#f87171', fontSize: '12px', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {m.change.startsWith('+') ? <ArrowUp style={{ width: '12px', height: '12px' }} /> : <ArrowDown style={{ width: '12px', height: '12px' }} />}
                        {m.change}
                      </p>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <m.icon style={{ width: '20px', height: '20px', color: m.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
                <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: '16px', fontWeight: '600' }}>Performance Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={[{month:'Jul',views:2.8,roi:380},{month:'Aug',views:3.1,roi:395},{month:'Sep',views:3.4,roi:410},{month:'Oct',views:3.2,roi:405},{month:'Nov',views:3.6,roi:420},{month:'Dec',views:3.5,roi:415}]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis yAxisId="left" stroke="#666" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="views" name="Views (M)" stroke="#3b82f6" fill="rgba(59,130,246,0.2)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI %" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626' }}>
                <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: '16px', fontWeight: '600' }}>Product Mix</h3>
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
                    <p style={{ color: '#ccc', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.5' }}>{insight.detail.slice(0, 120)}...</p>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: insight.type === 'warning' ? '#f87171' : '#4ade80' }}>{insight.metric}</span>
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
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#666' }} />
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '10px', color: '#fff', fontSize: '14px', width: '220px' }} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #262626', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a0a0a' }}>
                    {[{key:'name',label:'Influencer'},{key:'avgViews',label:'Avg Views'},{key:'avgCPM',label:'CPM'},{key:'reliability',label:'Reliability'},{key:'riskScore',label:'Risk'},{key:'totalIntegrations',label:'Integrations'},{key:'bestScriptName',label:'Best Script'}].map(col => (
                      <th key={col.key} onClick={() => setSortConfig({ key: col.key, direction: sortConfig.key === col.key && sortConfig.direction === 'desc' ? 'asc' : 'desc' })} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#888', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '1px solid #262626' }}>
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
                    <tr key={inf.id} style={{ cursor: 'pointer', borderBottom: '1px solid #1a1a1a' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#1a1a1a'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '14px 16px' }} onClick={() => setSelectedInfluencer(inf)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(180,83,9,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fcd34d' }}>{i + 1}</span>
                          <div>
                            <p style={{ color: '#fff', margin: 0, fontWeight: '500', fontSize: '14px' }}>{inf.name}</p>
                            <p style={{ color: '#666', margin: '2px 0 0', fontSize: '11px' }}>{inf.category}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#e5e5e5', fontFamily: 'monospace', fontSize: '13px' }} onClick={() => setSelectedInfluencer(inf)}>{(inf.avgViews/1000).toFixed(0)}k</td>
                      <td style={{ padding: '14px 16px', color: '#4ade80', fontWeight: '600', fontSize: '13px' }} onClick={() => setSelectedInfluencer(inf)}>${inf.avgCPM}</td>
                      <td style={{ padding: '14px 16px' }} onClick={() => setSelectedInfluencer(inf)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '50px', height: '5px', backgroundColor: '#262626', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', backgroundColor: inf.reliability >= 95 ? '#10b981' : inf.reliability >= 90 ? '#f59e0b' : '#ef4444', width: `${inf.reliability}%` }} />
                          </div>
                          <span style={{ color: '#ccc', fontSize: '12px', fontFamily: 'monospace' }}>{inf.reliability}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }} onClick={() => setSelectedInfluencer(inf)}>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', backgroundColor: inf.riskScore < 15 ? 'rgba(16,185,129,0.2)' : inf.riskScore < 25 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)', color: inf.riskScore < 15 ? '#4ade80' : inf.riskScore < 25 ? '#fbbf24' : '#f87171' }}>
                          {inf.riskScore < 15 ? 'Low' : inf.riskScore < 25 ? 'Med' : 'High'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }} onClick={() => setSelectedInfluencer(inf)}>
                        <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: 'rgba(59,130,246,0.2)', color: '#93c5fd' }}>{inf.totalIntegrations}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button onClick={() => openScriptViewer(inf.bestScript)} style={{ color: '#fbbf24', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textAlign: 'left' }}>
                          {inf.bestScriptName}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: '#666', fontSize: '13px', textAlign: 'center' }}>Click any row for detailed profile • Click script name to view full script</p>
          </div>
        )}

        {/* Scripts Tab */}
        {activeTab === 'scripts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Script Library</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {scriptData.sort((a,b) => b.avgPerformance - a.avgPerformance).map((script) => (
                <div key={script.id} onClick={() => openScriptViewer(script.scriptId)} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '20px', border: script.status === 'top-performer' ? '2px solid rgba(245,158,11,0.5)' : script.status === 'disapproved' ? '1px solid rgba(239,68,68,0.3)' : '1px solid #262626', opacity: script.status === 'disapproved' ? 0.6 : 1, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: '600' }}>{script.name}</h3>
                        {script.status === 'top-performer' && <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(245,158,11,0.2)', color: '#fcd34d', fontSize: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Star style={{ width: '10px', height: '10px' }} /> TOP</span>}
                        {script.status === 'disapproved' && <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: 'rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: '10px' }}>DISAPPROVED</span>}
                      </div>
                      <p style={{ color: '#888', margin: '0 0 10px', fontSize: '13px' }}>{script.notes}</p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666' }}>
                        <span>Product: <span style={{ color: '#ccc' }}>{script.product}</span></span>
                        <span>Created: <span style={{ color: '#ccc' }}>{script.dateCreated}</span></span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: script.status === 'disapproved' ? '#f87171' : '#4ade80', fontFamily: 'monospace' }}>{script.avgPerformance}%</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{script.timesUsed}x used</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #262626' }}>
                    <BookOpen style={{ width: '14px', height: '14px', color: '#888' }} />
                    <span style={{ color: '#888', fontSize: '12px' }}>Click to view full script</span>
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
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lightbulb style={{ width: '26px', height: '26px', color: '#000' }} />
              </div>
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Deep Insights Engine</h2>
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered analysis revealing hidden patterns and opportunities</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {insights.map((insight, i) => (
                <div key={i} style={{ backgroundColor: '#111', borderRadius: '16px', padding: '24px', border: '1px solid #262626', borderLeft: `4px solid ${insight.type === 'warning' ? '#ef4444' : insight.type === 'opportunity' ? '#10b981' : insight.type === 'metric' ? '#8b5cf6' : '#3b82f6'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        {insight.type === 'warning' && <AlertCircle style={{ width: '20px', height: '20px', color: '#f87171' }} />}
                        {insight.type === 'opportunity' && <TrendingUp style={{ width: '20px', height: '20px', color: '#4ade80' }} />}
                        {insight.type === 'metric' && <PieChartIcon style={{ width: '20px', height: '20px', color: '#a78bfa' }} />}
                        {insight.type === 'insight' && <Activity style={{ width: '20px', height: '20px', color: '#60a5fa' }} />}
                        <span style={{ color: '#fff', fontWeight: '600', fontSize: '17px' }}>{insight.title}</span>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', backgroundColor: insight.priority === 'high' ? 'rgba(239,68,68,0.2)' : insight.priority === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)', color: insight.priority === 'high' ? '#fca5a5' : insight.priority === 'medium' ? '#fcd34d' : '#93c5fd' }}>{insight.priority.toUpperCase()}</span>
                      </div>
                      <p style={{ color: '#ccc', margin: '0 0 16px', fontSize: '14px', lineHeight: '1.6' }}>{insight.detail}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px' }}>
                        <ArrowRight style={{ width: '14px', height: '14px' }} />
                        <span>Recommended: <span style={{ color: '#fbbf24' }}>{insight.action}</span></span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '28px', fontWeight: '700', color: insight.type === 'warning' ? '#f87171' : '#4ade80' }}>{insight.metric}</div>
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
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered strategic assistant with full data access</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #262626', height: '550px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chatMessages.length === 0 ? (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Brain style={{ width: '64px', height: '64px', color: '#333', marginBottom: '16px' }} />
                    <p style={{ color: '#ccc', fontSize: '16px', marginBottom: '8px' }}>Your strategic AI assistant</p>
                    <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>I know all your scripts, influencers, performance data, and can help strategize</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '600px' }}>
                      {[
                        "What's our best performing script and why?",
                        "Which influencers should we prioritize for NMN?",
                        "Who has make-good risk right now?",
                        "Give me a launch strategy for a new product",
                        "What's our ROI by channel?",
                        "Which scripts are getting stale?"
                      ].map(q => (
                        <button key={q} onClick={() => handleChat(q)} style={{ padding: '10px 16px', borderRadius: '20px', backgroundColor: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', fontSize: '13px', cursor: 'pointer' }}>{q}</button>
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
                    <div style={{ padding: '14px 18px', borderRadius: '16px', backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                      Analyzing...
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid #262626' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && chatInput && !isLoading && handleChat(chatInput)} placeholder="Ask about scripts, influencers, strategy..." disabled={isLoading} style={{ flex: 1, padding: '14px 18px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', color: '#fff', fontSize: '14px' }} />
                  <button onClick={() => chatInput && !isLoading && handleChat(chatInput)} disabled={isLoading} style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isLoading ? 0.5 : 1 }}>
                    <Send style={{ width: '16px', height: '16px' }} /> Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Script Generator with Chat */}
        {activeTab === 'mastermind' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles style={{ width: '26px', height: '26px', color: '#fff' }} />
              </div>
              <div>
                <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>Script Generator</h2>
                <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>AI-powered script creation with brainstorm mode</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 350px', gap: '20px' }}>
              {/* Config Panel */}
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '20px', border: '1px solid #262626', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter style={{ width: '16px', height: '16px', color: '#fbbf24' }} /> Configuration
                </h3>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ color: '#ccc', fontSize: '13px' }}>Product</label>
                    <button onClick={() => setShowAddModal('product')} style={{ fontSize: '11px', color: '#fbbf24', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add</button>
                  </div>
                  <select value={scriptConfig.product} onChange={e => setScriptConfig({...scriptConfig, product: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }}>
                    {scriptElements.products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '13px', marginBottom: '6px' }}>Target Influencer</label>
                  <select value={scriptConfig.influencer} onChange={e => setScriptConfig({...scriptConfig, influencer: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }}>
                    <option value="">General (any)</option>
                    {influencerData.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '13px', marginBottom: '6px' }}>Angle</label>
                  <select value={scriptConfig.angle} onChange={e => setScriptConfig({...scriptConfig, angle: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }}>
                    <option value="">Auto-select</option>
                    {scriptElements.angles.map(a => <option key={a.id} value={a.name}>{a.name} ({a.effectiveness}%)</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '13px', marginBottom: '6px' }}>Promo</label>
                  <select value={scriptConfig.promo} onChange={e => setScriptConfig({...scriptConfig, promo: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }}>
                    {scriptElements.promos.map(p => <option key={p.id} value={p.type}>{p.type}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#ccc', fontSize: '13px', marginBottom: '6px' }}>Special Instructions</label>
                  <textarea value={scriptConfig.customInstructions} onChange={e => setScriptConfig({...scriptConfig, customInstructions: e.target.value})} placeholder="Any specific requirements..." style={{ width: '100%', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px', minHeight: '60px', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>

                <button onClick={handleGenerateScript} disabled={isGenerating} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', borderRadius: '10px', border: 'none', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isGenerating ? 0.6 : 1 }}>
                  {isGenerating ? <><Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Sparkles style={{ width: '16px', height: '16px' }} /> Generate Script</>}
                </button>
              </div>

              {/* Generated Script */}
              <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '20px', border: '1px solid #262626', maxHeight: '600px', overflow: 'auto' }}>
                {!generatedScript ? (
                  <div style={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Sparkles style={{ width: '64px', height: '64px', color: '#333', marginBottom: '16px' }} />
                    <p style={{ color: '#ccc', fontSize: '16px' }}>Configure and generate</p>
                    <p style={{ color: '#666', fontSize: '13px' }}>AI-powered scripts based on your top performers</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', fontWeight: '600' }}>{generatedScript.title}</h3>
                      <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>{generatedScript.confidence.toFixed(0)}% confidence</span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#888' }}>Based on: <span style={{ color: '#fbbf24' }}>{generatedScript.basedOn}</span></div>

                    {generatedScript.influencerNotes && (
                      <div style={{ padding: '12px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '10px', fontSize: '12px', color: '#93c5fd' }}>
                        <strong>Influencer Notes:</strong> {generatedScript.influencerNotes}
                      </div>
                    )}

                    {[{key:'hook',label:'HOOK',color:'#fbbf24'},{key:'problem',label:'PROBLEM',color:'#f87171'},{key:'solution',label:'SOLUTION',color:'#4ade80'},{key:'proof',label:'PROOF',color:'#60a5fa'},{key:'cta',label:'CTA',color:'#c4b5fd'}].map(s => generatedScript.structure?.[s.key] && (
                      <div key={s.key} style={{ padding: '14px', backgroundColor: '#0a0a0a', borderRadius: '10px', border: '1px solid #262626' }}>
                        <p style={{ fontSize: '10px', color: s.color, marginBottom: '8px', fontWeight: '700', letterSpacing: '0.5px' }}>{s.label}</p>
                        <p style={{ color: '#e5e5e5', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{generatedScript.structure[s.key]}</p>
                      </div>
                    ))}

                    {generatedScript.structure?.tips?.length > 0 && (
                      <div style={{ borderTop: '1px solid #262626', paddingTop: '14px' }}>
                        <p style={{ fontSize: '10px', color: '#888', marginBottom: '10px', fontWeight: '700' }}>DELIVERY TIPS</p>
                        {generatedScript.structure.tips.map((tip, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '8px', marginBottom: '8px' }}>
                            <CheckCircle style={{ width: '14px', height: '14px', color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                            <span style={{ color: '#ccc', fontSize: '12px' }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedScript.warnings?.map((w, i) => (
                      <div key={i} style={{ padding: '10px', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', color: '#fbbf24', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle style={{ width: '14px', height: '14px' }} /> {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Brainstorm Chat */}
              <div style={{ backgroundColor: '#111', borderRadius: '16px', border: '1px solid #262626', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #262626' }}>
                  <h3 style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare style={{ width: '16px', height: '16px', color: '#8b5cf6' }} /> Brainstorm Mode
                  </h3>
                  <p style={{ color: '#666', margin: '4px 0 0', fontSize: '11px' }}>Get ideas, refine scripts, ask questions</p>
                </div>
                
                <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px' }}>
                  {generatorChat.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <p style={{ color: '#666', fontSize: '12px', marginBottom: '12px' }}>Ask for ideas or refinements</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {["Make it more urgent", "Add controversy angle", "Suggest a hook variation", "How can I improve the CTA?"].map(q => (
                          <button key={q} onClick={() => handleGeneratorChat(q)} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#888', fontSize: '11px', cursor: 'pointer', textAlign: 'left' }}>{q}</button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    generatorChat.map((msg, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ maxWidth: '85%', padding: '10px 14px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? 'rgba(139,92,246,0.2)' : '#1a1a1a', border: msg.role === 'user' ? '1px solid rgba(139,92,246,0.3)' : '1px solid #333', color: msg.role === 'user' ? '#c4b5fd' : '#e5e5e5' }}>
                          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isGeneratorChatLoading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#888', fontSize: '12px' }}>Thinking...</div>
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '12px', borderTop: '1px solid #262626' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={generatorChatInput} onChange={e => setGeneratorChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && generatorChatInput && !isGeneratorChatLoading && handleGeneratorChat(generatorChatInput)} placeholder="Ask for ideas..." disabled={isGeneratorChatLoading} style={{ flex: 1, padding: '10px 12px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    <button onClick={() => generatorChatInput && !isGeneratorChatLoading && handleGeneratorChat(generatorChatInput)} disabled={isGeneratorChatLoading} style={{ padding: '10px 14px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', borderRadius: '8px', border: 'none', color: '#fff', cursor: 'pointer', opacity: isGeneratorChatLoading ? 0.5 : 1 }}>
                      <Send style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select option { background-color: #111; color: #fff; }
        input::placeholder, textarea::placeholder { color: #555; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
}
