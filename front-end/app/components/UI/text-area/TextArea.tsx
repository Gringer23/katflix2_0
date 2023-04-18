import { forwardRef } from 'react'

import { ITextArea } from '@/components/UI/text-area/text-area.interface'

import styles from './TextArea.module.scss'

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
	({ error, style, ...rest }, ref) => {
		return (
			<div className={styles['editor']} style={style}>
				<textarea ref={ref} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'

export default TextArea
