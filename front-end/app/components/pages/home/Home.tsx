import {FC} from 'react'

import Layout from '@/components/layout/Layout'
import Catalog from '@/components/pages/catalog/Catalog'
import {Discover} from '@/components/pages/discover/Discover'
import {IHome} from '@/components/pages/home/home.interface'

const Home: FC<IHome> = ({ randomFilm, topFilm, newFilm }) => {
	return (
		<Layout title={'Katflix | Новый онлайн-кинотеатр'}>
			<Discover topFilm={topFilm} randomFilm={randomFilm} />
			<Catalog newVideo={newFilm} />
		</Layout>
	)
}
export default Home
