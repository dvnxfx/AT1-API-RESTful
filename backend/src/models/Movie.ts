import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface MovieAttributes {
  id: number;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  duration: number;
  synopsis?: string;
}

export interface MovieCreationAttributes extends Optional<MovieAttributes, 'id' | 'synopsis'> {}

export class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
  public id!: number;
  public title!: string;
  public director!: string;
  public releaseYear!: number;
  public genre!: string;
  public duration!: number;
  public synopsis!: string;
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    director: { type: DataTypes.STRING, allowNull: false },
    releaseYear: { type: DataTypes.INTEGER, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    synopsis: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'movies' }
);