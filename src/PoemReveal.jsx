import React, { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import calmBgm from './assets/calmBgm.mp3'
import FallingSakura from './FallingSakura'

const PoemReveal = () => {
  useEffect(() => {
    const audio = new Audio(calmBgm) 
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch((e) => console.warn('Autoplay blocked:', e))

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])
  return (
    <div className="poem-container">
      <FallingSakura />
      
      <TypeAnimation
        sequence={[`
Cool as a freezer, sharp as her grades,\nShe studies like tests power her upgrades.\nA student so perfect, it's almost a sin—\non Insta? Chaos. Let the madness begin.\n\nShe’s the Ice Princess, and don’t forget,\nPrincess means spoiled—consider that a threat.\nApproach with caution, don’t be blind—\nShe’s got sarcasm and many gangs combined.\n\nShe’s smart enough to win everything\nbefore they can even start,\nAnd smooth enough to make it seem like nothing.\nCollects medals and mementos like it's a mart.\n\nShe likes attention but pretends she doesn’t care,\nSo here’s your attention, perfectly rare.\nMay your cool never melt and your glow never dim—\nYour minions hath abided you for a year, and shall again do it, Highness Ice Princess, on a royal whim.\n\nHappy Birthday
`, 1000]}
        wrapper="pre"
        speed={10}
        style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', color: '#f8f8f8', padding: '2rem', textAlign: 'left' }}
        repeat={0}
      />
    </div>
  )
}

export default PoemReveal
