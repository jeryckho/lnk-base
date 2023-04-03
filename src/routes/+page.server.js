import { searchNode, insertNode } from '$lib/database';

export const load = (() => {
	const nodes = searchNode().map(({ id, body }) => ({ id, properties: Object.keys(JSON.parse(body)).length, edges: 0 }));
	return { nodes };
})

// export const actions = {
// 	insertNode: async ({ request }) => {
// 		const data = await request.formData();
// 		const name = data.get('name')?.toString();
// 		console.log({name});
// 		insertNode(JSON.stringify({name}));
// 	},
// };