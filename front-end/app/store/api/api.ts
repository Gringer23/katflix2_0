import {API_URL} from '../../api/axios'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {TypeRootState} from '@/store/store'

import {IUser} from '@/types/user.interface'

const USER = 'user'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Film', 'Profile', 'Serial'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken
			if (token) headers.set('Authorization', `Bearer ${token}`)
			return headers
		}
	}),
	endpoints: builder => ({
		getProfile: builder.query<IUser, any>({
			query: () => `${USER}/profile`,
			providesTags: () => [{ type: 'Profile' }]
		}),
		favorite: builder.mutation<boolean, number>({
			query: filmId => ({
				url: `${USER}/favorites/${filmId}`,
				method: 'PATCH'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		})
	})
})

