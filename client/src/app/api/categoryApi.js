import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function CategoryApi(props) {
	const [category, setCategory] = useState([]);
	const [callback,setCallback]=useState(false);

	useEffect(() => {
		try {
			const getcategory = async () => {
				const {data} = await axios.get('/api/category');
				setCategory(data)
			};
			getcategory();
		} catch (error) {
			console.log(error);
		}
	}, [callback]);

	return {
		category: [category, setCategory],
		callback:[callback,setCallback],
	};
}

export default CategoryApi;
