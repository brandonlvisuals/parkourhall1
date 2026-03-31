'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

interface Props {
  images: string[]
}

export default function ImageCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length)
  }, [images.length])

  const lightboxPrev = useCallback(() => {
    setLightbox((c) => c === null ? null : (c - 1 + images.length) % images.length)
  }, [images.length])

  const lightboxNext = useCallback(() => {
    setLightbox((c) => c === null ? null : (c + 1) % images.length)
  }, [images.length])

  // Auto-rotate (pause when lightbox is open)
  useEffect(() => {
    if (images.length <= 1 || lightbox !== null) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next, images.length, lightbox])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lightboxPrev, lightboxNext])

  if (images.length === 0) return null

  const visible = Math.min(images.length, 3)

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(current * 100) / visible}%)` }}
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-1"
              style={{ width: `${100 / visible}%` }}
            >
              <div
                className="relative aspect-video rounded-lg overflow-hidden cursor-zoom-in"
                onClick={() => setLightbox(i % images.length)}
              >
                <Image
                  src={`/gallery/${src}`}
                  alt={`Parkourhall1 bild ${(i % images.length) + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
            aria-label="Föregående bild"
          >
            ‹
          </button>
        )}

        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
            aria-label="Nästa bild"
          >
            ›
          </button>
        )}

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current % images.length ? 'bg-[#C7B39A]' : 'bg-white/30'
                }`}
                aria-label={`Gå till bild ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/gallery/${images[lightbox]}`}
              alt={`Parkourhall1 bild ${lightbox + 1}`}
              fill
              className="object-contain"
            />

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
              aria-label="Stäng"
            >
              ×
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={lightboxPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
                aria-label="Föregående"
              >
                ‹
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={lightboxNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
                aria-label="Nästa"
              >
                ›
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {lightbox + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
