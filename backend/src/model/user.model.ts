import { User_Interface } from "./../types/user.types";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema<User_Interface>(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: [true, "Email must be unique"],
			match:
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
		},
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		username: {
			type: String,
			unique: [true, "This user name have already exist"],
		},
		phone: {
			type: String,
			unique: [true, "This user already exist"],
		},
		facebook_url: {
			type: String,
		},
		instagram_url: {
			type: String,
		},
		twitter_url: {
			type: String,
		},
		gallery: [{ type: Schema.Types.ObjectId, ref: "Image" }],
		quote: {
			type: String,
		},
		profile_image: {
			type: String,
		},
		password: {
			type: String,
			minlength: [6, "Password should have at least 6 characters"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	let user = this as User_Interface;
	if (!user.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
});

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	const user = this as User_Interface;
	return bcrypt.compare(password, user.password).catch(() => false);
};

const usermodel = model<User_Interface>("User", UserSchema);

export default usermodel;
