import {FC} from 'react'

import styles from './Details.module.scss'

const Details: FC<{ movie: any }> = ({ movie }) => {
	return (
		<div className={styles.details}>
			<div className={styles.wrapper}>
				<div className={styles.about}>
					<span>{movie.description}</span>
				</div>
				<div className={styles.role}>
					<span>В главных ролях</span>
					<ul>
						{movie?.actors?.map((role: any, index: number) => (
							<li key={index}>{role}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Details
