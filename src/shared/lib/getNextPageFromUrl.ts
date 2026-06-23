export const getNextPageFromUrl = (url: string | null): number | undefined => {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    const page = parsed.searchParams.get('page');
    return page ? Number(page) : undefined;
  } catch {
    return undefined;
  }
};
