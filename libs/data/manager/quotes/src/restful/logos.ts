import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { GetQuotesLogoParams, Logo } from '../entities';
import { Session } from '@benzinga/session';
import { QuotesEnvironment } from '../environment';

export class QuotesLogosRestful extends RestfulClient {
  constructor(session: Session) {
    super(session.getEnvironment(QuotesEnvironment).logosUrl, session, {
      'x-device-key': true,
    });
  }

  getQuotesLogos = async (symbols: string, params?: GetQuotesLogoParams): SafePromise<{ data: Logo[] }> => {
    const defaultFields =
      'logo_light,logo_dark,logo_vector_light,logo_vector_dark,mark_light,mark_dark,mark_vector_light,mark_vector_dark,mark_composite_light,mark_composite_dark';

    const url = this.URL(`v2/logos/search`, {
      composite_auto: true,
      fields: params?.fields ?? defaultFields,
      scale: params?.scale ?? '60x60',
      search_keys: symbols,
      search_keys_type: params?.search_keys_type ?? 'symbol',
      token: this.session.getEnvironment(QuotesEnvironment).logosKey,
    });

    return this.get(url, { allowsAnonymousAuth: true, credentials: 'same-origin' });
  };
}
