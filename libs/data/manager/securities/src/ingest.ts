import { SafeError, SafePromise } from '@benzinga/safe-await';
import { Financials, Ownership, Peer } from './entities';
import { InsidersFiling } from '@benzinga/insider-trades-manager';

interface RestfulResult<DATA> {
  result: DATA;
}

interface RestfulOwnershipResult {
  result?: {
    summary: Ownership[];
  };
}

interface RestfulPeersResult {
  instruments: Peer[];
}

interface RestfulInsidersResult {
  filings: {
    filings: InsidersFiling[];
  };
}

export type IncomingSecuritiesResult = RestfulResult<Financials[]>;

export type IncomingOwnershipResult = RestfulOwnershipResult;

export type IncomingPeersResult = RestfulPeersResult;

export type IncomingInsidersResult = RestfulInsidersResult;

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

export const ingestOwnership = async (ownershipData: SafePromise<IncomingOwnershipResult>): SafePromise<Ownership> => {
  const rawOwnership = await ownershipData;

  if (rawOwnership.err) {
    return { err: rawOwnership.err };
  } else {
    if (rawOwnership.ok?.result?.[0]?.summary?.[0]) {
      return { ok: rawOwnership.ok?.result?.[0]?.summary?.[0] };
    } else {
      return { err: new SafeError('did not get a valid ownership', 'invalid_ownership') };
    }
  }
};

export const ingestPeers = async (peersData: SafePromise<IncomingPeersResult>): SafePromise<Peer[]> => {
  const rawPeers = await peersData;
  if (rawPeers.err) {
    return { err: rawPeers.err };
  } else {
    if (rawPeers.ok.instruments) {
      return { ok: rawPeers.ok.instruments };
    } else {
      return { err: new SafeError('did not get a valid peer', 'invalid_peer') };
    }
  }
};

export const ingestInsiders = async (
  insidersData: SafePromise<IncomingInsidersResult>,
): SafePromise<InsidersFiling[]> => {
  const rawInsiders = await insidersData;
  if (rawInsiders.err) {
    return { err: rawInsiders.err };
  } else {
    if (rawInsiders.ok.filings.filings) {
      return { ok: rawInsiders.ok.filings.filings };
    } else {
      return { err: new SafeError('did not return expected data', 'fetchInsider') };
    }
  }
};
