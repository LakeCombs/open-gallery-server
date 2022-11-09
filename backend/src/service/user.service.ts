import User from "../model/user.model";
import logger from "../utils/logger";
import { Query_Interface } from "../types/query.types";
import { User_Interface } from "../types/user.types";
import { generate_token } from "../utils/jwt";
import bcrypt from "bcryptjs";

export const CREATE_USER = async (
	input: User_Interface
): Promise<Query_Interface> => {
	try {
		const new_user: User_Interface = await User.create(input);
		logger.info(`A new user with id ${new_user?._id} have been created`);
		return {
			status: true,
			data: { ...new_user?._doc, user_token: generate_token(new_user?._id) },
		};
	} catch (error: any) {
		logger.error(error);
		return {
			error: error.message || error,
			status: false,
		};
	}
};

export const LOGIN_USER = async ({
	input,
	password,
}: {
	input: string;
	password: string;
}): Promise<any> => {
	try {
		if (!input || !password) {
			return {
				status: false,
				error: "Please enter your email, phone of Username",
			};
		}

		const user: User_Interface | null = await User.findOne({
			$or: [
				{ email: input },
				{
					phone: input,
				},
				{
					username: input,
				},
			],
		});

		if (!user) {
			return {
				status: false,
				error: "No user found",
			};
		}

		const getPassword = await User.findOne(
			{
				$or: [
					{ email: input },
					{
						phone: input,
					},
					{
						username: input,
					},
				],
			},
			{ password }
		);

		const confirmPassword = await bcrypt.compare(
			password,
			getPassword?.password as unknown as string
		);

		if (user && confirmPassword) {
			return {
				status: true,
				data: { ...user?._doc, user_token: generate_token(user?._id) },
			};
		} else {
			return {
				status: false,
				error: `Sorry! your password is incorrect `,
			};
		}
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: ` an error occoured during login ${error.message || error}`,
			status: false,
		};
	}
};

export async function UPDATE_USER(
	id: string,
	update: User_Interface
): Promise<Query_Interface> {
	try {
		const updating: User_Interface | null = await User.findByIdAndUpdate(
			id,
			{ update },
			{ new: true }
		);
		logger.info(`User with id ${id} have been updated`);
		return {
			status: true,
			data: { ...updating?._doc, user_token: generate_token(updating?._id) },
		};
	} catch (error: any) {
		logger.error(error.message);
		return {
			error: `an error occoured while updating user ${error?.message || error}`,
			status: false,
		};
	}
}
