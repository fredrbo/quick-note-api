import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Note } from './Note';
import { Task } from './Task';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Note, note => note.cards)
  note: Note;

  @OneToMany(() => Task, task => task.card)
  tasks: Task[];
}
