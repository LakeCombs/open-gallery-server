export interface JWTDecode {
	valid: Boolean;
	expired: string | boolean;
	decoded: any | null;
}
