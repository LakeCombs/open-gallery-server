import jwt from "jsonwebtoken";
import { JWTDecode } from "../types/JWTDecode.interface";

export function generate_token(payload: object): string {
	return jwt.sign({ payload }, process.env.JWT_PRIVATE_KEY as string);
}

export function verifyJWT(token: string): JWTDecode {
	try {
		const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
		return {
			valid: true,
			expired: false,
			decoded: decode,
		};
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
}
