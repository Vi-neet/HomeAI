import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemCard from "../components/ItemCard";

const Home = () => {
  const [items, setItems] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setItems(data);
        console.log(data);
      }
    };
    if(user) {
      fetchItems();
    }
  }, [user]);

  return (
    <div className="home">
      <span>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam nemo
        distinctio sed reprehenderit placeat, nobis omnis ullam non, labore
        porro sit aliquid delectus libero assumenda, aspernatur vitae molestias
        exercitationem animi.
      </span>
      <p><strong>Saved Responses</strong></p>
      <div className="item-container">
        {items && items.map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;