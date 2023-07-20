export const removeFalsyFromQueryParams = (queryString: string): string => {
  const params = new URLSearchParams(queryString);
  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
  const cleanedParams = String(params);
  return cleanedParams;
};
