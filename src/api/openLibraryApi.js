import axios from "axios";

export const getBookByISBN = async () => {
    try {
        const response = await axios.get("https://openlibrary.org/api/books?bibkeys=ISBN:0201558025&format=json&jscmd=details")
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}