import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from program");
    return rows as Program[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      select 
        category.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", program.id, "title", program.title
          )
        ) as programs 
      from 
        category 
        left join program on program.category_id = category.id 
      where 
        category.id = ? 
      group by 
        category.id
      `,
      [id],
    );
    return rows[0] as Program[];
  }

  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, synopsis, poster, country, year, category_id) values(?,?,?,?,?,?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
      ],
    );
    return result.insertId;
  }
}

export default new ProgramRepository();
