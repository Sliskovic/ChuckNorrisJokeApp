import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user.' })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  @ApiProperty({ description: 'The email address of the user.' })
  email: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'The password of the user.' })
  password: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'The first name of the user.' })
  firstName: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'The last name of the user.' })
  lastName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ description: 'The creation date of the user.' })
  createdAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
