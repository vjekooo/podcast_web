import { Token } from './models/models'

export const calculateTime = (value: number | string): string => {
	if (typeof value === 'string' && value.indexOf(':') > -1) {
		return value
	}

	const num = Number(value)
	const hours = Math.floor(num / 3600)
	const minutes = Math.floor((num % 3600) / 60)
	const seconds = Math.floor((num % 3600) % 60)

	const hoursDisplay = hours > 0 ? `0${hours}:` : ''
	const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes
	const secondsDisplay = seconds < 10 ? `:0${seconds}` : `:${seconds}`

	return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`
}

export const handleDate = (value: string): string => {
	return value.slice(0, 16)
}

export const parseJwt = (token: string): string => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map((c) => {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)

	return JSON.parse(jsonPayload)
}

export const tokenExpiresIn = (token: Token): number => {
	const iatTime = token.iat * 1000
	const expTime = token.exp * 1000

	return expTime - iatTime
}

export const stripHtmlFromString = (text: string): string => {
	const doc = new window.DOMParser().parseFromString(text, 'text/html')
	return doc.body.textContent ?? ''
}

interface TokenResponse {
	ok: boolean
	accessToken: string
}

export const fetcher = (url: string): Promise<Response> => {
	return window
		.fetch(url, {
			method: 'POST',
			credentials: 'include'
		})
		.then(async (response) => {
			if (response.ok) {
				return response
			} else {
				return Promise.reject(response)
			}
		})
}

export const refreshToken = async (): Promise<TokenResponse> => {
	const URL = process.env.REFRESH_URL
	if (!URL) {
		throw new Error('Error getting refresh token')
	}
	const data = await fetcher(URL)
	if (!data) {
		throw new Error('Error getting refresh token')
	}
	return data.json()
}
