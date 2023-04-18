import { HiChartBar, HiHeart, HiHome, HiStar } from 'react-icons/hi'

import { IMenuItem } from '@/components/layout/sidebar/menu/menu.interface'

export const menu: IMenuItem[] = [
	{
		title: 'Главная',
		icon: HiHome,
		link: '/'
	},
	{
		title: 'Популярное',
		icon: HiChartBar,
		link: '/popular'
	},
	{
		title: 'Фильмы',
		icon: HiStar,
		link: '/films'
	},
	{
		title: 'Избранное',
		icon: HiHeart,
		link: '/favorites'
	}
]
