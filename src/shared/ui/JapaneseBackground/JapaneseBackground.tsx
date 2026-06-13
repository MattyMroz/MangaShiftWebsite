import React from 'react';

export const JapaneseBackground = () => {
  return (
    <div 
      className="fixed top-0 left-0 select-none pointer-events-none z-0 w-full text-center flex items-center justify-center h-[100svh]"
      aria-hidden="true"
      role="presentation"
    >
      <span className="block text-[15vw] lg:text-[15vw] max-lg:text-[25vw] font-black text-[var(--text-primary)] whitespace-nowrap leading-none opacity-10 dark:opacity-20 blur-sm font-[family-name:var(--font-noto-sans-jp)] max-lg:rotate-[67.5deg] transform origin-center">
        マンガシフト
      </span>
    </div>
  );
};
