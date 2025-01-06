import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/CategoryForm";
import "./Categories.css";

export default function CategoryNew() {
  const navigate = useNavigate();

  const newCategory = {
    name: "",
  };

  return (
    <section className="categories_list">
      <CategoryForm
        defaultValue={newCategory}
        onSubmit={(categoryData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/category`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
          })
            .then((response) => response.json())
            .then((data) => {
              navigate(`/category/${data.insertId}`);
            });
        }}
      >
        Ajouter
      </CategoryForm>
    </section>
  );
}
