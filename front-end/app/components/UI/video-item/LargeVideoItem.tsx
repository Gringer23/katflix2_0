import cn from 'classnames'
import Link from 'next/link'
import {FC} from 'react'

import {IFilm} from '@/types/film.interface'

import styles from './VideoItem.module.scss'

const APP = 'http://localhost:3000'
export const LargeVideoItem: FC<{ video: IFilm }> = ({ video }) => {
	return (
		<div className={cn(styles.video_item, styles.large)}>
			<Link href={`/v/${video.id}`}>
				<div className={styles.thumbnail}>
					{video.thumbnailPath && (
						<div
							style={{
								backgroundImage: `url(${APP + video.thumbnailPath})`
							}}
							className={styles.bg_image}
						/>
					)}
					<div className={styles.information}>
						<img src={video.namePoster} alt={video.name} />
					</div>
				</div>
			</Link>
		</div>
	)
}
