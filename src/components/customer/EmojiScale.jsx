import React from 'react';

export default function EmojiScale({ question, selectedValue, onSelect }) {
  const options = question.options || [
    { value: 1, label: "Disappointing", emoji: "😞" },
    { value: 2, label: "Underwhelming", emoji: "😕" },
    { value: 3, label: "Average", emoji: "😐" },
    { value: 4, label: "Delightful", emoji: "😊" },
    { value: 5, label: "Extraordinary!", emoji: "🤩" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 transform active:scale-95 ${
                isSelected
                  ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-md scale-105 ring-2 ring-sky-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <span className={`text-3xl sm:text-4xl transition-transform duration-200 group-hover:scale-125 ${
                isSelected ? 'scale-125 animate-bounce' : ''
              }`}>
                {option.emoji}
              </span>
              <span className={`text-[11px] sm:text-xs font-bold mt-2 text-center transition-colors ${
                isSelected ? 'text-sky-700' : 'text-slate-600 group-hover:text-slate-900'
              }`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
