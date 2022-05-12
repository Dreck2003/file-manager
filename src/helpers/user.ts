import bcrypt from "bcryptjs";

/**
 *
 * @param password Is a Body.password request
 * @returns `String` Is a password hash
 */
export const encrypPass = async (password: string): Promise<string> => {
	try {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.log("Error in encryptPass");
		return "";
	}
};

/**
 *
 * @param password Is a body.password => user Password
 * @param hash Is a real user Password
 * @returns `Boolean` If es equal to between these passwords
 */
export const validatePass = async (
	password: string,
	hash: string
): Promise<boolean> => {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		console.log("Error in validatePass: ", error);
		return false;
	}
};


