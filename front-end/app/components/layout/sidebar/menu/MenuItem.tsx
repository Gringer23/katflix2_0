import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC} from 'react'

import {IMenuItem} from '@/components/layout/sidebar/menu/menu.interface'

import {useAuth} from '@/hooks/useAuth'

import styles from './Menu.module.scss'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { user } = useAuth()
	const { asPath } = useRouter()
	if (item.title === 'Избранное'){
		if (user === null){
			return null
		}
		else{
			item.link = `/fav/${user?.id}`
		}
	}

	return (
		<li>
			<Link
				href={item.link}
				className={asPath === item.link ? styles.active : ''}
			>
				<span className={item.image ? styles.image : ''}>
					{item.icon && <item.icon />}
					{item.image && (
						<Image src={item.image} alt={item.title} width={40} height={40} />
					)}
				</span>
				<b>{item.title}</b>
			</Link>
		</li>
	)
}
export default MenuItem
