import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/providers/private-route.interface'

const checkRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component: { isOnlyUser }
}) => {
	const { isLoading, user } = useAuth()
	const { pathname, replace } = useRouter()

	const Children = () => <>{children}</>

	if (isLoading) return null

	if (user) return <Children />

	if (isOnlyUser) pathname !== '/' && replace('/')

	return null
}

export default checkRole
