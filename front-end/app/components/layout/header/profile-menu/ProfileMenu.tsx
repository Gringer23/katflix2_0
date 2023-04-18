import Link from 'next/link'
import {FC} from 'react'
import {BiLogOut} from 'react-icons/bi'
import {FiUser} from 'react-icons/fi'
import {GoChevronDown, GoChevronUp} from 'react-icons/go'
import {HiUpload} from 'react-icons/hi'

import {useActions} from '@/hooks/useActions'
import {useAuth} from '@/hooks/useAuth'
import {useOutside} from '@/hooks/useOutside'

import {api} from '@/store/api/api'

import styles from './ProfileMenu.module.scss'
import {FaUserCircle} from "react-icons/fa";

const ProfileMenu: FC = () => {
	const { user } = useAuth()
	const { data, isLoading } = api.useGetProfileQuery(user, {
		skip: !user
	})
	const { isShow, setIsShow, ref } = useOutside(false)
	const { logout } = useActions()

	if (isLoading) return null
	return (
		<div ref={ref} className={styles.wrapper}>
			<button onClick={() => setIsShow(!isShow)}>
				{
					data?.avatarPath ?
						(
							<img
								src={data?.avatarPath}
								alt={data?.name}
								width={50}
								height={50}
							/>
						) : (
							<FaUserCircle fill={'#A4A4A4'} style={{width: '30px', height: '30px'}} />
						)
				}

				<span className={styles.name}>{data?.name}</span>
				{isShow ? <GoChevronUp /> : <GoChevronDown />}
			</button>
			{isShow && (
				<div className={styles['profile_menu']}>
					<ul>
						<li>
							<Link href={`/c/${user?.id}`}>
								<div className='mr-2'>Мой профиль</div> <FiUser />
							</Link>
						</li>
						{data?.isAdmin && (
							<li>
								<Link href={'/studio'}>
									<div className='mr-2'> Добавить фильм</div> <HiUpload />
								</Link>
							</li>
						)}
						<li>
							<button onClick={logout}>
								<div className='mr-2'>Выйти</div>
								<BiLogOut />
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default ProfileMenu
