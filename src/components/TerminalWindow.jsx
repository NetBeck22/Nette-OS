import { useEffect, useRef, useState } from 'react'
import './TerminalWindow.css'

const adventure = [
  { lines: ['⚔️ NETTE’S ADVENTURE — een mini RPG', '', 'Je bent een recruiter bij DPG Media.', 'Je opent je inbox. Er zit een portfoliolink in.', 'De site is... een besturingssysteem?', '', 'Wat doe je? Typ a of b.'], choices: { a: 1, b: 'rejected' } },
  { lines: ['Je opent de site. Een OS laadt op.', 'Er zit een werkend Tetris-spel in.', 'Je speelt 5 minuten Tetris.', '', 'Wat doe je daarna? Typ a of b.'], choices: { a: 2, b: 'tetris' } },
  { lines: ['Je leest het CV. Vier jaar CodeFever.', 'Escape room gebouwd op 16. Murder mystery game.', 'Freelance website. Creatieve softwareprojecten.', '', 'Wat doe je? Typ a of b.'], choices: { a: 'hired', b: 3 } },
  { lines: ['Je slaapt een nacht.', 'Volgende dag: een concurrent heeft Nette aangenomen.', 'GAME OVER — te traag. Typ adventure om opnieuw te proberen.'], choices: {} },
]

const endings = {
  rejected: ['Je negeert de mail.', 'GAME OVER. Je mist een creatieve developer.', 'Typ adventure om opnieuw te proberen.'],
  tetris: ['Je speelt nog twintig minuten Tetris.', 'Score: 4820. Persoonlijk record!', 'Maar je vergeet te mailen.', 'GAME OVER — Tetris gewonnen, job verloren.'],
  hired: ['🎉 JE HEBT NETTE AANGENOMEN! 🎉', 'Jullie bouwen nu samen de coolste radio-experiences van België.', '→ nette.beckers@gmail.com'],
}

const commandOutput = {
  help: ['NETTE OS — COMMANDO’S', 'whoami · skills · projects · contact · github', 'play · joke · adventure · hire · sudo hire · secret · clear'],
  whoami: ['Naam: Nette Beckers', 'Rol: Fullstack & Creative Developer', 'Locatie: Tremelo → Leuven, België', 'Werk: DPG Media · radiovloer · sinds juni 2026', 'GitHub: github.com/NetBeck22'],
  skills: ['FRONTEND: HTML · CSS · JavaScript · TypeScript · React · Next.js', 'CREATIEF: Canvas · Web Audio API · Blockly · game development', 'SOFTWARE: C++17 · Qt · OOP · UML · JSON · Git', 'ONDERZOEK: Python · NumPy · GNN · MPNN', 'EDUCATIEF: AI tools · programmeeronderwijs · debugging'],
  projects: ['CLASSIFIED · interactieve installatie rond databewustzijn', 'This Is Not A Birthday Party · murder mystery experience', 'Robot Simulator · browsergame met Blockly', 'Koningsburcht · C++17 en Qt Widgets', 'MPLang → MPNN · Python en NumPy'],
  contact: ['✉ nette.beckers@gmail.com', '☎ +32 489 43 15 07', 'Fullstack developer bij DPG Media · radiovloer'],
  github: ['Mijn repositories: github.com/NetBeck22'],
  secret: ['🎃 JE VOND HET GEHEIM 🎃', 'Nette bouwt al lang spelletjes op haar kamer.', '“Dat is niet een project. Dat is een obsessie.”'],
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

export default function TerminalWindow({ openWindow, notify, onPlay, onHire }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [adventureStep, setAdventureStep] = useState(-1)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setLines(['NETTE OS v2.2 — Terminal', 'Typ help voor alle commando’s.', 'Typ adventure voor een verrassing.', ''])
  }, [])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines])

  function execute(rawCommand) {
    const command = rawCommand.trim().toLowerCase()
    if (!command) return
    setHistory(current => [command, ...current])
    setHistoryIndex(-1)
    setLines(current => [...current, `<span class="terminal-prompt">nette@os:~$</span> ${escapeHtml(command)}`])

    if (adventureStep >= 0) {
      const next = adventure[adventureStep]?.choices[command]
      if (next === undefined) {
        setLines(current => [...current, 'Kies a of b.'])
      } else if (typeof next === 'string') {
        setLines(current => [...current, ...(endings[next] || [])])
        setAdventureStep(-1)
      } else {
        setAdventureStep(next)
        setLines(current => [...current, ...adventure[next].lines])
        if (Object.keys(adventure[next].choices).length === 0) setAdventureStep(-1)
      }
      return
    }

    if (command === 'clear') {
      setLines([])
    } else if (command === 'adventure') {
      setAdventureStep(0)
      setLines(current => [...current, ...adventure[0].lines])
    } else if (command === 'play') {
      openWindow('game')
      onPlay()
      setLines(current => [...current, '🟦 Tetris geopend! ← → bewegen, ↑ roteren, ↓ sneller'])
    } else if (command === 'hire' || command === 'sudo hire') {
      onHire(); notify('🎉', 'Confetti!', 'Nette staat open voor creatieve projecten.')
      setLines(current => [...current, 'Fullstack & Creative Developer', 'DPG Media · radiovloer · sinds juni 2026', '→ nette.beckers@gmail.com'])
    } else if (command === 'joke') {
      const jokes = ['Waarom werken programmeurs met een nachtlamp? Omdat ze bang zijn van dark mode.', 'Hoeveel programmeurs heb je nodig om een lamp te vervangen? Geen. Dat is een hardwareprobleem.', 'Een QA engineer loopt een bar binnen. Bestelt nul bier, 99 bier en -1 bier. Bar explodeert.']
      setLines(current => [...current, jokes[Math.floor(Math.random() * jokes.length)]])
    } else if (commandOutput[command]) {
      setLines(current => [...current, ...commandOutput[command]])
    } else {
      setLines(current => [...current, `commando niet gevonden: '${escapeHtml(command)}' — probeer help`])
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      execute(input)
      setInput('')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex] || '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setInput(nextIndex < 0 ? '' : history[nextIndex] || '')
    }
  }

  return (
    <div className="terminal-content" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef}>
        {lines.map((line, index) => <div key={`${index}-${line}`} dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />)}
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">nette@os:~$</span>
        <input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="typ 'help'..." autoComplete="off" spellCheck="false" />
        <span className="terminal-caret" />
      </div>
    </div>
  )
}
