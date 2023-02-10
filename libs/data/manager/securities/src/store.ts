import { StockSymbol } from '@benzinga/session';
import { Financials, FinancialsQuery, Period } from './entities';

export class SecuritiesStore {
  private financials = new Map<StockSymbol, Map<Period, { date: Date; financials: Financials[] }>>();

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

  public getFinancials = (query: FinancialsQuery): Financials[] | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const financial = this.financials.get(query.symbols)?.get(query.period);
    const lastCalled = financial?.date.getTime() ?? 0;
    if (financial === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return financial.financials;
  };

  public setFinancials = (query: FinancialsQuery, financials: Financials[]): boolean => {
    const financial = this.financials.get(query.symbols)?.get(query.period);
    if (financial?.financials && SecuritiesStore.compareFinancials(financial.financials, financials)) {
      this.financials.get(query.symbols)?.set(query.period, { ...financial, date: new Date() });
      return true;
    } else {
      const fin = this.financials.get(query.symbols);
      if (fin) {
        fin.set(query.period, { date: fin.get(query.period)?.date ?? new Date(), financials });
      } else {
        this.financials.set(query.symbols, new Map([[query.period, { date: new Date(), financials }]]));
      }
      return false;
    }
  };
}
