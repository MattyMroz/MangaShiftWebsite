export const smoothScrollTo = (href: string, offset: number = 100): boolean => {
    let id = href;
    
    // Handle hash links (#section)
    if (href.startsWith('#')) {
        id = href.substring(1);
    } else {
        // Handle path links (/section)
        const parts = href.split('/');
        id = parts[parts.length - 1];
        id = id.replace('#', '');
    }

    // Remove query params
    id = id.split('?')[0];

    if (id === 'home' || id === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
    }

    const targetElement = document.getElementById(id);

    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
        });
        return true;
    }

    return false;
};
