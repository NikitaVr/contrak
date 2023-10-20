export function iife<T extends (...args: any[]) => any>(fn: T): ReturnType<T> {
  return fn();
}
