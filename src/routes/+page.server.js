import { searchNode, searchEdges } from '$lib/database';

export const load = (() => {
	const edges = searchEdges();
	const nodes = searchNode().map(({ id, body }) => ({
		id,
		properties: Object.keys(JSON.parse(body)).length,
		edges: edges.filter(e=>e.source == id)?.length ?? 0
	}));
	return { nodes };
})
