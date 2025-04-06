'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const ALL_IMAGES = [
  '/images/campanha_publicitaria-Recuperado.png',
  // add more images here as needed
]

const BATCH_SIZE = 6

export default function ImageGallery() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const loadMoreImages = () => {
    if (!hasMore) return

    const remaining = ALL_IMAGES.slice(images.length, images.length + BATCH_SIZE)
    setImages((prev) => [...prev, ...remaining])

    if (images.length + remaining.length >= ALL_IMAGES.length) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    loadMoreImages()
  }, [])

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true)
          setTimeout(() => {
            loadMoreImages()
            setLoading(false)
          }, 300)
        }
      },
      { threshold: 1 }
    )

    observer.observe(loaderRef.current)

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [loading, hasMore])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
      {images.map((src, idx) => (
        <div key={idx} className="relative aspect-video">
          <Image
            src={src}
            alt={`Artwork ${idx}`}
            fill
            className="rounded-lg object-cover shadow"
          />
        </div>
      ))}

      {hasMore && (
        <div
          ref={loaderRef}
          className="col-span-full py-8 text-center text-sm text-gray-400"
        >
          {loading ? 'Loading...' : 'Scroll to load more'}
        </div>
      )}
    </div>
  )
}
