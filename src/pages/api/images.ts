// Lê de public/images e retorna os nomes dos arquivos
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const MEDIA_PER_PAGE = 10;

type MediaItem = {
    src: string;
    category: string;
    type: 'image' | 'video';
};

const mediaExtensions = {
    image: /\.(jpe?g|png|gif|webp)$/i,
    video: /\.(mp4|webm)$/i,
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const page = parseInt(req.query.page as string) || 1;

    const mediaDir = path.join(process.cwd(), 'public', 'media');
    const allMedia = fs.readdirSync(mediaDir).filter(file =>
        mediaExtensions.image.test(file) || mediaExtensions.video.test(file)
    );

    const start = (page - 1) * MEDIA_PER_PAGE;
    const end   = start + MEDIA_PER_PAGE;

    const media: MediaItem[] = allMedia.slice(start, end).map((file) => {
        const match = file.match(/^([^-]+)-.+$/);
        const category = match ? match[1] : 'outros';
        const type = mediaExtensions.video.test(file) ? 'video' : 'image';

        return {
            src: `/media/${file}`,
            category,
            type,
        };
    })

    res.status(200).json({
        media,
        hasMore: end < allMedia.length,
    });
}
