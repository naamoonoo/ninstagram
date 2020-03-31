import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Message } from "./Message";

@Entity()
export class Chat extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToMany(
		type => Message,
		messages => messages.chat
	)
	messages: Message[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
