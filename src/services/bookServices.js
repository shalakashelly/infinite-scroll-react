import { GET_BOOKS_URL } from './constants';

export const fetchAllBooks = async ( page ) => {
    const response = await fetch(GET_BOOKS_URL + `?page=${page}`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const results = await response.json();
    
    return results;
};
