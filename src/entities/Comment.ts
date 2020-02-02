import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
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

	@OneToOne(
		type => User,
		user => user.comments
	)
	@JoinColumn()
	user: User;

	@ManyToOne(
		type => Feed,
		feed => feed.comments
	)
	feed: Feed;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
