import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
export class Feed extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text" })
	photo: string;

	@Column({ type: "text", nullable: true })
	text: string;

	@ManyToOne(
		type => User,
		user => user.feeds
	)
	user: User;

	@OneToMany(
		type => Like,
		like => like.feed
	)
	likes: Like[];

	@OneToMany(
		type => Comment,
		comment => comment.feed
	)
	comments: Comment[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
