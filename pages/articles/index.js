import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import { getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Post from "@partials/Post";
import config from "@config/config.json";
const { blog_folder } = config.settings;

const ArticlesPage = ({ posts }) => {
  const orderedPosts = sortByDate(posts);
  const { pagination } = config.settings;

  return (
    <Base title="Articles">
      <section className="section">
        <div className="container">
          {markdownify("Articles", "h1", "h2 mb-8 text-center")}
          <div className="row mb-16">
            {orderedPosts.map((post) => (
              <div className="mt-16 lg:col-4" key={post.slug}>
                <Post post={post} />
              </div>
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(posts.length / pagination)}
            currentPage={1}
          />
        </div>
      </section>
    </Base>
  );
};

export default ArticlesPage;

export const getStaticProps = async () => {
  const allPosts = getSinglePage(`content/${blog_folder}`);
  const posts = allPosts.filter((post) =>
    post.frontmatter.categories.includes("articles")
  );
  return {
    props: { posts },
  };
};