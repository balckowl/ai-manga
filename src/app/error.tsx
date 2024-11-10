"use client";

export default function ErrorPage({ error }: { error: Error }) {
	return <div>{error.name}</div>;
}
