import { insertEdge } from '$lib/database';
import { json } from '@sveltejs/kit';


export const POST = async ({ params, request }) => {
    const id = params.id;
	const {target, ...node} = await request.json();

	const resu = insertEdge(id, target, JSON.stringify(node));

	return json(resu);
}