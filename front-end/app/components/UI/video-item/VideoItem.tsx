import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC} from 'react'
import {BiPlay} from 'react-icons/bi'

import {IVideoItem} from '@/components/UI/video-item/videoItem.interface'

import styles from './VideoItem.module.scss'

const VideoItem: FC<IVideoItem> = ({
	item
}) => {
	const { push } = useRouter()

	return (
		<div className={styles.video_item}>
			<Link href={`/v/${item.id}`} className='flex'>
				<img
					src={item.thumbnailPath}
					width='100px'
					className={styles.video_item__thumbnail}
				/>
				<div className={styles.video_item__item__wrapper}>
					<div key={item.id} className={styles.video_item__item}>
						{item.name}
					</div>
					<div className={styles.video_item__item__watch}>
						<div className={styles.video_item__item__watch_icon}>
							<BiPlay />
						</div>
						<span className={styles.video_item__item__watch_text}>
							Смотреть
						</span>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default VideoItem
