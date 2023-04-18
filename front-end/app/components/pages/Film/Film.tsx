import {useRouter} from 'next/router'
import {FC, useState} from 'react'
import {PulseLoader} from 'react-spinners'

import Details from '@/components/UI/details/Details'
import Information from '@/components/UI/information/Information'
import NavigationBottom from '@/components/UI/navigationBottom/NavigationBottom'
import Layout from '@/components/layout/Layout'

import {filmApi} from '@/store/api/film.api'

import {IFilm} from '@/types/film.interface'

import styles from './Film.module.scss'
import Episode from "@/components/UI/episode/Episode";

const Film: FC = () => {
	const { query } = useRouter()
	const [activeTab, setActiveTab] = useState<number>(1)
	const { data: film = {} as IFilm, isLoading } = filmApi.useGetFilmByIdQuery(
		Number(query.id),
		{
			skip: !query?.id
		}
	)
	if (isLoading)
		return (
			<PulseLoader
				loading={isLoading}
				color={'#c62e21'}
				style={{ position: 'absolute', top: '40%', left: '48%' }}
			/>
		)

	return (
		<Layout title={film.name}>
			<div
				className={styles.main}
				style={{
					backgroundImage: `url(${film.thumbnailPath})`,
					borderRadius: '20px'
				}}
			>
				<img src={film.namePoster} alt={film.name} width='300' className={styles.poster}
				style={{transform: activeTab === 2 || activeTab === 3 ? 'scale(.8)' : '', marginLeft: activeTab === 1 ? '4rem' : '2.5rem', transition: 'all .4s'}}/>
				{activeTab === 1 ? (
					<Information film={film} />
				) :
					activeTab === 2 ? (<Episode serials={film.series} name={film.name} logo={film.namePoster} id={film.id}/>
						) : (
					activeTab === 3 && <Details movie={film} />
				)}
				<NavigationBottom
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					type={film}
				/>
			</div>
		</Layout>
	)
}

export default Film
