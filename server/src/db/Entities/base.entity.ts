import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
