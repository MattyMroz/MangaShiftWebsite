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

    const targetElement = document.getElementById(id);

    if (targetElement) {
        const header = document.querySelector('header');
        const resolvedOffset = offset ?? (header?.getBoundingClientRect().height ?? 0) + 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - resolvedOffset;

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });
        return true;
    }

    return false;
};
