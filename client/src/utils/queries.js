import gql from "graphql-tag";

export const getBook = gql`
    {
        book {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;