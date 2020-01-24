
export const handleDuration = (value: string): string => {
	if (value.indexOf(':') > -1) {
		return value
	}
	const unixTimeInMili = Number(value) * 1000
	const date = new Date(unixTimeInMili)

	return date.toISOString().slice(10, 19).replace('T', ' ')
}

export const handleDate = (value: string): string => {
	return value.slice(0, 16)
}

export const parseJwt = (token: string): string => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))

	return JSON.parse(jsonPayload)
}

export const tokenExpiresIn = (exp: number): number => {
	// const tokenMinutes = new Date(exp * 1000).getMinutes()
	// const currentMinutes = new Date().getMinutes()

	return exp
}

export const stripHtmlFromString = (text: string): string => {
	const doc = new window.DOMParser().parseFromString(text, 'text/html')
	return doc.body.textContent || ''
}

interface TokenResponse {
	ok: boolean;
	accessToken: string;
}

export const refreshToken = (): Promise<TokenResponse> => {
	return new Promise((resolve, reject) => {
		// const data = window.fetch('http://localhost:4000/refresh_token', {
		const data = window.fetch('http://34.242.87.37:4000/refresh_token', {
			method: 'POST',
			credentials: 'include'
		})
			.then(res => res.json())
			.then(data => data)
			.catch(err => console.log(err))

		if (!data) {
			reject(new Error('Whoops'))
		}

		resolve(data)
	})
}
