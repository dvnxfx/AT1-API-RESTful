import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

export class MovieController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await Movie.findAll();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao buscar filmes.' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) return res.status(404).json({ error: 'Filme não encontrado.' });
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao buscar filme.' });
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, director, releaseYear, genre, duration, synopsis } = req.body;
      if (!title || !director || !releaseYear || !genre || !duration) {
        return res.status(400).json({ error: 'Campos obrigatórios em falta.' });
      }
      const movie = await Movie.create({ title, director, releaseYear, genre, duration, synopsis });
      return res.status(201).json(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o filme.' });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) return res.status(404).json({ error: 'Filme não encontrado.' });
      await movie.update(req.body);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o filme.' });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) return res.status(404).json({ error: 'Filme não encontrado.' });
      await movie.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao eliminar o filme.' });
    }
  }
}