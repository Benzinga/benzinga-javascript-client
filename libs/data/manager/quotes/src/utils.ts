import { Quote } from './entities';

export const sortQuotesByName = (quotes: Array<Quote>): any => {
  return quotes.sort((a, b) => {
    return a.symbol > b.symbol ? 1 : -1;
  });
};

export const isQuoteTradeTimesEquals = (prev: any, next: any): any => {
  if (!prev.quote || !next.quote) return false;

  const [nextLastTradeTime, prevLastTradeTime] = [next.quote.lastTradeTime, prev.quote.lastTradeTime];
  const [nextEthTime, prevEthTime] = [next.quote.ethTime, prev.quote.ethTime];

  return nextLastTradeTime === prevLastTradeTime && nextEthTime === prevEthTime;
};

interface QuoteChange {
  nominalChange: number | null;
  percentageChange: number | null;
}

interface BaseQuote {
  currentPrice?: number | null;
  change?: number | null;
  close?: number | null;
  percentChange?: number | null;
  sessionType?: string | null;
}

export const getQuoteChange = <QuoteGeneric extends BaseQuote>(quote: QuoteGeneric | undefined): QuoteChange => {
  if (!quote) {
    return { nominalChange: null, percentageChange: null };
  }
  const { change = null, close, currentPrice, percentChange = null, sessionType } = quote;
  const priceDiff =
    currentPrice && close && (sessionType === 'AFTER_MARKET' || sessionType === 'PRE_MARKET')
      ? currentPrice - close
      : null;
  return priceDiff
    ? {
        nominalChange: +priceDiff.toFixed(2),
        percentageChange: +((100 * priceDiff) / close!).toFixed(2),
      }
    : { nominalChange: change, percentageChange: percentChange };
};
