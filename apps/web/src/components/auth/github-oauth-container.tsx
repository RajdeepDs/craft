"use client";

import { Button } from "@craft/ui/components/button";
import { GitHub, Icon } from "@craft/ui/components/icon";
import { AnimatePresence, motion } from "motion/react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
} as const;

const itemVariants = {
	hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const },
	},
} as const;

const exitVariants = {
	opacity: 0,
	y: -8,
	filter: "blur(4px)",
	transition: { duration: 0.15, ease: "easeIn" as const },
} as const;

const DEFAULT_SIGN_IN_ERROR_MESSAGE = "Something went wrong. Please try again.";

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	return DEFAULT_SIGN_IN_ERROR_MESSAGE;
}

function AuthErrorToast() {
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const error = searchParams.get("error");
		if (error) {
			const formattedError = error.replace(/_/g, " ");
			toast.error(
				formattedError === "UNAUTHORIZED" || formattedError.includes("waitlist")
					? "You're on the waitlist. We'll notify you once you're approved."
					: getErrorMessage(formattedError),
				{ id: "auth-error" }
			);
			router.replace("/login", { scroll: false });
		}
	}, [searchParams, router]);

	return null;
}

export function GitHubOAuthContainer() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const signIn = async (): Promise<void> => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			const result = await authClient.signIn.social({ provider: "github" });

			if (result?.error) {
				toast.error(result.error.message || DEFAULT_SIGN_IN_ERROR_MESSAGE);
				setIsLoading(false);
			} else {
				// Get current session to check onboarding status
				const session = await authClient.getSession();

				if (session?.data?.user) {
					const onboardingCompleted = (
						session.data.user as Record<string, unknown>
					).onboardingCompleted;

					if (onboardingCompleted) {
						router.push("/dashboard" as Route);
					} else {
						router.push("/welcome" as Route);
					}
				}
			}
		} catch (error: unknown) {
			toast.error(getErrorMessage(error));
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			animate="visible"
			className="relative flex w-full flex-col items-center justify-center gap-7"
			initial="hidden"
			variants={containerVariants}
		>
			<Suspense>
				<AuthErrorToast />
			</Suspense>

			<motion.h1
				className="text-balance text-center font-medium text-h3"
				variants={itemVariants}
			>
				Welcome to craft
			</motion.h1>

			<AnimatePresence initial={false} mode="wait">
				{isLoading ? (
					<motion.div
						animate="visible"
						className="flex flex-col items-center justify-center gap-7"
						exit={exitVariants}
						initial="hidden"
						key="loading"
						variants={containerVariants}
					>
						<motion.div className="relative size-5" variants={itemVariants}>
							<motion.div
								animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
								transition={{
									duration: 1.2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<Icon className="size-5" name="IconLoader" />
							</motion.div>
						</motion.div>

						<motion.p
							className="text-center text-body-sm text-secondary-foreground"
							variants={itemVariants}
						>
							Redirecting to GitHub…
						</motion.p>
					</motion.div>
				) : (
					<motion.div
						animate="visible"
						className="flex w-full flex-col items-center justify-center gap-7"
						exit={exitVariants}
						initial="hidden"
						key="default"
						variants={containerVariants}
					>
						<motion.div className="w-full" variants={itemVariants}>
							<Button
								className="h-10 w-full"
								disabled={isLoading}
								onClick={signIn}
								size={"lg"}
								variant={"secondary"}
							>
								<GitHub className="mr-2 size-4" />
								Sign in with GitHub
							</Button>
						</motion.div>

						<motion.p
							className="text-center text-caption text-secondary-foreground"
							variants={itemVariants}
						>
							By signing in, you agree to our{" "}
							<strong className="font-medium underline underline-offset-2">
								Terms of Service
							</strong>{" "}
							and{" "}
							<strong className="font-medium underline underline-offset-2">
								Privacy Policy
							</strong>
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
