export default function sitemap() {
    return [
        {
            url: 'https://programing-quiz-zeta.vercel.app/',
            lastModified: new Date(),
        },
        {
            url: 'https://programing-quiz-zeta.vercel.app/questions',
            lastModified: new Date(),
        },
        {
            url: 'https://programing-quiz-zeta.vercel.app/questions/{id}',
            lastModified: new Date(),
        },
    ];
}