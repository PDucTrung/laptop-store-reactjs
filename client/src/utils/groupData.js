function GroupData(items, key) {
	return items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item.quantity],
		}),
		{}
	);
}

export default GroupData;
