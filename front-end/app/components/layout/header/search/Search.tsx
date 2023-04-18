import { FC } from 'react'

import VideoItem from '@/components/UI/video-item/VideoItem'
import { useSearch } from '@/components/layout/header/search/useSearch'

import styles from './Search.module.scss'

const Search: FC = () => {
	const { data, handleSearch, searchTerm, isSuccess } = useSearch()
	return (
		<div className={styles.search_top}>
			<label>
				<input
					type='text'
					placeholder='Я ищу...'
					value={searchTerm}
					onChange={handleSearch}
				/>
				<img src='/img/common/search.svg' alt='' />
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map(film => <VideoItem isSmall item={film} key={film.id} />)
					) : (
						<div className='text-white'>Ничего не нашлось</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
