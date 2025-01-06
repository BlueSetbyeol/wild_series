import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

interface categoriesProps {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<categoriesProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: categoriesProps[]) => {
        setCategories(data);
      });
  }, []);

  return (
    <section className="categories_list">
      <h1>Our Categories :</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={"/category/new"}>Ajouter</Link>
    </section>
  );
}
