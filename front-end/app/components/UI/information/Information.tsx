import Link from 'next/link'
import {FC} from 'react'
import {FaPlay} from 'react-icons/fa'

import {useAuth} from '@/hooks/useAuth'

import styles from './Information.module.scss'
import FavoriteButton from "@/components/UI/favorite-button/FavoriteButton";

const Information: FC<{ film: any }> = ({ film }) => {
	const { user } = useAuth()
	return (
		<div className={styles.info}>
			<div className={styles.additional}>
				<span>{film?.year}</span>
				<span
					style={{
						backgroundColor: film.rating > 7 ? '#02ad02' : '#7c7b7b',
						color: '#fff',
						padding: '2px 10px',
						borderRadius: '20px',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					{film.rating}
				</span>
				{film?.series ? <span>{film.series.length} серий</span> : ''}
				<span>{film.duration}</span>
			</div>
			<div className={styles.description}>{film.subDescription}</div>
			{user ? (
				<div className={styles.buttons}>
					<Link href={`/watch/${film.id}`}>
						<div className={styles.button}>
							<FaPlay color='#d91300' />
							<span style={{ marginLeft: '0.5rem' }}>Смотреть онлайн</span>
						</div>
					</Link>
					<FavoriteButton favoriteId={film.id}/>
				</div>
			) : (
				<div className={styles.buttons}>
					<span style={{ color: '#c9c8c7', fontSize: '20px' }}>
						Чтобы начать просмотр, нужно войти
					</span>
				</div>
			)}
		</div>
	)
}

export default Information
