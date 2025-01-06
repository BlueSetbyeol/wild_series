import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Categories/Categories.css";

type CategoryDeleteFormProps = {
  id: number;
  children: ReactNode;
};
export default function CategoryDeleteForm({
  id,
  children,
}: CategoryDeleteFormProps) {
  const navigate = useNavigate();
  return (
    <section className="categories_list">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch(`${import.meta.env.VITE_API_URL}/api/category/${id}`, {
            method: "delete",
          }).then((response) => {
            if (response.status === 204) {
              navigate("/categories");
            }
          });
        }}
      >
        <button type="submit">{children}</button>
      </form>
    </section>
  );
}
