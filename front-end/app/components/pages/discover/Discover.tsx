import { FC } from 'react'

import { LargeVideoItem } from '@/components/UI/video-item/LargeVideoItem'

import { IFilm } from '@/types/film.interface'

import styles from './Discover.module.scss'

interface IDiscover {
	topFilm: IFilm
	randomFilm: IFilm
}

export const Discover: FC<IDiscover> = ({ topFilm, randomFilm }) => {
	return (
		<div className={styles.discover}>
			<div className={styles.topFilm}>
				<LargeVideoItem video={topFilm} />
			</div>

			<div className={styles.randomFilm}>
				<LargeVideoItem video={randomFilm} />
			</div>
		</div>
	)
}
