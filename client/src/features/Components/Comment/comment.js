import { Rating } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';

const Comment = (props) => {
	const { product, state, afterSubmit } = props;
	const [payload, setPayload] = useState({});
	const applyChange = (prop, value) => {
		const _p = { ...payload };
		_p[prop] = value;
		setPayload(_p);
	};
	const createComment = async () => {
		try {
			await axios.post('/api/comment', {
				...payload,
				productId: product._id,
				userId: state.userApi.user[0],
				likes: 0
			});
			afterSubmit({ ...payload, productId: product._id, userId: state.userApi.user[0] });
			setPayload({ content: '' });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="p-col-10 p-py-0 p-px-1 p-mt-2">
				<span className="p-float-label">
				<Rating
        name="simple-controlled"
        value={payload.rating}
        onChange={(event, newValue) => {
			applyChange('rating',newValue);
        }}
      />
					<textarea
						value={payload?.content}
						onChange={(e) => applyChange('content', e.target.value)}
						rows={3}
						cols={4}

						style={{ width: '100%', border: '1px solid grey', borderRadius: '6px', padding: '5px' }}
					/>
				</span>
				<button style={{ display: 'block', padding: '5px', border: '1px solid orange', backgroundColor: 'white', color: 'orange', borderRadius: '5px' }} label="Gửi" onClick={createComment}>
					Gửi bình luận
				</button>
			</div>
		</div>
	);
};
export default Comment;
