import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import sequelize from '../config/database';
import { Movie } from '../models/Movie';

describe('Testes de Integração: Rotas de Filmes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Movie.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('GET /movies - deve retornar uma lista vazia inicialmente', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('POST /movies - deve registar um novo filme com sucesso', async () => {
    const response = await request(app)
      .post('/movies')
      .send({
        title: 'Matrix',
        director: 'Lana Wachowski',
        releaseYear: 1999,
        genre: 'Ficção Científica',
        duration: 136,
        synopsis: 'Um hacker descobre a verdadeira natureza da realidade.'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Matrix');
  });

  it('GET /movies/:id - deve retornar um filme específico pelo ID', async () => {
    const movie = await Movie.create({
      title: 'Interestelar',
      director: 'Christopher Nolan',
      releaseYear: 2014,
      genre: 'Ficção Científica',
      duration: 169
    });

    const response = await request(app).get(`/movies/${movie.id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Interestelar');
  });
});