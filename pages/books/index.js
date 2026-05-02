import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import { getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Post from "@partials/Post";
import config from "@config/config.json";

const BooksPage = ({ books }) => {
  const orderedBooks = sortByDate(books);
  const { pagination } = config.settings;

  return (
    <Base title="Books">
      <section className="section">
        <div className="container">
          {markdownify("Books", "h1", "h2 mb-8 text-center")}
          <div className="row mb-16">
            {orderedBooks.map((book) => (
              <div className="mt-16 lg:col-4" key={book.slug}>
                <Post post={book} postPrefix="books" />
              </div>
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(books.length / pagination)}
            currentPage={1}
          />
        </div>
      </section>
    </Base>
  );
};

export default BooksPage;

export const getStaticProps = async () => {
  const books = getSinglePage("content/books");
  return {
    props: { books },
  };
};