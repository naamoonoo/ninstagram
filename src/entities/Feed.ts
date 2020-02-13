import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Comment } from "./Comment";
import { Hashtag } from "./Hashtag";
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

	@ManyToMany(
		type => Hashtag,
		tags => tags.feeds
	)
	@JoinTable()
	tags: Hashtag[];

	@CreateDateColumn() createAt: string;
	@UpdateDateColumn() updateAt: string;

	@BeforeInsert()
	@BeforeUpdate()
	getTags = async () => {
		const tags: string[] = [];
		this.text.split(" ").forEach(word => {
			if (word.startsWith("#")) {
				const tag = word.substr(1);
				tags.push(tag);
			}
		});
		await tags.forEach(async tag => await this.generateTags(tag));
	};

	private generateTags = async (tag: string) => {
		const existedTag = await Hashtag.findOne(
			{ tag },
			{ relations: ["feeds"] }
		);
		if (existedTag) {
			existedTag.feeds.push(this);
			existedTag.save();
		} else {
			await Hashtag.create({ tag, feeds: [this] }).save();
		}
	};
}
