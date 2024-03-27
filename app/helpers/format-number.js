import { helper } from '@ember/component/helper';

export function formatNumber(params) {
  if (!params || params.length === 0) return '';

  const number = params[0];
  if (typeof number !== 'number') return number;

  return number.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export default helper(formatNumber);
