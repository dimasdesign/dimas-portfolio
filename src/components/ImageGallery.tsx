'use client'

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function ImageGallery() {
    const [images, setImages] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchImages = async (page: number) => {
        setLoading(true);
        const res = await fetch(`/api/images?page=${page}`);
        const data = await res.json();
        setImages(prev => [...prev, ...data.images]);
        setHasMore(data.hasMore);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages(page);
    }, [page]);

    const handleObserevr = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        },
        [hasMore, loading]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver(handleObserevr, option);
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [handleObserevr]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Meus Projetos</h1>

            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4"> {/* Mude as columns-n para a quantidade de colunas. Isso altera o tamanho das imagens */}
              {images.map((src, i) => {
                const slug = encodeURIComponent(src.split('/').pop()?.split('.')[0] || '');
                return (
                  <a
                    href={`/projetos/${slug}`}
                    key={i}
                    className="block mx-auto break-inside-avoid overflow-hidden rounded-lg shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <Image
                      src={src}
                      alt={`Projeto ${i + 1}`}
                      width={600} // controla o tamanho visual
                      height={400}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-auto object-cover rounded"
                      placeholder="empty" // Você pode usar 'blur' se quiser gerar previews
                    />
                  </a>
                );
              })}
            </div>

            {loading && <p className="text-center mt-4">Carregando...</p>}
            <div ref={loader} className="h-10"></div>
        </div>
    );
}
