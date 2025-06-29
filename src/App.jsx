import React, { useState } from 'react'
import BirthdayScreen from './BirthdayScreen'
import './App.css'
import glitchSound from './assets/glitch.wav'
import superglitch from './assets/superglitch.wav'

export default function App() {
  const [input, setInput] = useState('')
  const [activated, setActivated] = useState(false)
  const [error, setError] = useState(false)
  const [hint, setHint] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isRaging, setIsRaging] = useState(false)
  const secretCode = 'python'
  const audio = new Audio(glitchSound)
  const audio2 = new Audio(superglitch)


  const hints = [
    'you dislike this',
    'I like this',
    'it is a single word',
    'it is comprised of 6 letters',
    'you sux at this',
    'get good',
    'it starts with the letter p',
    'waht the hell',
    'cmon it isnt tha hard yk',
    'you ll learn this in the future',
    'm not paid enuf to give so many hints'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const userGuess = input.trim().toLowerCase()
    if (userGuess === secretCode) {
      setActivated(true)
    } else {
      audio.play()
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(true)
      if (newAttempts >= 10) {
        setIsRaging(true)
        audio2.play()
        setTimeout(() => setIsRaging(false), 300)
  }

      if (newAttempts === 10) {
        setHint("sigh was it so hard to guess? it's jus a language name")
      } else if (newAttempts === 15) {
        setHint('OMG ITS JUST PYTHON')
      } else if (newAttempts === 16) {
        setHint('HOW DID YOU GET IT WRONG I TOLD YOU ITS PYTHON')
      }
        else if (newAttempts >= 17) {
        setHint('daMN YOU PLAYing around nothing better to do? nothing more than this')
        
      } else {
        const randomHint = hints[Math.floor(Math.random() * hints.length)]
        setHint(randomHint)
      }

      setTimeout(() => setError(false), 2000)
    }
    setInput('')
  }

  if (activated) return <BirthdayScreen />

  return (
  <div className={`math-solver ${isRaging ? 'rage-mode' : ''}`}>
    <h1>Quantum Math Solver 9000</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the secret word :>"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Solve</button>
    </form>
    {error && <p className="error">⚠️ Invalid input. Try again.</p>}
    {hint && <p className="hint">💡 Hint: {hint}</p>}
    {attempts > 0 && <p className="tries">Attempts: {attempts}</p>}
  </div>
)


}
