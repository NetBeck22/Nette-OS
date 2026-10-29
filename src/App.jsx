import { useEffect, useRef, useState } from 'react'
import WindowFrame from './components/WindowFrame.jsx'
import AboutWindow from './components/AboutWindow.jsx'
import ProjectsWindow from './components/ProjectsWindow.jsx'
import DpgPortfolioWindow from './components/DpgPortfolioWindow.jsx'
import TerminalWindow from './components/TerminalWindow.jsx'
import CvWindow from './components/CvWindow.jsx'
import TetrisWindow from './components/TetrisWindow.jsx'
import ContactWindow from './components/ContactWindow.jsx'
import ConfettiCanvas from './components/ConfettiCanvas.jsx'

const windowDefinitions = [
  { id: 'about', title: 'Over Nette — README.md', initial: { left: 80, top: 80 }, Content: AboutWindow },
  { id: 'projects', title: 'Projecten — /work', initial: { left: 180, top: 60 }, Content: ProjectsWindow },
  { id: 'dpg', title: 'DPG Media — /work', initial: { left: 220, top: 48 }, Content: DpgPortfolioWindow },
  { id: 'terminal', title: 'Terminal — nette@nette-os', initial: { left: 300, top: 120 }, Content: TerminalWindow },
  { id: 'cv', title: 'CV — Nette Beckers.pdf', initial: { left: 160, top: 100 }, Content: CvWindow },
  { id: 'game', title: "Tetris.exe — Nette's fav game", initial: { left: 300, top: 80 }, Content: TetrisWindow },
  { id: 'contact', title: 'Contact — nette.beckers', initial: { left: 250, top: 200 }, Content: ContactWindow },
]

const taskbarApps = [
  ['about', '👩‍💻', 'Over Nette'],
  ['projects', '🗂️', 'Projecten'],
  ['dpg', '📻', 'DPG Media'],
  ['cv', '📄', 'CV'],
  ['game', '🟦', 'Tetris'],
  ['terminal', '💻', 'Terminal'],
  ['contact', '📬', 'Contact'],
]

export default function App() {
  const [booting, setBooting] = useState(true)
  const [windows, setWindows] = useState({})
  const zTop = useRef(200)
  const [clock, setClock] = useState(new Date())
  const [notification, setNotification] = useState(null)
  const [confettiVersion, setConfettiVersion] = useState(0)
  const [screensaver, setScreensaver] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0, hovering: false })

  function openWindow(id) {
    zTop.current += 1
    setWindows(current => Object.fromEntries([...Object.entries(current).map(([key, state]) => [key, { ...state, focused: key === id }]), [id, { ...current[id], open: true, minimized: false, focused: true, zIndex: zTop.current }]]))
  }

  function focusWindow(id) {
    zTop.current += 1
    setWindows(current => {
      const next = Object.fromEntries(Object.entries(current).map(([key, state]) => [key, { ...state, focused: key === id, zIndex: key === id ? zTop.current : state.zIndex }]))
      next[id] = { ...next[id], open: true, minimized: false, focused: true }
      return next
    })
  }

  function closeWindow(id) {
    setWindows(current => ({ ...current, [id]: { ...current[id], open: false, minimized: false, focused: false } }))
  }

  function minimizeWindow(id) {
    setWindows(current => ({ ...current, [id]: { ...current[id], open: true, minimized: true, focused: false } }))
  }

  function maximizeWindow(id) {
    setWindows(current => ({ ...current, [id]: { ...current[id], maximized: !current[id]?.maximized } }))
  }

  function moveWindow(id, position) {
    setWindows(current => ({ ...current, [id]: { ...current[id], position } }))
  }

  function toggleTaskbar(id) {
    const state = windows[id]
    if (!state?.open || state.minimized) {
      openWindow(id)
    } else if (state.focused) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  function showNotification(icon, title, message) {
    setNotification({ icon, title, message })
    window.setTimeout(() => setNotification(null), 4000)
  }

  function fireConfetti() {
    setConfettiVersion(version => version + 1)
  }

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 10000)
    const boot = window.setTimeout(() => {
      setBooting(false)
      openWindow('about')
      window.setTimeout(() => openWindow('projects'), 300)
      showNotification('👋', 'Welkom!', 'Klik een icoon of gebruik de taakbalk.')
    }, 3800)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(boot)
    }
  }, [])

  useEffect(() => {
    function moveCursor(event) {
      const isHovering = Boolean(event.target.closest('a,button,.tb-app,.tb-start,.desktop-icon,.proj-item,.dpg-case,.contact-item,.about-tag'))
      setCursor({ x: event.clientX, y: event.clientY, hovering: isHovering })
    }
    document.addEventListener('pointermove', moveCursor)
    return () => document.removeEventListener('pointermove', moveCursor)
  }, [])

  function launchExternal(url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div id="cur" className={cursor.hovering ? 'hovering' : ''} style={{ left: cursor.x, top: cursor.y }} />
      {booting && <BootScreen />}
      <div id="desktop">
        <div className="wallpaper"><div className="wallpaper-grid" /></div>
        <button className="desktop-icon" style={{ top: 80, left: 24 }} onClick={() => openWindow('about')}><span className="di-emoji">👩‍💻</span><span className="di-label">Over Nette</span></button>
        <button className="desktop-icon" style={{ top: 180, left: 24 }} onClick={() => openWindow('projects')}><span className="di-emoji">🗂️</span><span className="di-label">Projecten</span></button>
        <button className="desktop-icon" style={{ top: 380, left: 24 }} onClick={() => openWindow('cv')}><span className="di-emoji">📄</span><span className="di-label">CV.pdf</span></button>
        <button className="desktop-icon" style={{ top: 280, left: 24 }} onClick={() => openWindow('game')}><span className="di-emoji">🟦</span><span className="di-label">Tetris.exe</span></button>
        <button className="desktop-icon" style={{ top: 80, left: 108 }} onClick={() => openWindow('terminal')}><span className="di-emoji">💻</span><span className="di-label">Terminal</span></button>
        <button className="desktop-icon" style={{ top: 180, left: 108 }} onClick={() => openWindow('contact')}><span className="di-emoji">📬</span><span className="di-label">Contact</span></button>
        <button className="desktop-icon" style={{ top: 280, left: 108 }} onClick={() => launchExternal('https://netbeck22.github.io/CLASSIFIED/classified.html')}><span className="di-emoji">🔍</span><span className="di-label">CLASSIFIED</span></button>
        <button className="desktop-icon" style={{ top: 380, left: 108 }} onClick={() => launchExternal('https://netbeck22.github.io/ThisIsNotABirthdayParty/')}><span className="di-emoji">🎭</span><span className="di-label">Birthday Party</span></button>
        <button className="desktop-icon" style={{ top: 480, left: 108 }} onClick={() => launchExternal('https://github.com/NetBeck22')}><span className="di-emoji">💻</span><span className="di-label">GitHub</span></button>
        <button className="desktop-icon" style={{ top: 480, left: 24 }} onClick={() => openWindow('dpg')}><span className="di-emoji">📻</span><span className="di-label">DPG Media</span></button>
      </div>
      <Taskbar apps={taskbarApps} windows={windows} clock={clock} openWindow={openWindow} toggleWindow={toggleTaskbar} openScreensaver={() => setScreensaver(true)} />
      {windowDefinitions.map(({ id, title, initial, Content }) => {
        const state = windows[id] || {}
        return (
          <WindowFrame
            key={id}
            id={id}
            title={title}
            open={state.open}
            minimized={state.minimized}
            maximized={state.maximized}
            focused={state.focused}
            position={state.position || initial}
            zIndex={state.zIndex || 100}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          >
            <Content openWindow={openWindow} notify={showNotification} onPlay={() => window.dispatchEvent(new Event('os:start-tetris'))} onHire={fireConfetti} />
          </WindowFrame>
        )
      })}
      {screensaver && <Screensaver onClose={() => setScreensaver(false)} />}
      {confettiVersion > 0 && <ConfettiCanvas key={confettiVersion} />}
      {notification && <div className="notif show"><span className="notif-icon">{notification.icon}</span><div className="notif-text"><strong>{notification.title}</strong>{notification.message}</div></div>}
    </>
  )
}

function BootScreen() {
  const lines = ['> Initializing NETTE OS...', '> Loading creative modules...', '> Mounting experience_engine.js ✓', '> Connecting to dpg_radio.api ✓', '> Importing 4yr_codefever.log ✓', '> Boot complete. Welcome. 🎉']
  const [visible, setVisible] = useState([])

  useEffect(() => {
    const timers = lines.map((_, index) => window.setTimeout(() => setVisible(current => [...current, lines[index]]), 1100 + index * 320))
    return () => timers.forEach(window.clearTimeout)
  }, [])

  return <div id="boot" className="boot-screen"><div className="boot-logo">NETTE OS</div><div className="boot-sub">v2.2 · Creative Developer Edition</div><div className="boot-bar-wrap"><div className="boot-bar" /></div><div className="boot-log">{visible.map(line => <div key={line}>{line}</div>)}</div></div>
}

function Taskbar({ apps, windows, clock, openWindow, toggleWindow, openScreensaver }) {
  const days = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
  const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
  const time = `${String(clock.getHours()).padStart(2, '0')}:${String(clock.getMinutes()).padStart(2, '0')}`

  return (
    <div id="taskbar">
      <button className="tb-start" onClick={() => openWindow('about')}>⌘ NETTE OS</button>
      <div className="tb-sep" />
      {apps.slice(0, 3).map(([id, icon, title]) => <TaskbarApp key={id} id={id} icon={icon} title={title} state={windows[id]} onClick={toggleWindow} />)}
      <div className="tb-sep" />
      {apps.slice(3).map(([id, icon, title]) => <TaskbarApp key={id} id={id} icon={icon} title={title} state={windows[id]} onClick={toggleWindow} />)}
      <div className="tb-sep" />
      <button className="tb-app" title="Screensaver" onClick={openScreensaver}>🌙</button>
      <div className="tb-clock"><span>{time}</span>{days[clock.getDay()]} {clock.getDate()} {months[clock.getMonth()]}</div>
    </div>
  )
}

function TaskbarApp({ id, icon, title, state, onClick }) {
  return <button className={`tb-app tb-min-btn${state?.open ? ' tb-win-open' : ''}${state?.minimized ? ' tb-win-minimized' : ''}`} data-id={id} title={title} onClick={() => onClick(id)}>{icon}</button>
}

function Screensaver({ onClose }) {
  const canvasRef = useRef(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles = Array.from({ length: 60 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: 1 + Math.random() * 3, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, hue: 290 + Math.random() * 80 }))
    let animationId

    function draw() {
      context.fillStyle = 'rgba(0,0,0,.15)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        context.beginPath()
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fillStyle = `hsl(${particle.hue},80%,60%)`
        context.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    draw()
    const clockTimer = window.setInterval(() => setTime(new Date()), 1000)
    return () => { cancelAnimationFrame(animationId); window.clearInterval(clockTimer) }
  }, [])

  return <div id="screensaver" onClick={onClose}><canvas ref={canvasRef} /><div className="screensaver-copy"><div className="screensaver-clock">{String(time.getHours()).padStart(2, '0')}:{String(time.getMinutes()).padStart(2, '0')}</div><div className="screensaver-date">Klik om te ontgrendelen</div><div className="screensaver-date">NETTE OS — Creative Developer Edition</div></div></div>
}
