import { Box, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { Link } from 'react-router-dom';
import FormatNumber from '../../../../utils/formatNumber';
Soldest.propTypes = {
	product: PropTypes.object,
	handleClick: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		height: '250px',
		maxWidth: '220px',
		border:'1px solid #edeef5',
		
	},
	img: {
		maxWidth: '200px',
		maxHeight: '150px',
		margin: '0 auto',
	},
	salePercen: {
		position: 'absolute',
		top: '0',
		left: '0',
		backgroundColor: 'rgb(255, 66, 78)',
		marginLeft: '0',
		borderBottomRightRadius: '100%',
		color: 'white',
		padding: '2px 8px 4px 2px',
	},
	sold: { textAlign: 'center' },
	price: {
		fontSize: theme.spacing(2),
		textAlign: 'center',
	},
}));

function Soldest({ product = {} }) {
	const classes = useStyles();
	return (
		<div>
			<Card elevation={0} className={classes.root} >
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
						<Typography className={classes.sold} component="p" variant="body1">
							{product.sold > 0 ? `Đã bán ${product.sold} ` : <br></br>}
						</Typography>
						<Box>
							<Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
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
		</div>
	);
}

export default Soldest;
