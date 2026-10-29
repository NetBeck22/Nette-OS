import './WindowFrame.css'

export default function WindowFrame({
  id,
  title,
  open,
  minimized,
  maximized,
  focused,
  position,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}) {
  function startDrag(event) {
    if (event.target.closest('button')) return
    const bounds = event.currentTarget.parentElement.getBoundingClientRect()
    const offsetX = event.clientX - bounds.left
    const offsetY = event.clientY - bounds.top

    function move(moveEvent) {
      onMove(id, {
        left: Math.max(0, moveEvent.clientX - offsetX),
        top: Math.max(0, Math.min(window.innerHeight - 52, moveEvent.clientY - offsetY)),
      })
    }

    function stop() {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerup', stop)
    }

    document.addEventListener('pointermove', move)
    document.addEventListener('pointerup', stop, { once: true })
    event.preventDefault()
  }

  return (
    <section
      id={`win-${id}`}
      className={`window${open && !minimized ? ' open' : ''}${focused ? ' focused' : ''}${maximized ? ' maximized' : ''}`}
      style={{ left: position.left, top: position.top, zIndex }}
      onPointerDown={() => onFocus(id)}
      aria-hidden={!open || minimized}
    >
      <header className="win-titlebar" onPointerDown={startDrag}>
        <div className="win-dots">
          <button className="win-dot close" type="button" title="Sluiten" aria-label={`${title} sluiten`} onClick={() => onClose(id)} />
          <button className="win-dot min" type="button" title="Minimaliseren" aria-label={`${title} minimaliseren`} onClick={() => onMinimize(id)} />
          <button className="win-dot max" type="button" title="Volledig scherm" aria-label={`${title} maximaliseren`} onClick={() => onMaximize(id)} />
        </div>
        <div className="win-title">{title}</div>
      </header>
      <div className="win-body">{children}</div>
    </section>
  )
}
