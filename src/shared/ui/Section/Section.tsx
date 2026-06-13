'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  title?: string;
  gridCols?: 1 | 2;
  isHero?: boolean;
}

export const Section = ({
  id,
  className = "",
  children,
  title,
  gridCols = 1,
  isHero = false
}: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={`
        w-full overflow-hidden
        ${isHero ? 'pt-0' : 'pt-[var(--section-padding-top)]'}
        pb-[var(--section-padding-bottom)]
        px-[var(--container-padding)]
        ${className}
      `.trim()}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[var(--container-width)] mx-auto w-full">
        {title && (
          <motion.h2
            className="font-bold text-center mb-12 text-[length:var(--section-title-font-size)] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h2>
        )}
        {gridCols === 1 ? (
          children
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {children}
          </div>
        )}
      </div>
    </motion.section>
  );
};
