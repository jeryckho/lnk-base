<script>
	import { goto } from "$app/navigation";
	export let data;
	let loading = "";

	const addNode = async ({ target }) => {
		const ACTION_URL = target.action;

		const formData = new FormData(target);
		let frm = {};
		for (let [key, value] of formData) {
			frm[key] = value;
		}
		target.reset();

		const orig = data.nodes;
		try {
			data.nodes = [...data.nodes, { id: frm.name, properties: 1 }];
			const ret = await fetch(ACTION_URL, {
				method: "POST",
				body: JSON.stringify(frm),
			});
			if (!ret.ok) throw "Bad";
		} catch (error) {
			data.nodes = orig;
		}
	};

	const delNode = async (id) => {
		if (confirm()) {
			const ACTION_URL = `/api/node/${id}`;

			const orig = data.nodes;
			try {
				data.nodes = data.nodes.filter((n) => n.id != id);
				const ret = await fetch(ACTION_URL, {
					method: "DELETE",
				});
				if (!ret.ok) throw "Bad";
			} catch (error) {
				data.nodes = orig;
			}		
		}
	};

	const goat = async (id) => {
		loading = id;
		goto('/'+id);
	}
</script>

<div class="columns">
	<div class="column"> </div>
	<div class="column is-half">
		<nav class="panel">
			<p class="panel-heading">Nodes</p>
			<div class="panel-block">
					<table class="table is-striped is-fullwidth">
						<thead>
							<tr>
								<th>Name</th>
								<th>Properties</th>
								<th>Edges</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.nodes as node}
								<tr>
									<td>{node.id}</td>
									<td>{node.properties}</td>
									<td>{node.edges}</td>
									<td>
										<button
											class="button is-primary is-small is-responsive is-rounded" class:is-loading={loading == node.id}
											on:click={() => goat(node.id)}><i class="fa fa-eye"></i></button>
										<button
											class="button is-secondary is-small is-responsive is-rounded"
											on:click={() => delNode(node.id)}><i class="fa fa-trash"></i></button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
			</div>
			<div class="panel-block">
				<form
					method="post"
					action="/api/node"
					on:submit|preventDefault={addNode}>
					<div class="field has-addons">
						<div class="control">
							<input
								class="input"
								type="text"
								placeholder="Find a Name"
								name="name"
								value=""
							/>
						</div>
						<div class="control">
							<button class="button is-info" type="submit"> Add </button>
						</div>
					</div>
				</form>
			</div>
		</nav>		
	</div>
	<div class="column"> </div>
</div>
