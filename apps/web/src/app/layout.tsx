import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "../index.css";
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
