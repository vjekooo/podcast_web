// eslint-disable-next-line
import React, { useEffect, useRef } from 'react'

function useTimeout<T>(callback: () => Promise<T> | (() => void), delay: number | null): void {
	const savedCallback = useRef(callback)

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the timeout loop.
	useEffect(() => {
		// let id: NodeJS.Timeout
		let id: number
		function tick(): void {
			const ret = savedCallback.current()

			if (ret instanceof Promise) {
				ret.then(() => {
					if (delay !== null) {
						id = setTimeout(tick, delay)
					}
				})
			} else {
				if (delay !== null) {
					id = setTimeout(tick, delay)
				}
			}
		}
		if (delay !== null) {
			id = setTimeout(tick, delay)
			return (): any => id && clearTimeout(id)
		}
	}, [delay])
}

export default useTimeout
