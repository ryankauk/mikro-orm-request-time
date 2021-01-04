import { BaseEntity, Entity, PrimaryKey } from '@mikro-orm/core';
import { ObjectId } from 'mongoose';

@Entity({ tableName: 'apikeys' })
export class MyEntity extends BaseEntity<MyEntity, '_id'> {
  @PrimaryKey()
  _id!: ObjectId;
}
