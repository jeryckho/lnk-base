import { searchNode, searchEdges } from '$lib/database';

export const load = (({ params }) => {
	return {
		id: params.id,
		node: searchNode(params.id)?.[0],
		edges: searchEdges(params.id).map(({source, target, properties}) => ({source, target, properties: Object.keys(JSON.parse(properties)).length,}))
	};
})
