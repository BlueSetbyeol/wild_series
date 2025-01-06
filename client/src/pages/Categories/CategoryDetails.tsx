import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Categories.css";
import CategoryDeleteForm from "../../components/CategoryDeleteForm";

type Program = {
  id: number;
  title: string;
};

interface categoriesProps {
  id: number;
  name: string;
  programs: Program[];
}

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | categoriesProps);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/category/${id}`)
      .then((response) => response.json())
      .then((data: categoriesProps) => {
        setCategory(data);
      });
  }, [id]);

  return (
    <section className="categories_list">
      {category !== null && (
        <>
          <hgroup className="details-hgroup">
            <h1>{category.name}</h1>
            <Link to={`/category/${category.id}/edit`}>Modifier</Link>
            <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
          </hgroup>
          <ul>
            {category.programs.map((program) => (
              <li key={program.id}>
                <Link to={`/programs/${program.id}`}>{program.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
