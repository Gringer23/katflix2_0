import {FC} from 'react'

import styles from './Navigation.module.scss'
import {useAuth} from "@/hooks/useAuth";

const tabs = [
	{
		id: 1,
		name: 'О Сериале',
		film: 'О фильме'
	},
	{
		id: 2,
		name: 'Серии'
	},
	{
		id: 3,
		name: 'Детали',
		film: 'Детали'
	}
]

const NavigationBottom: FC<{ activeTab: number, setActiveTab: any, type: any }> = ({ activeTab, setActiveTab, type }) => {
	let tab = []
	const { user } = useAuth()
	if (type.type === 'film' || !user) {
		tab = tabs.filter(tab => {
			return tab.id !== 2
		})
		tab = tab.map(tab => {
			return (
				<button
					key={tab.id}
					onClick={() => setActiveTab(tab.id)}
					className={activeTab === tab.id ? styles.active : ''}
				>
					{tab.film}
				</button>
			)
		})
	} else {
		tab = tabs.map(tab => {
			return (
				<button
					key={tab.id}
					onClick={() => setActiveTab(tab.id)}
					className={activeTab === tab.id ? styles.active : ''}
				>
					{tab.name}
				</button>
			)
		})
	}

	return <nav className={styles.nav}>{tab}</nav>
}

export default NavigationBottom
