import {
  MaybeCompositeId,
  Model,
  NumberQueryBuilder,
  Page,
  QueryBuilder
} from 'objection';

export default class CustomQueryBuilder<
  M extends Model,
  R = M[]
> extends QueryBuilder<M, R> {
  declare ArrayQueryBuilderType: CustomQueryBuilder<M, M[]>;
  declare SingleQueryBuilderType: CustomQueryBuilder<M, M>;
  declare MaybeSingleQueryBuilderType: CustomQueryBuilder<M, M | undefined>;
  declare NumberQueryBuilderType: CustomQueryBuilder<M, number>;
  declare PageQueryBuilderType: CustomQueryBuilder<M, Page<M>>;

  private ignoreDeleted: boolean = true;

  withDeleted(): this {
    this.ignoreDeleted = false;
    return this;
  }

  execute(): Promise<R> {
    const modelClass = this.modelClass() as unknown as typeof BaseModel;

    if (this.ignoreDeleted && modelClass.useSoftDelete) {
      this.whereNull(`${this.modelClass().tableName}.deleted_at`);
    }
    this.ignoreDeleted = true;
    return super.execute();
  }

  delete(): NumberQueryBuilder<this> {
    const modelClass = this.modelClass() as unknown as typeof BaseModel;

    if (modelClass.useSoftDelete) {
      //@ts-expect-error expect to not have deleted_at propertie
      return this.update({ deleted_at: new Date() });
    }

    return super.delete();
  }

  deleteById(id: MaybeCompositeId): NumberQueryBuilder<this> {
    const modelClass = this.modelClass() as unknown as typeof BaseModel;

    if (modelClass.useSoftDelete) {
      //@ts-expect-error expect to not have deleted_at propertie
      return this.findById(id).update({ deleted_at: new Date() });
    }

    return super.deleteById(id);
  }

  forceDelete(): NumberQueryBuilder<this> {
    this.ignoreDeleted = false;

    return super.delete();
  }
}

class BaseModel extends Model {
  public declare QueryBuilderType: CustomQueryBuilder<this>;
  static QueryBuilder = CustomQueryBuilder;

  static useSoftDelete: boolean = false;

  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date | null;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  async $delete() {
    if ((this.constructor as typeof BaseModel).useSoftDelete) {
      this.deleted_at = new Date();
      await this.$query().patch({ deleted_at: this.deleted_at });
    } else {
      await super.$query().delete();
    }
  }

  static async deleteById(id: number | string) {
    if (this.useSoftDelete) {
      return this.query().findById(id).patch({ deleted_at: new Date() });
    } else {
      return super.query().deleteById(id);
    }
  }
}

export { BaseModel };
