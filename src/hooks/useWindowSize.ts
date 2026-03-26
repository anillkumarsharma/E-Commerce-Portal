import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

// LOGIC: Custom hook to track window size for inline responsive styles
// Since inline styles don't support CSS media queries, we use JS-based breakpoints
const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    // LOGIC: aapko yahan apni logic likhni hai
    // Resize event listener add karo, cleanup on unmount
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default useWindowSize
