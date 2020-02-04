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
export class Like extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true })
	feedId: string;

	@ManyToOne(
		type => Feed,
		feed => feed.likes
	)
	feed: Feed;

	@Column({ nullable: true })
	userId: string;

	@ManyToOne(
		type => User,
		user => user.likes
	)
	user: User;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
