import { Entity, Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class log_info {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    date: string;
    @Column()
    userid: string;
    @Column()
    username: string;
    @Column()
    operate: string;
}