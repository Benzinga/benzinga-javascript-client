import { SafePromise } from '@benzinga/safe-await';
import { RestfulClient } from '@benzinga/session';
import { ShortInterestParams, ShortInterestResponse } from '../entities';
import { Session } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class InterestRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(QuotesEnvironment).shortInterestUrl, session, { 'x-device-key': true });
  }

  getShortInterests = async (params: ShortInterestParams): SafePromise<ShortInterestResponse> => {
    const url = this.URL(`shortinterest`, {
      apikey: this.session.getEnvironment(QuotesEnvironment).shortInterestKey,
      asOf: params.dateFrom,
      finraReport: true,
      symbols: params.symbols ? params.symbols.join(',') : '',
    });
    return this.get(url, {
      allowsAnonymousAuth: true,
      credentials: 'same-origin',
    });
  };
}
