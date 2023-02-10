# Quotes and delayed quotes manager

This manager provides access to Benzinga quotes data.

## Getting started

First, use a session to obtain an instance of a quotes manager:

```ts
import { createSession } from '@benzinga/session';
import { QutoesManager } from '@benzinga/calendar-conference-calls-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
})

const manager = session.getManager(ConferenceCallsManager);
```

Now can you use the manager for next features:

### Get delayed quotes, schedule or ticker details data directly from server

```ts
const delayedQuotesResponse = await manager.getDelayedQuotes(['SYM1', 'SYM2']);

if (!delayedQuotesResponse.err) {
  console.log(delayedQuotesResponse.ok);
}
```

```ts
const tickersResponse = await manager.getTickerDetails(['SYM1', 'SYM2']);

if (!tickersResponse.err) {
  console.log(tickersResponse.ok);
}
```

### Get detailed quotes or short interest data

These methods actually cache data in memory, which means only call request for same data will make a request to server. This is by-design to allow usage of the manager in highly-loaded UI.


```ts
const shortInterestResponse = await manager.getShortInterest({
  symbols: ['AAPL', 'MRCS']
});

const detailedQuotesResponse = await manager.getDetailedQuotes(['MSFT', 'ARBC']);
```

### Try to get cached values of each of the items

These methods will return undefined if no value is present in cache:

```ts
const quote = manager.getCachedQuote('SMDC');
const quoteDetail = manager.getCachedQuoteDetail('SMDC');
```

### Create feed for real-time data processing

```ts
const feed = manager.createQuoteFeed('AAPL');

feed.subscribe(ev => {
  if (ev.type === 'quote:quote') {
    //ev.quote contains updated quote
  }

  if (ev.type === 'quote:quote_details') {
    //ev.detail contains new quote details
  }
});

//You may also access latest data on the feed

const feedQuote = feed.getQuote();
const feedDetail = feed.getDetail();
```

# Classes
## QuoteFeed
Feed for receiving data regarding quotes in real time

Subscribe to needed events to receive respectful updates

### Methods: 
```ts
getCurrentPriceAndVolume (quote: IncomingQuote): Quote
```
Returns current price and volume as a Quote entity

*Returns:* [Quote](#quote)


## QuotesManager
Quotes manager

Main class for working with Quotes API

To use, obtain an instance by calling session.getManager(QuotesManager)

### Methods: 
```ts
getStore (): QuoteStore
```
Do not use store directly! Use methods in the manger itself to query data

*Returns:* QuoteStore


```ts
getCachedQuote (security: string): Quote
```
Get quote for given security from cache (if exists)

*Returns:* [Quote](#quote)


```ts
getCachedQuoteDetail (security: string): QuoteDetail
```
Get quote detail for given security from cache (if exists)

*Returns:* [QuoteDetail](#quotedetail)


```ts
createQuoteFeed (security: string): QuoteFeed
```
Create a feed for given quote security

For each security there is only one feed created, so multiple calls will return the same instance

*Returns:* QuoteFeed


```ts
getDetailedQuotes (symbols: StockSymbol[]): SafePromise<DetailedQuotesBySymbol>
```
Get detailed quotes for given symbols

Note that this method wil use cache as much as possible

*Returns:* SafePromise<DetailedQuotesBySymbol>


```ts
getQuotesLogos (symbols: StockSymbol[], params?: GetQuotesLogoParams): SafePromise<any>
```
Get quotes logo for given symbols and params

Will use internal cache when possible

*Returns:* SafePromise<any>


```ts
getDelayedQuotes (symbols: StockSymbol[]): SafePromise<DelayedQuote>
```
Fetch delayed quotes data for given symbols from server

*Returns:* SafePromise<Delayed[Quote](#quote)>


```ts
getTickerDetails (symbols: StockSymbol[]): SafePromise<TickerDetailsResponse>
```
Fetch ticker details for given symbols from server

*Returns:* SafePromise<TickerDetailsResponse>


```ts
getSchedule (): SafePromise<ScheduleResponse>
```
Fetch quotes schedule from server

*Returns:* SafePromise<ScheduleResponse>


```ts
getDetailedQuotesCached (symbols: StockSymbol[]): DetailedQuotesBySymbol
```
Get detailed quotes from cache.

If detailed quote for requested symbol is not cached, it won't be in the result

*Returns:* DetailedQuotesBySymbol


```ts
getShortInterest (params: ShortInterestParams): SafePromise<ShortInterestsDataSet>
```
Get short interest data

Will use cache when possible

*Returns:* SafePromise<ShortInterestsDataSet>




# Interfaces
## QuoteDetail
Single quote detail

* `companyName` (string) - Company name

* `currency` (string) - Currency code

* `delayedMinutes` (number) - Delayed minutes

* `exchange` (string) - Exchange name

* `source` (string) - Source of quote

None for real-time quotes

## IncomingQuote
Incoming quote

* `afterMarketPrice` (number) - After Market Price?

* `afterMarketVolume` (number) - After Market Volume?

* `askPrice` (number) - Ask Price?

* `bidPrice` (number) - Bid Price?

* `change` (number) - Change?

* `close` (number) - Close?

* `closeDate` (string) - Close Date?

* `currency` (string) - Currency?

* `dayHigh` (number) - Day High?

* `dayLow` (number) - Day Low?

* `fiftyTwoWeekHigh` (number) - Fifty Two Week High?

* `fiftyTwoWeekLow` (number) - Fifty Two Week Low?

* `lastTradePrice` (number) - Last Trade Price?

* `lastTradeTime` (string) - Last Trade Time?

* `open` (number) - Open?

* `percentChange` (number) - Percent Change?

* `preMarketPrice` (number) - Pre Market Price?

* `preMarketVolume` (number) - Pre Market Volume?

* `previousClose` (number) - Previous Close?

* `sessionType` (QuoteSessionType) - Session Type?

* `symbol` (StockSymbol) - Symbol

* `volume` (number) - Volume?

* `version` (number) - Version?

## InitialQuote
Initial quote data

* `detail` ([QuoteDetail](#quotedetail)) - Quote detail

* `quote` ([IncomingQuote](#incomingquote)) - Quote data

* `symbol` (string) - Quote symbol

## DetailsQuote


* `askPrice` (number) - Ask Price

* `askSize` (number) - Ask Size

* `askTime` (number) - Ask Time

* `averageVolume` (number) - Average Volume

* `bidPrice` (number) - Bid Price

* `bidSize` (number) - Bid Size

* `bidTime` (number) - Bid Time

* `bzExchange` (string) - Benzinga Exchange

* `change` (number) - Change

* `changePercent` (number) - Change Percent

* `close` (number) - Close?

* `companyStandardName` (string) - Company Standard Name?

* `currency` (string) - Currency?

* `description` (string) - Description

* `dividend` (number) - Dividend?

* `dividendYield` (number) - Dividend Yield?

* `dxSymbol` (StockSymbol) - Dx Symbol

* `ethPrice` (number) - Eth Price

* `ethTime` (number) - Eth Time

* `ethVolume` (number) - Eth Volume

* `exchange` (string) - Exchange

* `fiftyDayAveragePrice` (number) - Fifty Day Average Price

* `fiftyTwoWeekHigh` (number) - Fifty Two Week High

* `fiftyTwoWeekLow` (number) - Fifty Two Week Low

* `forwardPE` (number) - Forward P E?

* `high` (number) - High

* `industry` (string) - Industry

* `isoExchange` (string) - Iso Exchange

* `lastTradePrice` (number) - Last Trade Price

* `lastTradeTime` (number) - Last Trade Time

* `low` (number) - Low

* `marketCap` (number) - Market Cap

* `name` (string) - Name

* `open` (number) - Open

* `otcMarket` (string) - Otc Market?

* `otcTier` (string) - Otc Tier?

* `payoutRatio` (number) - Payout Ratio?

* `pe` (number) - Pe?

* `previousCloseDate` (string) - Previous Close Date?

* `previousClosePrice` (number) - Previous Close Price

* `sector` (string) - Sector

* `sharesFloat` (number) - Shares Float?

* `sharesOutstanding` (number) - Shares Outstanding?

* `size` (number) - Size

* `symbol` (StockSymbol) - Symbol

* `type` (DetailsQuoteType) - Type

* `volume` (number) - Volume

* `error` ({ code: number; message: string; }) 

## Quote


* `currentPrice` (number) 

* `currentPriceFormatted` (string) 

* `currentVolume` (number) 

* `lastTradeTime` (string) - Last Trade Time?

* `postToPreChange` (number) 

* `postToPrePercentChange` (number) 

* `regularHoursChange` (number) 

* `regularHoursPercentChange` (number) 

## SecuritySymbol


* `cik` (number) 

* `exchange` (string) 

* `name` (string) 

* `symbol` (string) 

## Logo


* `id` (string) 

* `search_key` (string) 

* `files` ([LogoFile](#logofile)) 

* `created_at` (Date) 

* `updated_at` (Date) 

## LogoFile


* `logo_dark` (string) 

* `logo_light` (string) 

* `logo_vector_dark` (string) 

* `logo_vector_light` (string) 

* `mark_composite_dark` (string) 

* `mark_composite_light` (string) 

* `mark_dark` (string) 

* `mark_light` (string) 

* `mark_vector_dark` (string) 

* `mark_vector_light` (string) 

## DelayedQuote
Delayed quote

* `symbol` (string) - Change

* `dxSymbol` (string) 

* `exchange` (string) 

* `isoExchange` (string) 

* `bzExchange` (string) 

* `otcMarket` (string) 

* `otcTier` (string) 

* `type` (string) 

* `name` (string) 

* `companyStandardName` (string) 

* `description` (string) 

* `bidPrice` (number) 

* `askPrice` (number) 

* `askSize` (number) 

* `bidSize` (number) 

* `size` (number) 

* `bidTime` (number) 

* `askTime` (number) 

* `lastTradePrice` (number) 

* `lastTradeTime` (number) 

* `change` (number) 

* `changePercent` (number) - Change Percent

* `close` (number) - Close

* `currency` (string) - Currency

* `date` (string) - Date

* `previousClosePrice` (number) - Fifty Two Week High

* `fiftyDayAveragePrice` (number) - Fifty day average price

* `averageVolume` (number) - Average volume

* `fiftyTwoWeekHigh` (number) - Fifty Two Week high

* `fiftyTwoWeekLow` (number) - Fifty Two Week Low

* `high` (number) - High

* `last` (number) - Last

* `low` (number) - Low

* `open` (number) - Open

* `previousClose` (number) - Previous Close

* `previousCloseDate` (string) - Previous Close Date

* `tradingHalted` (boolean) - Trading Halted

* `volume` (number) - Volume

* `ethPrice` (number) - ETH price

* `ethVolume` (number) - ETH volume

* `ethTime` (number) - ETH Time

* `issuerName` (string) - Issuer Name

* `primary` (boolean) - Is primary

* `shortDescription` (string) - Short description

* `sector` (string) 

* `industry` (string) 

* `marketCap` (number) 

* `sharesOutstanding` (number) 

* `sharesFloat` (number) 

* `pe` (number) 

* `forwardPE` (number) 

* `issuerShortName` (string) 

## TickerCompany
Company ticker info

* `exists` (boolean) 

* `fiscalYearEnd` (number) 

* `longDescription` (string) 

## TickerFinancialStats


* `dilutedEpsGrowth1Y` (number) 

* `epsGrowth1Y` (number) 

* `operationRatiosAsOf1Y` (string) 

* `revenueGrowth1Y` (number) 

## TickerKeyStatistics


* `cashAndCashEquivalents` (number) - Cash And Cash Equivalents

* `currentDebt` (number) - Current Debt

* `currentRatio` (number) - Current Ratio

* `ebitdaMargin` (number) - Ebitda Margin

* `evToEbitda` (number) - Ev To Ebitda

* `forwardDividendYield` (number) - Forward Dividend Yield?

* `forwardPeRatio` (number) - Forward Pe Ratio

* `grossMargin` (number) - Gross Margin

* `longTermDebt` (number) - Long Term Debt

* `pcfRatio` (number) - Pcf Ratio

* `peRatio` (number) - Pe Ratio

* `psRatio` (number) - Ps Ratio

* `revenueGrowth` (number) - Revenue Growth

* `tangibleBookValuePerShare` (number) - Tangible Book Value Per Share

* `totalAssets` (number) - Total Assets

* `totalDebtEquityRatio` (number) - Total Debt Equity Ratio

## TickerPeer


* `exchange` (string) - Peer exchange

* `isin` (string) - ISIN

* `shareFloat` (number) - Share value as a float

* `sharesOutstanding` (number) - Shares outstanding

* `symbol` (string) - Ticker symbol

## TickerPercentile


* `classificationStandard` (string) - Classification Standard

* `dataId` (string) - Data Id

* `dataValue` (number) - Data Value

* `groupCode` (number) - Group Code

* `groupName` (string) - Group Name

* `mean` (number) - Mean

* `median` (number) - Median

* `percentile` (number) - Percentile

## TickerDetail


* `company` ([TickerCompany](#tickercompany)) - Company

* `financialStats` ([TickerFinancialStats](#tickerfinancialstats)) - Financial Stats

* `keyStatistics` ([TickerKeyStatistics](#tickerkeystatistics)) - Key Statistics

* `peers` ([TickerPeer](#tickerpeer)[]) - Peers

* `percentiles` ([TickerPercentile](#tickerpercentile)[]) - Percentiles

* `shareFloat` (number) - Share Float?

* `sharesOutstanding` (number) - Shares Outstanding

* `sharesShort` (number) - Shares Short

* `sharesShortPercentOfFloat` (number) - Shares Short Percent Of Float

* `symbol` (string) - Symbol

## TickerSession


* `endTime` (number) 

* `localEndDate` (string) 

* `localStartDate` (string) 

* `startTime` (number) 

* `type` (string) 

## Schedule


* `dayId` (number) - Day Id

* `endTime` (number) - End Time

* `localResetDate` (string) - Local Reset Date

* `resetTime` (number) - Reset Time

* `sessions` ([TickerSession](#tickersession)[]) - Sessions

* `shortDay` (boolean) - Short Day

* `startTime` (number) - Start Time

* `timeZoneId` (string) - Time Zone Id

* `trading` (boolean) - Trading

## ShortInterestParams
Params for short interest request

* `symbols` (StockSymbol[]) - List of symbols

* `asOf` (string) - Target search date

* `dateFrom` (string) - Starting date

* `dateTo` (string) - Ending date

## ShortInterest
Short interest info

* `symbol` (string) - Symbol

* `company` (string) - Company

* `totalShortInterest` (string) - Total Short Interest

* `daysToCover` (number) - Days To Cover

* `shortPercentOfFloat` (number) - Short Percent Of Float?

* `performance52Wk` (number) - Performance52 Wk

* `percentInsiderOwnership` (number) - Percent Insider Ownership

* `percentInstitutionalOwnership` (number) - Percent Institutional Ownership

* `shortPriorMo` (number) - Short Prior Mo

* `percentChangeMoMo` (number) - Percent Change Mo Mo

* `sharesFloat` (number) - Shares Float?

* `averageDailyVolume` (number) - Average Daily Volume

* `sharesOutstanding` (number) - Shares Outstanding

* `exchange` (string) - Exchange

* `sector` (string) - Sector

* `industry` (string) - Industry

* `shortSqueezeRanking` (number) - Short Squeeze Ranking

## GetQuotesLogoParams
Request params for get logos

* `fields` (string) - A comma (,) separated list of returned fields

* `scale` (string) - Specified as the WIDTHxHEIGHT to scale the image down in pixels.
Images will only be scaled down, never up, and fit within the bounds set.
In CSS terms, the object-fit property is set to `contain`
Scale will be applied to: logo_light, logo_dark, mark_light, mark_dark, mark_composite_light, mark_composite_dark

* `search_keys_type` (string) - The type of identifier being searched.
Supported types are currently a security symbol and CIK.

