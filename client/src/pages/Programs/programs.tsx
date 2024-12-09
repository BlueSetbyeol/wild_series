import { useEffect, useState } from "react";
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
    fetch("http://localhost:3310/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="movie_list">
      <h1>Our Programs :</h1>
      {programs.map((program) => (
        <div className="movie_card" key={program.id}>
          <img src={program.poster} alt={program.title} />
          <h2>{program.title}</h2>
          <div className="basic-infos">
            <h4>Country : </h4>
            <p>{program.country}</p>
            <h4>Date of Release : </h4>
            <p>{program.year}</p>
          </div>
          <p>Synopsis : {program.synopsis}</p>
        </div>
      ))}
    </section>
  );
}
