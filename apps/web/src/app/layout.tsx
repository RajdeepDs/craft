import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "../index.css";
import Script from "next/script";
import Providers from "@/components/providers";

const interVariable = localFont({
	src: "../assets/fonts/InterVariable.woff2",
	display: "swap",
	variable: "--font-inter",
	style: "normal",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Craft",
	description: "craft",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Script
				data-website-id="4cd7ce21-7f53-4683-ae09-275933e6bdd7"
				defer
				src="https://cloud.umami.is/script.js"
			/>
			<body
				className={`${interVariable.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					{children}
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}
