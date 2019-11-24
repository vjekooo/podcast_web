
export const handleDuration = (value: string): string => {
	const unixTimeInMili = Number(value) * 1000
	const date = new Date(unixTimeInMili)

	return date.toISOString().slice(10, 19).replace('T', ' ')
}

export const handleDate = (value: string): string => {
	console.log(value)
	return value.slice(0, 16)
}

export const parseXml = (xml: any): void => {
	// const items = xml.getElementsByTagName('item')
	const x = xml.documentElement.childNodes

	const obj: any = {}

	x.forEach((el: any, index: number): void => {
		el.childNodes.forEach((node: any, index: number) => {
			if (index < 40) {
				if (node.childNodes[0]) {
					if (node.childNodes[0].nodeValue) {
						console.log(node.childNodes[0])
						obj[node.nodeName] = node.childNodes[0].nodeValue
					} else {
						console.log(node.childNodes[0])
						node.childNodes[0].forEach((child: any): void => {
							console.log(child.childNodes[0])
						})
					}
				}
			}
		})
	})

	// console.log(obj)
}
