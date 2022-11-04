import { Financials } from './entities';

export class SecuritiesStore {
  private date?: Date;
  private financials?: Financials[];

  constructor() {
    this.date = undefined;
    this.financials = undefined;
  }

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

  public getFinancials = (): Financials[] | undefined => {
    const ONE_MIN = 60 * 1000; /* ms */
    const lastCalled = this.date?.getTime() ?? 0;
    if (this.financials === undefined || Date.now() - lastCalled > ONE_MIN) {
      return undefined;
    }
    return this.financials;
  };

  public setFinancials = (financials: Financials[]): boolean => {
    if (this.financials && SecuritiesStore.compareFinancials(this.financials, financials)) {
      this.date = new Date();
      return true;
    } else {
      this.financials = financials;
      return false;
    }
  };
}
