import { useNavigate } from "react-router-dom";
import ProgramForm from "../../components/ProgramForm";
import "./programs.css";

export default function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "titre",
    synopsis: "synopsis",
    poster: "adresse html de l'image",
    country: "pays",
    year: "1980",
    category_id: "1",
  };

  return (
    <>
      <h2>Ajout d'une série :</h2>
      <ProgramForm
        defaultValue={newProgram}
        onSubmit={(ProgramData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/program`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ProgramData),
          })
            .then((res) => res.json())
            .then((data) => navigate(`/program/${data.insertId}`));
        }}
      >
        Ajouter
      </ProgramForm>
    </>
  );
}
