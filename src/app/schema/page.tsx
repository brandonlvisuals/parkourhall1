'use client'

import { useState } from 'react'
import { schedule, openingHours } from '@/lib/data'
import ClassCard from '@/components/ClassCard'

function getTodayName(): string {
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
  return dayMap[dayIndex]
}

export default function SchemaPage() {
  const [selectedDay, setSelectedDay] = useState<string>(getTodayName())

  const daySchedule = schedule.find((d) => d.day === selectedDay)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold text-white mb-8">
        Schema
      </h1>

      {/* Day tab selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {schedule.map((day) => {
          const isActive = day.day === selectedDay
          return (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                isActive
                  ? 'bg-[#C7B39A] border-[#C7B39A] text-white'
                  : 'bg-[#0d1420] border-[#1f1f1f] text-gray-300 hover:border-[#C7B39A] hover:text-[#C7B39A]'
              }`}
            >
              {day.day}
            </button>
          )
        })}
      </div>

      {/* Classes for selected day */}
      {daySchedule && daySchedule.classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {daySchedule.classes.map((cls, i) => (
            <ClassCard key={i} entry={cls} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 mb-12">
          <p className="text-gray-400 text-xl">Inga klasser idag.</p>
        </div>
      )}

      {/* Opening hours */}
      <div className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-4">
          Öppettider
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
