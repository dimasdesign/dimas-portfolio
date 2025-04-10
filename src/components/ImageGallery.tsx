'use client'

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import CustomVideoCard from './VideoCard';

type ImageData = {
    src: string;
    category: string;
    type: 'image' | 'video';
}

export default function ImageGallery() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);

    const imagensFiltradas = categoriaAtiva === 'todas'
        ? images
        : images.filter(img => img.category === categoriaAtiva);

    const categoriasUnicas = Array.from(new Set(images.map(img => img.category)));
    const categorias = ['todas', ...categoriasUnicas];

    const fetchImages = async (page: number) => {
        setLoading(true);
        const res = await fetch(`/api/images?page=${page}`);
        const data = await res.json();
        setImages(prev => [...prev, ...data.media]);
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

            <div className="flex justify-center items-center gap-2 flex-wrap mb-4">
                {categorias.map(cat => (
                    <button
                    key={cat}
                    onClick={() => setCategoriaAtiva(cat)}
                    className={`px-3 py-1 rounded capitalize hover:bg-pink-600 ${
                        categoriaAtiva === cat
                        ? 'bg-transparent text-neutral-100' // Selecionado
                        : 'bg-transparent text-cyan-500'   // Idle
                    }`}
                    >
                    {cat}
                    </button>
                ))}
            </div>

            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4"> {/* Mude as columns-n para a quantidade de colunas. Isso altera o tamanho das imagens */}
                {imagensFiltradas.map((img, i) => {
                    const slug = encodeURIComponent(img.src.split('/').pop()?.split('.')[0] || '');
                    return (
                        <a
                            href={`/projetos/${slug}`}
                            key={i}
                            className="block break-inside-avoid overflow-hidden rounded-lg shadow-md hover:scale-[1.02] transition-transform"
                        >
                            {img.type === 'image' ? (
                                <Image
                                    src={img.src}
                                    alt={`Projeto ${i + 1}`}
                                    width={400}
                                    height={600}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-auto object-cover rounded"
                                />
                            ) : (
                                <CustomVideoCard src={img.src} poster='' />
                            )}
                        </a>
                    );
                })}
            </div>

            {loading && <p className="text-center mt-4">Carregando...</p>}
            <div ref={loader} className="h-10"></div>
        </div>
    );
}
