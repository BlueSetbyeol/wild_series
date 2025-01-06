// Some data to make the trick
import { id_ID } from "@faker-js/faker/.";
import programRepository from "./programRepository";

// Declare the action

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programsFromDB = await programRepository.readAll();

    res.json(programsFromDB);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);

    const program = await programRepository.read(programId);

    if (program != null) {
      res.json(program);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      id: req.body.id,
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number.parseInt(req.body.year),
      category_id: Number.parseInt(req.body.category_id),
    };

    const insertId = await programRepository.create(newProgram);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add };
