"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import type { Route } from "next";
import Link from "next/link";

const NORMAL_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

function AnimatedWords({
	text,
	className,
	delayOffset = 0,
}: {
	text: string;
	className?: string;
	delayOffset?: number;
}) {
	const shouldReduceMotion = useReducedMotion();
	const words = text.split(" ");

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 12,
				filter: "blur(8px)",
				scale: 0.97,
			};

	return (
		<>
			{words.map((word, i) => (
				<motion.span
					animate={{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						scale: 1,
					}}
					className={className}
					initial={initial}
					key={i}
					style={{ display: "inline-block", whiteSpace: "pre" }}
					transition={{
						delay: shouldReduceMotion ? 0 : delayOffset + i * WORD_STAGGER,
						duration: shouldReduceMotion ? 0 : 0.5,
						ease: shouldReduceMotion ? undefined : NORMAL_EASE,
					}}
				>
					{word}
					{i < words.length - 1 ? " " : ""}
				</motion.span>
			))}
		</>
	);
}

const WORD_STAGGER = 0.06;
const INITIAL_DELAY = 0.25;
const PHRASE1_WORDS = 5;
const PHRASE2_DELAY = INITIAL_DELAY + PHRASE1_WORDS * WORD_STAGGER + 0.15;
const PHRASE2_WORDS = 3;
const BODY_DELAY = PHRASE2_DELAY + PHRASE2_WORDS * WORD_STAGGER + 0.3;
const CTA_DELAY = BODY_DELAY + 0.25;

export function HeroHome() {
	const shouldReduceMotion = useReducedMotion();

	const initialParagraph = shouldReduceMotion
		? {
				opacity: 1,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				filter: "blur(10px)",
				scale: 0.97,
			};

	const initialCTA = shouldReduceMotion
		? {
				opacity: 1,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				filter: "blur(8px)",
				scale: 0.97,
			};

	return (
		<div className="relative mt-32">
			<div className="relative flex flex-col gap-8 text-balance">
				<div className="flex items-center text-wrap sm:max-w-lg md:max-w-3xl">
					<h1 className="text-balance font-semibold text-3xl md:text-5xl">
						<AnimatedWords
							delayOffset={INITIAL_DELAY}
							text="The review process your team has never had."
						/>
					</h1>
				</div>

				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0">
					<motion.p
						animate={{
							opacity: 1,
							filter: "blur(0px)",
							scale: 1,
						}}
						className="text-body-base text-secondary-foreground sm:max-w-lg md:max-w-3xl md:leading-7"
						initial={initialParagraph}
						transition={{
							delay: shouldReduceMotion ? 0 : BODY_DELAY,
							duration: shouldReduceMotion ? 0 : 0.6,
							ease: shouldReduceMotion ? undefined : NORMAL_EASE,
						}}
					>
						Where Changes get context, feedback gets meaning, and code ships
						faster.
					</motion.p>

					<motion.div
						animate={{
							opacity: 1,
							filter: "blur(0px)",
							scale: 1,
						}}
						className="hidden sm:flex"
						initial={initialCTA}
						transition={{
							delay: shouldReduceMotion ? 0 : CTA_DELAY,
							duration: shouldReduceMotion ? 0 : 0.45,
							ease: shouldReduceMotion ? undefined : NORMAL_EASE,
						}}
					>
						<Link
							className="group relative whitespace-nowrap text-body-base text-secondary-foreground transition-colors duration-150 ease-out hover:text-foreground"
							href={"/waitlist" as Route}
						>
							<span className="relative">
								Join waitlist
								<span className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
									&rarr;
								</span>
							</span>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
