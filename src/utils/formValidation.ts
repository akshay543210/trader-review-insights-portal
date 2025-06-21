
export interface ValidationErrors {
  [key: string]: string;
}

export const validateAdminForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Firm name is required';
  }
  if (!formData.funding_amount.trim()) {
    errors.funding_amount = 'Funding amount is required';
  }
  if (formData.price < 0) {
    errors.price = 'Price must be 0 or greater';
  }
  if (formData.original_price < 0) {
    errors.original_price = 'Original price must be 0 or greater';
  }
  if (formData.profit_split < 0 || formData.profit_split > 100) {
    errors.profit_split = 'Profit split must be between 0 and 100';
  }
  if (formData.payout_rate < 0 || formData.payout_rate > 100) {
    errors.payout_rate = 'Payout rate must be between 0 and 100';
  }
  if (formData.review_score < 0 || formData.review_score > 5) {
    errors.review_score = 'Review score must be between 0 and 5';
  }
  if (formData.trust_rating < 0 || formData.trust_rating > 10) {
    errors.trust_rating = 'Trust rating must be between 0 and 10';
  }
  if (formData.starting_fee < 0) {
    errors.starting_fee = 'Starting fee must be 0 or greater';
  }
  if (formData.affiliate_url && !formData.affiliate_url.startsWith('http')) {
    errors.affiliate_url = 'Affiliate URL must start with http:// or https://';
  }
  if (formData.logo_url && !formData.logo_url.startsWith('/') && !formData.logo_url.startsWith('http')) {
    errors.logo_url = 'Logo URL must be a valid path or URL';
  }

  return errors;
};
