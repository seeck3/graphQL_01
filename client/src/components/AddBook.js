import React, { useState } from 'react'
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

// queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const displayAuthors = () => {
        let { authors } = getAuthorsQuery;
        if (getAuthorsQuery.loading) {
            return (
                <option disabled>Loading Authors</option>
            )
        } else {
            return authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    const {
        name,
        genre,
        authorId
    } = book

    const submitForm = (e) => {
        e.preventDefault();
        addBookMutation(
            {
                variables: {
                    name,
                    genre,
                    authorId
                },
                refetchQueries: [{query: getBooksQuery}]
            }
        )
    }

    return (
        <form id="add-book" onSubmit={e => submitForm(e)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={e => setBook({...book, name: e.target.value})}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => setBook({...book, genre: e.target.value})}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={e => setBook({...book, authorId: e.target.value})}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

AddBook.propTypes = {

}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook)
