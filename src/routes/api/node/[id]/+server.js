import { searchNode, updateNode, deleteNode } from '$lib/database';
import { json } from '@sveltejs/kit';

export const GET = (({ params }) => {
	const id = params.id;

	const nodes = searchNode(id) ?? [];

	return json(nodes.map(({ id, body }) => ({ id, body: JSON.parse(body) })));
})


export const PUT = async ({ params, request }) => {
	const id = params.id;
	const node = await request.json();

	const resu = updateNode(id,JSON.stringify(node));

	return json(resu);
}

export const DELETE = async ({ params }) => {
	const id = params.id;

	const resu = deleteNode(id);

	return json(resu);
}