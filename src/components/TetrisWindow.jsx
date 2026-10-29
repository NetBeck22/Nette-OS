import { useEffect, useRef, useState } from 'react'
import './TetrisWindow.css'

const columns = 8
const rows = 16
const cellSize = 20
const pieces = [
  { shape: [[1, 1, 1, 1]], color: '#00D4C8' },
  { shape: [[1, 1], [1, 1]], color: '#FFE03A' },
  { shape: [[1, 1, 1], [0, 1, 0]], color: '#9D71FF' },
  { shape: [[1, 1, 1], [1, 0, 0]], color: '#FF3FA4' },
  { shape: [[1, 1, 1], [0, 0, 1]], color: '#FF8C00' },
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#00FF64' },
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#FF5C8D' },
]

export default function TetrisWindow({ notify }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const notifyRef = useRef(notify)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [running, setRunning] = useState(false)
  notifyRef.current = notify

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    const game = { board: [], piece: null, lines: 0, score: 0, level: 1, timer: null, running: false }
    gameRef.current = game

    function spawnPiece() {
      const piece = pieces[Math.floor(Math.random() * pieces.length)]
      game.piece = { shape: piece.shape.map(row => [...row]), color: piece.color, x: Math.floor(columns / 2) - Math.floor(piece.shape[0].length / 2), y: 0 }
      if (collides()) {
        stop()
        notifyRef.current('🟦', 'Game over!', `Score: ${game.score}. Probeer opnieuw!`)
      }
    }

    function collides(dx = 0, dy = 0, shape = game.piece?.shape) {
      if (!game.piece) return false
      for (let row = 0; row < shape.length; row++) {
        for (let column = 0; column < shape[row].length; column++) {
          if (!shape[row][column]) continue
          const x = game.piece.x + column + dx
          const y = game.piece.y + row + dy
          if (x < 0 || x >= columns || y >= rows || (y >= 0 && game.board[y][x])) return true
        }
      }
      return false
    }

    function draw() {
      context.fillStyle = '#000'
      context.fillRect(0, 0, columns * cellSize, rows * cellSize)
      game.board.forEach((row, y) => row.forEach((color, x) => {
        if (color) { context.fillStyle = color; context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2) }
      }))
      if (game.piece) game.piece.shape.forEach((row, y) => row.forEach((value, x) => {
        if (value) { context.fillStyle = game.piece.color; context.fillRect((game.piece.x + x) * cellSize + 1, (game.piece.y + y) * cellSize + 1, cellSize - 2, cellSize - 2) }
      }))
      context.strokeStyle = 'rgba(255,63,164,.06)'
      for (let x = 0; x <= columns; x++) { context.beginPath(); context.moveTo(x * cellSize, 0); context.lineTo(x * cellSize, rows * cellSize); context.stroke() }
      for (let y = 0; y <= rows; y++) { context.beginPath(); context.moveTo(0, y * cellSize); context.lineTo(columns * cellSize, y * cellSize); context.stroke() }
    }

    function clearLines() {
      let cleared = 0
      for (let y = rows - 1; y >= 0; y--) {
        if (game.board[y].every(Boolean)) { game.board.splice(y, 1); game.board.unshift(Array(columns).fill(0)); cleared++; y++ }
      }
      if (cleared) {
        game.lines += cleared
        game.score += cleared * 100 * game.level
        if (game.lines >= game.level * 5) game.level++
        setScore(game.score)
        setLevel(game.level)
      }
    }

    function tick() {
      if (!game.running) return
      if (!collides(0, 1)) game.piece.y++
      else {
        game.piece.shape.forEach((row, rowIndex) => row.forEach((value, columnIndex) => {
          if (value && game.piece.y + rowIndex >= 0) game.board[game.piece.y + rowIndex][game.piece.x + columnIndex] = game.piece.color
        }))
        clearLines()
        spawnPiece()
      }
      draw()
    }

    function stop() {
      game.running = false
      window.clearInterval(game.timer)
      window.removeEventListener('keydown', onKeyDown)
      setRunning(false)
    }

    function onKeyDown(event) {
      if (!game.running || !game.piece) return
      if (event.key === 'ArrowLeft' && !collides(-1, 0)) game.piece.x--
      else if (event.key === 'ArrowRight' && !collides(1, 0)) game.piece.x++
      else if (event.key === 'ArrowDown' && !collides(0, 1)) game.piece.y++
      else if (event.key === 'ArrowUp') {
        const shape = game.piece.shape[0].map((_, index) => game.piece.shape.map(row => row[index]).reverse())
        if (!collides(0, 0, shape)) game.piece.shape = shape
      } else return
      event.preventDefault()
      draw()
    }

    game.start = () => {
      game.board = Array.from({ length: rows }, () => Array(columns).fill(0))
      game.lines = 0
      game.score = 0
      game.level = 1
      setScore(0)
      setLevel(1)
      game.running = true
      setRunning(true)
      spawnPiece()
      window.clearInterval(game.timer)
      game.timer = window.setInterval(tick, 500)
      window.removeEventListener('keydown', onKeyDown)
      window.addEventListener('keydown', onKeyDown)
      draw()
    }
    game.stop = stop
    function startFromTerminal() { game.start() }
    window.addEventListener('os:start-tetris', startFromTerminal)
    draw()

    return () => {
      stop()
      window.removeEventListener('os:start-tetris', startFromTerminal)
      gameRef.current = null
    }
  }, [])
  function start() { gameRef.current?.start() }
  function stop() { gameRef.current?.stop() }

  return (
    <div className="tetris-content">
      <canvas ref={canvasRef} width={columns * cellSize} height={rows * cellSize} aria-label="Tetris speelveld" />
      <div className="game-score">Score: <span>{score}</span> · Level: <span>{level}</span></div>
      <div className="game-controls"><button className="game-btn" onClick={start} disabled={running}>▶ Start</button><button className="game-btn" onClick={stop} disabled={!running}>■ Stop</button></div>
      <div className="game-hint">← → bewegen · ↑ roteren · ↓ sneller</div>
    </div>
  )
}
