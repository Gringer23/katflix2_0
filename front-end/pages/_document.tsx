import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='ru'>
			<Head>
				<link rel='icon' href='/k-logo.svg' type='image/svg+xml' />
				<meta name='theme-color' content='#C8191F' />
				<meta name='msapplication-navbar-button' content='#C8191F' />
				<meta name='apple-mobile-web-app-status-bar-style' content='#C8191F' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
