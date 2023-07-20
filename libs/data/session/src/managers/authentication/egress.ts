import { isArray } from '@benzinga/utils';
import { RegisterUser } from './entities';

export interface EgressRegisterUser {
  confirm_password: string;
  display_name?: string;
  email: string;
  captcha?: string;
  fingerprint: unknown;
  first_name?: string;
  hs_token: string | 'none';
  last_name?: string;
  password: string;
  phone_number?: string;
  register_type: '' | 'pro_trial' | string;
}

const getHubSpotToken = (): string => {
  if (typeof document !== 'undefined') {
    const hutk = /(?:^|; )hutk=([^;]+)/.exec(document.cookie);

    if (isArray(hutk)) {
      if (hutk.length < 2) {
        return 'none';
      } else if (hutk[1].length > 0) {
        return hutk[1];
      }
    }
  }
  return 'none';
};

interface egressRegisterOptions {
  register_type?: string;
  fingerprint?: unknown;
}

export const egressRegister = (info: RegisterUser, options?: egressRegisterOptions): EgressRegisterUser => {
  const input: EgressRegisterUser = {
    captcha: info.captcha ?? undefined,
    confirm_password: info.passwordConfirmation ?? info.password,
    display_name: info.displayName ?? undefined,
    email: info.email,
    fingerprint: options?.fingerprint,
    first_name: info.firstName ?? undefined,
    hs_token: getHubSpotToken(),
    last_name: info.lastName ?? undefined,
    password: info.password,
    phone_number: info.phoneNumber ?? undefined,
    register_type: info.proTrial ? 'pro_trial' : options?.register_type ?? 'unknown',
  };
  return input;
};
