
export const handleDuration = (value: string): string => {
	const unixTimeInMili = Number(value) * 1000
	const date = new Date(unixTimeInMili)

	return date.toISOString().slice(10, 19).replace('T', ' ')
}

export const handleDate = (value: string): string => {
	console.log(value)
	return value.slice(0, 16)
}
