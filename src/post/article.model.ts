import { Model, DataType, Column, Table } from 'sequelize-typescript';

interface articleCreationAttrs {
  title: string;
  description: string;
  content: string;
  image: string;
}

@Table({ tableName: 'articles' })
export class Article extends Model<Article, articleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;
}
