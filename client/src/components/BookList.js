import React from 'react';
import { graphql } from 'react-apollo';
// import PropTypes from 'prop-types'

// queries
import {getBooksQuery} from '../queries/queries'



const BookList = ({ data }) => {
    // console.log(data);
    // console.log(books);
    const { books } = data;

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
    {!data.loading ? (books.map(book => (<li key={book.id}>{book.name}</li>))) : (<div>Loading Books.....</div>)}
                {/* {displayBooks()} */}
            </ul>
        </div>
    )
}

BookList.propTypes = {

}

export default graphql(getBooksQuery)(BookList);
