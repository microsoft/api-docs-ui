export const toggleSetValue = <T>(set: Set<T>, value: T): Set<T> => {
  const newSet = new Set(set);

  if (set.has(value)) {
    newSet.delete(value);
  } else {
    newSet.add(value);
  }

  return newSet;
};
