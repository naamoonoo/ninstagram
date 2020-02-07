import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Feed } from "./Feed";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: false })
	comment: string;

	@ManyToOne(
		type => User,
		user => user.comments
	)
	user: User;

	@Column({ nullable: true })
	userId: string;

	@ManyToOne(
		type => Feed,
		feed => feed.comments
	)
	feed: Feed;

	@Column({ nullable: true })
	feedId: string;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
