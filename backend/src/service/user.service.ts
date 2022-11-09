import User from "../model/user.model";
import logger from "../utils/logger";
import { Query_Interface } from "../types/query.types";
import { User_Interface } from "../types/user.types";
import { generate_token } from "../utils/jwt";

export const CREATE_USER = async (
	input: User_Interface
): Promise<Query_Interface> => {
	try {
		const new_user: User_Interface = await User.create(input);
		logger.info(`A new user with id ${new_user?._id} have been created`);
		return {
			status: true,
			data: new_user,
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
		const action = "User login";

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
				action: action,
			};
		}

		const confirmPassword: Boolean = await user.comparePassword(password);

		if (user && confirmPassword) {
			return {
				data: { ...user?._doc, user_token: generate_token(user?._id) },
				status: true,
				action: action,
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
