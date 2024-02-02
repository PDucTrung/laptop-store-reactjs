import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductsApi() {
	const [products, setProducts] = useState([]);
	const [allProduct, setAllProduct] = useState([]);
	const [allProductSold, setAllProductSold] = useState([]);
	const [slide, setSlide] = useState([]);
	const [productsLoadMore, setProductsLoadMore] = useState([]);
	const [callback, setCallBack] = useState(false);
	const [category, setCategory] = useState('');
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('');
	const [result, setResult] = useState(0);
	const [color, setColor] = useState('');
	const [service, setService] = useState('');
	const tg = [];
	useEffect(() => {
		try {
			const getAllProduct = async () => {
				const res = await axios.get('/api/products?limit=100');
				setAllProduct({
					products: res.data.products,
					count: res.data.result,
				});
				setAllProductSold(res.data.products);
			};
			getAllProduct();
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		try {
			const getSlider = async () => {
				const res = await axios.get('/api/slider');
				setSlide(res.data.slider);
			};
			getSlider();
		} catch (error) {
			console.log(error);
		}
	}, [callback]);

	useEffect(() => {
		const getproducts = async () => {
			const res = await axios.get(
				`/api/products?page=${page}&${sort}&${category}&title[regex]=${search}&${color}&${service}`
			);
			setProducts(res.data.products);
			setResult(res.data.result);
		};

		getproducts();
	}, [callback, page, sort, search, result, category, color, service]);

	useEffect(() => {
		const getproductsLoadMore = async () => {
			const res = await axios.get(
				`/api/products?page=${page}&${sort}&${category}&title[regex]=${search}&${color}&${service}`
			);
			res.data.products.forEach((item) => {
				tg.push(item);
			});

			setProductsLoadMore([...productsLoadMore, ...tg]);
		};
		getproductsLoadMore();
	}, [callback, page, result, category]);

	return {
		products: [products, setProducts],
		allProduct: [allProduct, setAllProduct],
		allProductSold: [allProductSold, setAllProductSold],
		slide: [slide, setSlide],
		productsLoadMore: [productsLoadMore, setProductsLoadMore],
		callback: [callback, setCallBack],
		category: [category, setCategory],
		page: [page, setPage],
		search: [search, setSearch],
		sort: [sort, setSort],
		color: [color, setColor],
		service: [service, setService],
		result: [result, setResult],
	};
}

export default ProductsApi;
