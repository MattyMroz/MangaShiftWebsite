import type { MetadataRoute } from 'next';

const SITE = 'https://mangashift.com';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/signin', '/gallery'],
        },
        sitemap: `${SITE}/sitemap.xml`,
        host: SITE,
    };
}
