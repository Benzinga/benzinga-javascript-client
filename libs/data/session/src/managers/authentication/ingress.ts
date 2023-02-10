import { safeMap, SafePromise } from '@benzinga/safe-await';
import {
  Authentication,
  AccessType,
  Card,
  Permission,
  RefreshResponse,
  UserSubscription,
  SubscriptionStatus,
  Coupon,
} from './entities';

export interface IngressCard {
  brand: string;
  country: string;
  exp_month: number;
  exp_year: number;
  last_4: string;
  name: string;
  uuid: string;
  zip_code: string;
}

export interface SavedLayout {
  data: unknown;
  date_created?: string;
  date_updated?: string;
  ip_address: string;
  name: string;
  user_agent: string;
  uuid: string;
}

export interface IngressUser {
  access_type: AccessType;
  benzinga_uid: number;
  cards: IngressCard[];
  display_name: string;
  email: string;
  email_verified: boolean;
  first_name: string;
  human_verified: boolean;
  id: number;
  last_name: string;
  layouts: SavedLayout[];
  permissions: Permission[];
  phone_info: null;
  phone_number: string;
  profile_image: string;
  sms_verified: boolean;
  subscriptions: IngressSubscription[];
  tradeit_token: string;
  trial_end_date: string | null;
  uuid: string;
}

export interface IngressSubscription {
  amount: number;
  base_plan: string;
  cancel_at_period_end: boolean;
  coupon: IngressCoupon | null;
  currency: string;
  current_period_end: string;
  date_created: string;
  final_price: string;
  interval: 'year';
  interval_count: number;
  is_paying_subscription: boolean;
  line_items: {
    amount: string;
    currency: string;
    date_created: string;
    feature_name: string;
    feature_slug: string;
    localized_price: string;
    uuid: string;
  }[];
  localized_price: string;
  plan_name: string;
  product: string;
  product_name: string;
  status: string;
  total_price: string;
  trial_end: string | null;
  uuid: string;
}

export interface IngressAuthentication {
  csrf_token: string;
  exp: number;
  key: string;
  user: IngressUser;
}

export interface IngressRefreshResponse {
  access_type: AccessType;
  exp: number;
  permissions: Permission[];
}

export declare type CouponDuration = 'once' | 'repeating' | 'forever';
export interface IngressCoupon {
  amount_off: number | null;
  code: string | null;
  currency: string | null;
  duration: CouponDuration;
  duration_in_months: number | null;
  is_valid: boolean;
  name: string;
  percent_off: number | null;
  plans: string[] | null;
  redeem_by: string | null;
}

export const ingressCoupon = (ingress: IngressCoupon): Coupon => ({
  amountOff: ingress.amount_off,
  code: ingress.code,
  currency: ingress.currency,
  duration: ingress.duration,
  durationInMonths: ingress.duration_in_months,
  isValid: ingress.is_valid,
  name: ingress.name,
  percentOff: ingress.percent_off,
  plans: ingress.plans,
});

export const ingestRefreshResponse = async (
  incomingRefreshResponse: SafePromise<IngressRefreshResponse>,
): SafePromise<RefreshResponse> =>
  safeMap(incomingRefreshResponse, refresh => ({
    accessType: refresh.access_type,
    exp: refresh.exp,
    permissions: refresh.permissions,
  }));

export const ingestCard = (ingressCards: IngressCard[]): Card[] => ingressCards?.map(ingestCards);

export const ingestCards = (ingressCard: IngressCard): Card => ({
  brand: ingressCard.brand,
  country: ingressCard.country,
  expMonth: ingressCard.exp_month,
  expYear: ingressCard.exp_year,
  last4: ingressCard.last_4,
  name: ingressCard.name,
  uuid: ingressCard.uuid,
  zipCode: ingressCard.zip_code,
});

export const ingestSubscriptions = (subscriptions: IngressSubscription[]): UserSubscription[] =>
  subscriptions?.map(ingestSubscription);

export const ingestSubscription = (subscriptions: IngressSubscription): UserSubscription => ({
  amount: subscriptions.amount,
  basePlan: subscriptions.base_plan,
  cancelAtPeriodEnd: subscriptions.cancel_at_period_end,
  coupon: subscriptions.coupon ? ingressCoupon(subscriptions.coupon) : null,
  currency: subscriptions.currency,
  currentPeriodEnd: subscriptions.current_period_end,
  dateCreated: subscriptions.date_created,
  finalPrice: subscriptions.final_price,
  interval: subscriptions.interval,
  intervalCount: subscriptions.interval_count,
  isPayingSubscription: subscriptions.is_paying_subscription,
  lineItems: subscriptions.line_items.map(l => ({
    amount: l.amount,
    currency: l.currency,
    dateCreated: l.date_created,
    featureName: l.feature_name,
    featureSlug: l.feature_slug,
    localizedPrice: l.localized_price,
    uuid: l.uuid,
  })),
  localizedPrice: subscriptions.localized_price,
  planName: subscriptions.plan_name,
  product: subscriptions.product,
  productName: subscriptions.product_name,
  status: subscriptions.status as SubscriptionStatus,
  totalPrice: subscriptions.total_price,
  trialEnd: subscriptions.trial_end,
  uuid: subscriptions.uuid,
});

export const ingestAuthentication = async (
  incomingAuthentication: SafePromise<IngressAuthentication>,
): SafePromise<Authentication> =>
  safeMap(incomingAuthentication, authentication => ({
    csrfToken: authentication.csrf_token,
    exp: authentication.exp,
    key: authentication.key,
    user: {
      accessType: authentication.user.access_type,
      benzingaUid: authentication.user.benzinga_uid,
      cards: ingestCard(authentication.user.cards),
      displayName: authentication.user.display_name,
      email: authentication.user.email,
      emailVerified: authentication.user.email_verified,
      firstName: authentication.user.first_name,
      humanVerified: authentication.user.human_verified,
      id: authentication.user.id,
      lastName: authentication.user.last_name,
      layouts: authentication.user.layouts,
      permissions: authentication.user.permissions,
      phoneInfo: authentication.user.phone_info,
      phoneNumber: authentication.user.phone_number,
      profileImage: authentication.user.profile_image,
      smsVerified: authentication.user.sms_verified,
      subscriptions: ingestSubscriptions(authentication.user.subscriptions),
      tradeitToken: authentication.user.tradeit_token,
      trialEndDate: authentication.user.trial_end_date,
      uuid: authentication.user.uuid,
    },
  }));

export interface IngressSmsResponse {
  sms_verified?: boolean;
}

export const ingestSmsResponse = async (incomingSmsResponse: SafePromise<IngressSmsResponse>): SafePromise<boolean> =>
  safeMap(incomingSmsResponse, sms => sms.sms_verified ?? false);

export interface IngressHumanResponse {
  human_verified?: boolean;
}

export const ingestHumanResponse = async (
  incomingHumanResponse: SafePromise<IngressHumanResponse>,
): SafePromise<boolean> => safeMap(incomingHumanResponse, sms => sms.human_verified ?? false);
