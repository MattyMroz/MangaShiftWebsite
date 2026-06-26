export const assetPath = (path: string) => (path.startsWith('/') ? path : `/${path}`);
