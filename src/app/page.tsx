import Link from 'next/link'
import { schedule } from '@/lib/data'
import ClassCard from '@/components/ClassCard'

function getTodaySchedule() {
  const dayIndex = new Date().getDay()
  const dayMap: Record<number, string> = {
    0: 'Måndag',
    1: 'Måndag',
    2: 'Tisdag',
    3: 'Onsdag',
    4: 'Torsdag',
    5: 'Fredag',
    6: 'Lördag',
  }
  const todayName = dayMap[dayIndex]
  return schedule.find((d) => d.day === todayName) ?? schedule[0]
}

function getTodayHours() {
  const dayIndex = new Date().getDay()
  if (dayIndex === 0) return { label: 'Söndag', hours: 'Stängt', open: false }
  if (dayIndex === 6) return { label: 'Lördag', hours: '12:00–18:00', open: true }
  return { label: 'Idag', hours: '15:00–21:00', open: true }
}

const quickLinks = [
  {
    label: 'Schema',
    description: 'Veckans klasser och tider',
    href: '/schema',
  },
  {
    label: 'Länkar, anmälan & events',
    description: 'Anmäl dig och bli medlem',
    href: '/lankar',
  },
  {
    label: 'Hitta hit',
    description: 'Adress, öppettider och kontakt',
    href: '/info',
  },
]

export default function Home() {
  const todaySchedule = getTodaySchedule()
  const todayHours = getTodayHours()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-widest mb-3">
          PARKOURHALL1
        </h1>
        <p className="text-[#C7B39A] text-xl md:text-2xl font-semibold mb-3">
          Quality Movement | Järfälla
        </p>
        <p className="text-gray-400 text-lg mb-8">
          Parkour, akrobatik och World Chase Tag för alla åldrar
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/schema"
            className="inline-block bg-[#C7B39A] hover:bg-[#b09a82] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Se Schema
          </Link>
          <a
            href="https://qualitymovement.se/parkourhall1-gymmedlemskap-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#C7B39A] text-[#C7B39A] hover:bg-[#b09a82] hover:text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Bli Medlem
          </a>
        </div>
      </section>

      {/* Quick links */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((ql) => (
            <Link
              key={ql.href}
              href={ql.href}
              className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#C7B39A] transition-colors group"
            >
              <h2 className="font-[family-name:var(--font-oswald)] text-xl font-semibold text-white mb-1 group-hover:text-[#C7B39A] transition-colors">
                {ql.label}
              </h2>
              <p className="text-sm text-gray-400">{ql.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's classes */}
      <section>
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-semibold text-white mb-6">
          Dagens klasser –{' '}
          <span className="text-[#C7B39A]">{todaySchedule.day}</span>
        </h2>
        {todaySchedule.classes.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Inga klasser idag.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaySchedule.classes.map((cls, i) => (
              <ClassCard key={i} entry={cls} />
            ))}
          </div>
        )}
      </section>

      {/* Today's opening hours */}
      <section className="mt-8">
        <div className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">Öppettider idag</p>
            <p className="font-[family-name:var(--font-oswald)] text-xl font-semibold text-white">
              {todayHours.hours}
            </p>
          </div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${todayHours.open ? 'bg-green-800 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {todayHours.open ? 'Öppet' : 'Stängt'}
          </span>
        </div>
      </section>
    </div>
  )
}
