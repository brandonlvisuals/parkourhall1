import { openingHours, contactInfo, galleryImages } from '@/lib/data'
import ImageCarousel from '@/components/ImageCarousel'

function getTodayOpeningKey(): string {
  const dayIndex = new Date().getDay()
  if (dayIndex === 0) return 'Söndag'
  if (dayIndex === 6) return 'Lördag'
  return 'Måndag–Fredag'
}

export default function InfoPage() {
  const todayKey = getTodayOpeningKey()
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold text-white">
        Info
      </h1>

      {/* Öppettider */}
      <section className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-4">
          Öppettider
        </h2>
        <ul className="space-y-3">
          {openingHours.map((oh) => {
            const isToday = oh.day === todayKey
            return (
              <li
                key={oh.day}
                className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg ${
                  isToday ? 'bg-[#C7B39A]/15 border border-[#C7B39A]/30' : ''
                }`}
              >
                <span className={`${isToday ? 'text-[#C7B39A] font-semibold' : 'text-gray-300'}`}>
                  {oh.day}
                  {isToday && <span className="ml-2 text-xs">(idag)</span>}
                </span>
                <span className={`font-semibold ${oh.hours === 'Stängt' ? 'text-gray-500' : isToday ? 'text-[#C7B39A]' : 'text-white'}`}>
                  {oh.hours}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Priser */}
      <section className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-4">
          Priser
        </h2>
        <ul className="space-y-3 mb-4">
          <li className="flex justify-between items-center text-sm px-3 py-2 rounded-lg">
            <span className="text-gray-300">Dagsinträde</span>
            <span className="font-semibold text-white">140 kr</span>
          </li>
          <li className="flex justify-between items-center text-sm px-3 py-2 rounded-lg">
            <span className="text-gray-300">Klippkort (10 gånger)</span>
            <span className="font-semibold text-white">1 200 kr</span>
          </li>
        </ul>
        <p className="text-sm text-gray-400">
          Kan köpas på plats i receptionen. Inträde ger tillgång till parkourdelen, World Chase Tag-quaden och akrobatikytan under Parkourhall1s öppettider. Notera att Quality Movements klasser har företräde, men att man med inträde har tillgång till alla ytor som inte används av coacher och elever. För att se när vissa ytor kan vara upptagna, se Parkourhallens{' '}
          <a href="/schema" className="text-[#C7B39A] hover:underline inline-flex items-center gap-0.5">
            Schema →
          </a>
        </p>
      </section>

      {/* Adress */}
      <section className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-3">
          Adress
        </h2>
        <p className="text-gray-300 mb-4">{contactInfo.address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#C7B39A] hover:bg-[#b09a82] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Öppna i Google Maps
        </a>
      </section>

      {/* Kontakt */}
      <section className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-3">
          Kontakt
        </h2>
        <div className="space-y-2">
          <p className="text-gray-300">
            Telefon:{' '}
            <a
              href={`tel:${contactInfo.phone.replace(/[\s-]/g, '')}`}
              className="text-[#C7B39A] hover:text-[#C7B39A] font-semibold transition-colors"
            >
              {contactInfo.phone}
            </a>
          </p>
          <p className="text-gray-300">
            E-post:{' '}
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-[#C7B39A] hover:text-[#C7B39A] font-semibold transition-colors"
            >
              {contactInfo.email}
            </a>
          </p>
        </div>
      </section>

      {/* Om hallen */}
      <section className="bg-[#0d1420] border border-[#1f1f1f] rounded-xl p-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-semibold text-white mb-3">
          Om Parkourhall1
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Parkourhall1 är Quality Movements parkourhall belägen i Järfälla. Här erbjuder vi
          träning i parkour, akrobatik och World Chase Tag för barn, ungdomar och vuxna på
          alla nivåer. Hallen är utrustad med en specialdesignad parkourbana, kraschmatta och
          ett brett utbud av strukturer designade för rörelseträning. Oavsett om du är
          nybörjare eller erfaren atlet finns det plats för dig hos oss.
        </p>
        {galleryImages.length > 0 && <ImageCarousel images={galleryImages} />}
      </section>
    </div>
  )
}
