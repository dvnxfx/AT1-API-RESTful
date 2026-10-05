import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Gestão da Filmoteca
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Sucesso.
 */
router.get('/movies', MovieController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso.
 *       404:
 *         description: Não encontrado.
 */
router.get('/movies/:id', MovieController.getById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Regista um novo filme
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, director, releaseYear, genre, duration]
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               releaseYear:
 *                 type: integer
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               synopsis:
 *                 type: string
 *     responses:
 *       201:
 *         description: Criado com sucesso.
 */
router.post('/movies', MovieController.create);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Atualizado com sucesso.
 */
router.put('/movies/:id', MovieController.update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado com sucesso.
 */
router.delete('/movies/:id', MovieController.delete);

export default router;