'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import { t } from '@/shared/i18n';

const VideoPlayerSkeleton = () => (
    <div className="w-full rounded-2xl bg-[var(--surface-2)] animate-pulse" style={{ aspectRatio: '16 / 9' }}>
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[var(--line)] border-t-[var(--accent)] animate-spin" />
        </div>
    </div>
);

const VideoPlayer = dynamic(
    () => import('@/features/VideoPlayer/ui/VideoPlayer').then(mod => mod.VideoPlayer),
    { ssr: false, loading: () => <VideoPlayerSkeleton /> }
);

export const DemoSection = () => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMobileDevice(isMobile), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="demo"
            className="relative py-[10rem] px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop-sm)]"
        >
            <div className="relative z-10 max-w-[120rem] mx-auto">
                <SectionHeader eyebrow={t('demo.eyebrow')} title={t('demo.title')} lead={t('demo.lead')} />

                <motion.div
                    className="mt-16 rounded-2xl overflow-hidden border border-[var(--line)] shadow-[var(--shadow-lg)] bg-[var(--surface)]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                >
                    <VideoPlayer disableCanvas={isMobileDevice} />
                </motion.div>
            </div>
        </section>
    );
};
