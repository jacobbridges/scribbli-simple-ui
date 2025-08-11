/**
 * Removes all key-value pairs from an object where the value is `undefined`.
 * This function is generic and will preserve the type of the input object,
 * returning a `Partial<T>` because some keys may have been removed.
 * It does not mutate the original object.
 *
 * @param obj The object to process.
 * @returns A new object with all `undefined` values removed.
 *
 * @example
 * const myObj = { a: 1, b: undefined, c: 'hello', d: null };
 * const culledObj = cullUndefined(myObj);
 * // culledObj is { a: 1, c: 'hello', d: null }
 * // Note: `null` is a valid value and is not removed.
 */
export function cull<T extends object>(obj: T): Partial<T> {
  // Create a new object to avoid mutating the original.
  const newObj: Partial<T> = {};

  // Iterate over the keys of the original object.
  for (const key in obj) {
    // Check if the key belongs to the object itself (not its prototype chain).
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // If the value for the key is not undefined, add it to the new object.
      if (obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}