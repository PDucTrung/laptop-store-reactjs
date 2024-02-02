import { Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ContextGlobal } from '../../../app/ContextGlobal';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	fontsize: {
		fontSize: theme.spacing(3),
	},
	form: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '10px',
	},
}));
function Category(props) {
	const state = useContext(ContextGlobal);
	const [category] = state.categoryApi.category;
	const [callback, setCallback] = state.categoryApi.callback;
	const [token] = state.token;
	const [value, setValue] = useState('');
	const [getId, setId] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	//console.log(category);

	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEdit) {
				const res = await axios.put(
					`/api/category/${getId}`,
					{ name: value },
					{ headers: { Authorization: token } }
				);
				alert(res.data.mgs);
			} else {
				const res = await axios.post('/api/category', { name: value }, { headers: { Authorization: token } });
				alert(res.data.mgs);
			}
			setValue('');
			setIsEdit(false);
			setCallback(!callback);
		} catch (err) {
			const failr = err.response.data.mgs;
			alert(failr);
		}
	};

	const handleEdit = (id, name) => {
		setId(id);
		setValue(name);
		setIsEdit(true);
	};
	const handleRemove = async (id) => {
		try {
			if (window.confirm('bạn có muốn xóa loại sản phẩm này không ?')) {
				const res = await axios.delete(`/api/category/${id}`, { headers: { Authorization: token } });

				alert(res.data.mgs);
				setCallback(!callback);
			}
		} catch (err) {
			const failr = err.response.data.mgs;
			alert(failr);
		}
	};
	if (category.length === 0) {
		return (
			<Paper className={classes.root}>
				<Typography component="h2" variant="h3">
					Bạn chưa có loại sản phẩm nào
				</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						required="true"
						type="text"
						name="category"
						onChange={(e) => setValue(e.target.value)}
						label="Thêm mới"
						value={value}
					/>
					<Button type="submit" variant="contained" color="primary">{`${isEdit ? 'Sửa' : 'Tạo mới'}`}</Button>
				</form>
			</Paper>
		);
	}
	return (
		<Paper className={classes.root}>
			<Container>
				<Typography variant="h5" component="h2" style={{ padding: '15px 0' }}>
					Quản lý loại sản phẩm
				</Typography>
				<Grid container spacing={2} style={{ justifyContent: 'space-around' }}>
					<Grid item>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								type="text"
								name="category"
								onChange={(e) => setValue(e.target.value)}
								value={value}
								label={isEdit ? 'Sửa' : 'Thêm mới'}
								required
							/>
							<Button type="submit" variant="contained" color="primary">{`${
								isEdit ? 'Sửa' : 'Tạo mới'
							}`}</Button>
						</form>
					</Grid>
					<Grid component="ul" item>
						<Table>
							<TableBody>
								{category.map((cate) => (
									<TableRow key={cate._id}>
										<TableCell className={classes.fontsize}>
											<Typography variant="h6">{cate.name}</Typography>
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												startIcon={<EditIcon />}
												onClick={() => handleEdit(cate._id, cate.name)}
											>
												Sửa
											</Button>
										</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="secondary"
												startIcon={<DeleteIcon />}
												onClick={() => handleRemove(cate._id)}
											>
												Xóa
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
}

export default Category;
