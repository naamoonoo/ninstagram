import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Verification {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: "text", enum: { EMAIL, PHONE } })
	type: string;

	@Column({ type: "text", nullable: false, unique: true })
	payload: string;

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
}
