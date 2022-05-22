export const notNullable = <TValue>(value: TValue): value is NonNullable<TValue> => {
  return value !== null && value !== undefined;
};

export const includesAny = <T>(array: T[], included: T[]) => array?.some(el => el in (included ?? [])) ?? false;

export const uniq = <T>(...arr: T[][]): T[] => {
  if (!arr || arr.length === 0 || (arr.length === 1 && !arr[0])) {
    return [];
  }
  return Array.from(new Set(arr.flat()));
};

export const uniqByValue = <T>(arr: T[], fnc: (obj: T) => any): T[] => {
  if (!arr?.length) {
    return [];
  }
  const result: T[] = [];
  const map = new Map();
  arr.forEach(item => {
    const key = fnc(item);
    if (!map.has(key)) {
      map.set(key, true);
      result.push(item);
    }
  });
  return result;
};

export const sortByValueSelector = <T>(arr: T[], select: (obj: T) => any): T[] => {
  if (!arr || !select) {
    return arr;
  }
  const sorted = arr.slice();
  sorted.sort((a, b) => {
    const aProp = select(a) as any;
    const bProp = select(b) as any;
    if (typeof aProp === 'undefined') {
      return -1;
    }
    if (typeof bProp === 'undefined') {
      return 1;
    }
    if (typeof aProp === 'string' && typeof bProp === 'string') {
      return aProp.localeCompare(bProp);
    }
    return aProp - bProp;
  });
  return sorted;
};

/**
 * Create an array of n length, then mapping the array with the index as input
 *
 * @param count
 * @param mapFunc map function to run for each key
 */
export const mapN = <T>(count: number, mapFunc: (index: number) => T): T[] => {
  return Array.from(Array(count).keys()).map(mapFunc);
};

/**
 * null-safe check of array is empty
 *
 */
export const arrIsEmpty = (array: any[] | undefined | null): boolean => {
  return (array?.length ?? 0) === 0;
};

/**
 * Toggles the existence of the value in the array
 *
 * @param arr array to check to toggle value in
 * @param value value to toggle
 * @param toggled if true the value should exist in the array, if false it should not
 */
export const toggleValue = <T>(arr: T[], value: T, toggled: boolean): T[] => {
  const tmp = arr?.slice() ?? [];
  const index = tmp.indexOf(value);

  if (index >= 0 && !toggled) {
    tmp.splice(index, 1);
    return tmp;
  }
  if (index < 0 && toggled) {
    return [...tmp, value];
  }
  return tmp;
};

export const removeAtIndexImmutable = <T>(arr: T[] | undefined, index: number): T[] | undefined => {
  if (!arr?.length) {
    return undefined;
  }
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export const replaceAtIndexImmutable = <T>(arr: T[] | undefined, index: number, insert: T): T[] | undefined => {
  if (!arr?.length) {
    return undefined;
  }
  const copy = arr.slice();
  copy.splice(index, 1, insert);
  return copy;
};
