import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./programs.css";

interface programsProps {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

export default function Programs() {
  const [programs, setPrograms] = useState<programsProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="movie_list">
      <h1>Our Programs :</h1>
      {programs.map((program) => (
        <Link
          to={`/program/${program.id}`}
          className="movie_card"
          key={program.id}
        >
          <h2>{program.title}</h2>
          <div className="basic-infos">
            <h4>Country : </h4>
            <p>{program.country}</p>
            <h4>Date of Release : </h4>
            <p>{program.year}</p>
          </div>
        </Link>
      ))}
      <Link to={"/program/new"}>Ajouter</Link>
    </section>
  );
}
