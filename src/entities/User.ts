import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Comment } from "./Comment";
import { Feed } from "./Feed";
import { Verification } from "./Verification";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: "text", nullable: true, unique: true })
	fbId: string;

	@Column({ type: "text", nullable: true, unique: true })
	googleId: string;

	@Column({ type: "text" })
	firstName: string;

	@Column({ type: "text" })
	lastName: string;

	@Column({ type: "text" })
	password: string;

	@Column({ type: "text" })
	profilePhoto: string;

	@OneToOne(
		type => Verification,
		verification => verification.user
	)
	@JoinColumn()
	email: Verification;

	@Column({ type: "text" })
	emailId: string;

	@OneToOne(
		type => Verification,
		verification => verification.user
	)
	@JoinColumn()
	phone: Verification;

	@Column({ type: "text" })
	phoneId: string;

	@OneToMany(
		type => Feed,
		feed => feed.user
	)
	feeds: Feed[];

	@ManyToMany(
		type => Feed,
		feed => feed.likes
	)
	likes: Feed[];

	@OneToMany(
		type => Comment,
		comment => comment.user
	)
	comments: Comment[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
