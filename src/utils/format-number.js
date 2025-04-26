import _ from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}

const groupByPromotionLevel = (arr) =>
  arr.reduce((acc, girl) => {
    const level = girl.promotion_level || 0; // Default to 0 if undefined
    acc[level] = acc[level] || [];
    acc[level].push(girl);
    return acc;
  }, {});

export const shufflePerPromotionLevel = (girls) => {
  const grouped = groupByPromotionLevel(girls);

  // Shuffle each group separately
  Object.keys(grouped).forEach((level) => {
    // eslint-disable-next-line no-undef
    grouped[level] = _.shuffle(grouped[level]); // Shuffle each promotion level
  });

  // Merge all shuffled groups back into a single list
  return Object.values(grouped).flat();
};
