'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    lead?: string;
    align?: 'left' | 'center';
}

export const SectionHeader = ({ eyebrow, title, lead, align = 'left' }: SectionHeaderProps) => (
    <motion.div
        className={align === 'center' ? 'flex flex-col items-center text-center' : ''}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
    >
        <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
            <span className="h-px w-10 bg-[var(--accent)]" />
            <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="mt-6 max-w-[20ch] text-[clamp(3rem,4.5vw,5rem)] font-extrabold text-[var(--text)] tracking-tight leading-[1.05]">
            {title}
        </h2>
        {lead && (
            <p className="mt-6 max-w-[52ch] text-[length:var(--h3-font-size)] leading-relaxed text-[var(--text-muted)]">
                {lead}
            </p>
        )}
    </motion.div>
);
