import { BaseModel } from '@/models/base.model';
import Link from '@/models/link.model';
import { Model, RelationMappings } from 'objection';

class LinkAccess extends BaseModel {
  static tableName: string = 'links_access';

  static get relationMappings(): RelationMappings {
    return {
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
  ip_address!: string;
  user_agent!: string;
  metadata!: object;
  link_id!: number;

  link!: Link;
}

export default LinkAccess;
