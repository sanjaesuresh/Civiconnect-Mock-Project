import axios from "axios";
import { signIn } from "next-auth/react";
import router from "next/router";

export const registerUser = async (user) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`,
			{
				username: user.email,
				email: user.email,
				password: user.confirmPassword,
			}
		);

		if (response.status === 200) {
			try {
				await signIn("credentials", {
					email: user.email,
					password: user.confirmPassword,
					redirect: false,
					jwt: response.data.jwt,
				}).then(({ ok }) => {
					if (ok) {
						router.push(user.redirectTo);
					} else {
						console.error("Credentials do not match!", { type: "error" });
					}
				});
			} catch (error) {
				console.error(error);
			}

			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.warn(error);
		return false;
	}
};

export const LoginUser = async (user) => {
	try {
		await signIn("credentials", {
			email: user.email,
			password: user.password,
			redirect: false,
		}).then(({ ok, error }) => {
			if (ok) {
				router.push(user.redirectTo); // This defines the page to redirect to after login
			} else {
				//toast.warn("Invalid credentials or email not verified");
				console.error(error);
				return false;
			}
		});

		return true;
	} catch (error) {
		console.warn(error);
		return false;
	}
};
