import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import parseMDX from "@lib/utils/mdxParser";

const BookArticle = ({
  post,
  mdxContent,
  slug,
  allCategories,
  relatedPosts,
  posts,
}) => {
  const { frontmatter, content } = post;

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      slug={slug}
      allCategories={allCategories}
      relatedPosts={relatedPosts}
      posts={posts}
    />
  );
};

export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/books`);
  const paths = allSlug.map((item) => ({
    params: { single: item.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const books = getSinglePage(`content/books`);
  const post = books.find((p) => p.slug == single);
  const mdxContent = await parseMDX(post.content);
  const relatedPosts = books.filter((p) =>
    post.frontmatter.categories.some((cate) =>
      p.frontmatter.categories.includes(cate)
    )
  );
  const categories = getTaxonomy(`content/books`, "categories");
  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = books.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return { name: category, posts: filteredPosts.length };
  });
  return {
    props: {
      post,
      mdxContent,
      slug: single,
      allCategories: categoriesWithPostsCount,
      relatedPosts,
      posts: books,
    },
  };
};

export default BookArticle;