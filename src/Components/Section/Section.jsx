import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { BookCard } from "../BookCard/BookCard";
import { SortAndFilterButtons } from "../SortAndFilterButtons/SortAndFilterButtons";
import styled from "styled-components";

export const Section = () => {

  const Main = styled.div`
    /* Apply some responsive styling to children */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

  `;

  const { section } = useParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState({});


  useEffect(() => {
    axios
      .get("http://localhost:8080/books")
      .then(res => {
        setBooks([...res.data]);
        console.log(books);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSort = (parameter, value) => {
    setFilteredBooks({ parameter, value });
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {
          section
        }
      </h2>
      <SortAndFilterButtons handleSort={handleSort} />

      <Main className="sectionContainer">

        {books
          .sort((a, b) => {
            if (
              filteredBooks.parameter === "title" &&
              filteredBooks.value === 1
            ) {
              return a["title"].localeCompare(b["title"]);
            } else if (
              filteredBooks.parameter === "title" &&
              filteredBooks.value === -1
            ) {
              return b["title"].localeCompare(a["title"]);
            } else if (
              filteredBooks.parameter === "price" &&
              filteredBooks.value === 1
            ) {
              return a["price"] - b["price"];
            } else if (
              filteredBooks.parameter === "price" &&
              filteredBooks.value === -1
            ) {
              return b["price"] - a["price"];
            }
          })
          .filter((e) => {
            if (e.section === section) {
              return true
            }
            else {
              return false;
            }
          }).map((el) => (
            <BookCard title={el.title} id={el.id} price={el.price} imageUrl={el.imageUrl} />))}
      </Main>
    </>
  );
};
