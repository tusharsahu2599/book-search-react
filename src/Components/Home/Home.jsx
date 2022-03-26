import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

export const Home = () => {
  // get all books when user lands on the page
  // populate them as mentioned below

  const Main = styled.div`
    /* Apply some responsive styling to children */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  `;

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/books")
      .then((res) => {
        setBooks([...res.data]);
        console.log(books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSort = (parameter, value) => {
    setFilteredBooks({ parameter, value });
  };

  return (
    <div className="homeContainer">
      <h2 style={{ textAlign: "center" }}>Home</h2>
      <SortAndFilterButtons handleSort={handleSort} />

      <Main className="mainContainer">
        {/* 
            Iterate over books that you get from network
            populate a <BookCard /> component
            pass down books id, imageUrl, title, price and anything else that you want to 
            show in books Card.
        */}
        {books
          .sort((a, b) => {
            if (
              filteredBooks.parameter == "title" &&
              filteredBooks.value == 1
            ) {
              return a["title"].localeCompare(b["title"]);
            } else if (
              filteredBooks.parameter == "title" &&
              filteredBooks.value == -1
            ) {
              return b["title"].localeCompare(a["title"]);
            } else if (
              filteredBooks.parameter == "price" &&
              filteredBooks.value == 1
            ) {
              return a["price"] - b["price"];
            } else if (
              filteredBooks.parameter == "price" &&
              filteredBooks.value == -1
            ) {
              return b["price"] - a["price"];
            }
          })
          .map((el) => (
            <BookCard
              title={el.title}
              id={el.id}
              price={el.price}
              imageUrl={el.imageUrl}
            />
          ))}
      </Main>
    </div>
  );
};  
