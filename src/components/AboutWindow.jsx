import './AboutWindow.css'

const skills = [
  'HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'SQL',
  'Python & NumPy', 'C++ & Qt Widgets', 'Git & GitHub', 'Blockly', 'Canvas',
  'Web Audio API', 'OOP & UML', 'GNN & MPNN', 'Debugging', 'AI tools',
  'Immersive design', 'Game development', 'Programmeeronderwijs',
]

export default function AboutWindow() {
  return (
    <div className="about-content">
      <div className="about-profile">
        <div className="about-avatar">👩‍💻</div>
        <div>
          <div className="about-name">Nette Beckers</div>
          <div className="about-role">Fullstack & Creative Developer · België</div>
        </div>
      </div>
      <div className="about-bio">
        <p>Ik bouw <strong>dingen die mensen bijblijven</strong>. Geen standaard webapps. <em>Immersive experiences</em> die mensen laten voelen wat ze normaal niet zien.</p>
        <p>Sinds <strong>juni 2026</strong> werk ik als <em>fullstack developer bij DPG Media</em>, op de <strong>radiovloer</strong>.</p>
        <p>Daarnaast bouw ik creatieve en technische projecten: van <strong>CLASSIFIED</strong>, een fictieve profileringsinstallatie over databewustzijn, tot een <strong>murder mystery dinner</strong>, een <strong>Blockly-robotsimulator</strong> en onderzoek naar <strong>Graph Neural Networks</strong>.</p>
        <p>Buiten code: <strong>Tetris</strong> tot mijn ogen pijn doen en <strong>sudoku's</strong> oplossen. Patroondenken is mijn factory mode.</p>
      </div>
      <div className="about-tags">{skills.map(skill => <span className="about-tag" key={skill}>{skill}</span>)}</div>
      <a href="https://github.com/NetBeck22" target="_blank" rel="noreferrer" className="proj-item-link">Bekijk mijn GitHub →</a>
    </div>
  )
}
