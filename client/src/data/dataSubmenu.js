import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export const dataCategory = [
	{
		id: 1,
		title: 'Laptop',
		category: 'laptop',
		icon: (
			<i
				style={{
					backgroundImage:
						'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1629366606/N16_ecommers/sprite_wiwtgs.png)',
					backgroundPosition: '-203px -181px',
					width: '20px',
					height: '20px',
					display: 'inline-block',
				}}
			></i>
		),
		endIcon: <ChevronRightIcon />,
		datachild: ['Đồ họa', 'Gaming', 'Mỏng nhẹ cao cáp'],
	},
	{
		id: 2,
		title: 'Điện thoại',
		category: 'dienthoai',
		icon: (
			<i
				style={{
					backgroundImage:
						'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1629366606/N16_ecommers/sprite_wiwtgs.png)',
					backgroundPosition: '-392px -52px',
					width: '12px',
					height: '20px',
					display: 'inline-block',
				}}
			></i>
		),
		endIcon: <ChevronRightIcon />,
		datachild: ['Ios', 'Android', 'Apple'],
	},
	{
		id: 3,
		title: 'Ổ cứng',
		category: 'ocung',
		icon: (
			<i
				style={{
					backgroundImage:
						'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1629366606/N16_ecommers/sprite_wiwtgs.png)',
					backgroundPosition: '-20px -365px',
					width: '20px',
					height: '18px',
					display: 'inline-block',
				}}
			></i>
		),
	},
	{
		id: 4,
		title: 'Phụ kiện',
		category: 'phukien',
		icon: (
			<i
				style={{
					backgroundImage:
						'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1629366606/N16_ecommers/sprite_wiwtgs.png)',
					backgroundPosition: '-331px -317px',
					width: '20px',
					height: '20px',
					display: 'inline-block',
				}}
			></i>
		),
		endIcon: <ChevronRightIcon />,
		datachild: ['Chuột', 'Bàn phím', 'Tai nghe', 'USB'],
	},
	{
		id: 1,
		title: 'PC',
		category: 'pc',
		icon: (
			<i
				style={{
					backgroundImage:
						'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1629366606/N16_ecommers/sprite_wiwtgs.png)',
					backgroundPosition: '-203px -181px',
					width: '20px',
					height: '20px',
					display: 'inline-block',
				}}
			></i>
		),
		endIcon: <ChevronRightIcon />,
		datachild: ['RAM', 'Màn hình'],
	},
];
export const dataCategoryLeft = [
	{
		id: 1,
		title: 'Laptop',
	},
	{
		id: 2,
		title: 'Laptop gaming',
	},
	{
		id: 3,
		title: 'Laptop đồ họa',
	},
	{
		id: 4,
		title: 'Laptop mỏng nhẹ cao cấp',
	},
	{
		id: 5,
		title: 'Phụ kiện',
	},
];
