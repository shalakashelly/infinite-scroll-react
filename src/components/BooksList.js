import BookCard from "./BookCard";

function BooksList({ books, selectedBooks, handleSelect, isFetching }) {
  if (!books) {
    return <div className="loading"> Fetching Books... </div>;
  }

  return (
    <div className="books">
      {books &&
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            selectedBooks={selectedBooks}
            handleSelect={handleSelect}
          />
        ))}
      {isFetching && <div className="loading__bottom"> Fetching Books... </div>}
    </div>
  );
}

export default BooksList;
