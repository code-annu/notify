/**
 * Strips all entries with `undefined` values from a field map,
 * returning a clean data object suitable for Prisma update calls.
 *
 * @param fieldMap - A record mapping DB column names to possibly-undefined values.
 * @returns A new object containing only the defined entries.
 *
 * @example
 * const data = cleanUpdateData({
 *   first_name: updates.firstName,   // "Alice"
 *   last_name: updates.lastName,     // undefined  → removed
 *   company_name: updates.companyName, // "Acme"
 * });
 * // → { first_name: "Alice", company_name: "Acme" }
 */
export function cleanUpdateData<T>(
  fieldMap: Record<string, T | undefined>,
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(fieldMap).filter(
      (entry): entry is [string, T] => entry[1] !== undefined,
    ),
  );
}
