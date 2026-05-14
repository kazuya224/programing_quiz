import { MetadataRoute } from "next";

type Problem = {
    questionId: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch(
        "https://api.devtrain-app.com/api/sitemap/problems",
        // "http://localhost:8080/api/sitemap/problems",
        {
            next: {
                revalidate: 86400,
            },
        }
    );

    if (!res.ok) {
        throw new Error(
            `Failed to fetch problems: ${res.status}`
        );
    }

    const problems: Problem[] = await res.json();

    console.log("problems count:", problems.length);

    return [
        {
            url: "https://app.devtrain-app.com",
            lastModified: new Date(),
        },

        ...problems.map((problem) => ({
            url: `https://app.devtrain-app.com/questions/${problem.questionId}`,
            lastModified: new Date(),
        })),
    ];
}