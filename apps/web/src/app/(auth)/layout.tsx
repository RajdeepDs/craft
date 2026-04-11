export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="h-full w-full rounded-lg bg-background-1 p-8 shadow-md">
				{children}
			</div>
		</div>
	);
}
