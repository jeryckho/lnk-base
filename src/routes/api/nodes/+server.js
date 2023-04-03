import { searchNode, insertNode } from '$lib/database';
import { json } from '@sveltejs/kit';


export const GET = (({ url }) => {
	const searchTerm = url.searchParams.get('searchTerm')?.toString();

	const nodes = searchNode(searchTerm) ?? [];

	return json(nodes.map(({ id, body }) => ({ id, body: JSON.parse(body) })));
})

export const POST = async ({ request }) => {
	const nodes = await request.json();

	const resu = [];
	for (const {body} of nodes) {
		resu.push(insertNode(JSON.stringify(body)));
	}

	return json(resu);
}