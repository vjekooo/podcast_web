import { calculateTime, handleDate } from './helpers'

describe('Helpers', () => {
	test('it should return playtime as a string', () => {
		const value = calculateTime(1601411064)
		expect(value).toEqual('0444836:24:24')
	})

	test('it should return date as a string', () => {
		const value = handleDate('23 02')
		expect(value).toEqual('23 02')
	})
})
