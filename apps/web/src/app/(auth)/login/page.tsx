import type { Route } from "next";
import Link from "next/link";
import { GitHubOAuthContainer } from "@/components/auth/github-oauth-container";
import Logo from "@/components/ui/logo";

export default function LoginPage() {
	return (
		<div className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-between gap-8 py-12">
			<Link href={"/" as Route}>
				<Logo className="size-6 text-(--gray-8)" />
			</Link>
			<GitHubOAuthContainer />
			<div>
				<p className="font-medium text-body-sm text-secondary-foreground">
					Don&apos;t have an account?{" "}
					<Link
						className="text-foreground underline underline-offset-2"
						href={"/waitlist" as Route}
					>
						Join waitlist
					</Link>
				</p>
			</div>
		</div>
	);
}
