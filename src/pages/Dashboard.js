import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAllBooks } from "../services/bookServices";
import BooksList from "../components/BooksList";

function Dashboard() {
  const [books, setBooks] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const iScrollRef = useRef(null);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        // page = 1 for the initial fetch
        const response = await fetchAllBooks(1);
        const bookResults = response.results;
        setBooks(bookResults);
      } catch (error) {
        setBooks(null);
      }
    }

    fetchInitialData();
  }, []);

  const handleSelect = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const fetchNextPage = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await fetchAllBooks(page + 1);
      const nextBooks = response.results;
      setBooks([...books, ...nextBooks]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [page, books]);

  useEffect(() => {
    if (iScrollRef.current) {
      const bookListDiv = iScrollRef.current;
      const handleScroll = () => {
        if (
          bookListDiv.scrollTop + bookListDiv.clientHeight >=
            bookListDiv.scrollHeight &&
          !isFetching
        ) {
          fetchNextPage();
        }
      };

      bookListDiv.addEventListener("scroll", handleScroll);
      return () => {
        bookListDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isFetching, fetchNextPage]);

  const clearSelection = () => {
    setSelectedBooks([]);
  };

  return (
    <div className="container">
      <h1 className="page__title"> Books </h1>
      <div className="list__header">
        <div className="list__title">
          <span> {books ? books.length : 0} books </span>
          <span> ({selectedBooks.length} selected) </span>
        </div>
        <div>
          <button onClick={clearSelection}> Clear selection </button>
        </div>
      </div>
      <div className="list--wrapper" ref={iScrollRef}>
        <BooksList
          books={books}
          selectedBooks={selectedBooks}
          handleSelect={handleSelect}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}

export default Dashboard;
