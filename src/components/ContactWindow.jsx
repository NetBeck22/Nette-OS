import './ContactWindow.css'

const contacts = [
  ['✉️', 'Email', 'nette.beckers@gmail.com', 'mailto:nette.beckers@gmail.com'],
  ['📞', 'Telefoon', '+32 489 43 15 07', 'tel:+32489431507'],
  ['🐙', 'GitHub', 'github.com/netbeck22', 'https://github.com/NetBeck22'],
]

export default function ContactWindow() {
  return <div className="contact-content"><p className="contact-intro">Fullstack developer op de radiovloer bij DPG Media sinds juni 2026. Mijn code en persoonlijke projecten vind je op GitHub. Contact voor een uitwisseling of samenwerking? Stuur gerust een bericht.</p><div className="contact-list">{contacts.map(([icon, label, value, href]) => <a className="contact-item" href={href} key={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="contact-icon">{icon}</span><span><span className="contact-label">{label}</span><span className="contact-val">{value}</span></span></a>)}</div></div>
}
