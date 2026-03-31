'use client'

import { ClassEntry, Level } from '@/lib/data'

function levelBadge(level: Level) {
  switch (level) {
    case 'Nybörjare':
      return 'bg-green-900/50 text-green-300 border border-green-700/40'
    case 'Fortsättning':
      return 'bg-blue-900/50 text-[#D0DEFB] border border-blue-700/40'
    case 'Avancerad':
      return 'bg-amber-900/50 text-amber-300 border border-amber-700/40'
    case 'Alla nivåer':
      return 'bg-purple-900/50 text-purple-300 border border-purple-700/40'
    default:
      return 'bg-gray-800 text-gray-300'
  }
}

interface ClassCardProps {
  entry: ClassEntry
}

export default function ClassCard({ entry }: ClassCardProps) {
  return (
    <div className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-4 hover:border-[#C7B39A] transition-colors duration-200">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-[#C7B39A] font-bold text-sm mb-1">{entry.time}</p>
          <h3 className="font-[family-name:var(--font-oswald)] text-lg font-semibold text-white leading-tight mb-1">
            {entry.name}
          </h3>
          <p className="text-sm text-gray-400">{entry.instructor}</p>
          {entry.location && (
            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-[#C7B39A]/20 text-[#C7B39A] border border-[#C7B39A]/30">
              {entry.location}
            </span>
          )}
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-semibold ${levelBadge(entry.level)}`}>
            {entry.level}
          </span>
        </div>
      </div>
    </div>
  )
}
