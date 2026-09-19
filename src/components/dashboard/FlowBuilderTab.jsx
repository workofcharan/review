import React, { useState, useEffect } from 'react';
import { 
  GitFork, 
  Plus, 
  Trash2, 
  Check, 
  Save, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Workflow,
  Smartphone,
  Copy,
  RotateCcw,
  HelpCircle,
  Layers,
  ArrowDown,
  ChevronRight,
  ExternalLink,
  Sliders,
  CornerDownRight,
  Smile,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateReviewDraft, inferCategoryFromBusiness } from '../../utils/aiReviewGenerator';
import EmojiScale from '../customer/EmojiScale';

// Industry preset templates for 1-click loading
const FLOW_TEMPLATES = [
  {
    id: 'healthcare',
    name: 'Healthcare & Dental Care',
    category: 'healthcare',
    icon: '🦷',
    flow: {
      start: 'overall_experience',
      questions: {
        overall_experience: {
          id: 'overall_experience',
          type: 'emoji_scale',
          title: 'How was your dental care experience today?',
          subtitle: 'Tap an emoji to rate your appointment',
          options: [
            { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
            { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
            { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
            { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
            { value: 5, label: 'Excellent!', emoji: '🤩', sentiment: 'positive' }
          ],
          next: {
            '5': 'positive_highlights',
            '4': 'positive_highlights',
            '3': 'private_manager_alert',
            '2': 'private_manager_alert',
            '1': 'private_manager_alert'
          }
        },
        positive_highlights: {
          id: 'positive_highlights',
          type: 'chips_multiselect',
          title: 'What delighted you about your treatment & visit?',
          subtitle: 'Select all that made your appointment comfortable',
          options: [
            'Painless & Gentle Procedure',
            'Dr. C\'s Clear & Reassuring Guidance',
            'Spotless & Modern Sterile Equipment',
            'Prompt Zero-Wait Time',
            'Friendly Front Desk Team',
            'Thorough Scaling & Cleaning',
            'Affordable & Transparent Treatment Plan',
            'Comfortable Treatment Chair & Ambiance'
          ],
          next: { default: 'direct_submit' }
        },
        private_manager_alert: {
          id: 'private_manager_alert',
          type: 'private_resolution',
          title: 'Direct Escalation to Clinic Director & Dr. C',
          subtitle: 'Your message is sent confidentially to our Lead Dental Surgeon for prompt follow-up and care resolution.',
          placeholder: 'Please describe what happened so Dr. C can review your chart and follow up with you directly...',
          next: { default: 'completion_screen' }
        }
      }
    }
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Dining',
    category: 'restaurant',
    icon: '🍽️',
    flow: {
      start: 'overall_experience',
      questions: {
        overall_experience: {
          id: 'overall_experience',
          type: 'emoji_scale',
          title: 'How was your dining experience today?',
          subtitle: 'Tap an emoji to rate your visit',
          options: [
            { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
            { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
            { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
            { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
            { value: 5, label: 'Superb!', emoji: '🤩', sentiment: 'positive' }
          ],
          next: {
            '5': 'positive_highlights',
            '4': 'positive_highlights',
            '3': 'private_manager_alert',
            '2': 'private_manager_alert',
            '1': 'private_manager_alert'
          }
        },
        positive_highlights: {
          id: 'positive_highlights',
          type: 'chips_multiselect',
          title: 'What made your meal memorable?',
          subtitle: 'Select all highlights that you enjoyed',
          options: [
            'Delicious & Fresh Flavors',
            'Attentive & Friendly Table Service',
            'Cozy & Stylish Dining Ambience',
            'Prompt Kitchen Turnaround',
            'Craft Cocktails & Drink Pairings',
            'Warm Welcoming Host',
            'Great Value & Portion Sizes'
          ],
          next: { default: 'direct_submit' }
        },
        private_manager_alert: {
          id: 'private_manager_alert',
          type: 'private_resolution',
          title: 'Direct Escalation to General Manager & Chef',
          subtitle: 'We take dining quality seriously. Your feedback goes directly to our executive leadership team.',
          placeholder: 'Please let us know about any issue with food quality, wait time, or service...',
          next: { default: 'completion_screen' }
        }
      }
    }
  },
  {
    id: 'gym',
    name: 'Fitness Club & Gym',
    category: 'gym',
    icon: '🏋️',
    flow: {
      start: 'overall_experience',
      questions: {
        overall_experience: {
          id: 'overall_experience',
          type: 'emoji_scale',
          title: 'How was your workout session today?',
          subtitle: 'Tap an emoji to rate your fitness experience',
          options: [
            { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
            { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
            { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
            { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
            { value: 5, label: 'Epic Workout!', emoji: '🤩', sentiment: 'positive' }
          ],
          next: {
            '5': 'positive_highlights',
            '4': 'positive_highlights',
            '3': 'private_manager_alert',
            '2': 'private_manager_alert',
            '1': 'private_manager_alert'
          }
        },
        positive_highlights: {
          id: 'positive_highlights',
          type: 'chips_multiselect',
          title: 'What made your training session great?',
          subtitle: 'Select your top gym highlights',
          options: [
            'State-of-the-Art Equipment & Racks',
            'Motivating & Expert Personal Trainers',
            'Spotless Facility & Locker Rooms',
            'High-Energy Music & Vibe',
            'Dynamic Group Fitness Classes',
            'Seamless Check-in & Friendly Staff'
          ],
          next: { default: 'direct_submit' }
        },
        private_manager_alert: {
          id: 'private_manager_alert',
          type: 'private_resolution',
          title: 'Direct Escalation to Club General Manager',
          subtitle: 'Help us maintain pristine club standards. Your note is reviewed confidentially by GM.',
          placeholder: 'Tell us about equipment maintenance, cleanliness, or class scheduling concerns...',
          next: { default: 'completion_screen' }
        }
      }
    }
  },
  {
    id: 'salon',
    name: 'Salon, Spa & Beauty',
    category: 'salon',
    icon: '💇',
    flow: {
      start: 'overall_experience',
      questions: {
        overall_experience: {
          id: 'overall_experience',
          type: 'emoji_scale',
          title: 'How was your styling & spa appointment?',
          subtitle: 'Tap an emoji to rate your pampering session',
          options: [
            { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
            { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
            { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
            { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
            { value: 5, label: 'Gorgeous!', emoji: '🤩', sentiment: 'positive' }
          ],
          next: {
            '5': 'positive_highlights',
            '4': 'positive_highlights',
            '3': 'private_manager_alert',
            '2': 'private_manager_alert',
            '1': 'private_manager_alert'
          }
        },
        positive_highlights: {
          id: 'positive_highlights',
          type: 'chips_multiselect',
          title: 'What did you love about your treatment?',
          subtitle: 'Select all beauty & styling highlights',
          options: [
            'Flawless Haircut & Expert Styling',
            'Vibrant Color & Rich Balayage',
            'Spotless, Chic & Relaxing Vibe',
            'Gentle Scalp Massage & Wash',
            'Personalized Haircare Advice',
            'Friendly & Welcoming Front Desk'
          ],
          next: { default: 'direct_submit' }
        },
        private_manager_alert: {
          id: 'private_manager_alert',
          type: 'private_resolution',
          title: 'Confidential Escalation to Salon Owner & Lead Stylist',
          subtitle: 'Your satisfaction is our priority. We want to make sure your look is 100% perfect.',
          placeholder: 'Please describe any adjustment needed for your color, cut, or appointment...',
          next: { default: 'completion_screen' }
        }
      }
    }
  },
  {
    id: 'quick_boost',
    name: 'Fast 2-Step Review Accelerator',
    category: 'general',
    icon: '⚡',
    flow: {
      start: 'overall_experience',
      questions: {
        overall_experience: {
          id: 'overall_experience',
          type: 'emoji_scale',
          title: 'How was your experience with us today?',
          subtitle: 'Tap an emoji to rate your visit (Step 1 of 2)',
          options: [
            { value: 1, label: 'Poor', emoji: '😣', sentiment: 'negative' },
            { value: 2, label: 'Fair', emoji: '🙁', sentiment: 'negative' },
            { value: 3, label: 'Average', emoji: '😐', sentiment: 'neutral' },
            { value: 4, label: 'Good', emoji: '😊', sentiment: 'positive' },
            { value: 5, label: 'Amazing!', emoji: '🤩', sentiment: 'positive' }
          ],
          next: {
            '5': 'positive_highlights',
            '4': 'positive_highlights',
            '3': 'private_manager_alert',
            '2': 'private_manager_alert',
            '1': 'private_manager_alert'
          }
        },
        positive_highlights: {
          id: 'positive_highlights',
          type: 'chips_multiselect',
          title: 'What made your visit exceptional?',
          subtitle: 'Select key highlights (Step 2 of 2)',
          options: [
            'Exceptional & Friendly Customer Service',
            'Quick & Prompt Turnaround',
            'Clean & Comfortable Atmosphere',
            'High Quality Results',
            'Transparent Pricing & Value'
          ],
          next: { default: 'direct_submit' }
        },
        private_manager_alert: {
          id: 'private_manager_alert',
          type: 'private_resolution',
          title: 'Direct Private Resolution to Management',
          subtitle: 'Your message goes straight to leadership to resolve any issues immediately.',
          placeholder: 'Please tell us what went wrong so we can make things right...',
          next: { default: 'completion_screen' }
        }
      }
    }
  }
];

export default function FlowBuilderTab() {
  const { activeBusiness, updateBusiness, navigateTo } = useApp();

  // Helper to get fallback default flow
  const getDefaultFlow = (biz) => {
    const cat = inferCategoryFromBusiness(biz);
    const matched = FLOW_TEMPLATES.find(t => t.category === cat) || FLOW_TEMPLATES[0];
    const clone = JSON.parse(JSON.stringify(matched.flow));
    if (clone.questions?.overall_experience) {
      clone.questions.overall_experience.title = `How was your visit at ${biz?.name || 'our location'}?`;
    }
    return clone;
  };

  // Keep state synchronized with active business
  const [flowData, setFlowData] = useState(() => {
    if (activeBusiness?.questionFlow?.questions && Object.keys(activeBusiness.questionFlow.questions).length > 0) {
      return JSON.parse(JSON.stringify(activeBusiness.questionFlow));
    }
    return getDefaultFlow(activeBusiness);
  });

  const [activeNodeId, setActiveNodeId] = useState(() => {
    return flowData.start || Object.keys(flowData.questions || {})[0] || 'overall_experience';
  });

  const [newChipInput, setNewChipInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState('editor'); // 'editor', 'visual_graph', 'simulator'
  
  // Simulator testing state
  const [simCurrentNodeId, setSimCurrentNodeId] = useState(flowData.start || 'overall_experience');
  const [simAnswers, setSimAnswers] = useState({});
  const [simHistory, setSimHistory] = useState([]);
  const [simSubmitted, setSimSubmitted] = useState(false);

  // Sync state whenever activeBusiness changes
  useEffect(() => {
    if (activeBusiness?.questionFlow?.questions && Object.keys(activeBusiness.questionFlow.questions).length > 0) {
      const data = JSON.parse(JSON.stringify(activeBusiness.questionFlow));
      setFlowData(data);
      const startId = data.start || Object.keys(data.questions)[0] || 'overall_experience';
      setActiveNodeId(startId);
      setSimCurrentNodeId(startId);
      setSimAnswers({});
      setSimHistory([]);
      setSimSubmitted(false);
    } else {
      const fallback = getDefaultFlow(activeBusiness);
      setFlowData(fallback);
      setActiveNodeId(fallback.start || 'overall_experience');
      setSimCurrentNodeId(fallback.start || 'overall_experience');
    }
  }, [activeBusiness?.id]);

  const questions = flowData.questions || {};
  
  // Ensure activeNodeId is valid
  useEffect(() => {
    if (!questions[activeNodeId] && Object.keys(questions).length > 0) {
      setActiveNodeId(flowData.start || Object.keys(questions)[0]);
    }
  }, [questions, activeNodeId, flowData.start]);

  const currentNode = questions[activeNodeId] || {
    id: activeNodeId || 'overall_experience',
    title: '',
    subtitle: '',
    type: 'chips_multiselect',
    options: [],
    next: { default: 'direct_submit' }
  };

  const handleUpdateCurrentNode = (field, value) => {
    setFlowData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [activeNodeId]: {
          ...prev.questions[activeNodeId],
          [field]: value
        }
      }
    }));
  };

  const handleUpdateNodeNext = (key, targetNodeId) => {
    setFlowData(prev => {
      const currentNext = { ...(prev.questions[activeNodeId]?.next || {}) };
      if (key === 'default') {
        currentNext.default = targetNodeId;
      } else {
        currentNext[key] = targetNodeId;
      }
      return {
        ...prev,
        questions: {
          ...prev.questions,
          [activeNodeId]: {
            ...prev.questions[activeNodeId],
            next: currentNext
          }
        }
      };
    });
  };

  const handleSetAsStartNode = (nodeId) => {
    setFlowData(prev => ({
      ...prev,
      start: nodeId
    }));
  };

  const handleAddChip = () => {
    if (!newChipInput.trim()) return;
    const currentOpts = currentNode.options || [];
    handleUpdateCurrentNode('options', [...currentOpts, newChipInput.trim()]);
    setNewChipInput('');
  };

  const handleRemoveChip = (indexToRemove) => {
    const currentOpts = currentNode.options || [];
    handleUpdateCurrentNode('options', currentOpts.filter((_, i) => i !== indexToRemove));
  };

  const handleAddNewQuestionNode = () => {
    const newId = `q_${Date.now().toString().slice(-4)}`;
    const newNode = {
      id: newId,
      type: 'chips_multiselect',
      title: 'What stood out during your visit?',
      subtitle: 'Select all that apply to your experience',
      options: ['Friendly Team', 'Quick Service', 'Clean Environment', 'Great Atmosphere'],
      next: { default: 'direct_submit' }
    };

    setFlowData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [newId]: newNode
      }
    }));
    setActiveNodeId(newId);
  };

  const handleDeleteNode = (nodeId) => {
    if (nodeId === flowData.start) {
      alert('Cannot delete the root start node! Set another question as start first.');
      return;
    }
    const newQuestions = { ...flowData.questions };
    delete newQuestions[nodeId];
    setFlowData(prev => ({
      ...prev,
      questions: newQuestions
    }));
    setActiveNodeId(flowData.start || Object.keys(newQuestions)[0]);
  };

  const handleApplyPreset = (template) => {
    if (window.confirm(`Apply the "${template.name}" question flow template to ${activeBusiness.name}? Any unsaved edits will be replaced.`)) {
      const cloned = JSON.parse(JSON.stringify(template.flow));
      if (cloned.questions?.overall_experience) {
        cloned.questions.overall_experience.title = `How was your experience at ${activeBusiness.name}?`;
      }
      setFlowData(cloned);
      setActiveNodeId(cloned.start || 'overall_experience');
      setSimCurrentNodeId(cloned.start || 'overall_experience');
      setSimAnswers({});
      setSimHistory([]);
      setSimSubmitted(false);
    }
  };

  const handleSaveDeploy = () => {
    updateBusiness(activeBusiness.id, {
      questionFlow: flowData
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // List of all node destination options for dropdowns
  const availableTargetNodes = [
    { id: 'direct_submit', label: '✨ AI Google Review Redirection (Copy & Direct Post)' },
    { id: 'private_manager_alert', label: '🛡️ Private Management Escalation (Off Public Google)' },
    { id: 'completion_screen', label: '✅ Simple Thank You Screen' },
    ...Object.entries(questions).map(([k, q]) => ({
      id: k,
      label: `Node: ${q.title || k} (${k})`
    }))
  ];

  // SIMULATOR LOGIC
  const simNode = questions[simCurrentNodeId] || questions[flowData.start] || {};
  const handleSimSelectRating = (val) => {
    const num = Number(val);
    setSimAnswers(prev => ({ ...prev, overall_experience: num }));
    const nextTarget = simNode.next?.[String(num)] || (num >= (activeBusiness.minPublicRating || 4) ? 'positive_highlights' : 'private_manager_alert');
    setSimHistory(prev => [...prev, simCurrentNodeId]);
    setSimCurrentNodeId(nextTarget);
  };

  const handleSimToggleChip = (chip) => {
    const currentList = Array.isArray(simAnswers.selected_options) ? simAnswers.selected_options : [];
    const updated = currentList.includes(chip) 
      ? currentList.filter(c => c !== chip) 
      : [...currentList, chip];
    setSimAnswers(prev => ({ ...prev, selected_options: updated }));
  };

  const handleSimAdvance = (targetOverride) => {
    const target = targetOverride || simNode.next?.default || 'direct_submit';
    setSimHistory(prev => [...prev, simCurrentNodeId]);
    setSimCurrentNodeId(target);
  };

  const handleSimBack = () => {
    if (simHistory.length === 0) return;
    const prevNode = simHistory[simHistory.length - 1];
    setSimHistory(prev => prev.slice(0, -1));
    setSimCurrentNodeId(prevNode);
    setSimSubmitted(false);
  };

  const handleSimReset = () => {
    setSimCurrentNodeId(flowData.start || 'overall_experience');
    setSimAnswers({});
    setSimHistory([]);
    setSimSubmitted(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activeBusiness.logo}</span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Adaptive Question Flow Builder</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold">
              {activeBusiness.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Customize question state machines, rating branches, praise chips, and private recovery gates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Template Selector Dropdown */}
          <div className="relative group">
            <select
              onChange={(e) => {
                const t = FLOW_TEMPLATES.find(temp => temp.id === e.target.value);
                if (t) handleApplyPreset(t);
                e.target.value = '';
              }}
              defaultValue=""
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              <option value="" disabled>⚡ Load Preset Template...</option>
              {FLOW_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveViewMode('editor')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'editor' ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <span>Node Editor</span>
            </button>
            <button
              onClick={() => setActiveViewMode('visual_graph')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'visual_graph' ? 'bg-white text-sky-700 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-sky-600" />
              <span>Topology Graph</span>
            </button>
            <button
              onClick={() => {
                setActiveViewMode('simulator');
                handleSimReset();
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeViewMode === 'simulator' ? 'bg-white text-indigo-700 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
              <span>Live Simulator</span>
            </button>
          </div>

          {/* External Test Button */}
          <button
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Open Link</span>
          </button>

          {/* Save & Deploy */}
          <button
            onClick={handleSaveDeploy}
            className={`px-4 py-2 rounded-xl text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all transform active:scale-95 cursor-pointer ${
              saveSuccess ? 'bg-emerald-600' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20'
            }`}
          >
            {saveSuccess ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saveSuccess ? 'Flow Deployed!' : 'Save & Deploy'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: VISUAL TOPOLOGY GRAPH MODE */}
      {/* ========================================================================= */}
      {activeViewMode === 'visual_graph' && (
        <div className="saas-card rounded-3xl p-6 sm:p-8 space-y-8 bg-slate-50/70 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                <Workflow className="w-3.5 h-3.5 text-sky-600" />
                <span>Dynamic State Machine Topology</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Visual Flow Hierarchy for {activeBusiness.name}
              </h3>
            </div>
            <button
              onClick={handleAddNewQuestionNode}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Flow Node</span>
            </button>
          </div>

          {/* Dynamic Interactive Flow Diagram */}
          <div className="max-w-4xl mx-auto space-y-8 py-4">
            {/* 1. START NODE */}
            {(() => {
              const startId = flowData.start || Object.keys(questions)[0];
              const startQ = questions[startId];
              if (!startQ) return null;
              return (
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => {
                      setActiveNodeId(startId);
                      setActiveViewMode('editor');
                    }}
                    className="p-5 rounded-2xl bg-white border-2 border-sky-500 shadow-lg max-w-md w-full text-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Click to Edit ✎
                      </span>
                    </div>
                    <span className="inline-block badge-sky text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                      ★ Root Entry Point ({startId})
                    </span>
                    <div className="font-black text-sm text-slate-900">
                      {startQ.title || 'Overall Experience Rating'}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {startQ.type === 'emoji_scale' ? '5-Point Sentiment Rating (1★ to 5★)' : startQ.type}
                    </div>
                  </div>
                  
                  {/* Transition connector line */}
                  <div className="w-0.5 h-8 bg-slate-300"></div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
                    <ArrowDown className="w-3 h-3 text-slate-400" />
                    <span>Rating Sentiment Branch</span>
                  </div>
                  <div className="w-0.5 h-6 bg-slate-300"></div>
                </div>
              );
            })()}

            {/* 2. BRANCH SPLIT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Positive Path (Left Branch) */}
              <div className="space-y-4 p-5 rounded-3xl bg-emerald-50/70 border-2 border-emerald-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="badge-emerald text-xs font-black px-2.5 py-0.5 rounded-full">
                      Positive Path (4-5★)
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>

                {/* Positive Flow Nodes */}
                {Object.entries(questions)
                  .filter(([k, q]) => k !== flowData.start && (k.includes('positive') || q.type === 'chips_multiselect' || q.type === 'chips_single'))
                  .map(([k, q]) => (
                    <div 
                      key={k}
                      onClick={() => {
                        setActiveNodeId(k);
                        setActiveViewMode('editor');
                      }}
                      className="p-3.5 bg-white rounded-2xl border border-emerald-300 shadow-2xs cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-black text-xs text-slate-900">{q.title || k}</div>
                        <span className="text-[10px] text-emerald-600 font-bold">Edit ✎</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">
                        {q.options?.length || 0} chip options • {q.type?.replace('_', ' ')}
                      </div>
                    </div>
                  ))}

                <div className="text-center text-slate-400 text-xs font-bold">↓ Next Step</div>

                <div className="p-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white rounded-2xl shadow-md font-black text-xs text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>AI Review Drafter & Direct Google Redirection</span>
                  </div>
                  <div className="text-[10px] font-normal text-emerald-100 opacity-90">
                    1-Click Copy & Direct Link to Google Maps 5-Star Form
                  </div>
                </div>
              </div>

              {/* Negative Interception Branch (Right Branch) */}
              <div className="space-y-4 p-5 rounded-3xl bg-rose-50/70 border-2 border-rose-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="badge-rose text-xs font-black px-2.5 py-0.5 rounded-full">
                      Shielded Recovery Path (1-3★)
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                </div>

                {/* Shielded Flow Nodes */}
                {Object.entries(questions)
                  .filter(([k, q]) => k !== flowData.start && (k.includes('private') || k.includes('manager') || k.includes('negative') || q.type === 'private_resolution'))
                  .map(([k, q]) => (
                    <div 
                      key={k}
                      onClick={() => {
                        setActiveNodeId(k);
                        setActiveViewMode('editor');
                      }}
                      className="p-3.5 bg-white rounded-2xl border border-rose-300 shadow-2xs cursor-pointer hover:border-rose-500 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-black text-xs text-slate-900">{q.title || k}</div>
                        <span className="text-[10px] text-rose-600 font-bold">Edit ✎</span>
                      </div>
                      <div className="text-[11px] text-rose-700 mt-0.5">
                        Private Escalation Form • Bypasses Public Google
                      </div>
                    </div>
                  ))}

                <div className="text-center text-slate-400 text-xs font-bold">↓ Next Step</div>

                <div className="p-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-2xl shadow-md font-black text-xs text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-200" />
                    <span>Private GM Escalation & Customer Recovery</span>
                  </div>
                  <div className="text-[10px] font-normal text-rose-100 opacity-90">
                    Logged in Dashboard CRM with 'Pending Review' alert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LIVE SIMULATOR TESTING MODE */}
      {/* ========================================================================= */}
      {activeViewMode === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left info column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="saas-card rounded-3xl p-5 space-y-4 bg-white border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xs uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Simulator Controls</span>
                </div>
                <button
                  onClick={handleSimReset}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Flow</span>
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>
                  Test your state machine customer journey in real-time on this virtual smartphone device.
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">Current Node:</div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">{simCurrentNodeId}</div>
                  <div className="text-[11px] text-slate-500">Type: {simNode.type || 'terminal'}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800">Recorded Answers:</div>
                  <pre className="font-mono text-[10px] text-slate-600 overflow-x-auto bg-white p-2 rounded border border-slate-200">
                    {JSON.stringify(simAnswers, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mobile Phone Mockup */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-sm rounded-[40px] border-8 border-slate-800 bg-slate-100 shadow-2xl p-4 min-h-[580px] flex flex-col justify-between relative overflow-hidden">
              {/* Phone speaker & camera notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2" />
                <div className="w-10 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Customer Screen Header */}
              <div className="flex items-center justify-between px-2 pb-3 border-b border-slate-200/80 mb-3 text-xs">
                <div className="flex items-center gap-1.5 font-black text-slate-800">
                  <span>{activeBusiness.logo}</span>
                  <span className="truncate max-w-[130px]">{activeBusiness.name}</span>
                </div>
                {simHistory.length > 0 && !simSubmitted && (
                  <button
                    onClick={handleSimBack}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                  >
                    ← Back
                  </button>
                )}
              </div>

              {/* Dynamic Step Content */}
              <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2">
                {simSubmitted ? (
                  <div className="text-center py-8 space-y-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <h4 className="font-black text-slate-900 text-sm">Feedback Complete!</h4>
                    <p className="text-xs text-slate-500">
                      {simAnswers.overall_experience >= (activeBusiness.minPublicRating || 4)
                        ? 'Simulated customer copy & redirect to Google Maps.'
                        : 'Simulated customer private escalation to General Management.'}
                    </p>
                    <button
                      onClick={handleSimReset}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                    >
                      Test Again ↻
                    </button>
                  </div>
                ) : simCurrentNodeId === 'direct_submit' || simCurrentNodeId === 'ai_review_screen' ? (
                  /* Simulator Terminal Review Screen */
                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-slide-up">
                    <div className="text-center space-y-1">
                      <span className="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✨ 5-Star Review Ready
                      </span>
                      <h4 className="font-black text-slate-900 text-xs">Your AI Google Review Draft:</h4>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      {generateReviewDraft({
                        business: activeBusiness,
                        rating: simAnswers.overall_experience || 5,
                        highlights: simAnswers.selected_options || ['Outstanding Customer Service'],
                        tone: 'enthusiastic'
                      })}
                    </div>

                    <button
                      onClick={() => setSimSubmitted(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy & Post to Google</span>
                    </button>
                  </div>
                ) : simCurrentNodeId === 'private_manager_alert' || simNode.type === 'private_resolution' ? (
                  /* Simulator Private Recovery Screen */
                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-rose-200 shadow-sm animate-slide-up">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1 text-amber-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>Direct to Leadership</span>
                      </div>
                      <p className="text-[11px] text-amber-800/90 leading-tight">
                        {simNode.subtitle || 'Your message bypasses Google and goes directly to management.'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">{simNode.title || 'How can we make this right?'}</label>
                      <textarea
                        rows={3}
                        placeholder={simNode.placeholder || 'Please share your experience...'}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 resize-none focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => setSimSubmitted(true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-xs shadow-md"
                    >
                      Send Private Note to GM
                    </button>
                  </div>
                ) : simNode.type === 'emoji_scale' ? (
                  /* Simulator Emoji Scale */
                  <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-slide-up">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 text-sm leading-snug">{simNode.title}</h4>
                      <p className="text-xs text-slate-500">{simNode.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 pt-2">
                      {[
                        { val: 1, emoji: '😣', label: 'Poor' },
                        { val: 2, emoji: '🙁', label: 'Fair' },
                        { val: 3, emoji: '😐', label: 'Average' },
                        { val: 4, emoji: '😊', label: 'Good' },
                        { val: 5, emoji: '🤩', label: 'Great!' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          onClick={() => handleSimSelectRating(item.val)}
                          className="flex flex-col items-center p-2 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50 transition-all cursor-pointer"
                        >
                          <span className="text-2xl mb-1">{item.emoji}</span>
                          <span className="text-[9px] font-bold text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Simulator Chips Question */
                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-slide-up">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 text-xs leading-snug">{simNode.title}</h4>
                      <p className="text-[11px] text-slate-500">{simNode.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {simNode.options?.map((chip) => {
                        const isSelected = (simAnswers.selected_options || []).includes(chip);
                        return (
                          <button
                            key={chip}
                            onClick={() => handleSimToggleChip(chip)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handleSimAdvance()}
                      className="w-full mt-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Phone Indicator */}
              <div className="w-24 h-1 bg-slate-400 rounded-full mx-auto mt-2 opacity-60" />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: FULL NODE EDITOR */}
      {/* ========================================================================= */}
      {activeViewMode === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: State Machine Flow Tree & Node List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="saas-card rounded-3xl p-5 space-y-4 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sky-700 font-extrabold text-xs uppercase tracking-wider">
                  <GitFork className="w-4 h-4" />
                  <span>Flow Nodes ({Object.keys(questions).length})</span>
                </div>
                <button
                  onClick={handleAddNewQuestionNode}
                  className="p-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-black flex items-center gap-1 transition-colors px-2.5 py-1.5 border border-sky-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Node</span>
                </button>
              </div>

              {/* Nodes List */}
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {Object.entries(questions).map(([key, q]) => {
                  const isSelected = activeNodeId === key;
                  const isStart = (flowData.start || 'overall_experience') === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setActiveNodeId(key)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-sky-50/90 border-sky-500 text-sky-950 shadow-sm ring-1 ring-sky-400/50 font-bold'
                          : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-0.5 overflow-hidden flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isStart && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-extrabold uppercase border border-amber-200">
                              ★ Start Root
                            </span>
                          )}
                          <span className="text-xs font-extrabold truncate text-slate-900">
                            {q.title || key}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2">
                          <span className="capitalize font-medium">{q.type?.replace('_', ' ')}</span>
                          {q.options && <span>• {q.options.length} chips</span>}
                        </div>
                      </div>

                      {!isStart && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNode(key);
                          }}
                          title="Delete Node"
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Node Configuration Form */}
          <div className="lg:col-span-8 space-y-4">
            <div className="saas-card rounded-3xl p-6 sm:p-7 space-y-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Editing Node:
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-200">
                      {activeNodeId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure question prompt, response mechanism, and branching logic.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {flowData.start !== activeNodeId ? (
                    <button
                      type="button"
                      onClick={() => handleSetAsStartNode(activeNodeId)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 border border-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 text-amber-500" />
                      <span>Set as Start Root</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>Root Entry Point</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Question Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">Question Title / Prompt:</label>
                <input
                  type="text"
                  value={currentNode.title || ''}
                  onChange={(e) => handleUpdateCurrentNode('title', e.target.value)}
                  placeholder="e.g. How was your dining experience today?"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                />
              </div>

              {/* Subtitle / Helper */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">Helper Subtitle:</label>
                <input
                  type="text"
                  value={currentNode.subtitle || ''}
                  onChange={(e) => handleUpdateCurrentNode('subtitle', e.target.value)}
                  placeholder="e.g. Select all highlights that made your visit memorable"
                  className="w-full px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              {/* Question Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">Input / Response Mechanism:</label>
                <select
                  value={currentNode.type || 'chips_multiselect'}
                  onChange={(e) => handleUpdateCurrentNode('type', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold cursor-pointer"
                >
                  <option value="emoji_scale">5-Point Sentiment Scale (1-5★ Stars / Emojis)</option>
                  <option value="chips_multiselect">Pill Chips (Multi-Select Praise / Tags)</option>
                  <option value="chips_single">Pill Chips (Single-Select Category / Bottleneck)</option>
                  <option value="free_text">Free Text Input (AI Review Catalyst & Staff Mention)</option>
                  <option value="private_resolution">Private General Manager Escalation Form</option>
                </select>
              </div>

              {/* ========================================================================= */}
              {/* TYPE-SPECIFIC EDITOR 1: EMOJI SCALE BRANCHING TABLE */}
              {/* ========================================================================= */}
              {currentNode.type === 'emoji_scale' && (
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <GitFork className="w-3.5 h-3.5 text-sky-600" />
                      <span>Rating Branching Decisions:</span>
                    </label>
                    <span className="text-[11px] text-slate-500">Route each rating to target node</span>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {[
                      { val: '5', label: '5-Star Rating (🤩 Excellent!)', defaultTarget: 'positive_highlights' },
                      { val: '4', label: '4-Star Rating (😊 Good)', defaultTarget: 'positive_highlights' },
                      { val: '3', label: '3-Star Rating (😐 Average)', defaultTarget: 'private_manager_alert' },
                      { val: '2', label: '2-Star Rating (🙁 Fair)', defaultTarget: 'private_manager_alert' },
                      { val: '1', label: '1-Star Rating (😣 Poor)', defaultTarget: 'private_manager_alert' },
                    ].map((row) => (
                      <div key={row.val} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-200">
                        <span className="text-xs font-extrabold text-slate-800">{row.label}</span>
                        <select
                          value={currentNode.next?.[row.val] || row.defaultTarget}
                          onChange={(e) => handleUpdateNodeNext(row.val, e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                        >
                          {availableTargetNodes.map((n) => (
                            <option key={n.id} value={n.id}>{n.label}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TYPE-SPECIFIC EDITOR 2: CHIPS OPTIONS MANAGER */}
              {/* ========================================================================= */}
              {(currentNode.type === 'chips_multiselect' || currentNode.type === 'chips_single') && (
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="text-xs font-black text-slate-800">Chip Options & Compliment Tags:</label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChipInput}
                      onChange={(e) => setNewChipInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddChip()}
                      placeholder="Type compliment tag and press Add..."
                      className="flex-1 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddChip}
                      className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black cursor-pointer shadow-xs"
                    >
                      Add Chip
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentNode.options?.map((chip, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 font-bold"
                      >
                        <span>{chip}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChip(idx)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Next Step Transition */}
                  <div className="pt-3 space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                      <span>Next Step Destination:</span>
                    </label>
                    <select
                      value={currentNode.next?.default || 'direct_submit'}
                      onChange={(e) => handleUpdateNodeNext('default', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold cursor-pointer"
                    >
                      {availableTargetNodes.map((n) => (
                        <option key={n.id} value={n.id}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TYPE-SPECIFIC EDITOR 3: FREE TEXT / PRIVATE RESOLUTION */}
              {/* ========================================================================= */}
              {(currentNode.type === 'free_text' || currentNode.type === 'private_resolution') && (
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700">Input Box Placeholder:</label>
                    <input
                      type="text"
                      value={currentNode.placeholder || ''}
                      onChange={(e) => handleUpdateCurrentNode('placeholder', e.target.value)}
                      placeholder="e.g. Please describe your experience..."
                      className="w-full px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                      <span>Next Step Destination:</span>
                    </label>
                    <select
                      value={currentNode.next?.default || (currentNode.type === 'private_resolution' ? 'completion_screen' : 'direct_submit')}
                      onChange={(e) => handleUpdateNodeNext('default', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold cursor-pointer"
                    >
                      {availableTargetNodes.map((n) => (
                        <option key={n.id} value={n.id}>{n.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
