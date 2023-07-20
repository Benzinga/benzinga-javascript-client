export const removeKeysWithEmptyStringValues = (obj: any, removeAllFalseValues?: boolean) => {
  if (!obj) return {};
  for (const key of Object.keys(obj)) {
    if (removeAllFalseValues && !!obj[key] === false) {
      delete obj[key];
    } else if (obj[key] === '') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      obj[key] = removeKeysWithEmptyStringValues(obj[key]);
      if (Object.keys(obj[key]).length === 0) delete obj[key];
    }
  }
  return Array.isArray(obj) ? obj.filter(val => val) : obj;
};
