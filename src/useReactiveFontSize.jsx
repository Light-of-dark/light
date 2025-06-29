import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

const useReactiveFontSize = (audioFile, minSize = 16, maxSize = 256) => {
  const [fontSize, setFontSize] = useState(minSize)

  useEffect(() => {
    const audio = new Audio(audioFile)
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const src = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()

    src.connect(analyser)
    analyser.connect(ctx.destination)

    audio.loop = true
    audio.volume = 0.1
    audio.play().catch((e) => {
      console.warn('Autoplay blocked:', e)
    })
    const confettiDelay = setTimeout(() => {
      const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 100 + Math.random() * 100,
          spread: 100 + Math.random() * 100,
          origin: {
            x: Math.random(), // random horizontal position
            y: Math.random() * 0.6, // random vertical position, top half
          },
        })
      }, 3000) // every 3 seconds
    
      confettiDelay.intervalId = confettiInterval
    }, 80500)

    analyser.fftSize = 256
    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const animate = () => {
      analyser.getByteFrequencyData(dataArray)
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
      const mappedSize = Math.min(maxSize, minSize + avg / 4)
      setFontSize(mappedSize*2)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearTimeout(confettiDelay)
      clearInterval(confettiDelay.intervalId)

      audio.pause()
      audio.currentTime = 0
      src.disconnect()
      analyser.disconnect()
      ctx.close()
    }
  }, [audioFile, minSize, maxSize])

  return fontSize
}

export default useReactiveFontSize
