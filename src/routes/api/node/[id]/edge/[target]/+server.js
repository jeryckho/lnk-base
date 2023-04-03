import { findEdge } from '$lib/database';
import { json } from '@sveltejs/kit';

export const GET = (({ params }) => {
	const id = params.id;
    const target = params.target;

	const edges = findEdge(id, target) ?? [];

	return json(edges);
})
