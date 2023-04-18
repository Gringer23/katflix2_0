import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { rootAction } from '@/store/actions'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(rootAction, dispatch)
}
