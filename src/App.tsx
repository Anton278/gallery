import { useEffect, useState } from "react";
import { Collection } from "./components/Collection";
import { Navbar } from "./components/Navbar";
import { Pagination } from "./components/Pagination";
import "./index.scss";
import { ICategory } from "./models/ICategory";
import { ICollection } from "./models/ICollection";

function App() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<ICollection[]>(
    []
  ); // means collections filtered by category or/and search
  const [currentCollections, setCurrentCollections] = useState<ICollection[]>(
    []
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const COLLECTIONS_PER_PAGE = 3;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Anton278/gallery/collections"
        );
        const collections = await response.json();
        setCollections(collections);
      } catch (e) {
        e instanceof Error
          ? setError(e.message)
          : setError("Error happened. Please, try again later.");
      }

      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Anton278/gallery/categories"
        );
        const categories = await response.json();
        setCategories(categories);
        setIsLoading(false);
      } catch (e) {
        e instanceof Error
          ? setError(e.message)
          : setError("Error happened. Please, try again later.");
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let filteredCollections: ICollection[] = [];

    filteredCollections = collections.filter((collection) =>
      activeCategory ? collection.category === activeCategory : true
    );

    filteredCollections = filteredCollections.filter((collection) =>
      collection.name.includes(search)
    );

    setFilteredCollections(filteredCollections);
  }, [collections, activeCategory, search]);

  useEffect(() => {
    const indexOfLastCollection = currentPage * COLLECTIONS_PER_PAGE;
    const indexOfFirstCollection = indexOfLastCollection - COLLECTIONS_PER_PAGE;

    setCurrentCollections(
      filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection)
    );
  }, [filteredCollections, currentPage]);

  return (
    <div className="App">
      <h1>Моя коллекція фотографій</h1>
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setCurrentPage={setCurrentPage}
        search={search}
        setSearch={setSearch}
      />
      {error ? (
        <div className="error-message">{error}</div>
      ) : isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="content">
          {currentCollections.map((collection) => (
            <Collection
              name={collection.name}
              images={collection.photos}
              key={collection.name}
            />
          ))}
        </div>
      )}
      <Pagination
        collectionsLength={filteredCollections.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collectionsPerPage={COLLECTIONS_PER_PAGE}
      />
    </div>
  );
}

export default App;
