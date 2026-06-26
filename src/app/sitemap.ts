import type { MetadataRoute } from 'next';

const SITE = 'https://mangashift.com';

export const dynamic = 'force-static';

const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/features', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/download', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/legal', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/refunds', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/ip', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/third-party-notices', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map(({ path, priority, changeFrequency }) => ({
        url: `${SITE}${path}`,
        changeFrequency,
        priority,
    }));
}
