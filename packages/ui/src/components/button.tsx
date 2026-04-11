import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@craft/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const buttonVariants = cva("cft-btn cft-btn-rounded", {
	variants: {
		variant: {
			primary: "cft-btn-primary",
			secondary: "cft-btn-secondary",
			tertiary: "cft-btn-tertiary",
			brand: "cft-btn-brand",
			danger: "cft-btn-danger",
			dangerSubtle: "cft-btn-danger-subtle",
			transparent: "cft-btn-transparent",
		},
		size: {
			sm: "cft-btn-sm",
			md: "cft-btn-md",
			lg: "cft-btn-lg",
			xl: "cft-btn-xl",
			icon: "cft-btn-icon cft-btn-icon-lg",
			"icon-xs": "cft-btn-icon cft-btn-icon-xs",
			"icon-sm": "cft-btn-icon cft-btn-icon-sm",
			"icon-lg": "cft-btn-icon cft-btn-icon-lg",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

function Button({
	className,
	variant = "primary",
	size = "lg",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ variant, size }), className)}
			data-slot="button"
			{...props}
		/>
	);
}

interface SharedLinkProps extends VariantProps<typeof buttonVariants> {
	children: ReactNode;
	className?: string;
}

export type ButtonLinkProps = Omit<
	ComponentPropsWithoutRef<typeof Link>,
	"className"
> &
	SharedLinkProps;

function ButtonLink({
	children,
	className,
	variant = "primary",
	size = "lg",
	...props
}: ButtonLinkProps) {
	return (
		<Link
			className={cn(buttonVariants({ variant, size }), className)}
			data-slot="button-link"
			{...props}
		>
			{children}
		</Link>
	);
}

export { Button, ButtonLink, buttonVariants };
