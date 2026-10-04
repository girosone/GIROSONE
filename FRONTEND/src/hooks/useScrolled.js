import { useSyncExternalStore } from 'react'

const subscribe = (callback) => {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

export const useScrolled = (threshold = 0) =>
  useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
