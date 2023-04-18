import {FC} from 'react'

import AuthForm from '@/components/layout/header/authForm/AuthForm'
import ProfileMenu from '@/components/layout/header/profile-menu/ProfileMenu'
import UploadFilm from '@/components/layout/header/upload-film/UploadFilm'

import {useAuth} from '@/hooks/useAuth'

import {api} from '@/store/api/api'

import styles from './iconsRight.module.scss'

const IconsRight: FC = () => {
	const { user } = useAuth()
	const { data, isLoading } = api.useGetProfileQuery(user, {
		skip: !user
	})

	return (
		<div className={styles.icons}>
			{user ? (
				<>
					<ProfileMenu />
					{data?.isAdmin === true && <UploadFilm />}
				</>
			) : (
				<AuthForm />
			)}
		</div>
	)
}

export default IconsRight
