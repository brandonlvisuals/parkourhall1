'use client'

import { useState } from 'react'
import { schedule, openingHours, closedDays, termEndDates } from '@/lib/data'
import ClassCard from '@/components/ClassCard'

// ISO week helpers
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

// Get Monday of a given ISO week
function getMondayOfWeek(week: number, year: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (week - 1) * 7)
  return monday
}

// Add weeks to an ISO week
function shiftWeek(week: number, year: number, delta: number): { week: number; year: number } {
  const monday = getMondayOfWeek(week, year)
  monday.setUTCDate(monday.getUTCDate() + delta * 7)
  return getISOWeek(monday)
}

// Get date for a specific day of an ISO week (0=Mon … 6=Sun)
function getDateOfWeekDay(week: number, year: number, dayOffset: number): Date {
  const monday = getMondayOfWeek(week, year)
  const d = new Date(monday)
  d.setUTCDate(monday.getUTCDate() + dayOffset)
  return d
}

function formatShort(date: Date): string {
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`
}

const DAYS = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']

function isClosedDate(date: Date): string | null {
  const iso = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
  const found = closedDays.find((d) => d.date === iso)
  return found ? found.name : null
}

export default function SchemaPage() {
  const today = new Date()
  const todayISO = getISOWeek(today)
  const [currentWeek, setCurrentWeek] = useState(todayISO)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(() => {
    const js = today.getDay() // 0=Sun
    return js === 0 ? 6 : js - 1 // convert to Mon=0
  })

  const selectedDayName = DAYS[selectedDayIndex]
  const daySchedule = schedule.find((d) => d.day === selectedDayName)
  const selectedDate = getDateOfWeekDay(currentWeek.week, currentWeek.year, selectedDayIndex)
  const closedReason = isClosedDate(selectedDate)

  // Check if selected date is after term end for this day
  const termEndStr = termEndDates[selectedDayName]
  const termEndDate = termEndStr ? new Date(termEndStr + 'T00:00:00Z') : null
  const selectedDateUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate()))
  const isAfterTermEnd = termEndDate ? selectedDateUTC > termEndDate : false
  const isTermEndDay = termEndDate
    ? selectedDateUTC.getTime() === termEndDate.getTime()
    : false

  const isCurrentWeek = currentWeek.week === todayISO.week && currentWeek.year === todayISO.year

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Header with week navigation */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold text-white">
          Schema
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentWeek((w) => shiftWeek(w.week, w.year, -1))}
            disabled={isCurrentWeek}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d1420] border border-[#1f1f1f] text-gray-300 hover:border-[#C7B39A] hover:text-[#C7B39A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-white min-w-[70px] text-center">
            Vecka {currentWeek.week}
          </span>
          <button
            onClick={() => setCurrentWeek((w) => shiftWeek(w.week, w.year, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0d1420] border border-[#1f1f1f] text-gray-300 hover:border-[#C7B39A] hover:text-[#C7B39A] transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Day tabs with dates */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DAYS.map((day, i) => {
          const date = getDateOfWeekDay(currentWeek.week, currentWeek.year, i)
          const closed = isClosedDate(date)
          const isActive = i === selectedDayIndex
          const isToday = isCurrentWeek && i === (today.getDay() === 0 ? 6 : today.getDay() - 1)
          const isSunday = i === 6

          return (
            <button
              key={day}
              onClick={() => setSelectedDayIndex(i)}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors border flex flex-col items-center ${
                isActive
                  ? 'bg-[#C7B39A] border-[#C7B39A] text-white'
                  : closed || isSunday
                  ? 'bg-[#0d1420] border-red-900/50 text-red-400 hover:border-red-400'
                  : 'bg-[#0d1420] border-[#1f1f1f] text-gray-300 hover:border-[#C7B39A] hover:text-[#C7B39A]'
              }`}
            >
              <span>{day}</span>
              <span className={`text-xs font-normal ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                {formatShort(date)}{isToday ? ' ·' : ''}
              </span>
            </button>
          )
        })}
      </div>

      {/* Closed day banner */}
      {closedReason && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-red-400 text-lg">🔴</span>
          <div>
            <p className="text-red-300 font-semibold">{closedReason} – Stängt</p>
            <p className="text-xs text-gray-400 mt-0.5">Hallen är stängd denna dag. Inga klasser.</p>
          </div>
        </div>
      )}

      {/* Open Gym card */}
      {!closedReason && selectedDayIndex !== 6 && (
        <a
          href="https://qualitymovement.se/parkourhall1-gymmedlemskap-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#0d1420] border border-[#B68D96]/50 rounded-xl p-4 mb-4 hover:border-[#B68D96] transition-colors duration-200 group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[#B68D96] font-bold text-sm mb-1">
                {selectedDayIndex <= 4 ? '15:00–21:00' : '12:00–18:00'}
              </p>
              <h3 className="font-[family-name:var(--font-oswald)] text-lg font-semibold text-white leading-tight mb-1">
                Open Gym
              </h3>
              <p className="text-sm text-gray-400">Öppet för dagsinträde, klippkort och medlemskap</p>
            </div>
            <div className="flex-shrink-0">
              <span className="text-xs text-[#B68D96] opacity-70">Mer info →</span>
            </div>
          </div>
        </a>
      )}

      {/* Term end banner */}
      {!closedReason && isTermEndDay && (
        <div className="bg-[#C7B39A]/10 border border-[#C7B39A]/40 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-lg">🎓</span>
          <div>
            <p className="text-[#C7B39A] font-semibold">Terminsavslutning</p>
            <p className="text-xs text-gray-400 mt-0.5">Sista lektionen för terminen denna dag.</p>
          </div>
        </div>
      )}

      {/* After term end banner */}
      {!closedReason && isAfterTermEnd && (
        <div className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-lg">📅</span>
          <div>
            <p className="text-white font-semibold">Terminen är slut för {selectedDayName}ar</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Sista lektionen var {termEndStr ? `${new Date(termEndStr + 'T00:00:00Z').getUTCDate()}/${new Date(termEndStr + 'T00:00:00Z').getUTCMonth() + 1}` : ''}. Nya klasser startar till hösten.
            </p>
          </div>
        </div>
      )}

      {/* Classes */}
      {!closedReason && !isAfterTermEnd && daySchedule && daySchedule.classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {daySchedule.classes.map((cls, i) => (
            <ClassCard key={i} entry={cls} />
          ))}
        </div>
      ) : !closedReason && !isAfterTermEnd ? (
        <div className="text-center py-16 mb-12">
          <p className="text-gray-400 text-xl">Inga klasser denna dag.</p>
        </div>
      ) : (
        <div className="py-8 mb-12" />
      )}

      {/* Opening hours */}
      <div className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-4">
          Ordinarie Öppettider
        </h2>
        <ul className="space-y-2">
          {openingHours.map((oh) => (
            <li key={oh.day} className="flex justify-between text-sm">
              <span className="text-gray-300">{oh.day}</span>
              <span className={oh.hours === 'Stängt' ? 'text-gray-500' : 'text-white font-semibold'}>
                {oh.hours}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
