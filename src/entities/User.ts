import bcrypt from "bcrypt";
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { BCRYPT_ROUNDS } from "../types/constants";
import { Comment } from "./Comment";
import { Feed } from "./Feed";
import { Like } from "./Like";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", nullable: true, unique: true })
	fbId: string;

	@Column({ type: "text", nullable: true, unique: true })
	googleId: string;

	@Column({ type: "text" })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	password: string;

	@Column({
		type: "text",
		nullable: true,
		default: "https://simpleicon.com/wp-content/uploads/user1.svg"
	})
	profilePhoto: string;

	@Column({ nullable: true, unique: true }) email: string;

	@Column({ default: false }) isEmailVerified: boolean;

	@Column({ nullable: true, unique: true }) phone: string;

	@Column({ default: false }) isPhoneVerified: boolean;

	@OneToMany(
		type => Feed,
		feed => feed.user
	)
	feeds: Feed[];

	@OneToMany(
		type => Like,
		like => like.user
	)
	likes: Like[];

	@OneToMany(
		type => Comment,
		comment => comment.user
	)
	comments: Comment[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;

	public comparePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
		// compare(data: any, encrypted: string,...)
	}

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		console.log("befor insert!");
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}
