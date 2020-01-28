import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Feed extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: "text" })
	photo: string;

	@Column({ type: "text" })
	text: string;

	@ManyToOne(
		type => User,
		user => user.feeds
	)
	user: User;

	@ManyToMany(
		type => User,
		user => user.likes
	)
	likes: User[];

	@OneToMany(
		type => Comment,
		comment => comment.feed
	)
	comments: Comment[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
