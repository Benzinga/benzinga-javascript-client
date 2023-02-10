import { ExtendedListenableSubscribable } from '@benzinga/subscribable';
import { DelayedQuote } from './entities';
import { chunkifyArray, debounce } from '@benzinga/utils';
import { Session } from '@benzinga/session';
import { QuotesManager } from './manager';
import { QuoteStore } from './store';

interface QuoteEvent {
  quote: DelayedQuote;
  symbol: string;
  type: 'quote:delayed_quote_update';
}

interface QuoteFunctions {
  getQuote: QuoteFeedRestful['getQuote'];
}

export type QuoteFeedRestfulEvent = QuoteEvent;

export class QuoteFeedRestful extends ExtendedListenableSubscribable<QuoteFeedRestfulEvent, QuoteFunctions> {
  protected store: QuoteStore;
  private debounceUpdate: () => void;
  private session: Session;
  private subscribedStore: Record<string, boolean> = {};
  private symbolsQueue: string[] = [];

  constructor(session: Session, store: QuoteStore) {
    super();
    this.session = session;
    this.store = store;
    this.debounceUpdate = debounce(() => {
      const symbols = this.getSymbolsQueue();
      return this.updateDelayedQuotesStore(symbols);
    }, 50);
  }

  public getQuote = (symbol: string): DelayedQuote | undefined => this.store.getDelayedQuote(symbol);

  public addSymbolSubscription = (symbol: string): DelayedQuote | undefined => {
    const quote = this.getQuote(symbol);
    if (quote) {
      return quote;
    } else {
      this.addSymbolToQueue(symbol);
      this.updateSubscription();
      return undefined;
    }
  };

  public addSymbolsSubscription = (symbols: string[]) => {
    symbols.forEach((symbol: string) => {
      if (!this.subscribedStore[symbol]) {
        this.addSymbolToQueue(symbol);
        this.updateSubscription();
      }
    });
  };

  public removeSymbolSubscription = (symbol: string) => {
    if (this.subscribedStore[symbol]) {
      delete this.subscribedStore[symbol];
    }
  };

  public removeSymbolsSubscription = (symbols: string[]) => {
    symbols.forEach((symbol: string) => {
      if (this.subscribedStore[symbol]) {
        delete this.subscribedStore[symbol];
      }
    });
  };

  protected onSubscribe = (): QuoteFunctions => ({
    getQuote: this.getQuote,
  });

  private updateSubscription = () => {
    return this.debounceUpdate();
  };

  private handleRestQuotesUpdate = (quotes: Array<DelayedQuote>): DelayedQuote[] => {
    quotes.forEach((data: DelayedQuote) => {
      this.store.setDelayedQuotes(data.symbol, data);
    });
    const storedDelayedQuotes = this.store.getDelayedQuotes();
    storedDelayedQuotes.forEach(quote => {
      this.dispatch({
        quote,
        symbol: quote.symbol,
        type: 'quote:delayed_quote_update',
      });
    });
    return quotes;
  };

  private getSubscribedSymbols = (): string[] => {
    const symbols = Object.keys(this.subscribedStore);
    return symbols;
  };

  private getSymbolsQueue = (): string[] => {
    const symbols = this.symbolsQueue;
    return symbols;
  };

  private addSymbolToQueue = (symbol: string) => {
    const subscribedSymbols = this.getSubscribedSymbols();
    if (!this.symbolsQueue.includes(symbol) && !subscribedSymbols.includes(symbol)) {
      this.symbolsQueue.push(symbol);
    }
  };

  private updateDelayedQuotesStore = (symbolsInQueue: string[]) => {
    const MAX_SYMBOLS_BATCH_REQUEST_AMOUNT = 510;
    const chunkifiedSymbols: string[][] = chunkifyArray(symbolsInQueue, MAX_SYMBOLS_BATCH_REQUEST_AMOUNT);
    chunkifiedSymbols.map((symbolsArray: string[]) => {
      this.fetchDelayedQuotes(symbolsArray).then(response => {
        if (response.ok) {
          this.handleRestQuotesUpdate(Object.values(response.ok));
          symbolsArray.map(symbol => {
            this.subscribedStore[symbol] = true;
          });
        }
      });
    });
  };

  private fetchDelayedQuotes = (symbols: string[]) => {
    return this.session.getManager(QuotesManager).getDelayedQuotes(symbols);
  };
}
