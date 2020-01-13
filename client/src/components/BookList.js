import React, { useState } from 'react';
import { graphql } from 'react-apollo';
// import PropTypes from 'prop-types'

// queries
import { getBooksQuery } from '../queries/queries'

// components
import BookDetails from './BookDetails';



const BookList = ({ data }) => {
    // console.log(data);
    // console.log(books);
    const { books } = data;
    const [selectedBook, setSelectedBook] = useState(null)
    const displayBooks = () => {
        if (data.loading) {
            return (<div>Loading Books....</div>)
        } else {
            return books.map(book => {
                return (
                    <li key={book.id}>{book.name}</li>
                )
            })
        }
    }

    return (
        <div>
            <ul id="book-list">
                {!data.loading ? (books.map(book => (<li onClick={e => setSelectedBook(book.id)} key={book.id}>{book.name}</li>))) : (<div>Loading Books.....</div>)}
                {/* {displayBooks()} */}
            </ul>
            <BookDetails bookId={selectedBook} />
        </div>
    )
}

BookList.propTypes = {

}

export default graphql(getBooksQuery)(BookList);
