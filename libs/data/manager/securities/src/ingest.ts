import { SafeError, SafePromise } from '@benzinga/safe-await';
import { Financials } from './entities';

interface RestfulResult<DATA> {
  result: DATA;
}

export type IncomingSecuritiesResult = RestfulResult<Financials[]>;

export const ingestSecurities = async (
  financialsData: SafePromise<IncomingSecuritiesResult>,
): SafePromise<Financials[]> => {
  const rawSecurities = await financialsData;

  if (rawSecurities.err) {
    return { err: rawSecurities.err };
  } else {
    if (rawSecurities.ok.result) {
      return { ok: rawSecurities.ok.result };
    } else {
      return { err: new SafeError('did not get a valid financial', 'invalid_financial') };
    }
  }
};
