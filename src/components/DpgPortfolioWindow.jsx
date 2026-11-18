import thxGif from '../../thx-car-720.gif'
import trackerImage from '../../tracker.png'
import './DpgPortfolioWindow.css'

const cases = [
  { type: 'CAMPAIGN EXPERIENCE', title: 'Qmusic NL Top 40', description: 'Een verjaardagscadeau voor alle luisteraars: een Instagram Story-achtige reeks met de nummer 1-hits uit de mijlpalen van jouw leven. Met introvideo, pauzeerbare slides, cassette-animaties, confetti, een deelbare samenvatting en een embed in de Qmusic-app.', wide: true, link: ['Ontdek jouw verjaardagsnummers ↗', 'https://hoera.qmusic.nl/'] },
  { type: 'WEB COMPONENT', title: 'Thx to You — bedankenteller', description: 'Een herbruikbare bedankenteller als webcomponent, met embedpagina, spreadsheetdata en een kaart voor de campagne.', media: { src: thxGif, alt: 'Animatie voor de Thx to You-bedankenteller', label: 'GIF-ANIMATIE' } },
  { type: 'INTERACTIVE MAP', title: 'Location Tracker', description: "Een interactieve kaart met custom pins, bezochte locaties, campagnethema's en automatisch hercentreren.", media: { src: trackerImage, alt: 'Thx to You Tour Location Tracker met routekaart en campagnemarker' } },
  { type: 'INVITATION / VIDEO', title: 'Qmusic Highlights — uitnodiging', description: 'Een mobile-first campagnepagina met uitnodigingsvideo, responsive layout en datalayer-events.', link: ['Open de uitnodiging ↗', 'https://qmusic-highlights-invitation-2026.pages.dev/'] },
  { type: 'CAMPAIGN DESIGN', title: 'Het Geluid 2026 — Qmusic BE', description: 'Het nieuwe Q-design voor Het Geluid 2026: een signupflow met theming, header en glow-titel, een mobiele bevestigingspopup en bijpassende styling in Sound Value en de Open Tab-tile.' },
  { type: 'CAMPAIGN TILES', title: 'Open Tab — radio-campagnes', description: 'Open Tab-tiles voor Qmusic, QNL en JOE: van Q Highlights, Het Geluid en Foute Party tot Willy 1000, Top 1500 Hoger Lager en Pakje van je Hart, telkens in de stijl van de campagne.', wide: true, tiles: [
    ['Qmusic Luchtballon Game', 'https://open-tab-tile.radio.dpgmedia.cloud/q_music_luchtballon_game'],
    ['Willy 1000', 'https://open-tab-tile.radio.dpgmedia.cloud/willy_1000'],
    ['Q Music Highlights', 'https://qmusic-highlights.open-tab-tile.pages.dev/qbe_highlights'],
    ['Q Music Highlights Route', 'https://qbe-highlights-route-tile.open-tab-tile.pages.dev/qmusic_highlights_route'],
    ['QNL Foute Party', 'https://open-tab-tile.radio.dpgmedia.cloud/qnl_foute_party'],
    ['Qmusic Het Geluid 2026', 'https://open-tab-tile.radio.dpgmedia.cloud/hetgeluid_be_2026'],
    ['QNL Top 1500 Hoger Lager', 'https://open-tab-tile.radio.dpgmedia.cloud/qnl_top1500_hoger_lager'],
    ['JOE Pakje van je Hart', 'https://pakje-van-je-hart-joe-be.open-tab-tile.pages.dev/pakje_van_je_hart'],
  ] },
  { type: 'GAME / BRANDING', title: 'Willy 1000 — Catch the Hit', description: 'Campagnestijl voor de game, met URL-herkenning, onboardingbeelden, vormgeving en feedbackmomenten.' },
  { type: 'CAMPAIGN MEDIA', title: 'JOE FM Birthday 2026', description: 'Campagne-assets bijgewerkt met een nieuwe video en thumbnail voor JOE FM Birthday 2026.' },
  { type: 'RADIO PLATFORM', title: 'Radio Sites', description: "Member- en profielpagina's met login- en signupflows, Q-nieuwsbriefpagina's voor QBE, een gedeelde programmalijst en hitlijstcomponent voor alle zenders, plus de vormgeving van de programmatie en dagwissel voor Willy en JOE." },
  { type: 'RADIO API', title: 'Verjaardagsberichten', description: 'Een nieuw QNL-verjaardagsbericht met knop naar de Top 40-tool en eerdere edities, mailcontrole en escaping, en de video-entry voor JOE FM Birthday.' },
  { type: 'RESPONSIVE UI', title: 'Sound Value', description: 'Responsive styling voor QNL en een nieuwe Q-layout voor Het Geluid 2026, met de juiste links en knopkleuren.' },
  { type: 'INFRA / DNS', title: 'Campagne-lanceringen', description: 'Campagnes live gezet via Terraform en Cloudflare: Pages-modules en DNS-records voor onder meer hoera.qmusic.nl, de Highlights-uitnodiging, de Thx to You-teller en -tracker en Catch the Hit voor Willy.' },
]

export default function DpgPortfolioWindow() {
  return (
    <div className="dpg-content">
      <header className="dpg-intro">
        <div><div className="dpg-eyebrow">DPG MEDIA / RADIO</div><h2>Van concept tot interactie.</h2><p>Een selectie van mijn bijdragen aan radio-, campagne- en productervaringen.</p></div>
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
