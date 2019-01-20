/**
 * sync repeat
 */
export function repeat<T>(times: number, action: (time?: number) => T): T[] {
  const rst = []
  for (let i = 0; i < times; i++) {
    rst.push(action(i))
  }
  return rst
}

/**
 * sync range
 */
export function range(end: number, step: number): number[]
export function range(from: number, to: number, step: number = 1): number[] {
  // TODO missing
  return []
}
