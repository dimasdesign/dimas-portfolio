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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                {images.map((src, i) => (
                    <a href={`/projetos/${encodeURIComponent(src.split('/').pop()?.split('.')[0] || '')}`} key={i} className="relative aspect-video">
                        <Image
                            src={src}
                            alt={`Projeto ${i + 1}`}
                            fill
                            className="w-full h-60 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                        />
                    </a>
                ))}
            </div>

            {loading && <p className="text-center mt-4">Carregando...</p>}
            <div ref={loader} className="h-10"></div>
        </div>
    );
}
