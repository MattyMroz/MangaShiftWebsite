'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/shared/ui/Section/Section';
import { SmartText } from '@/shared/ui/SmartText/SmartText';
import GlassSurface from '@/shared/ui/GlassSurface/GlassSurface';

const faqs = [
    {
        question: 'What is MangaShift?',
        answer: 'MangaShift is an automated AI-powered system that transforms static manga pages into dynamic audiovisual adaptations. It analyzes manga structure, translates content, generates voice narration, and creates immersive motion comics.'
    },
    {
        question: 'How does the translation work?',
        answer: 'Our AI analyzes the manga panels, detects text in speech bubbles, and translates it to your preferred language while maintaining the original context and cultural nuances. The system supports multiple languages and adapts to manga-specific terminology.'
    },
    {
        question: 'Can I use MangaShift for my own manga?',
        answer: 'MangaShift is currently in development as a demonstration project. Once fully released, it will be available for creators and publishers who want to make their manga more accessible and engaging for global audiences.'
    },
    {
        question: 'What makes MangaShift different from regular manga readers?',
        answer: 'Unlike static readers, MangaShift creates a complete audiovisual experience with AI voice narration, image enhancement, and motion effects. It makes manga accessible to people with visual or motor impairments while offering an engaging new format for all readers.'
    },
    {
        question: 'Is the demo available now?',
        answer: 'Yes! You can watch the Chainsaw Man: Reze Arc demo showcasing over 100 pages transformed into an animated motion comic with Polish dubbing and narration. Check the Demo section above to experience it.'
    },
    {
        question: 'What technology powers MangaShift?',
        answer: 'MangaShift uses a combination of computer vision for panel detection, natural language processing for translation, AI voice synthesis for narration, and image processing algorithms for enhancement and animation effects.'
    }
];

export const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Section id="faq" title="FAQ" gridCols={1}>
            <div className="w-full max-w-[120rem] mx-auto px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)] mt-32 overflow-hidden">

                {/* Mobile/Tablet Layout (Accordion) */}
                <div className="flex flex-col gap-[var(--card-gap)] lg:hidden">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <GlassSurface
                                width="100%"
                                height="auto"
                                borderRadius={20}
                                borderWidth={0.07}
                                brightness={50}
                                opacity={0.5}
                                blur={11}
                                displace={0.5}
                                backgroundOpacity={0.05}
                                saturation={1}
                                distortionScale={-180}
                                redOffset={0}
                                greenOffset={0}
                                blueOffset={0}
                                mixBlendMode="lighten"
                                className="overflow-hidden shadow-md"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left py-8 px-12 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-[length:var(--h2-font-size)] font-bold text-[var(--text-primary)] pr-4">
                                            {faq.question}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="flex-shrink-0"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[var(--text-primary)]"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {openIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 mt-4 border-t border-[var(--border-primary)]">
                                                    <SmartText>
                                                        <p className="text-[length:var(--h3-font-size)] text-[var(--text-primary)] leading-relaxed opacity-90">
                                                            {faq.answer}
                                                        </p>
                                                    </SmartText>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </GlassSurface>
                        </div>
                    ))}
                </div>

                {/* Desktop Layout (Split View with Single Glass Surface) */}
                <div className="hidden lg:grid grid-cols-2 gap-[var(--section-gap-horizontal)] items-center w-full">
                    {/* Left Column: Single Glass Surface for Answer */}
                    <div 
                        className="w-full flex justify-center items-center py-32 lg:py-16 px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:pl-[var(--section-padding-x-desktop-sm)] lg:pr-[var(--section-padding-x-tablet)]"
                    >
                        <div className="w-full max-w-[50rem]">
                            <GlassSurface
                                width="100%"
                                height="260px"
                                borderRadius={32}
                                borderWidth={0.07}
                                brightness={50}
                                opacity={0.5}
                                blur={11}
                                displace={0.5}
                                backgroundOpacity={0.05}
                                saturation={1}
                                distortionScale={-180}
                                redOffset={0}
                                greenOffset={0}
                                blueOffset={0}
                                mixBlendMode="lighten"
                                className="p-14 shadow-2xl overflow-hidden"
                            >
                                <div className="w-full h-full flex flex-col justify-center relative">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="relative z-10"
                                        >
                                            <div className="mb-6">
                                                <span className="text-[1.2rem] font-bold uppercase tracking-widest text-[var(--text-primary)] opacity-50">
                                                    Answer {activeIndex + 1}
                                                </span>
                                            </div>
                                            <SmartText>
                                                <p className="text-[length:var(--normal-font-size)] leading-relaxed text-[var(--text-primary)]">
                                                    {faqs[activeIndex].answer}
                                                </p>
                                            </SmartText>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </GlassSurface>
                        </div>
                    </div>

                    {/* Right Column: Questions List */}
                    <motion.div 
                        className="w-full flex flex-col items-center lg:items-start gap-[var(--section-gap-vertical)] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:pl-[var(--section-padding-x-tablet)] lg:pr-[var(--section-padding-x-desktop-sm)]"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex flex-col gap-4 w-full">
                            {faqs.map((faq, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 border flex items-center gap-6 group ${activeIndex === index
                                        ? 'bg-[var(--bg-secondary)] border-[var(--border-secondary)]'
                                        : 'bg-transparent border-transparent hover:bg-[var(--bg-secondary)]/50'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={`w-16 h-16 flex-shrink-0 rounded-lg flex items-center justify-center transition-colors duration-300 ${activeIndex === index
                                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                                        }`}>
                                        <span className="text-[2rem] font-bold">{index + 1}</span>
                                    </div>
                                    <h3 className={`text-[1.8rem] font-bold leading-tight transition-colors duration-300 ${activeIndex === index ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                                        }`}>
                                        {faq.question}
                                    </h3>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};
