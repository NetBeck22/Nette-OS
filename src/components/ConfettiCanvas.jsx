import { useEffect, useRef, useState } from 'react'
import './ConfettiCanvas.css'

const colors = ['#FF3FA4', '#FFE03A', '#00D4C8', '#9D71FF', '#00FF64', '#FF85C8', '#fff']

export default function ConfettiCanvas() {
  const canvasRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 100,
      width: 6 + Math.random() * 8,
      height: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 6,
      velocityY: 3 + Math.random() * 5,
      rotation: Math.random() * 360,
      rotationVelocity: (Math.random() - 0.5) * 8,
    }))
    let animationFrame
    const startedAt = performance.now()

    function draw(now) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.velocityY += 0.15
        particle.rotation += particle.rotationVelocity
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation * Math.PI / 180)
        context.fillStyle = particle.color
        context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height)
        context.restore()
      })
      if (now - startedAt < 3200) animationFrame = requestAnimationFrame(draw)
      else setVisible(false)
    }

    animationFrame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return visible ? <canvas className="confetti-canvas" ref={canvasRef} /> : null
}
