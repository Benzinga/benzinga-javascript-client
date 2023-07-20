export const isBrowser = () => {
  if (typeof window !== 'undefined') {
    return true;
  }
  return false;
};

export const isDesktop = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 1024;
  } else {
    return false;
  }
};

export const isTablet = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 800 && window.innerHeight < 1024;
  } else {
    return false;
  }
};

export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 800;
  } else {
    return false;
  }
};

const defaultUserAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

interface GetDeviceDetectsReturnType {
  isAndroid: () => boolean;
  isBot: () => boolean;
  isDesktop: () => boolean;
  isIos: () => boolean;
  isMobile: () => boolean;
  isIosMobile: () => boolean;
  isSSR: () => boolean;
  isWindows: () => boolean;
}

export const detectDeviceType = (userAgent = defaultUserAgent): GetDeviceDetectsReturnType => {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod|MacIntel|MacPPC|Mac68K|Macintosh/i));
  const isWindows = (): boolean => Boolean(userAgent.match(/Windows|Win32|Win64|WinCE|IEMobile/i));
  const isOperaMini = (): boolean => Boolean(userAgent.match(/Opera Mini/i));
  const isMobile = (): boolean => Boolean(isAndroid() || isIos() || isOperaMini());
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());
  const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i));
  const isBot = (): boolean => Boolean(userAgent.match(/Bot|Googlebot|Crawler|Robot|Slurp|Baiduspider|Mediapartners/i));
  const isIosMobile = (): boolean => isIos() && isMobile();

  return {
    isAndroid,
    isBot,
    isDesktop,
    isIos,
    isIosMobile,
    isMobile,
    isSSR,
    isWindows,
  };
};
