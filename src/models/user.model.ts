import { BaseModel } from './base.model';
import Link from '@/models/link.model';
import UsersLinks from '@/models/user_links.model';
import { Model, RelationMappings } from 'objection';

class User extends BaseModel {
  static tableName: string = 'users';
  static useSoftDelete: boolean = false;

  static get relationMappings(): RelationMappings {
    return {
      links: {
        relation: Model.ManyToManyRelation,
        modelClass: Link,
        join: {
          from: `${this.tableName}.id`,
          through: {
            modelClass: UsersLinks,
            from: `${UsersLinks.tableName}.user_id`,
            to: `${UsersLinks.tableName}.link_id`
          },
          to: `${Link.tableName}.id`
        }
      }
    };
  }

  id!: number;
  email!: string;
  password!: string;

  links!: Link[];
}

export default User;
