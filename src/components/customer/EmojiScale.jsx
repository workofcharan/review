import React from 'react';

export default function EmojiScale({ question, selectedValue, onSelect }) {
  const options = question.options || [
    { value: 1, label: "Poor", emoji: "😞" },
    { value: 2, label: "Fair", emoji: "😕" },
    { value: 3, label: "Average", emoji: "😐" },
    { value: 4, label: "Good", emoji: "😊" },
    { value: 5, label: "Excellent!", emoji: "🤩" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`group relative flex flex-col items-center justify-between h-28 sm:h-32 p-2 sm:p-2.5 rounded-2xl border transition-all duration-200 transform active:scale-95 cursor-pointer outline-none focus:ring-2 focus:ring-sky-400/50 ${
                isSelected
                  ? 'bg-sky-50/90 border-sky-500 text-sky-900 shadow-md ring-2 ring-sky-400/40 -translate-y-1'
                  : 'bg-white border-slate-200/90 text-slate-700 hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              {/* Star / Number Badge at Top */}
              <span className={`text-[10px] font-bold tracking-tight px-1.5 py-0.5 rounded-md transition-colors ${
                isSelected 
                  ? 'bg-sky-200/70 text-sky-800' 
                  : 'text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-50'
              }`}>
                ★ {option.value}
              </span>

              {/* Centered Emoji Container */}
              <div className="flex-1 flex items-center justify-center my-1">
                <span className={`text-2xl sm:text-3xl transition-transform duration-200 group-hover:scale-125 select-none ${
                  isSelected ? 'scale-125 animate-bounce' : ''
                }`}>
                  {option.emoji}
                </span>
              </div>

              {/* Bottom Label Container with Fixed Height for Uniformity */}
              <div className="w-full min-h-[26px] flex items-center justify-center">
                <span className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight transition-colors line-clamp-2 ${
                  isSelected ? 'text-sky-900 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'
                }`}>
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
