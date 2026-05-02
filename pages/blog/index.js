import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import { getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Post from "@partials/Post";
import config from "@config/config.json";
const { blog_folder } = config.settings;

const BlogPage = ({ posts }) => {
  const orderedPosts = sortByDate(posts);
  const { pagination } = config.settings;

  return (
    <Base title="Blog">
      <section className="section">
        <div className="container">
          {markdownify("Latest Writings", "h1", "h2 mb-8 text-center")}
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

export default BlogPage;

export const getStaticProps = async () => {
  const posts = getSinglePage(`content/${blog_folder}`);
  return {
    props: { posts },
  };
};