import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';

BtnLoadMore.propTypes = {};

function BtnLoadMore(props) {
	const state = useContext(ContextGlobal);
	const [page, setPage] = state.productsAPI.page;
	return (
		<div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
			<Button variant="outlined" color="primary" onClick={(e) => setPage(page + 1)}>
				Xem thêm
			</Button>
		</div>
	);
}

export default BtnLoadMore;
