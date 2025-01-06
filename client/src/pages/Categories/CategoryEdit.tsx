import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Categories.css";
import CategoryForm from "../../components/CategoryForm";

interface categoriesProps {
  id: number;
  name: string;
}

export default function CategoriesEdit() {
  const navigate = useNavigate();

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
      {category && (
        <CategoryForm
          defaultValue={category}
          onSubmit={(categoryData) => {
            fetch(
              `${import.meta.env.VITE_API_URL}/api/categories/${category.id}`,
              {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(categoryData),
              },
            ).then((response) => {
              if (response.status === 204) {
                navigate(`/categories/${category.id}`);
              }
            });
          }}
        >
          Modifier
        </CategoryForm>
      )}
    </section>
  );
}
