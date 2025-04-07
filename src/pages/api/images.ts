// Lê de public/images e retorna os nomes dos arquivos
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const IMAGES_PER_PAGE = 10;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const page = parseInt(req.query.page as string) || 1;

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const allImages = fs.readdirSync(imagesDir).filter(file =>
        /\.(jpe?g|png|gif|webp)$/i.test(file)
    );

    const start = (page - 1) * IMAGES_PER_PAGE;
    const end   = start + IMAGES_PER_PAGE;

    const images = allImages.slice(start, end).map(name => `/images/${name}`);

    res.status(200).json({ images, hasMore: end < allImages.length });
}
