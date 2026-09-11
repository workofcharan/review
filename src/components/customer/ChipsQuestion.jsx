import React from 'react';
import { Check } from 'lucide-react';

export default function ChipsQuestion({ 
  question, 
  selectedValue, 
  isMulti = false, 
  onSelect 
}) {
  const options = question.options || [];

  const handleToggle = (option) => {
    if (isMulti) {
      const currentList = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentList.includes(option)) {
        onSelect(currentList.filter(item => item !== option));
      } else {
        onSelect([...currentList, option]);
      }
    } else {
      onSelect(option);
    }
  };

  const isSelected = (option) => {
    if (isMulti) {
      return Array.isArray(selectedValue) && selectedValue.includes(option);
    }
    return selectedValue === option;
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = isSelected(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border transform active:scale-95 shadow-2xs ${
                selected
                  ? 'bg-sky-50 border-sky-500 text-sky-800 ring-1 ring-sky-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {selected && (
                <div className="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
