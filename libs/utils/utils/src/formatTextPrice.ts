export const formatTextPrice = (value: number | string): string => {
  if (typeof value === 'string' && value[0] === '$') return value;
  else if (typeof value === 'string' && value.includes('-')) {
    const priceRange = value.split('-');
    if (priceRange.length === 2) {
      const formattedPriceRange = `$${priceRange[0]}-$${priceRange[1]}`;
      return formattedPriceRange;
    }
  }
  if (value) {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }
  return '-';
};
