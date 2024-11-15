/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["rxovnhiscvdvedeupiat.supabase.co"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**", // すべてのホストを許可
			},
		],
	},
	output: "standalone",
};

export default nextConfig;
