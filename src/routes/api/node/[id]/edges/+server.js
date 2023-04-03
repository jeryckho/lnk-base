import { searchEdges } from '$lib/database';
import { json } from '@sveltejs/kit';


export const GET = (({ url, params }) => {
	const searchTerm = url.searchParams.get('searchTerm')?.toString();
    const id = params.id;

	// const nodes = searchNode(searchTerm) ?? [];
    const edges = searchEdges(id);

	return json(edges);
})