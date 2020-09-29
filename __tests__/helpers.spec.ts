
import { calculateTime } from '../src/helpers'

describe('Calculate play time', () => {
	test('it should return playtime as a string', () => {
		const time = calculateTime(1601411064);
		expect(time).toEqual('0444836:24:24')
  })
})
