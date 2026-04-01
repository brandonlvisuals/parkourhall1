import { links } from '@/lib/data'
import WeeklyEvents from '@/components/WeeklyEvents'

export default function LankarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold text-white mb-3">
        Länkar, anmälan &amp; events
      </h1>
      <p className="text-gray-400 mb-10">
        Allt du behöver för att komma igång med träning på Parkourhall1.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6 flex items-start gap-4 hover:border-[#C7B39A] hover:scale-[1.02] transition-all duration-200 group"
          >
            <span className="text-3xl flex-shrink-0">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl font-semibold text-white group-hover:text-[#C7B39A] transition-colors mb-1">
                {link.label}
              </h2>
              <p className="text-sm text-gray-400">{link.description}</p>
            </div>
            <span className="text-gray-500 group-hover:text-[#C7B39A] transition-colors text-xl flex-shrink-0">
              →
            </span>
          </a>
        ))}
      </div>

      <WeeklyEvents />
    </div>
  )
}
