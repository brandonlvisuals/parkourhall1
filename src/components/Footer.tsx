import { contactInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-[#3d5568] border-t border-[#1f1f1f] py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
        <p className="mb-1">© 2025 Quality Movement – Parkourhall1</p>
        <p>{contactInfo.address} &nbsp;|&nbsp; {contactInfo.phone}</p>
      </div>
    </footer>
  )
}
