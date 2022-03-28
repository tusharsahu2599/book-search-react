import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";


export const BookDetailsPage = () => {
  // Get book details based on ID whenever user lands on the page
  // ID will come from route
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/books/${id}`).then((res) => {
      setBook(res.data);
      
    });
  },[])


  return (
    <>
      <div className="bookContainer">
        <h2 className="title">{book.title}</h2>
        <img className="image" src={book.imageUrl} alt="#" />
        <div className="author">{book.author}</div>
        <div className="description">{book.description}</div>
        <div className="price">{book.price}</div>
        <div className="section">{book.section}</div>
        <div className="isbnNumber">{book.isbnNumber}</div>
        <ul className="reviews">
          {/* Reviews will be an array, iterate over them and create a new <li> for every review */}
          {/* {book.reviews.map((el,i) => {
            return <li>{el}</li>
          })} */}
        </ul>
      </div>
    </>
  );
};
