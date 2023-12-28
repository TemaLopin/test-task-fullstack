import { useEffect } from 'react'

const useOutsideClick = (
  ignoredRefs: any[],
  handler: (ev: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const isClickInside = ignoredRefs.some(
        (ref) => ref && ref.contains(event.target)
      )

      if (isClickInside) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ignoredRefs, handler])
}

export default useOutsideClick
