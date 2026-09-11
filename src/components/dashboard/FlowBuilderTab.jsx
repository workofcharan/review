import React, { useState } from 'react';
import { 
  GitFork, 
  Plus, 
  Trash2, 
  Check, 
  Save, 
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FlowBuilderTab() {
  const { activeBusiness, updateBusiness, navigateTo } = useApp();

  const [flowData, setFlowData] = useState(() => {
    return JSON.parse(JSON.stringify(activeBusiness.questionFlow || { questions: {} }));
  });

  const [activeNodeId, setActiveNodeId] = useState(flowData.start || 'overall_experience');
  const [newChipInput, setNewChipInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const questions = flowData.questions || {};
  const currentNode = questions[activeNodeId] || {
    id: activeNodeId,
    title: '',
    subtitle: '',
    type: 'chips_multiselect',
    options: [],
    next: { default: 'ai_review_screen' }
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
    const newId = `custom_q_${Date.now().toString().slice(-4)}`;
    const newNode = {
      id: newId,
      type: 'chips_multiselect',
      title: 'New Custom Feedback Question',
      subtitle: 'Please select what best matches your experience',
      options: ['Option A', 'Option B', 'Option C'],
      next: { default: 'ai_review_screen' }
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
      alert('Cannot delete the root start question!');
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

  const handleSaveDeploy = () => {
    updateBusiness(activeBusiness.id, {
      questionFlow: flowData
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Adaptive Question Flow Builder</h2>
          <p className="text-xs text-slate-500">
            Graph state-machine editor: customize questions, adaptive branches, and AI synthesis prompts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo(`/b/${activeBusiness.slug}`)}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Test Customer Flow</span>
          </button>
          <button
            onClick={handleSaveDeploy}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            {saveSuccess ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saveSuccess ? 'Flow Deployed Live!' : 'Save & Deploy Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: State Machine Flow Tree & Node List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
                <GitFork className="w-4 h-4" />
                <span>Flow Nodes ({Object.keys(questions).length})</span>
              </div>
              <button
                onClick={handleAddNewQuestionNode}
                className="p-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 transition-colors px-2 border border-sky-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Node</span>
              </button>
            </div>

            {/* Nodes List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {Object.entries(questions).map(([key, q]) => {
                const isSelected = activeNodeId === key;
                const isStart = flowData.start === key;
                return (
                  <div
                    key={key}
                    onClick={() => setActiveNodeId(key)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        {isStart && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold uppercase border border-amber-200">
                            Root Start
                          </span>
                        )}
                        <span className="text-xs font-bold truncate text-slate-900">
                          {q.title || key}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span className="capitalize">{q.type?.replace('_', ' ')}</span>
                        <span>•</span>
                        <span>{q.options?.length || 0} options</span>
                      </div>
                    </div>

                    {!isStart && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNode(key);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
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

        {/* Right Column: Node Editor */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Editing Node: <span className="font-mono text-sky-600 font-normal">{activeNodeId}</span>
                </h3>
                <p className="text-xs text-slate-500">Configure question prompt, response type, and branching transitions.</p>
              </div>
            </div>

            {/* Question Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Question Title / Prompt:</label>
              <input
                type="text"
                value={currentNode.title || ''}
                onChange={(e) => handleUpdateCurrentNode('title', e.target.value)}
                placeholder="e.g. How was your dining experience today?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            {/* Subtitle / Helper */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Helper Subtitle:</label>
              <input
                type="text"
                value={currentNode.subtitle || ''}
                onChange={(e) => handleUpdateCurrentNode('subtitle', e.target.value)}
                placeholder="e.g. Select all highlights that made your visit memorable"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Question Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Input / Response Mechanism:</label>
              <select
                value={currentNode.type || 'chips_multiselect'}
                onChange={(e) => handleUpdateCurrentNode('type', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              >
                <option value="emoji_scale">5-Point Sentiment Scale (Emoji / Stars)</option>
                <option value="chips_multiselect">Pill Chips (Multi-Select)</option>
                <option value="chips_single">Pill Chips (Single-Select)</option>
                <option value="free_text">Free Text Input (AI Review Catalyst)</option>
                <option value="private_resolution">Private General Manager Escalation Form</option>
              </select>
            </div>

            {/* Options Manager (for chips or scale) */}
            {(currentNode.type === 'chips_multiselect' || currentNode.type === 'chips_single') && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700">Chip Options & Categories:</label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChipInput}
                    onChange={(e) => setNewChipInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddChip()}
                    placeholder="Add new compliment or category tag..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddChip}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {currentNode.options?.map((chip, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium"
                    >
                      <span>{chip}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveChip(idx)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Branching Target Info */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs space-y-1.5 text-sky-900">
              <div className="flex items-center gap-1.5 text-sky-800 font-bold">
                <GitFork className="w-3.5 h-3.5 text-sky-600" />
                <span>State Machine Routing Logic</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Positive ratings (4-5★) advance customers towards praise chips & AI Review Synthesis.
                Ratings ≤ 3★ automatically route into root-cause diagnosis & private resolution escalation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
