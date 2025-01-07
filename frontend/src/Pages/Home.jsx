import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemCard from "../components/ItemCard";
import Hero from "../components/Hero";
import { BookMarked } from "lucide-react";
const Home = () => {
  const [items, setItems] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/items`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setItems(data);
        console.log(data);
      }
    };
    if (user) {
      fetchItems();
    }
  }, [user]);

  return (
    <div className="home">
      <Hero />
      <p className="font-bold text-xl text-gray-700 mb-5 hover:cursor-pointer flex gap-1 justify-center items-center">
        Saved Responses
        <span className="hover:animate-bounce">
          <BookMarked size={20} />
        </span>
      </p>
      <div className="item-container">
        {items && items.map((item) => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
