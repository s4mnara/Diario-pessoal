import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

 @Column({ nullable: true })
 idade?: number;

}

