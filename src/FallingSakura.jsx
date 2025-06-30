import React, { useEffect, useRef } from 'react'

const FallingSakura = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const petals = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      speedY: Math.random() * 1 + 0.5,
      angle: Math.random() * Math.PI * 2,
      swing: Math.random() * 0.02 + 0.01,
      alpha: Math.random() * 0.5 + 0.5,
    }))

    function draw() {
      ctx.clearRect(0, 0, width, height)
      petals.forEach(p => {
        p.y += p.speedY
        p.angle += p.swing
        p.x += Math.sin(p.angle) * 0.5
        if (p.y > height) p.y = -p.size
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = '#f8d3d6'  // soft sakura pink
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.angle, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      requestAnimationFrame(draw)
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })
    draw()

    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [])

  return <canvas ref={canvasRef} style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    pointerEvents: 'none',
    zIndex: 1
  }}/>
}

export default FallingSakura
