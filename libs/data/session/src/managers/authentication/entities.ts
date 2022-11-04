export type AccessType = 'none' | 'manual' | 'subscribed' | 'trialing' | 'free' | 'anonymous';

export interface SessionOptions {
  include_cards: boolean;
  include_layouts: boolean;
  include_perms: boolean;
  include_subs: boolean;
  max_layout_version?: number;
}

export interface Card {
  brand: string;
  country: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  last4: string;
  name: string;
  uuid: string;
  zipCode: string;
}

interface PhoneInfo {
  countryAlpha3: string;
  countryCode: string;
  countryName: string;
  national: string;
}

export interface SavedLayout {
  data: any;
  date_created?: string;
  date_updated?: string;
  ip_address: string;
  name: string;
  user_agent: string;
  uuid: string;
}

export interface User {
  accessType: AccessType;
  benzingaUid: number;
  cards: Card[];
  displayName: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  humanVerified: boolean;
  id: number;
  lastName: string;
  layouts?: SavedLayout[] | undefined;
  permissions: Permission[];
  phoneInfo: PhoneInfo | null;
  phoneNumber: string;
  profileImage: string;
  smsVerified: boolean;
  subscriptions: UserSubscription[] | null;
  tradeitToken: string;
  trialEndDate: string | null;
  uuid: string;
}

export interface RegisterUser {
  displayName?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  passwordConfirmation?: string;
  phoneNumber?: string;
  proTrial?: boolean;
}

export interface Authentication {
  exp: number;
  csrfToken: string;
  key: string;
  user: User;
}

export interface RefreshResponse {
  accessType: AccessType;
  exp: number;
  permissions: Permission[];
}

export interface Permission {
  action: string;
  effect?: 'allow' | 'deny';
  resource: string;
}

export enum SubscriptionStatus {
  active = 'active',
  canceled = 'canceled',
  past_due = 'past_due',
  pending = 'pending',
  trialing = 'trialing',
  unpaid = 'unpaid',
}

export interface Coupon {
  amountOff: number | null;
  code: string | null;
  currency: string | null;
  duration: 'once' | 'repeating' | 'forever';
  durationInMonths: number | null;
  isValid: boolean;
  name: string;
  percentOff: number | null;
  plans: string[] | null;
}

export interface LineItem {
  amount: string;
  currency: string;
  dateCreated: string;
  featureName: string;
  featureSlug: string;
  localizedPrice: string;
  uuid: string;
}
export interface UserSubscription {
  amount: number;
  basePlan: string;
  cancelAtPeriodEnd: boolean;
  coupon: Coupon | null;
  currency: string;
  currentPeriodEnd: string;
  dateCreated: string;
  finalPrice: string;
  interval: 'year' | 'month' | 'week' | 'day';
  intervalCount: number;
  isPayingSubscription: boolean;
  lineItems: LineItem[];
  localizedPrice: string;
  planName: string;
  product: string;
  productName: string;
  status: SubscriptionStatus;
  trialEnd: string | null;
  uuid: string;
}

export interface GoogleAuthenticationResponse {
  client_id: string;
  credential: string;
  select_by: string;
}

export interface GooglePromptResponse {
  g: string;
  h: boolean;
}
