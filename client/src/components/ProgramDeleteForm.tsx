import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Programs/programs.css";

type ProgramDeleteProps = {
  id: number;
  children: ReactNode;
};

export default function ProgramDeleteForm({
  id,
  children,
}: ProgramDeleteProps) {
  const navigate = useNavigate();
  return (
    <form
      className="program_form"
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/program/${id}`, {
          method: "delete",
        }).then((res) => {
          if (res.status === 204) {
            navigate("/categories");
          }
        });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}
