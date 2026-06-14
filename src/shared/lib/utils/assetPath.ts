const basePath = process.env.NODE_ENV === 'production' ? '/MangaShiftWebsite' : '';

export const assetPath = (path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${normalizedPath}`;
};
