import { inject, type InjectionKey } from 'vue'

export function useInjected<T>(key: InjectionKey<T>): T {
  const injectedValue = inject<T>(key)
  if (!injectedValue) {
    throw new Error(`Injection for key "${key.toString()}" not found.`)
  }
  return injectedValue
}
