import { isRejectedWithValue } from '@reduxjs/toolkit'
import { Middleware, MiddlewareAPI } from 'redux'

import { toastError } from '@/utils/api.utils'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			toastError({
				title: 'Ошибка синхронизации!',
				message: action.error.message
			})
		}

		return next(action)
	}
