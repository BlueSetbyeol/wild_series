import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: string;
  category_id: string;
};

class ProgramRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from program");
    return rows as Program[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );
    return rows[0] as Program[];
  }

  async create(program: Omit<Program, "id">) {
    const year = Number.parseInt(program.year);
    const category_id = Number.parseInt(program.category_id);
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        year,
        category_id,
      ],
    );
    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from program where id= ?",
      [id],
    );
    return result.insertId;
  }
}

export default new ProgramRepository();
