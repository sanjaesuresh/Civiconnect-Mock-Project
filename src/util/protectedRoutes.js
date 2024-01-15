import { getSession } from "next-auth/react";

export const protectedRoutes = (handler) => async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	return handler(context, session);
};

/*Protected routes are routes that require the user to be logged in to access them.
  This function will be used to protect routes that require the user to be logged in.

  Example:
  export const getServerSideProps = protectedRoutes(async (context, session) => {

	// const userResponse = await axios.get(
	// 	`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me?populate=*`,
	// 	{
	// 		headers: {
	// 			Authorization: `Bearer ${session.jwt}`,
	// 		},
	// 	}
	// );

	return {
		props: {
			events,
			strapiUserData: userResponse.data,
		},
	};
});
*/
