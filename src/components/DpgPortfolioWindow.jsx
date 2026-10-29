import thxGif from '../../thx-car-720.gif'
import trackerImage from '../../tracker.png'
import './DpgPortfolioWindow.css'

const cases = [
  { type: 'CAMPAIGN EXPERIENCE', title: 'Qmusic NL Top 40', description: 'Een verjaardagscadeau voor alle luisteraars: ontdek welke nummers uit de Qmusic Top 40 op jouw speciale verjaardagen stonden.', wide: true, link: ['Ontdek jouw verjaardagsnummers ↗', 'https://qmusic-birthday-top-40.pages.dev/'] },
  { type: 'WEB COMPONENT', title: 'Thx to You — bedankenteller', description: 'Een herbruikbare bedankenteller als webcomponent, met embedpagina, spreadsheetdata en een kaart voor de campagne.', media: { src: thxGif, alt: 'Animatie voor de Thx to You-bedankenteller', label: 'GIF-ANIMATIE' } },
  { type: 'INTERACTIVE MAP', title: 'Location Tracker', description: "Een interactieve kaart met custom pins, bezochte locaties, campagnethema's en automatisch hercentreren.", media: { src: trackerImage, alt: 'Thx to You Tour Location Tracker met routekaart en campagnemarker' } },
  { type: 'INVITATION / VIDEO', title: 'Qmusic Highlights — uitnodiging', description: 'Een mobile-first campagnepagina met uitnodigingsvideo, responsive layout en datalayer-events.', link: ['Open de uitnodiging ↗', 'https://qmusic-highlights-invitation-2026.pages.dev/'] },
  { type: 'GAME / BRANDING', title: 'Willy 1000 — Catch the Hit', description: 'Campagnestijl voor de game, met URL-herkenning, onboardingbeelden, vormgeving en feedbackmomenten.' },
  { type: 'CAMPAIGN TILES', title: 'Open Tab — radio-campagnes', description: 'Tiles en routes voor Q Highlights, Foute Party, Willy 1000 en een Qmusic-game, aangepast per campagne.', wide: true, tiles: [
    ['Qmusic Luchtballon Game', 'https://open-tab-tile.radio.dpgmedia.cloud/q_music_luchtballon_game'],
    ['Willy 1000', 'https://open-tab-tile.radio.dpgmedia.cloud/willy_1000'],
    ['Q Music Highlights', 'https://qmusic-highlights.open-tab-tile.pages.dev/qbe_highlights'],
    ['Q Music Highlights Route', 'https://qbe-highlights-route-tile.open-tab-tile.pages.dev/qmusic_highlights_route'],
  ] },
  { type: 'CAMPAIGN MEDIA', title: 'JOE FM Birthday 2026', description: 'Campagne-assets bijgewerkt met een nieuwe video en thumbnail voor JOE FM Birthday 2026.' },
  { type: 'RADIO PLATFORM', title: 'Radio Sites — member & profile', description: "Bijgedragen aan member- en profielpagina's, aanmeld- en authenticatiestromen, herbruikbare programmalijsten en campagnegerichte radio-interfaces." },
  { type: 'RADIO API', title: 'JOE FM — video-entry', description: 'De video-entry voor de JOE FM Birthday-campagne bijgewerkt in de radio-api.' },
  { type: 'RESPONSIVE UI', title: 'QNL — Sound Value', description: 'Responsive styling voor QNL-weergaven, met aandacht voor breedte en gebruik op mobiel.' },
  { type: 'DELIVERY / INTEGRATION', title: 'Campagne-lanceringen', description: 'Ondersteuning bij het aansluiten van campagne-ervaringen op hun live omgeving en embedroutes.' },
]

export default function DpgPortfolioWindow() {
  return (
    <div className="dpg-content">
      <header className="dpg-intro">
        <div><div className="dpg-eyebrow">DPG MEDIA / RADIO</div><h2>Van concept tot interactie.</h2><p>Een selectie van mijn bijdragen aan radio-, campagne- en productervaringen.</p></div>
        <div className="dpg-count">11<span>projecten</span></div>
      </header>
      <div className="dpg-case-grid">
        {cases.map(project => (
          <article className={`dpg-case${project.wide ? ' dpg-case-wide' : ''}`} key={project.title}>
            <div className="dpg-case-type">{project.type}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.link && <a className="dpg-case-link" href={project.link[1]} target="_blank" rel="noreferrer">{project.link[0]}</a>}
            {project.media?.label && <div className="dpg-animation-slot"><strong>{project.media.label}</strong><img src={project.media.src} alt={project.media.alt} loading="lazy" /></div>}
            {project.media && !project.media.label && <img className="dpg-case-image" src={project.media.src} alt={project.media.alt} loading="lazy" />}
            {project.tiles && <div className="dpg-tile-embeds">{project.tiles.map(([label, url]) => <div className="dpg-tile-preview" key={url}><div className="dpg-tile-label">{label}</div><iframe className="dpg-tile-frame" src={url} title={`${label} tile`} loading="lazy" /><a className="dpg-tile-link" href={url} target="_blank" rel="noreferrer">Open tile ↗</a></div>)}</div>}
          </article>
        ))}
      </div>
    </div>
  )
}
