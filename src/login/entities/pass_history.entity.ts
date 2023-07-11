import { Entity, Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class pass_history {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    date: string;
    @Column()
    username: string;
    @Column()
    password: string;
}