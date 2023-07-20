import Cookies from 'js-cookie';

export const getValueFromCookie = (key: string): string | undefined => {
  if (typeof document !== 'undefined') {
    return document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith(key))
      ?.split('=')[1];
  }
  return undefined;
};

export const removeCookieByName = (cookieName: string, startsWithOnly = false): void => {
  if (typeof document !== 'undefined') {
    if (startsWithOnly) {
      const cookieList = Object.keys(Cookies.get());
      cookieList.forEach(cookie => {
        if (cookie.startsWith(cookieName)) {
          Cookies.remove(cookie, { domain: '.benzinga.com', path: '/' });
        }
      });
    } else {
      Cookies.remove(cookieName, { domain: '.benzinga.com', path: '/' });
    }
  }
};
