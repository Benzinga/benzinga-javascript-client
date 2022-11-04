export class QuotesEnvironment {
  public static getName = () => 'benzinga-quotes';
  public static getEnvironment = (env: Record<string, string>) => ({
    delayedQuoteKey: env.delayedQuoteKey ?? '81DC3A5A39D6D1A9D26FA6DF35A34',
    delayedQuoteUrl: new URL(env.delayedQuoteUrl ?? 'https://data-api.benzinga.com/rest/'),

    logosKey: env.logosKey ?? '539775a6a04740fc9f7530f102afa105',
    logosUrl: new URL(env.logosUrl ?? 'https://api.benzinga.com/api/'),

    scheduleKey: env.scheduleKey ?? '81DC3A5A39D6D1A9D26FA6DF35A34',
    scheduleUrl: new URL(env.scheduleUrl ?? 'https://data-api-next.benzinga.com/rest/'),

    shortInterestKey: env.shortInterestKey ?? '2RiuR92vjytxS8r93w3c8WTpGSd3y9Gk',
    shortInterestUrl: new URL(env.shortInterestUrl ?? 'https://data-api.benzinga.com/'),

    socketUrl: new URL(env.socketUrl ?? 'wss://pro-quote-v2.benzinga.com/quote/'),

    symbolsKey: env.symbolsKey ?? '54b595f497164e0499409ca93342e394',
    symbolsUrl: new URL(env.symbolsUrl ?? 'https://data-api-pro.benzinga.com/rest/'),

    tickersKey: env.tickersKey ?? '81DC3A5A39D6D1A9D26FA6DF35A34',
    tickersUrl: new URL(env.tickersUrl ?? 'https://data-api.benzinga.com/rest/'),
  });
}
