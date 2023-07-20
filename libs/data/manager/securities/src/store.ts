import { StockSymbol } from '@benzinga/session';
import { Financials, FinancialsQuery, FinancialsPeriod, Ownership, Peer, AsOf } from './entities';
import { InsidersFiling } from '@benzinga/insider-trades-manager';

export class SecuritiesStore {
  private financials = new Map<
    StockSymbol,
    Map<FinancialsPeriod, Map<AsOf | undefined, { date: Date; financials: Financials[] }>>
  >();
  private ownership = new Map<StockSymbol, { date: Date; ownership: Ownership }>();
  private peers = new Map<StockSymbol, { date: Date; peers: Peer[] }>();
  private insiders = new Map<StockSymbol, { date: Date; insiders: InsidersFiling[] }>();

  public static compareFinancials = (lhs: Financials[], rhs: Financials[]): boolean => {
    return lhs?.every(financial => {
      const newFinancial = rhs.find(newFinancial => financial.id === newFinancial.id);
      if (newFinancial) {
        return financial.id === newFinancial.id;
      } else {
        return false;
      }
    });
  };

  public static compareOwnership = (lhs: Ownership, rhs: Ownership): boolean => {
    return lhs?.id === rhs?.id;
  };

  public static comparePeers = (lhs: Peer[], rhs: Peer[]): boolean => {
    return lhs?.every(peer => {
      const newPeer = rhs.find(newPeer => peer.symbol === newPeer.symbol);
      if (newPeer) {
        return peer.symbol === newPeer.symbol;
      } else {
        return false;
      }
    });
  };

  public static compareInsiders = (lhs: InsidersFiling[], rhs: InsidersFiling[]): boolean => {
    return lhs?.every(insider => {
      const newInsider = rhs.find(newInsider => insider.accession_number === newInsider.accession_number);
      if (newInsider) {
        return insider.accession_number === newInsider.accession_number;
      } else {
        return false;
      }
    });
  };

  public getFinancials = (query: FinancialsQuery): Financials[] | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const financial = this.financials.get(query.symbols)?.get(query.period)?.get(query.asOf);
    const lastCalled = financial?.date.getTime() ?? 0;
    if (financial === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return financial.financials;
  };

  public setFinancials = (query: FinancialsQuery, financials: Financials[]): boolean => {
    const financial = this.financials.get(query.symbols)?.get(query.period)?.get(query.asOf);
    if (financial?.financials && SecuritiesStore.compareFinancials(financial.financials, financials)) {
      this.financials
        .get(query.symbols)
        ?.get(query.period)
        ?.set(query.asOf, { ...financial, date: new Date() });
      return false;
    } else {
      const fin = this.financials.get(query.symbols);
      if (fin) {
        const periodFid = fin.get(query.period);
        if (periodFid) {
          periodFid.set(query.asOf, { date: periodFid.get(query.asOf)?.date ?? new Date(), financials });
        } else {
          fin.set(query.period, new Map([[query.asOf, { date: new Date(), financials }]]));
        }
      } else {
        this.financials.set(
          query.symbols,
          new Map([[query.period, new Map([[query.asOf, { date: new Date(), financials }]])]]),
        );
      }
      return true;
    }
  };

  public getOwnership = (symbol: string): Ownership | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const ownership = this.ownership.get(symbol);
    const lastCalled = ownership?.date.getTime() ?? 0;
    if (ownership === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return ownership.ownership;
  };

  public setOwnership = (symbol: string, ownership: Ownership): boolean => {
    const ownerships = this.ownership.get(symbol);
    if (ownerships?.ownership && SecuritiesStore.compareOwnership(ownerships.ownership, ownership)) {
      this.ownership.set(symbol, { ...ownerships, date: new Date() });
      return false;
    } else {
      this.ownership.set(symbol, { date: new Date(), ownership });
      return true;
    }
  };

  public getPeers = (symbol: string): Peer[] | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const peers = this.peers.get(symbol);
    const lastCalled = peers?.date.getTime() ?? 0;
    if (peers === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return peers.peers;
  };

  public setPeers = (symbol: string, peers: Peer[]): boolean => {
    const peer = this.peers.get(symbol);
    if (peer?.peers && SecuritiesStore.comparePeers(peer.peers, peers)) {
      this.peers.set(symbol, { ...peer, date: new Date() });
      return false;
    } else {
      this.peers.set(symbol, { date: new Date(), peers });
      return true;
    }
  };

  public getInsiders = (symbol: string): InsidersFiling[] | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const insiders = this.insiders.get(symbol);
    const lastCalled = insiders?.date.getTime() ?? 0;
    if (insiders === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return insiders.insiders;
  };

  public setInsiders = (symbol: string, insiders: InsidersFiling[]): boolean => {
    const insider = this.insiders.get(symbol);
    if (insider?.insiders && SecuritiesStore.compareInsiders(insider.insiders, insiders)) {
      this.insiders.set(symbol, { ...insider, date: new Date() });
      return false;
    } else {
      this.insiders.set(symbol, { date: new Date(), insiders });
      return true;
    }
  };
}
