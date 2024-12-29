import { useEffect, useState } from "react";

const Home = () => {
  const [items, setItems] = useState(null);
  
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:4000/api/items");
      const data = await response.json();
      if (response.ok) {
        setItems(data);
        console.log(data);
      }
    };
    fetchItems();
  }, []);
  return (
    <div className="home">
      <div className="items">
        {items && items.map((item) => <p key={item._id}>{item.title}</p>)}
      </div>
    </div>
  );
};

export default Home;
