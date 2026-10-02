import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entity/usuario.entity';

@Entity()
export class Reflexao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ length: 50, nullable: true })
  humor?: string;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
