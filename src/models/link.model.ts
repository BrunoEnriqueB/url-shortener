import { BaseModel } from '@/models/base.model';
import User from '@/models/user.model';
import { Model, RelationMappings } from 'objection';
import UsersLinks from './user_links.model';

class Link extends BaseModel {
  static tableName: string = 'links';
  static useSoftDelete: boolean = true;

  static get relationMappings(): RelationMappings {
    return {
      user: {
        // Use this to uncouple links and users, even if each link could belogns to one user
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.id`,
          through: {
            modelClass: UsersLinks,
            from: `${UsersLinks.tableName}.link_id`,
            to: `${UsersLinks.tableName}.user_id`
          },
          to: `${User.tableName}.id`
        }
      }
    };
  }

  id!: number;
  shortened_url!: string;
  original_url!: string;
  clicks!: number;

  user!: User[];
}

export default Link;
