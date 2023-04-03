<script>
	import { goto } from '$app/navigation';
	import { JSONEditor } from "svelte-jsoneditor";
	export let data;
	let loading = false;
	let content = {};
	function handleChange( updatedContent, previousContent, { contentErrors, patchResult } ) {
		if (!contentErrors) content = updatedContent;
	}
	async function handleSave() {
		const contents =
			content.text !== undefined
				? content.text
				: JSON.stringify(content.json);
		if (contents) {
			console.log(contents);
			await putNode(data.id, contents);
		}
	}
	
	async function putNode(id, node) {
		const ACTION_URL = `/api/node/${id}`;
		await fetch(ACTION_URL, {
			method: "PUT",
			body: node
		});
	}

	function handleRenderMenu(items, context) {
		const separator = {
			separator: true,
		};
		const customCopyButton = {
			onClick: handleSave,
			text: "Save",
			title: "Save document",
			className: "custom-save-button",
		};
		const space = {
			space: true,
		};
		const itemsWithoutSpace = items.slice(0, items.length - 2);
		return itemsWithoutSpace.concat([ separator, space, customCopyButton, space ]);
	}
	const goat = async (path) => {
		loading = true;
		goto(path);
	}
</script>

<div class="columns">
	<div class="column is-half">
		<nav class="panel">
			<p class="panel-heading">Node &lt;{data.id}&gt; <button class="delete is-pulled-right" class:is-loading={loading}  on:click={() => goto('/')} aria-label="close"></button></p>
			<div class="panel-block">
				<div class="editor">
					<JSONEditor
						content={{ text: data.node?.body, json: undefined }}
						onChange={handleChange}
						onRenderMenu={handleRenderMenu}
					/>
				</div>
			</div>
		</nav>
	</div>
</div>


<style>
	.editor {
		width: 100%;
		height: 400px;
	}
</style>
