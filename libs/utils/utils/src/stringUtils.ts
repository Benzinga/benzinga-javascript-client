export const capitalize = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

export const toTitleCase = (title: string): string =>
  title
    .split(' ')
    .map(name => capitalize(name))
    .join(' ');

export const apostrophyName = (name: string) => {
  if (!name) return '';
  if (name[name.length - 1] === 's') return `${name}'`;
  return `${name}'s`;
};

export const camelCaseToTitleCase = (string: string) => capitalize(string.replace(/([A-Z])/g, ' $1').trim());

export const snakeCaseToCamelCase = (string: string) => string.replace(/([-_]\w)/g, g => g[1].toUpperCase());
