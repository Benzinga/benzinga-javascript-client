type TargetingElement = string | number;

export const formatDFPTagCollection = <T extends { tid: string | number; name: string }>(
  data: Array<T>,
): TargetingElement[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  const targetingData: string[] = [];
  data.forEach((item: T) => {
    if (item) {
      targetingData.push(item.name);
      targetingData.push(`${item.tid}`);
    }
  });

  return targetingData;
};
