import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import Head from "next/head";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import { ReactElement } from "react";
import { globalSiteTitle } from "~/utils/global";
import Link from "next/link";
import { LayoutPublic } from "~/components/layouts/layout";
import LoginForm from "~/components/auth/loginForm";

const Login = ({ auth }) => {
	const title = `${globalSiteTitle} - Sign In`;
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col">
				{/* Main section */}
				<div className="flex flex-grow items-center">
					<div className="mx-auto flex">
						<div className="z-10 sm:max-w-2xl md:p-10 xl:max-w-2xl">
							<div className="hidden flex-col self-start text-white lg:flex">
								{/* <img src="" className="mb-3" /> */}
								<div className="md:mb-10">
									<h1 className="mb-3  text-5xl font-bold">
										Hi, Welcome {auth ? "Back" : null}
									</h1>
									{auth?.name && (
										<h2 className="mb-3 text-center text-4xl font-bold text-slate-200">
											{auth.name}
										</h2>
									)}
								</div>
								<p className="pr-3">
									ZeroTier VPN is your key to boundless connectivity and ultimate privacy.
									Experience a secure and borderless digital world, free from limitations.
									Empower yourself with unmatched performance, while safeguarding your
									data.
								</p>
							</div>
							{auth && (
								<div className="mt-10">
									<Link href="/dashboard">
										<button className="btn btn-block">Goto Dashboard</button>
									</Link>
								</div>
							)}
						</div>
						<LoginForm />
						{/* show register form or login form based on the auth props  */}
						{/* {!auth &&
							(viewRegisterForm ? (
								<RegisterForm />
							) : viewForgotForm ? (
								<ForgotPasswordForm />
							) : (
								<LoginForm setViewForgotForm={setViewForgotForm} />
							))} */}
					</div>
				</div>
			</main>
		</>
	);
};

interface Props {
	auth?: Session["user"];
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	context: GetServerSidePropsContext,
) => {
	const session = await getSession(context);
	const messages = (await import(`~/locales/${context.locale}/common.json`)).default;

	if (!session || !("user" in session)) {
		return { props: { messages } };
	}

	if (session.user) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	return {
		props: { auth: session.user, messages },
	};
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <LayoutPublic>{page}</LayoutPublic>;
};

export default Login;
