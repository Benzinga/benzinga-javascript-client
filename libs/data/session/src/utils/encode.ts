interface Params {
  [key: string]: string | number | boolean | undefined | null | Params;
}

const isParams = (value: unknown): value is Params => !!value && typeof value === 'object';

export const encodeToQuerystring = (params: Params, objKey?: string): string =>
  Object.keys(params)
    .map(key => {
      const queryKey = objKey ? `${objKey}[${key}]` : key;
      return isParams(params[key])
        ? encodeToQuerystring(params[key] as Params, key)
        : `${encodeURIComponent(queryKey)}=${encodeURIComponent(String(params[key]))}`;
    })
    .join('&');
