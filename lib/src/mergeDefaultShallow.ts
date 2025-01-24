export default function mergeDefaultShallow<T extends {}, U>(
  target: T,
  source: U,
): T & U {
  for (let key in source) {
    if ((source as object).hasOwnProperty(key) && !target.hasOwnProperty(key)) {
      // @ts-expect-error
      target[key] = source[key]
    }
  }
  return target as T & U
}
