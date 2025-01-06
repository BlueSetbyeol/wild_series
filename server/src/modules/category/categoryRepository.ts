import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
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

    return rows[0] as Category[];
  }

  async update(category: Category) {
    const [result] = await databaseClient.query<Result>(
      "update category set name = ? where id = ?",
      [category.name, category.id],
    );

    return result.affectedRows;
  }

  async create(category: Omit<Category, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [category.name],
    );

    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from category where id=?",
      [id],
    );

    return result.insertId;
  }
}

export default new CategoryRepository();
