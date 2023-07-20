// ToDo: Twitter text should take into account primary symbols
export const formatTwitterText = (twitterVars: { text: string; tickers?: string[] }): string => {
  let text = twitterVars.text ?? '';
  const twitterTickersIncluded: string[] = [];
  let twitterTickersLength = 0;
  let twitterTicker = '';

  if (twitterVars.tickers && twitterVars.tickers.length) {
    for (let i = 0; i < twitterVars.tickers.length && i < 3; i++) {
      const ticker = twitterVars.tickers[i];
      if (ticker.includes('/USD')) {
        twitterTicker = '$' + ticker.replace('$', '').replace('/USD', '');
      } else {
        twitterTicker = '$' + ticker.replace('$', '');
      }
      twitterTickersLength += twitterTicker.length;
      twitterTickersIncluded.push(twitterTicker);
    }
  }

  // Tweet = 280 characters max, URL = 23, via @Benzinga = 13
  const textLengthAllowed = 280 - twitterTickersLength - 13 - 23 - 3;
  if (text.length > textLengthAllowed) {
    const titleParts = text.split(' ');
    while (text.length > textLengthAllowed) {
      titleParts.pop();
      text = titleParts.join(' ');
    }
    text += '...';
  }

  if (twitterTickersLength) {
    text += ' ' + twitterTickersIncluded.join(' ');
  }

  return text;
};
