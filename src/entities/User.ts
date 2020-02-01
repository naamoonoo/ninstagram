import bcrypt from "bcrypt";
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { BCRYPT_ROUNDS } from "../constants";
import { Comment } from "./Comment";
import { Feed } from "./Feed";

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

	@Column({
		type: "text",
		default: "https://simpleicon.com/wp-content/uploads/user1.svg"
	})
	profilePhoto: string;

	@Column() email: string;

	@Column({ default: false }) isEmailVerified: boolean;

	@Column({ nullable: true }) phone: string;

	@Column({ default: false }) isPhoneVerified: boolean;

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

	public async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(this.password, password);
	}

	@BeforeInsert()
	@BeforeUpdate()
	async savePassword() {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	private async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}
