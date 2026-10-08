import { Router, Request, Response } from 'express';
import { Movie } from '../models/Movie';

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar filmes', details: error });
  }
});

router.post('/movies', async (req: Request, res: Response) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar filme', details: error });
  }
});

router.get('/movies/:id', async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByPk(Number(req.params.id));
    if (!movie) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar filme', details: error });
  }
});

export default router;