'use client'

import { useState } from 'react'
import Link from 'next/link'
import { weekEvents, closedDays, ClosedDay, WeekEvents } from '@/lib/data'

function getISOWeek(date: Date): { week: number; year: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return {
    week: Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7),
    year: d.getUTCFullYear(),
  }
}

function getWeekDateRange(week: number, year: number): { start: Date; end: Date } {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (week - 1) * 7)
  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)
  return { start: monday, end: sunday }
}

function getClosedDaysForWeek(week: number, year: number): ClosedDay[] {
  const { start, end } = getWeekDateRange(week, year)
  return closedDays.filter((d) => {
    const date = new Date(d.date + 'T00:00:00Z')
    return date >= start && date <= end
  })
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`
}

function addWeeks(base: { week: number; year: number }, offset: number): { week: number; year: number } {
  let { week, year } = base
  week += offset
  while (week > 52) {
    const dec28 = new Date(year, 11, 28)
    const weeksInYear = getISOWeek(dec28).week
    if (week > weeksInYear) { week -= weeksInYear; year++ } else break
  }
  while (week < 1) {
    year--
    const dec28 = new Date(year, 11, 28)
    week += getISOWeek(dec28).week
  }
  return { week, year }
}

function findEvents(week: number, year: number): WeekEvents | undefined {
  return weekEvents.find((e) => e.week === week && e.year === year)
}

const WEEKS_PER_PAGE = 4

export default function WeeklyEvents() {
  const [page, setPage] = useState(0)
  const base = getISOWeek(new Date())

  const weeks = Array.from({ length: WEEKS_PER_PAGE }, (_, i) =>
    addWeeks(base, page * WEEKS_PER_PAGE + i)
  )

  return (
    <section className="mt-12">
      <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-semibold text-white mb-2">
        Kommande <span className="text-[#C7B39A]">events</span>
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        Röda dagar och helgdagar kan påverka öppettider.{' '}
        <Link href="/schema" className="text-[#C7B39A] hover:underline">
          Se schemat för detaljer →
        </Link>
      </p>

      <div className="flex flex-col gap-4">
        {weeks.map(({ week, year }) => {
          const entry = findEvents(week, year)
          const closed = getClosedDaysForWeek(week, year)

          return (
            <div key={`${year}-${week}`} className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">
                Vecka {week} · {year}
              </p>

              {/* Closed days */}
              {closed.length > 0 && (
                <div className="flex flex-col gap-1 mb-3">
                  {closed.map((cd) => (
                    <div key={cd.date} className="flex items-center gap-2">
                      <span className="text-red-400 text-xs">🔴</span>
                      <span className="text-sm text-red-300 font-semibold">
                        {formatDate(cd.date)} – {cd.name}
                      </span>
                      {cd.note && (
                        <span className="text-xs text-gray-500">({cd.note})</span>
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-1">Stängt i hallen dessa dagar</p>
                </div>
              )}

              {/* Special events */}
              {entry ? (
                <div className="flex flex-col gap-3">
                  {entry.events.map((ev, i) => (
                    <div key={i}>
                      {ev.url ? (
                        <a href={ev.url} target="_blank" rel="noopener noreferrer" className="group">
                          <p className="font-[family-name:var(--font-oswald)] text-lg font-semibold text-[#C7B39A] group-hover:underline">
                            {ev.title} →
                          </p>
                          {ev.description && (
                            <p className="text-sm text-gray-400 mt-0.5">{ev.description}</p>
                          )}
                        </a>
                      ) : (
                        <div>
                          <p className="font-[family-name:var(--font-oswald)] text-lg font-semibold text-white">
                            {ev.title}
                          </p>
                          {ev.description && (
                            <p className="text-sm text-gray-400 mt-0.5">{ev.description}</p>
                          )}
                        </div>
                      )}
                      {ev.noRegularClasses && (
                        <p className="text-xs text-green-400 mt-1">
                          ✓ Inga ordinarie klasser – passa på att köra i hallen ostört under öppettider!
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : closed.length === 0 ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Inga unika händelser</p>
                  <Link href="/schema" className="text-sm text-[#C7B39A] hover:underline">
                    Se veckoschemat →
                  </Link>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="text-sm text-[#C7B39A] disabled:text-gray-600 disabled:cursor-not-allowed px-3 py-1"
        >
          ← Tidigare
        </button>
        <span className="text-xs text-gray-500">
          Vecka {weeks[0].week}–{weeks[WEEKS_PER_PAGE - 1].week}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="text-sm text-[#C7B39A] px-3 py-1"
        >
          Senare →
        </button>
      </div>
    </section>
  )
}
