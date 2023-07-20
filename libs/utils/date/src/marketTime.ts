import { DateTime } from 'luxon';

export enum MarketSession {
  afterHours = 'After Hours',
  preMarket = 'PreMarket',
  regular = 'Regular',
}

export interface CustomTimeLabels {
  afterMarket?: string;
  invalid?: string | null;
  preMarket?: string;
  regular?: string;
}

export const marketTime = (time: DateTime, custom: CustomTimeLabels = {}) => {
  const preMarket = DateTime.fromFormat('09:30:00', 'HH:mm:ss');
  const afterMarket = DateTime.fromFormat('16:00:00', 'HH:mm:ss');

  if (time < preMarket) {
    return custom.preMarket || MarketSession.preMarket;
  } else if (time >= afterMarket) {
    return custom.afterMarket || MarketSession.afterHours;
  } else if (time >= preMarket && time < afterMarket) {
    return custom.regular || MarketSession.regular;
  } else if (Object.prototype.hasOwnProperty.call(custom, 'invalid')) {
    return custom.invalid;
  }
  return time;
};
