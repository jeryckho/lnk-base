import { insertNode } from '$lib/database';
import { json } from '@sveltejs/kit';


export const POST = async ({ request }) => {
	const node = await request.json();

	const resu = insertNode(JSON.stringify(node));

	return json(resu);
}