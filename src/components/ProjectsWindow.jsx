import './ProjectsWindow.css'

const projects = [
  { title: 'GitHub · NetBeck22', description: 'Mijn openbare code, experimenten en projecten: van interactieve webapps tot C++ en onderzoek met Python.', links: [['Alle repositories →', 'https://github.com/NetBeck22?tab=repositories']] },
  { title: '🔍 CLASSIFIED', year: '2026', description: 'Immersieve installatie over algoritmische profilering. Een fictief dossier maakt databewustzijn voelbaar. Gebouwd met HTML, CSS, JavaScript, Canvas en Web Audio.', links: [['Ervaar het →', 'https://netbeck22.github.io/CLASSIFIED/classified.html'], ['GitHub →', 'https://github.com/NetBeck22/CLASSIFIED']] },
  { title: '🎭 This Is Not A Birthday Party', year: '2025', description: 'Murder mystery dinner voor mijn verjaardag. AI-gegenereerde personages, cinematic trailer, atmospheric website. Een volledige immersive experience voor vrienden.', links: [['Enter the world →', 'https://netbeck22.github.io/ThisIsNotABirthdayParty/'], ['GitHub →', 'https://github.com/NetBeck22/ThisIsNotABirthdayParty']] },
  { title: 'Robot Simulator', description: 'Educatieve browsergame waarin je een robot programmeert met Blockly. Met levels, lussen, variabelen, voorwaarden en een stapsgewijze debugger. JavaScript, HTML en CSS.', links: [['Speel de simulator →', 'https://netbeck22.github.io/robot-simulator/App/robot.html'], ['GitHub →', 'https://github.com/NetBeck22/robot-simulator']] },
  { title: 'Koningsburcht', description: 'Bordspel voor twee spelers als desktopapp in C++17 en Qt Widgets. Objectgeoriënteerde spelregels, een grafische interface en JSON-speldata, met UML-klassendiagram.', links: [['Bekijk op GitHub →', 'https://github.com/NetBeck22/Koningsburcht']] },
  { title: 'MPLang → MPNN', description: 'Bachelorproef over de vertaling van MPLang-expressies naar Message Passing Neural Networks. Onderzoeksprototype met Python en NumPy rond grafen, neurale netwerken en algoritmen.', links: [['Code, thesis & poster →', 'https://github.com/NetBeck22/MPLang-to-MPNN-Translation']] },
  { title: '🫆 De zatte mol', status: 'In wording!', description: 'De mol voor het vriendinnenweekend. Een webapp die alles beschikbaar stelt om de mol te spelen op ons weekend en leuke opdrachten aankondigt.' },
  { title: '💼 Client Website', year: '2025', status: 'Confidentieel ✦', description: 'Freelance website gebouwd voor een bedrijf. Solo, op deadline, van concept tot deployment. Eerste zelfstandig geleverd klantproject.' },
  { title: '🎃 Halloween Escape Room', year: '2018', status: 'IRL legend ✦', description: 'Volledige escape room op de zolder gebouwd. 1.5u video met sprekende katten als gids. Vrienden spreken er nu nog over. Op 16 jaar oud.' },
]

export default function ProjectsWindow() {
  return (
    <div className="proj-list">
      {projects.map(project => (
        <article className="proj-item" key={project.title}>
          <div className="proj-item-header"><div className="proj-item-title">{project.title}</div>{project.year && <div className="proj-item-year">{project.year}</div>}</div>
          <p className="proj-item-desc">{project.description}</p>
          {project.status && <span className="proj-status">{project.status}</span>}
          {project.links?.map(([label, href]) => <a className="proj-item-link" href={href} target="_blank" rel="noreferrer" key={href}>{label}</a>)}
        </article>
      ))}
    </div>
  )
}
