export type Level = 'Nybörjare' | 'Fortsättning' | 'Avancerad' | 'Alla nivåer';

export interface ClassEntry {
  time: string;      // e.g. "16:00–17:00"
  name: string;
  instructor: string;
  level: Level;
  location?: string; // only if not Parkourhall1
}

export interface DaySchedule {
  day: string;
  classes: ClassEntry[];
}

export const schedule: DaySchedule[] = [
  {
    day: 'Måndag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 6–8år', instructor: 'Piam A', level: 'Nybörjare' },
      { time: '16:00–17:00', name: 'World Chase Tag 9–12år', instructor: 'Mattias H', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'Parkour Tonårs', instructor: 'Piam A', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'World Chase Tag 13–17år', instructor: 'Mattias H', level: 'Nybörjare' },
      { time: '18:20–19:20', name: 'Parkour 9–12år Fortsättning', instructor: 'Piam A', level: 'Fortsättning' },
      { time: '18:20–19:20', name: 'World Chase Tag 9–17år Fortsättning', instructor: 'Mattias H', level: 'Fortsättning' },
    ],
  },
  {
    day: 'Tisdag',
    classes: [
      { time: '15:00–16:00', name: 'Parkour Senior (55+)', instructor: 'Brandon S', level: 'Alla nivåer' },
      { time: '16:00–17:00', name: 'Akrobatik 9–12år', instructor: 'Brandon S', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'Parkour 9–12år Fortsättning', instructor: 'Brandon S', level: 'Fortsättning' },
      { time: '18:20–19:20', name: 'Parkour 9–12år Avancerad', instructor: 'Brandon S', level: 'Avancerad' },
      { time: '19:30–20:30', name: 'Parkour 18år+', instructor: 'Brandon S', level: 'Alla nivåer' },
    ],
  },
  {
    day: 'Onsdag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 6–8år', instructor: 'Mattias H', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'Parkour 9–12år Nybörjare', instructor: 'Mattias H', level: 'Nybörjare' },
      { time: '18:20–19:20', name: 'Parkour 9–12år Fortsättning', instructor: 'Mattias H', level: 'Fortsättning' },
{ time: '19:30–20:30', name: 'Parkour 9–12år Avancerad', instructor: 'Mattias H', level: 'Avancerad' },
    ],
  },
  {
    day: 'Torsdag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 9–12år Nybörjare', instructor: 'Viktor A', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'Parkour 9–12år Fortsättning', instructor: 'Viktor A', level: 'Fortsättning' },
      { time: '18:30–19:30', name: 'World Chase Tag 9–17år Tävlingsgrupp', instructor: 'Viktor A', level: 'Avancerad' },
    ],
  },
  {
    day: 'Fredag',
    classes: [
      { time: '16:00–17:00', name: 'Parkour 9–12år Nybörjare', instructor: 'Alfred L', level: 'Nybörjare' },
      { time: '17:10–18:10', name: 'Parkour 6–8år', instructor: 'Alfred L', level: 'Nybörjare' },
      { time: '18:20–19:20', name: 'Parkour 9–12år Avancerad', instructor: 'Alfred L', level: 'Avancerad' },
      { time: '19:30–20:30', name: 'Parkour Tonårs Fortsättning', instructor: 'Alfred L', level: 'Fortsättning' },
    ],
  },
  {
    day: 'Lördag',
    classes: [
      { time: '12:20–13:20', name: 'Parkour 9–12år Nybörjare', instructor: 'Melwin H', level: 'Nybörjare' },
      { time: '13:30–14:30', name: 'Parkour 6–8år Nybörjare', instructor: 'Melwin H', level: 'Nybörjare' },
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
