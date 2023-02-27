import { useEffect, useState } from "react";
import { Collection } from "./components/Collection";
import { Navbar } from "./components/Navbar";
import { Pagination } from "./components/Pagination";
import "./index.scss";
import { ICategory } from "./models/ICategory";
import { ICollection } from "./models/ICollection";

function App() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="App">
      <h1>Моя коллекція фотографій</h1>
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {error ? (
        <div className="error-message">{error}</div>
      ) : isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="content">
          {collections
            .filter((collection) =>
              activeCategory ? collection.category === activeCategory : true
            )
            .map((collection) => (
              <Collection
                name={collection.name}
                images={collection.photos}
                key={collection.name}
              />
            ))}
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default App;
