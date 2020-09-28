<script>
	import SvelteTable from "svelte-table";
	import Chart from "./chart.svelte";
	import Modal from './Modal.svelte';
	export let name;

	let data = [];
	// 'Food', 'Games', 'Transport', 'Housing', 'Sport'
	let labels = [];

	let rows = [
		{ id: 1, date: '2020-03-04', category: 'Food', value: 100 },
		{ id: 2, date: '2020-03-05', category: 'Games', value: 50 },
		{ id: 3, date: '2020-03-06', category: 'Transport', value: 10 },
		{ id: 4, date: '2020-03-07', category: 'Housing', value: 30 },
		{ id: 5, date: '2020-03-07', category: 'Housing', value: 12 },
		{ id: 6, date: '2020-03-08', category: 'Sport', value: 45 }
	];

	const columns = [
		{
			key: "id",
			title: "ID",
			value: v => v.id,
			renderValue: v => v.id,
			sortable: true
		},
		{
			key: "date",
			title: "DATE",
			value: v => v.date,
			renderValue: v => v.date,
			sortable: true
		},
		{
			key: "category",
			title: "CATEGORY",
			value: v => v.category,
			renderValue: v => v.category,
			sortable: true
		},
		{
			key: "value",
			title: "VALUE",
			value: v => v.value,
			renderValue: v => v.value,
			sortable: true
		}
	];

	function updateData() {
		let tmp = {};
		labels = [];
		data = [];
		rows.forEach((item) => {
			if(!labels.includes(item.category)) {
				labels.push(item.category);
				tmp[item.category] = parseInt(item.value);
			}  else {
				tmp[item.category] += parseInt(item.value);
			}
		});
		for (let [key, value] of Object.entries(tmp)) {
			data.push(value);
		}
		labels = labels;
		data = data;
	}

	updateData();

	let showModal = false;
	function saveData(event) {
		const formData = new FormData(event.target);
		const forData = {};
		let lastIdx = rows[rows.length - 1].id + 1;
		forData['id'] = lastIdx;
		for (const [k, v] of formData.entries()) {
			forData[k] = v;
		}
		rows.push(forData);
		rows = rows;
		updateData();
		console.log(forData);
	}
</script>

<main>
	<h1>My personal costs</h1>
	{#if showModal}
		<Modal on:close="{() => showModal = false}">
			<form action="#xxx" on:submit|preventDefault="{saveData}">
				Date: <input type="date"  name="date" placeholder="YYYY-MM-DD" title="Enter a date in this format YYYY/MM/DD"/><br/>
				Category: <input type="text" name="category"><br/>
				Value: <input type="number" name="value"><br/>
				<button  type="submit">Save</button>
			</form>
		</Modal>
	{/if}
	<button class="add-button" on:click="{() => showModal = true}">Add new cost +</button>

	<div style="display: grid; grid-template-columns: 2fr 1fr; grid-gap: 1em">
			<SvelteTable 
					columns="{columns}"
					rows="{rows}"
					classNameTable="{['table_class']}"
					classNameThead="{['border_bottom']}"
					classNameRow="{['border_bottom']}">
			</SvelteTable>

		<div>
			<Chart {data} {labels}/>
		</div>
	</div>

</main>

<style>
	.add-button {
		padding: 0.5em;
		margin: 30px auto;
		color: #ffffff;
		background-color: #3F9E92;
		text-transform: uppercase;
		font-weight: 600;
		border:none;
	}
     
	main {
		text-align: left;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #000000;
		font-size: 2em;
		font-weight: 600;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>