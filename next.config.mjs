/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
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
