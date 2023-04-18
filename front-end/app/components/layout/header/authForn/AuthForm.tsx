import {FC, useState} from 'react'
import {SubmitHandler} from 'react-hook-form'
import {FaUserCircle} from 'react-icons/fa'
import {IAuthFields} from '@/components/layout/header/authForm/authForm.interface'

import {useActions} from '@/hooks/useActions'
import {useAuth} from '@/hooks/useAuth'
import {useOutside} from '@/hooks/useOutside'

import stylesIcon from '../icons-right/iconsRight.module.scss'
import styles from './AuthForm.module.scss'
import {Field, Form, Formik} from "formik";
import {validEmail} from "@/components/layout/header/authForm/auth.valid";
import Button from "@/components/UI/button/Button";

const AuthRight: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const [type, setType] = useState<'login' | 'register'>('login')
	const { login, register: registerAction } = useActions()
	// @ts-ignore
	const { isLoading } = useAuth()

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') login(data)
		else if (type === 'register') registerAction(data)
	}

	const validateEmail = (value: string) => {
		if(!value){
			return 'Email обязателен!'
		} else if(!validEmail){
			return 'Не допустимый Email'
		}
	}

	const validatePassword = (value: string) => {
		if(!value){
			return 'Пароль обязателен'
		}else if (value.length < 6){
			return 'Не допустимй пароль'
		}
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={stylesIcon.button} onClick={() => setIsShow(!isShow)}>
				<FaUserCircle fill={'#A4A4A4'} />
			</button>
			{isShow && (
				<Formik
					initialValues={{
					email: '',
					password: ''
				}}
					onSubmit={values => {
						onSubmit(values)
					}}>
					{({errors, touched }) => (
						<Form className={styles.form}>
							<h2>Вход в аккаунт</h2>
							<Field
								name='email'
								validate={validateEmail}
								className={styles.input}
							/>
							{
								errors.email && touched.email && (
									<div className={styles.error}>{errors.email}</div>
								)
							}
							<Field
								name='password'
								validate={validatePassword}
								className={styles.input}
								type='password'
							/>
							{
								errors.password && touched.password && (
									<div className={styles.error}>{errors.password}</div>
								)
							}
							<div className='mt-5 mb-1 text-center'>
								<Button onClick={() => setType('login')} disabled={isLoading} type="submit">
									Войти
								</Button>
							</div>
							<button
								className={styles.register}
								onClick={() => setType('register')}
								type="submit"
								disabled={isLoading}
							>
								Регистрация
							</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	)
}

export default AuthRight
