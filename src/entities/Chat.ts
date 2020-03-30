import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@Entity()
export class Chat extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: false })
	content: string;

	@ManyToMany(
		type => User,
		user => user.chats,
		{ onDelete: "CASCADE" } // ?
	)
	users: User[];

	@OneToMany(
		type => Message,
		messages => messages.chat
	)
	messages: Message[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
