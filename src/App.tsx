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
        <div>{error}</div>
      ) : (
        <div className="content">
          {collections.map((collection) => (
            <Collection name={collection.name} images={collection.photos} />
          ))}
          <Collection
            name="Подорожі по світу"
            images={[
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
              "https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            ]}
          />
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default App;
