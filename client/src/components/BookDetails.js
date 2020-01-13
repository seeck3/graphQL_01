import React from 'react'
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries'

const BookDetails = ({ data }) => {
    const { book } = data;
    // console.log(bookId);
    const displayBookDetails = () => {
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(book => (
                            <li key={book.id}>{book.name}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return <div>Please select book on list</div>
        }
    }
    return (
        <div id="book-details">
            {/* {displayBookDetails()} */}
            {book ? (<div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {book.author.books.map(book => (
                        <li key={book.id}>{book.name}</li>
                    ))}
                </ul>
            </div>) : (<div>Please select book on list</div>)}
        </div>
    )
}


export default graphql(getBookQuery, {
    options: ({ bookId }) => {
        console.log(bookId)
        return {
            variables: {
                id: bookId
            }
        }
    }
})(BookDetails)

