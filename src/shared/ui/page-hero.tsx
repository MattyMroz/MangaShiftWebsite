'use client';

import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/container';
import { EditorialRule } from '@/shared/ui/editorial-rule';
import { MetaLabel } from '@/shared/ui/meta-label';
import { cn } from '@/shared/lib/utils/cn';

interface PageHeroProps {
    index: string;
    page: string;
    rule: string;
    kicker: string;
    titleBefore: string;
    titleEmphasis: string;
    titleAfter?: string;
    lead: string;
    className?: string;
}

const reveal = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export const PageHero = ({
    index,
    page,
    rule,
    kicker,
    titleBefore,
    titleEmphasis,
    titleAfter = '.',
    lead,
    className,
}: PageHeroProps) => (
    <section className={cn('relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40', className)}>
        <Container>
            <EditorialRule index={index} page={page}>
                {rule}
            </EditorialRule>

            <div className="mt-10 lg:mt-14">
                <motion.div {...reveal} transition={{ duration: 0.55 }}>
                    <MetaLabel>{kicker}</MetaLabel>
                </motion.div>

                <motion.h1
                    className="display mt-7 text-balance text-[clamp(4.4rem,6.6vw,8.4rem)]"
                    {...reveal}
                    transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                    {titleBefore}{' '}
                    <em className="text-[var(--accent-text)]">{titleEmphasis}</em>
                    {titleAfter}
                </motion.h1>

                <motion.p
                    className="mt-8 max-w-[54ch] text-[1.7rem] leading-[1.65] text-[var(--text-muted)] md:text-[1.9rem]"
                    {...reveal}
                    transition={{ duration: 0.7, delay: 0.18 }}
                >
                    {lead}
                </motion.p>
            </div>
        </Container>
    </section>
);
