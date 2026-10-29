import './CvWindow.css'

const sections = [
  { title: 'Opleiding', rows: [['', 'Bachelor Informatica', 'UHasselt']] },
  { title: 'Werkervaring', rows: [
    ['jun 2026–heden', 'Fullstack Developer', 'DPG Media · radiovloer'],
    ['2026', 'Freelance Web Developer', 'Zelfstandig klantproject'],
    ['2025→...', 'Digitalisation & software improvement', 'Eureka, Leuven'],
    ['2024→2025', 'Leerkracht Informatica (secundair onderwijs)', 'Sint-Michiels Inst. Keerbergen'],
    ['2022→...', 'Coding Teacher (4+ jaar)', 'VZW CodeFever'],
    ['2021→2022', 'Developer (2 zomers)', 'Webfaster, Antwerpen'],
    ['2021→2022', 'Digital assistent', 'Boostways, Werchter'],
  ] },
  { title: 'Vrijwilligerswerk', rows: [
    ['2022→2024', 'Studentvertegenwoordiger Onderwijs Management Team', 'UHasselt'],
    ['2022→2023', 'Teammember', 'TEDxUHasselt'],
    ['2020→2021', 'Gedelegeerd bestuurder', 'Q-See · meest STEM-gericht 🏆'],
  ] },
]

export default function CvWindow() {
  return <div className="cv-content">{sections.map(section => <section className="cv-section" key={section.title}><h2 className="cv-section-title">{section.title}</h2>{section.rows.map(([year, role, company]) => <div className="cv-row" key={`${role}-${year}`}><span className="cv-year">{year}</span><div><div className="cv-role">{role}</div><div className="cv-company">{company}</div></div></div>)}</section>)}</div>
}
