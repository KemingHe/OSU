// ./scripts/utils/removePrimitiveDuplicates.ts
//
// Generic utility function to remove duplicated primitives from an array.

export default function removePrimitiveDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
