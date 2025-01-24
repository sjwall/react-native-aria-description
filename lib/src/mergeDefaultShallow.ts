export default function mergeDefaultShallow<T extends {}, U extends {}>(
  target: T,
  source: U,
): T & U {
  for (let key in source) {
    if (source.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
      // @ts-expect-error
      target[key] = source[key]
    }
  }
  return target as T & U
}
