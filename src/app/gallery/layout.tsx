import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galeria komponentów',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen p-4 md:p-6">{children}</div>;
}
