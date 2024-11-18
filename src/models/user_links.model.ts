import { BaseModel } from '@/models/base.model';
import Link from '@/models/link.model';
import User from '@/models/user.model';
import { Model, RelationMappings } from 'objection';

class UsersLinks extends BaseModel {
  static tableName: string = 'users_links';

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.user_id`,
          to: `${Link.tableName}.id`
        }
      },
      link: {
        relation: Model.BelongsToOneRelation,
        modelClass: Link,
        join: {
          from: `${this.tableName}.link_id`,
          to: `${Link.tableName}.id`
        }
      }
    };
  }

  id!: number;
  link_id!: number;
  user_id!: number;

  user!: User;
  link!: Link;
}

export default UsersLinks;
