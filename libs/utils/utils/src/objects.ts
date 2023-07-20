import { snakeCaseToCamelCase } from './stringUtils';

export const camelCaseKeys = <T>(obj: unknown): T => {
  if (Array.isArray(obj)) {
    return obj.map(r => camelCaseKeys(r) as any) as unknown as T;
  } else if (typeof obj === 'object' && obj != null) {
    return Object.entries(obj).reduce((acc, [k, v]) => ({
      ...acc,
      [snakeCaseToCamelCase(k)]: camelCaseKeys(v) as any,
    })) as unknown as T;
  } else {
    return obj as unknown as T;
  }
};
