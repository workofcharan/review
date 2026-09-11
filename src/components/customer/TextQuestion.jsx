import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function TextQuestion({ 
  question, 
  value = '', 
  onChange, 
  placeholder = 'Type your thoughts here...' 
}) {
  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || placeholder}
          className="w-full rounded-2xl bg-white border border-slate-300 p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm leading-relaxed resize-none shadow-xs"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400 flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{value.length} chars</span>
        </div>
      </div>
    </div>
  );
}
