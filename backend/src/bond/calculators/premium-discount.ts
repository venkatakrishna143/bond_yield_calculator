export function getPremiumDiscountStatus(
  faceValue: number,
  marketPrice: number,
): 'Premium' | 'Discount' | 'Par' {
  if (marketPrice > faceValue) return 'Premium';
  if (marketPrice < faceValue) return 'Discount';
  return 'Par';
}
