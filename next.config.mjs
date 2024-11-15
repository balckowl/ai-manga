/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["bryodpsregrenzglhqon.supabase.co"],
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
