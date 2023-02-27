import { useEffect, useState } from "react";
import { Collection } from "./components/Collection";
import { Navbar } from "./components/Navbar";
import { Pagination } from "./components/Pagination";
import "./index.scss";
import { ICollection } from "./models/ICollection";

function App() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Anton278/gallery/collections"
        );
        const collections = await response.json();
        setCollections(collections);
        setIsLoading(false);
      } catch (e) {
        e instanceof Error
          ? setError(e.message)
          : setError("Error happened. Please, try again later.");
      }
    };

    getCollections();
  }, []);

  return (
    <div className="App">
      <h1>Моя коллекція фотографій</h1>
      <Navbar />
      {isLoading ? (
        <div>loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="content">
          {collections.map((collection) => (
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
