import cn from 'classnames'
import {FC, PropsWithChildren} from 'react'

import {IButton} from '@/components/UI/button/button.interface'

import styles from './Button.module.scss'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	...rest
}) => {
	return (
		<button className={cn(styles.button)} {...rest}>
			{children}
		</button>
	)
}

export default Button
