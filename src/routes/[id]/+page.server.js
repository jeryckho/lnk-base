import { searchNode } from '$lib/database';

export const load = (({ params }) => {
	// console.log(params.id);
	// console.log(searchNode(params.id));
	return { node: searchNode(params.id)?.[0], id: params.id };
})
