import {GetStaticProps, NextPage} from 'next'

import Home from '@/components/pages/home/Home'
import {IHome} from '@/components/pages/home/home.interface'

import {FilmService} from '@/services/film.service'

import {IFilm} from '@/types/film.interface'
import {shuffle} from "lodash";

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps<IHome> = async () => {
	try {
		const { data: newFilm } = await FilmService.getAll()
		const { data: topFilms } = await FilmService.getMostPopular()
		return {
			props: {
				newFilm,
				randomFilm:
					shuffle(newFilm.filter(f => f.id !== topFilms[0].id))[0] ||
					({} as IFilm),
				topFilm: topFilms[0]
			} as IHome
		}
	} catch (e) {
		return {
			props: {
				newFilm: [],
				randomFilm: {} as IFilm,
				topFilm: {} as IFilm
			} as IHome
		}
	}
}

export default HomePage
