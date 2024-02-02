import { Box, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { Link } from 'react-router-dom';
import FormatNumber from '../../../utils/formatNumber';
import clsx from 'clsx';
ProductItem.propTypes = {
	product: PropTypes.object,
	handleClick: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		[theme.breakpoints.up('sm')]: {
			maxWidth: '222px',
		},
		borderRadius: '0',
		border: '1px solid #edeef5',

		'&:hover': {
			border: '1px solid #c2c2d3',
			borderRadius: '5px',
			boxShadow:
				'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
		},
	},
	img: {
		maxWidth: '180px',
		maxHeight: '200px',
		margin: '0 auto',
		padding: '15px',
	},
	title: {
		fontSize: '14px',
		textOverflow: 'ellipsis',
		fontWeight: '500',
		'&:hover': {
			color: '#233a95',
		},
		textTransform: 'capitalize',
		textTransform: 'capitalize',
		display: '-webkit-box',
		maxWidth: '100%',
		margin: '0 auto',
		lineHeight: 1.5,
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical',
		overflow: 'hidden',
	},
	description: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	salePercen: {
		marginLeft: theme.spacing(1),
		color: '#c2c2d3',
		fontWeight: '600',
	},
	price: {
		fontSize: theme.spacing(2) + 2,
		fontWeight: '600',
		color: '#d51243',
	},
}));
function ProductItem({ product = {} }) {
	const classes = useStyles();

	return (
		<Card elevation={0} className={classes.root}>
			<CardActionArea>
				<Link to={`/products/${product._id}`}>
					<CardMedia
						component="img"
						alt="Contemplative Reptile"
						image={product.images.url}
						title="Xem ngay"
						className={classes.img}
					/>
				</Link>
				<CardContent>
					<Link to={`/products/${product._id}`}>
						<Typography
							gutterBottom
							variant="h4"
							component="h2"
							className={clsx(classes.title, 'font-inter')}
						>
							{product.title}
						</Typography>
					</Link>
					{[1, 2, 3, 4, 5].map((i) => (
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 24 24"
							size="14"
							color="#fdd836"
							height="14"
							width="14"
							xmlns="http://www.w3.org/2000/svg"
							style={{ color: 'rgb(253, 216, 54)' }}
						>
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
						</svg>
					))}
					<Typography className={clsx(classes.sold, 'font-dosis')} component="p" variant="body1">
						{product.sold > 0 ? `Đã bán ${product.sold} ` : <br></br>}
					</Typography>
					<Box style={{ display: 'flex' }}>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className={clsx(classes.price, 'font-dosis')}
						>
							{FormatNumber(product.price)}
						</Typography>

						<Typography
							variant="body2"
							color="textSecondary"
							component="span"
							className={classes.salePercen}
						>
							{product.salePercen > 0 ? `-${product.salePercen}%` : ''}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default ProductItem;
