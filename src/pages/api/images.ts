// Lê de public/images e retorna os nomes dos arquivos
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const IMAGES_PER_PAGE = 10;

type ImageData = {
    src: string;
    category: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const page = parseInt(req.query.page as string) || 1;

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const allImages = fs.readdirSync(imagesDir).filter(file =>
        /\.(jpe?g|png|gif|webp)$/i.test(file)
    );

    const start = (page - 1) * IMAGES_PER_PAGE;
    const end   = start + IMAGES_PER_PAGE;

    const images: ImageData[] = allImages.slice(start, end).map((file) => {
        const match = file.match(/^([^-]+)-.+$/);
        const category = match ? match[1] : 'outros';

        return {
            src: `/images/${file}`,
            category,
        };
    });

    res.status(200).json({
        images,
        hasMore: end < allImages.length,
    });
}
