import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Component Gallery',
    robots: { index: false, follow: false },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    const galleryInitScript = `
        (function() {
            try {
                var root = document.documentElement;
                root.setAttribute('data-gallery', 'components');
                if (!root.getAttribute('data-neon')) root.setAttribute('data-neon', 'mini');
            } catch (e) {}
        })();
    `;

    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: galleryInitScript }} />
            <div className="min-h-screen">{children}</div>
        </>
    );
}
