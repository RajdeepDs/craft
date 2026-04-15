"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";

const NORMAL_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const STAGGER_DELAY = 0.08;

function AnimatedParagraph({
	children,
	delayOffset = 0,
}: {
	children: React.ReactNode;
	delayOffset?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 8,
				filter: "blur(4px)",
				scale: 0.98,
			};

	return (
		<motion.p
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="text-body-sm text-secondary-foreground"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.5,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			{children}
		</motion.p>
	);
}

function AnimatedHeading({
	children,
	delayOffset = 0,
}: {
	children: React.ReactNode;
	delayOffset?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 10,
				filter: "blur(6px)",
				scale: 0.98,
			};

	return (
		<motion.h2
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="text-balance font-medium text-h3 text-primary-foreground"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.45,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			{children}
		</motion.h2>
	);
}

function AnimatedDivider({ delayOffset = 0 }: { delayOffset?: number }) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				scaleX: 1,
				opacity: 0.3,
			}
		: {
				scaleX: 0,
				opacity: 0,
			};

	return (
		<motion.hr
			animate={{
				scaleX: 1,
				opacity: 0.3,
			}}
			className="my-4 origin-left"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.4,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		/>
	);
}

function AnimatedSignature({ delayOffset = 0 }: { delayOffset?: number }) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 6,
				filter: "blur(4px)",
				scale: 0.98,
			};

	return (
		<motion.div
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="flex flex-col gap-1 pt-8 text-body-sm text-secondary-foreground"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.45,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			<span className="text-body-lg text-primary-foreground">Rajdeep</span>
			<span>Founder, OneLens</span>
		</motion.div>
	);
}

export function FounderLetter() {
	const shouldReduceMotion = useReducedMotion();

	const INITIAL_DELAY = shouldReduceMotion ? 0 : 0.8;
	const HEADING_DELAY = INITIAL_DELAY + STAGGER_DELAY;
	const DIVIDER_DELAY = HEADING_DELAY + STAGGER_DELAY;
	const PARA_1_DELAY = DIVIDER_DELAY + STAGGER_DELAY;
	const PARA_2_DELAY = PARA_1_DELAY + 0.15;
	const PARA_3_DELAY = PARA_2_DELAY + 0.15;
	const PARA_4_DELAY = PARA_3_DELAY + 0.12;
	const PARA_5_DELAY = PARA_4_DELAY + 0.1;
	const PARA_6_DELAY = PARA_5_DELAY + 0.15;
	const PARA_7_DELAY = PARA_6_DELAY + 0.15;
	const SIG_DELAY = PARA_7_DELAY + 0.15;

	const containerInitial = shouldReduceMotion
		? { opacity: 1, filter: "blur(0px)" }
		: { opacity: 0, filter: "blur(8px)" };

	return (
		<motion.section
			animate={{ opacity: 1, filter: "blur(0px)" }}
			className="relative mx-auto my-28 max-w-2xl rounded-2xl bg-page p-4 shadow-standout/5 shadow-xl sm:p-12"
			initial={containerInitial}
			transition={{
				delay: shouldReduceMotion ? 0 : INITIAL_DELAY - 0.3,
				duration: shouldReduceMotion ? 0 : 0.6,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			<div className="flex flex-col gap-4">
				<AnimatedHeading delayOffset={HEADING_DELAY}>
					Introducing Craft
				</AnimatedHeading>
				<AnimatedDivider delayOffset={DIVIDER_DELAY} />

				<AnimatedParagraph delayOffset={PARA_1_DELAY}>
					I've watched engineering teams lose weeks every year to a problem
					nobody talks about:{" "}
					<span className="text-primary-foreground">
						code review has no process.
					</span>
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_2_DELAY}>
					Not because developers are careless. Not because teams don't care
					about quality. But because nobody has ever built a real product for
					the review workflow. GitHub gives you a diff viewer and a comment box.
					That's not a process — that's a file viewer with a thread attached.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_3_DELAY}>
					The result is familiar to anyone who's shipped software. PRs that sit
					for two days because nobody knows who's responsible. Reviewers who
					leave forty comments with no indication of what's actually blocking
					the merge. Authors who read{" "}
					<em className="text-primary-foreground">
						"looks mostly good but a few things"
					</em>{" "}
					and have no idea what to fix first. Engineering leads who ask{" "}
					<em className="text-primary-foreground">"why is velocity down?"</em>{" "}
					and get shrugged shoulders.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_4_DELAY}>
					Teams aren't bad at code review. They've just never had a product that
					takes it seriously.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_5_DELAY}>
					<span className="text-primary-foreground">Craft</span> is that
					product. It's not a better diff viewer. It's not an AI that summarizes
					your PR. It's the workflow layer that has always been missing —
					structured context on every change, feedback that means something,
					verdicts that tell everyone exactly what happens next.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_6_DELAY}>
					We're building this for the engineering lead who is tired of review
					being a black box. For the senior engineer who cares about how their
					team works, not just what they ship. For the team that wants to get
					better at the most important part of software development — the moment
					before code ships.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_7_DELAY}>
					We&apos;re just getting started. If this resonates, we&apos;d love to
					hear from you.
				</AnimatedParagraph>

				<AnimatedSignature delayOffset={SIG_DELAY} />
			</div>
		</motion.section>
	);
}
