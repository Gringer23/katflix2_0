import { FC, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import { filmApi } from '@/store/api/film.api'

import stylesIcon from '../icons-right/iconsRight.module.scss'

const UploadFilm: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [filmId, setFilmId] = useState<number>(0)

	const [createFilm, { isLoading }] = filmApi.useCreateFilmMutation()

	return (
		<>
			<button
				className={stylesIcon.button}
				disabled={isLoading}
				onClick={() => {
					createFilm()
						.unwrap()
						.then(id => {
							setFilmId(+id)
							setIsOpen(true)
						})
				}}
			>
				<HiUpload />
			</button>
		</>
	)
}

export default UploadFilm
