import {
  BaseEntity,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
// import { ObjectId } from 'mongoose';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({})
export class MyEntity extends BaseEntity<MyEntity, '_id'> {
  @PrimaryKey()
  _id!: ObjectId;

  @Property({ fieldName: 'testtwo' })
  test: string;
}

@Entity({})
export class MyEntityTwo extends BaseEntity<MyEntityTwo, '_id'> {
  @PrimaryKey()
  _id!: ObjectId;

  @ManyToOne(() => MyEntity, { fieldName: 'asdf' })
  entity: IdentifiedReference<MyEntity>;
}
