import { findEdge, insertEdge } from '$lib/database';
import { json } from '@sveltejs/kit';

export const GET = (({ params }) => {
	const id = params.id;
	const target = params.target;

	const edges = findEdge(id, target) ?? [];

	return json(edges);
})

export const PUT = async ({ params, request }) => {
	const id = params.id;
	const target = params.target;
	const node = await request.json();

	const resu = insertEdge(id, target, JSON.stringify(node));

	return json(resu);
}
