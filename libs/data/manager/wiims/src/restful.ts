import { SafePromise } from '@benzinga/safe-await';

import { RestfulClient } from '@benzinga/session';
import { Session } from '@benzinga/session';
import { WiimsEnvironment } from './environment';
import { EgressWiimRequestParams } from './egress';
import { IngressWiimsResponse } from './ingress';

export class WiimsRestful extends RestfulClient {
  constructor(session: Session) {
    super(
      session.getEnvironment(WiimsEnvironment).url,
      session,
      {
        authorizationSession: true,
        'x-device-key': true,
      },
      {
        tokenParameterName: 'token',
      },
    );
  }

  getWiims = (params: EgressWiimRequestParams): SafePromise<IngressWiimsResponse> => {
    const url = this.URL('v1/wiims', params);
    return this.debouncedGet(url, { allowsAnonymousAuth: true, credentials: 'same-origin' });
  };
}
