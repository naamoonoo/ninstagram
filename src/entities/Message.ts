import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: false })
	content: string;

	@ManyToOne(
		type => User,
		user => user.sentMessages
	)
	sender: User;

	@Column({ nullable: true })
	senderId: string;

	@ManyToOne(
		type => User,
		user => user.receivedMessages
	)
	receiver: User;

	@Column({ nullable: true })
	receiverId: string;

	@ManyToOne(
		type => Chat,
		chat => chat.messages
	)
	chat: Chat;

	@Column({ nullable: true })
	chatId: string;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
