import { User_Interface } from "./../types/user.types";
import { Query_Interface } from "../types/query.types";
import logger from "../utils/logger";
import { Post_Interface } from "./../types/post.types";
import Post from "../model/post.model";

export const CREATE_POST = async (
	user_id: string,
	input: Post_Interface
): Promise<Query_Interface> => {
	try {
		const new_post = await Post.create({
			...input,
			user_id,
		});
		logger.info(`a new post have been created  with id ${new_post?._id}`);
		return {
			status: true,
			data: new_post,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while creating a post ${error?.message || error}`
		);
		return { status: false, error: error?.message || error };
	}
};

export const UPDATE_POST = async ({
	id,
	update,
}: {
	id: string;
	update: Post_Interface;
}): Promise<Query_Interface> => {
	try {
		const updated: Post_Interface | null = await Post.findByIdAndUpdate(
			id,
			{ update },
			{ new: true }
		);
		logger.info(`post with id ${id} have been updated`);
		return {
			status: true,
			data: updated,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while updating post ${error?.message || error}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const GET_ALL_POST = async (): Promise<Query_Interface> => {
	try {
		const allPost: Post_Interface[] = await Post.find();
		logger.info(`you have fetched all post`);
		return {
			status: true,
			data: allPost,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while fetching all post ${error?.message || error}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const GET_POST_BY_ID = async (id: string): Promise<Query_Interface> => {
	try {
		const post: Post_Interface | null = await Post.findById(id);
		logger.info(`post with id ${id} was fetche`);
		return {
			status: true,
			data: post,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while fetching all post by id ${error?.message || error}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const DELETE_POST_BY_ID = async (
	id: string,
	user: User_Interface
): Promise<Query_Interface> => {
	try {
		if (!user?.isAdmin || (await Post.findById(id))?.user_id !== user?._id) {
			logger.warn(`somebody tried to delete another person's post`);
			return {
				status: false,
				error: `Sorry! you can only delete the post you created`,
			};
		}
		const post: Post_Interface | null = await Post.findOneAndDelete({
			_id: id,
		});

		logger.info(`post with id ${id} was delted`);
		return {
			status: true,
			data: post,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while deleting all post by id ${error?.message || error}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const GET_POST_BY_USER = async (
	user: string
): Promise<Query_Interface> => {
	try {
		const postbyUser: Post_Interface[] | null = await Post.find({
			user_id: user,
		});
		logger.info(`You fetched all the post by user`);
		return {
			status: true,
			data: postbyUser,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while fetching all post by user ${
				error?.message || error
			}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const GET_POST_BY_CATEGORY = async (
	category: string
): Promise<Query_Interface> => {
	try {
		const postByCategory: Post_Interface[] | null = await Post.find({
			$in: {
				category: category,
			},
		});
		logger.info(`You have fetched post by category`);

		return {
			status: true,
			data: postByCategory,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while fetching post by category ${
				error?.message || error
			}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const GET_POST_BY_KEYWORD = async (
	keyword: string
): Promise<Query_Interface> => {
	try {
		const postByKeyword: Post_Interface[] | null = await Post.find({
			$or: [
				{ description: { $regex: keyword, $options: "i" } },
				{
					category: { $in: [keyword] },
				},
				{ "user_id?.username": { $regex: keyword, $options: "i" } },
			],
		});
		logger.info(`You have fetched post by keyword ${keyword}`);

		return {
			status: true,
			data: postByKeyword,
		};
	} catch (error: any) {
		logger.error(
			`an error occour while fetching post by keyword ${
				error?.message || error
			}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};

export const LIKE_A_POST = async (
	id: string,
	userid: string
): Promise<Query_Interface> => {
	try {
		const likeing: Post_Interface | null = await Post.findOneAndUpdate(
			{ _id: id },
			[
				{
					$set: {
						likes: {
							$cond: {
								if: {
									$in: [userid, "$likes"],
								},
								then: {
									$pull: {
										$likes: userid,
									},
								},
								else: {
									$concatArrays: ["$likes", [userid]],
								},
							},
						},
					},
				},
			]
		);

		logger.info(`user with id ${userid} liked the post with id ${id}`);
		return {
			status: true,
			data: likeing,
		};
	} catch (error: any) {
		logger.error(
			`an error occoured while liking a post ${error?.message || error}`
		);
		return {
			status: false,
			error: error?.message || error,
		};
	}
};
