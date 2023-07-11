import { Entity, Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm'
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity()
export class User_info {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    e_mail: string;
    @Column()
    lteration: number;
    @Column()
    random: number;
    @Column()
    frezz: boolean;
    @Column()
    admin: boolean;
    @Column()
    lastdate: string;
}
