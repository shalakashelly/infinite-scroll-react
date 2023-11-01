
function BookCard({ book, selectedBooks, handleSelect }) {
    return (
        <div key={book.id} className="book">
            <input 
                type="checkbox" 
                name={book.id} 
                value={book.id}
                onChange={() => handleSelect(book.id)}
                checked={selectedBooks.includes(book.id)} />
                
            <img src={book.formats['image/jpeg']} alt="book_image" className="book__image"/>
            <div className="book__details">
                <b> {book.title} </b>
                {book.authors.map((author, index) => (
                    <span key={index}> {author.name} </span>
                ))}
            </div>
        </div>
    );
}

export default BookCard;
