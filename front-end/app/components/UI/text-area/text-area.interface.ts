import { TextareaHTMLAttributes } from 'react'

import { IFieldProps } from '@/components/UI/field/field.interface'

type TypeInputPropsFiled = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface ITextArea extends TypeInputPropsFiled {}
