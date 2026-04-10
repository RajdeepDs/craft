import type { Route } from "next";
import Link from "next/link";

export function HeroHome() {
	return (
		<div className="relative mt-32">
			<div className="relative flex flex-col gap-8 text-balance">
				<div className="flex items-center text-wrap sm:max-w-lg md:max-w-3xl">
					<h1 className="text-balance font-semibold text-4xl leading-10 tracking-tight md:text-[56px] md:leading-13 md:tracking-normal">
						Ship code without the chaos of pull requests.
					</h1>
				</div>

				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0">
					<p className="text-[15px] text-gray-11 leading-6 sm:max-w-lg md:max-w-3xl md:leading-7">
						Craft is a structured workflow for code review — with intent, typed
						feedback, and clear outcomes. So changes move from ready to shipped
						in hours, not days.
					</p>

					<div className="hidden sm:flex">
						<Link
							className="group relative whitespace-nowrap text-[15px] text-gray-11 transition-colors duration-150 ease-out hover:text-foreground"
							href={"/waitlist" as Route}
						>
							<span className="relative">
								Join waitlist
								<span className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
									&rarr;
								</span>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
