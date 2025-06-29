import React, { useEffect, useState } from 'react'
import BinaryRain from './BinaryRain'
import flashSound from './assets/flash.wav'
import bgMusic from './assets/bgMusic.mp3'
import useReactiveFontSize from './useReactiveFontSize'


const BirthdayScreen = () => {
  const fontSize = useReactiveFontSize(bgMusic, 20, 80)
  const [caught, setCaught] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showShutter, setShowShutter] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [lidOpen, setLidOpen] = useState(false)

  // Flash surprise logic
  useEffect(() => {
    const flashTimer = setTimeout(() => {
      const flashAudio = new Audio(flashSound)
      flashAudio.play()
      setShowFlash(true)

      setTimeout(() => {
        setShowFlash(false)
        setShowShutter(true)

        setTimeout(() => {
          setShowShutter(false)
          setCaught(true)

          setTimeout(() => setCaught(false), 3000)
        }, 600)
      }, 300)
    }, 10000)

    return () => clearTimeout(flashTimer)
  }, [])

  // Open box on click
  const handleOpenGift = () => {
    
    setLidOpen(true)
    setTimeout(() => setRevealed(true), 1000)
  }

  return (
    <div className="birthday-container">
      <BinaryRain />

      {!revealed && (
        <div className="gift-box" onClick={handleOpenGift}>
          <div className={`lid ${lidOpen ? 'lid-pop' : ''}`} />
          <div className="box" />
        </div>
      )}

      {revealed && (
        <h1 style={{ transform: `scale(${fontSize / 40})` }} className="glow">
          🎉 Happy Birthday! 🎉
        </h1>

      )}

      {showFlash && <div className="flash-overlay"></div>}

      {caught && (
        <div className="flash-message">📸 Caught u smiling again 😏</div>
      )}
    </div>
  )
}

export default BirthdayScreen
