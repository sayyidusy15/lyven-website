import type { Metadata } from "next";
import LocalBlogDetail from "../../../Components/Blog/LocalBlogDetail";
import { publicArticleMeta } from "../../../../lib/public-cms-meta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await publicArticleMeta((await params).slug);
  return article ? { title: `${article.title} | Lyven`, description: article.excerpt } : { title: "Article | Lyven", description: "Insights from the Lyven team." };
}

export default async function BlogArticlePage({ params }: Props) {
  const slug = (await params).slug;
  return <LocalBlogDetail slug={slug} />;
}
