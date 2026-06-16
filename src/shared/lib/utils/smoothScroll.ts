export const smoothScrollTo = (href: string, offset?: number): boolean => {
    let id = href;

    if (href.startsWith('#')) {
        id = href.substring(1);
    } else {
        const parts = href.split('/');
        id = parts[parts.length - 1];
        id = id.replace('#', '');
    }

    id = id.split('?')[0];

    if (id === 'home' || id === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
    }

    const section = document.getElementById(id);

    if (section) {
        const header = document.querySelector('header');
        const target = (section.querySelector('[data-scroll-target]') as HTMLElement | null)
            ?? section;
        const resolvedOffset = offset ?? (header?.getBoundingClientRect().height ?? 0) + 24;
        let elementTop = 0;
        let node: HTMLElement | null = target;
        while (node) {
            elementTop += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
        }
        const offsetPosition = elementTop - resolvedOffset;

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });
        return true;
    }

    return false;
};
