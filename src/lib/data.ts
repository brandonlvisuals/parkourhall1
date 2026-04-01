export type Level = 'Nybörjare' | 'Fortsättning' | 'Avancerad' | 'Alla nivåer';

export interface ClassEntry {
  time: string;      // e.g. "16:00–17:00"
  name: string;
  instructor: string;
  level: Level;
  location?: string; // only if not Parkourhall1
  url?: string;      // link to course page
}

export interface DaySchedule {
  day: string;
  classes: ClassEntry[];
}

const U = {
  p68:   'https://qualitymovement.se/parkour-for-barn-6-8ar-i-parkourhall1-2/',
  p912n: 'https://qualitymovement.se/parkour-for-barn-9-12ar-i-parkourhall1-nyborjare/',
  p912f: 'https://qualitymovement.se/parkour-for-barn-9-12ar-fortsattning-i-parkourhall1/',
  p912a: 'https://qualitymovement.se/parkour-for-barn-9-12ar-avancerad-i-parkourhall1/',
  pton:  'https://qualitymovement.se/parkour-for-tonaringar-i-parkourhall1/',
  ptonf: 'https://qualitymovement.se/parkour-for-tonaringar-fortsattningsgrupp-i-parkourhall1/',
  wct:   'https://qualitymovement.se/world-chase-tag-i-sverige/',
  akro:  'https://qualitymovement.se/akrobatik-for-9-12-ar-i-parkourhall1/',
  p18:   'https://qualitymovement.se/parkour-for-vuxna-i-parkourhall1/',
  p55:   'https://qualitymovement.se/parkour-for-seniorer-i-parkourhall1/',
};

export const schedule: DaySchedule[] = [
  {
    day: 'Måndag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 6–8år', instructor: 'Piam A', level: 'Nybörjare', url: U.p68 },
      { time: '16:00–17:00', name: 'World Chase Tag 9–12år', instructor: 'Mattias H', level: 'Nybörjare', url: U.wct },
      { time: '17:10–18:10', name: 'Parkour Tonårs', instructor: 'Piam A', level: 'Nybörjare', url: U.pton },
      { time: '17:10–18:10', name: 'World Chase Tag 13–17år', instructor: 'Mattias H', level: 'Nybörjare', url: U.wct },
      { time: '18:20–19:20', name: 'Parkour 9–12år Fortsättning', instructor: 'Piam A', level: 'Fortsättning', url: U.p912f },
      { time: '18:20–19:20', name: 'World Chase Tag 9–17år Fortsättning', instructor: 'Mattias H', level: 'Fortsättning', url: U.wct },
    ],
  },
  {
    day: 'Tisdag',
    classes: [
      { time: '15:00–16:00', name: 'Parkour Senior (55+)', instructor: 'Brandon S', level: 'Alla nivåer', url: U.p55 },
      { time: '16:00–17:00', name: 'Akrobatik 9–12år', instructor: 'Brandon S', level: 'Nybörjare', url: U.akro },
      { time: '17:10–18:10', name: 'Parkour 9–12år Fortsättning', instructor: 'Brandon S', level: 'Fortsättning', url: U.p912f },
      { time: '18:20–19:20', name: 'Parkour 9–12år Avancerad', instructor: 'Brandon S', level: 'Avancerad', url: U.p912a },
      { time: '19:30–20:30', name: 'Parkour 18år+', instructor: 'Brandon S', level: 'Alla nivåer', url: U.p18 },
    ],
  },
  {
    day: 'Onsdag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 6–8år', instructor: 'Mattias H', level: 'Nybörjare', url: U.p68 },
      { time: '17:10–18:10', name: 'Parkour 9–12år Nybörjare', instructor: 'Mattias H', level: 'Nybörjare', url: U.p912n },
      { time: '18:20–19:20', name: 'Parkour 9–12år Fortsättning', instructor: 'Mattias H', level: 'Fortsättning', url: U.p912f },
      { time: '19:30–20:30', name: 'Parkour 9–12år Avancerad', instructor: 'Mattias H', level: 'Avancerad', url: U.p912a },
    ],
  },
  {
    day: 'Torsdag',
    classes: [
      { time: '17:10–18:10', name: 'Parkour 9–12år Fortsättning', instructor: 'Viktor A', level: 'Fortsättning', url: U.p912f },
      { time: '18:30–19:30', name: 'World Chase Tag 9–17år Tävlingsgrupp', instructor: 'Viktor A', level: 'Avancerad', url: U.wct },
    ],
  },
  {
    day: 'Fredag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 9–12år Nybörjare', instructor: 'Alfred L', level: 'Nybörjare', url: U.p912n },
      { time: '17:10–18:10', name: 'Parkour 6–8år', instructor: 'Alfred L', level: 'Nybörjare', url: U.p68 },
      { time: '18:20–19:20', name: 'Parkour 9–12år Avancerad', instructor: 'Alfred L', level: 'Avancerad', url: U.p912a },
      { time: '19:30–20:30', name: 'Parkour Tonårs Fortsättning', instructor: 'Alfred L', level: 'Fortsättning', url: U.ptonf },
    ],
  },
  {
    day: 'Lördag',
    classes: [
      { time: '12:20–13:20', name: 'Parkour 9–12år Nybörjare', instructor: 'Melwin H', level: 'Nybörjare', url: U.p912n },
      { time: '13:30–14:30', name: 'Parkour 6–8år Nybörjare', instructor: 'Melwin H', level: 'Nybörjare', url: U.p68 },
    ],
  },
  {
    day: 'Söndag',
    classes: [],
  },
];

export const openingHours = [
  { day: 'Måndag–Fredag', hours: '15:00–21:00' },
  { day: 'Lördag', hours: '12:00–18:00' },
  { day: 'Söndag', hours: 'Stängt' },
];

export const contactInfo = {
  address: 'Gjutmästare Rosbergs väg 7, 176 69 Järfälla',
  phone: '070-332 82 50',
  email: 'info@qualitymovement.se',
};

export const links = [
  {
    label: 'Gymmedlemskap',
    description: 'Bli medlem och träna fritt i hallen',
    href: 'https://qualitymovement.se/parkourhall1-gymmedlemskap-2/',
    icon: '🏋️',
  },
  {
    label: 'Terminkurser',
    description: 'Anmäl dig till parkour- och akrobatikkurser',
    href: 'https://qualitymovement.se/kursanmalan-2/',
    icon: '📋',
  },
  {
    label: 'Events',
    description: 'Kommande events och tävlingar',
    href: 'https://qualitymovement.se/kursanmalan-2/#events',
    icon: '🎯',
  },
  {
    label: 'Om oss / Kontakt',
    description: 'Läs mer om Quality Movement',
    href: 'https://qualitymovement.se/parkourhall1/',
    icon: '💬',
  },
];

// Last class date per weekday (YYYY-MM-DD) – after this date, no more classes this term
export const termEndDates: Record<string, string> = {
  'Måndag':  '2026-05-18',
  'Tisdag':  '2026-05-19',
  'Onsdag':  '2026-05-20',
  'Torsdag': '2026-05-28',
  'Fredag':  '2026-06-05',
  'Lördag':  '2026-05-30',
};

export interface ClosedDay {
  date: string; // "YYYY-MM-DD"
  name: string;
  note?: string;
}

export const closedDays: ClosedDay[] = [
  { date: '2026-04-03', name: 'Långfredagen' },
  { date: '2026-04-04', name: 'Klämmdag', note: 'Ej röd dag men stängt i hallen' },
  { date: '2026-04-05', name: 'Påskdagen' },
  { date: '2026-04-06', name: 'Annandag påsk' },
  { date: '2026-05-01', name: 'Första maj' },
  { date: '2026-05-14', name: 'Kristi himmelfärdsdag' },
  { date: '2026-06-06', name: 'Sveriges nationaldag' },
  { date: '2026-06-20', name: 'Midsommardagen' },
];

export interface WeekEventItem {
  title: string;
  description?: string;
  url?: string;
  noRegularClasses?: boolean; // true = inga ordinarie klasser denna vecka
}

export interface WeekEvents {
  week: number;
  year: number;
  events: WeekEventItem[];
}

// Lägg till events här – vecka och år som nyckel
export const weekEvents: WeekEvents[] = [
  {
    week: 15,
    year: 2026,
    events: [
      {
        title: 'Påsklovsläger',
        description: 'Parkourläger under påsklovet – kul för alla nivåer!',
        url: 'https://qualitymovement.se/parkourlager-pasklov-i-parkourhall1/',
        noRegularClasses: true,
      },
    ],
  },
];

// Lägg till bildfilnamn här när du lägger bilder i public/gallery/
// Exempel: 'bild1.jpg', 'bild2.jpg'
export const galleryImages: string[] = [
  'IMG_3631-2-1-300x225.jpg',
  'IMG_3632-3-1-300x225.jpg',
  'IMG_3633-2-300x225.jpg',
  'IMG_3634-2-1-300x225.jpg',
  'IMG_3635-2-1-300x225.jpg',
  'IMG_3636-2-1-300x225.jpg',
  'IMG_3637-2-1-300x225.jpg',
  'IMG_3638-2-300x225.jpg',
  'IMG_3639-2-300x225.jpg',
  'IMG_3640-2-300x225.jpg',
  'IMG_3641-2-1-300x225.jpg',
  'IMG_3642-2-300x225.jpg',
];
