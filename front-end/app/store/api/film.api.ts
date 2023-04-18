import {api} from '@/store/api/api'

import {IFilm, IFilmDto} from '@/types/film.interface'

export const filmApi = api.injectEndpoints({
	endpoints: builder => ({
		getFilmBySearchTerms: builder.query<IFilm[], string>({
			query: searchTerm => ({ url: '/films', params: { searchTerm } })
		}),
		getFilmById: builder.query<IFilm, number>({
			query: id => `/films/${id}/`,
			providesTags: (result, error, id) => [{ type: 'Film', id }]
		}),
		getSerialById: builder.query<IFilm, string>({
			query: id => `/films/series/${id}`,
			providesTags: (result, error, id) => {
				return [{type: 'Serial', id}];
			}
		}),
		getFilmsPrivate: builder.query<IFilm, number>({
			query: id => `/films/get-private/${id}`,
			providesTags: (result, error, id) => [{ type: 'Film', id }]
		}),
		createFilm: builder.mutation<string, void>({
			query: () => ({
				url: '/films',
				method: 'POST'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		}),
		updateFilm: builder.mutation<IFilm, IFilmDto>({
			query: ({ id, ...body }) => ({
				url: `/films/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Film', id },
				{ type: 'Profile' }
			]
		}),
		updateViews: builder.mutation<IFilm, number>({
			query: id => ({
				url: `/films/update-views/${id}`,
				method: 'PUT'
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Film', id }]
		}),
		updateLikes: builder.mutation<IFilm, number>({
			query: id => ({
				url: `/films/update-likes/${id}`,
				method: 'PUT'
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Film', id }]
		}),
		deleteFilm: builder.mutation<void, number>({
			query: id => ({
				url: `/films/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'Film' }, { type: 'Profile' }]
		})
	})
})