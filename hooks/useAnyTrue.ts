/**
 * True if any of items are true
 * False if every item is false
 *
 * use case:
 * const isLoading = useAnyTrue([isXLoading, isYLoading, isZLoading]);
 *
 * @param {boolean[]} items
 * @return {boolean}
 */
export const useAnyTrue = (items: boolean[]): boolean => {
  return items.some(item => item);
};
