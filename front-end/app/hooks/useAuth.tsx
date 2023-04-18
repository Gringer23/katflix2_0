import { useTypedSelector } from '@/hooks/useTypedSelector'

import { IAuthData } from '@/services/auth/auth.helper'

export const useAuth = (): IAuthData => useTypedSelector(state => state.auth)
