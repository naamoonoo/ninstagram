import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { EMAIL, PHONE } from "../types/constants";
import { User } from "./User";

@Entity()
export class Verification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: "text", enum: { EMAIL, PHONE } })
	type: string;

	@Column({ type: "text", nullable: false })
	payload: string;

	@Column({ type: "text" })
	key: string;

	@Column({ type: "boolean", default: false })
	isVerified: boolean;

	@OneToOne(
		type => User,
		user => user.email || user.phone
	)
	@JoinColumn()
	user: User;

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;

	@BeforeInsert()
	createKey(): void {
		if (this.type === PHONE) {
			this.key = Math.random()
				.toString(10)
				.substr(2, 4);
		} else if (this.type === EMAIL) {
			this.key = Math.random()
				.toString(36)
				.substr(2, 8);
		}
	}
}
