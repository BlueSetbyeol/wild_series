import "./programs.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramDeleteForm from "../../components/ProgramDeleteForm";

interface programsProps {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

export default function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<programsProps>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/program/${id}`)
      .then((res) => res.json())
      .then((data) => setProgram(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <section>
        {program !== undefined && (
          <div className="movie_details">
            <h1>{program.title}</h1>
            <img
              src={program.poster}
              alt={program.title}
              className="movie_img"
            />
            <div className="basic-infos">
              <h4>Country : </h4>
              <p>{program.country}</p>
              <h4>Date of Release : </h4>
              <p>{program.year}</p>
            </div>
            <p className="synopsis">Synopsis : {program.synopsis}</p>
            <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
          </div>
        )}
      </section>
    </>
  );
}
