
export const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  // Remove 'r', '+', spaces
  const cleanStr = priceStr.replace(/[rR\+\s]/g, '');
  const num = parseFloat(cleanStr);
  
  // Handle complex cases like "基础价 x 2" which return NaN
  if (isNaN(num)) {
    return 0;
  }
  return num;
};

export const isComplexPrice = (priceStr: string): boolean => {
  return isNaN(parsePrice(priceStr)) && priceStr.length > 0;
};
