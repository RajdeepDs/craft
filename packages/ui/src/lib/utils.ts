import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				{
					text: [
						"body",
						"body-lg",
						"body-sm",
						"caption",
						"display",
						"display-lg",
						"display-xl",
						"h1",
						"h2",
						"h3",
						"label",
					],
				},
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
