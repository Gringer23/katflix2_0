import { FC } from 'react'

import Line from '@/components/UI/Line'
import MenuItem from '@/components/layout/sidebar/menu/MenuItem'
import { IMenuItem } from '@/components/layout/sidebar/menu/menu.interface'

import styles from './Menu.module.scss'

export interface IMenu {
	title: string
	items: IMenuItem[]
}

const Menu: FC<IMenu> = ({ items, title }) => {
	return (
		<div className={styles.menu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map(menuItem => (
					<MenuItem item={menuItem} key={menuItem.link} />
				))}
			</ul>
			<Line />
		</div>
	)
}
export default Menu
