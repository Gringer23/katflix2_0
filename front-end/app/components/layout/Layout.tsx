import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import Header from '@/components/layout/header/Header'
import SideBar from '@/components/layout/sidebar/SideBar'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
	title,
	children
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className={styles.main}>
				<SideBar />
				<section className={styles.content}>
					<Header />
					<div className={styles.wrapper}>{children}</div>
				</section>
			</main>
		</>
	)
}
export default Layout
