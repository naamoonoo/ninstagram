import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Feed } from "./Feed";

@Entity()
export class Hashtag extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false })
	tag: string;

	@ManyToMany(
		type => Feed,
		feed => feed.tags,
		{ onDelete: "SET NULL" } // ?
	)
	feeds: Feed[];

	@CreateDateColumn() createAt: string;

	@UpdateDateColumn() updateAt: string;
}
