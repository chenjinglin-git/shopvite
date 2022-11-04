import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column({
    type: 'varchar',
    name: 'username',
    length: 64,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 128,
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'mobile',
    length: 255,
    nullable: true,
    default: null,
    unique: true,
  })
  mobile: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
    nullable: true,
    default: null,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', name: 'headImage', nullable: true, default: null })
  headImage: string;

  @Column('varchar', {
    name: 'accessToken',
    length: 256,
    nullable: true,
    default: null,
  })
  accessToken: string;
}
