import { Fragment } from 'react'

const Messages = ({ messages }) =>
  messages.map((message, index) => (
    <Fragment key={message}>
      {index > 0 && (
        <span aria-hidden="true" className="text-white/50">
          |
        </span>
      )}
      <span className="whitespace-nowrap">{message}</span>
    </Fragment>
  ))

const AnnouncementBar = ({ messages = [] }) => {
  if (!messages.length) return null

  return (
    <div className="flex h-9 items-center overflow-hidden bg-brand font-display text-xs tracking-wider text-white sm:text-sm">
      <p className="sr-only md:hidden motion-reduce:hidden">{messages.join('. ')}</p>

      <p className="page-container hidden items-center justify-center gap-3 truncate md:flex motion-reduce:flex">
        <Messages messages={messages} />
      </p>

      <div
        aria-hidden="true"
        className="flex w-max animate-marquee hover:[animation-play-state:paused] md:hidden motion-reduce:hidden"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex min-w-screen shrink-0 items-center justify-around gap-6 px-3">
            <Messages messages={messages} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar
