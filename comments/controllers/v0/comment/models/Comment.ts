import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Comment extends Model<Comment> {
  @Column
  public content!: string;

  @Column
  public feedId!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();

  short() {
    return {
      content: this.content,
    };
  }
}

