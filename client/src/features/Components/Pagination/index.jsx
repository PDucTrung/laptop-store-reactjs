import Pagination from '@material-ui/lab/Pagination';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../app/ContextGlobal';
PaginationPr.propTypes = {};

function PaginationPr(props) {
	const state = useContext(ContextGlobal);
	const [page, setPage] = state.productsAPI.page;
	const [allProduct] = state.productsAPI.allProduct;
	
	return (
		<div>
			<Pagination count={Math.ceil(allProduct.count / 9)} color="primary" page={page} onChange={(e, value) => setPage(value)} />
		</div>
	);
}

export default PaginationPr;
