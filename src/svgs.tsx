
import React from 'react'

export const PlayIcon = ({
	width = '30px',
	fill = '#000',
	style = {},
	className = '',
	viewBox = '0 0 32 32'
}): any => (
	<svg
		version="1.1" x="0px" y="0px"
		width={width}
		height={width}
		viewBox="0 0 60 60"
	>
		<g>
			<path fill={fill} d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
				c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
				C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
			<path fill={fill} d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
				S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
		</g>
	</svg>
)

export const PauseIcon = ({
	width = '30px',
	fill = '#000',
	style = {},
	className = '',
	viewBox = '0 0 32 32'
}): any => (
	<svg
		version="1.1" x="0px" y="0px"
		viewBox="0 0 480 480"
		width={width}
		height={width}
	>
		<g>
			<g>
				<path fill={fill} d="M240,0C107.452,0,0,107.452,0,240s107.452,240,240,240c132.486-0.15,239.85-107.514,240-240C480,107.452,372.548,0,240,0z
					M240,464C116.288,464,16,363.712,16,240S116.288,16,240,16c123.653,0.141,223.859,100.347,224,224
					C464,363.712,363.712,464,240,464z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill={fill} d="M200,136c-4.418,0-8,3.582-8,8v192c0,4.418,3.582,8,8,8s8-3.582,8-8V144C208,139.582,204.418,136,200,136z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill={fill} d="M280,136c-4.418,0-8,3.582-8,8v192c0,4.418,3.582,8,8,8s8-3.582,8-8V144C288,139.582,284.418,136,280,136z"/>
			</g>
		</g>
	</svg>
)

export const ForwardIcon = ({
	width = '30px',
	fill = '#000',
	style = {},
	className = '',
	viewBox = '0 0 32 32'
}): any => (
	<svg
		viewBox="0 0 480 480"
		width={width}
		height={width}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path fill={fill} d="m240 0c-132.546875 0-240 107.453125-240 240s107.453125 240 240 240 240-107.453125 240-240c-.148438-132.484375-107.515625-239.851562-240-240zm0 464c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.140625 123.652344-100.347656 223.859375-224 224zm0 0"/>
		<path fill={fill} d="m269.449219 130.144531c-2.332031-2.167969-5.726563-2.746093-8.644531-1.476562-2.917969 1.269531-4.804688 4.148437-4.804688 7.332031v85.65625l-98.550781-91.511719c-2.332031-2.167969-5.726563-2.746093-8.644531-1.476562-2.917969 1.269531-4.804688 4.148437-4.804688 7.332031v208c0 3.183594 1.886719 6.0625 4.804688 7.332031 2.917968 1.269531 6.3125.691407 8.644531-1.476562l98.550781-91.511719v85.65625c0 3.183594 1.886719 6.0625 4.804688 7.332031 2.917968 1.269531 6.3125.691407 8.644531-1.476562l112-104c1.625-1.511719 2.546875-3.632813 2.546875-5.855469s-.921875-4.34375-2.546875-5.855469zm-109.449219 195.511719v-171.3125l92.238281 85.65625zm112 0v-171.3125l92.238281 85.65625zm0 0"/>
	</svg>
)

export const RewindIcon = ({
	width = '30px',
	fill = '#000',
	style = {},
	className = '',
	viewBox = '0 0 32 32'
}): any => (
	<svg
		version="1.1" x="0px" y="0px"
		width={width}
		height={width}
		viewBox="0 0 64 64"
	>
		<g id="Rewind-backward">
			<path fill={fill} d="M17.3594227,31.2304993C17.1317997,31.4209003,17,31.7021999,17,31.9990005
				c0,0.2968979,0.1317997,0.5782013,0.3594227,0.7686005l12,10.0009995C29.5429993,42.9208984,29.7705002,43,30,43
				c0.1445007,0,0.2891006-0.0312004,0.4237995-0.0946999C30.775423,42.7411995,31,42.3876991,31,42v-7.8652l10.3599014,8.6338005
				C41.5429993,42.9208984,41.7705002,43,42,43c0.1441002,0,0.2886009-0.0312004,0.4243011-0.0946999
				C42.7754211,42.7411995,43,42.3876991,43,42V22c0-0.3876991-0.2245789-0.7411995-0.5756989-0.9053001
				c-0.3496017-0.1660004-0.7656021-0.1112995-1.0643997,0.1368008L31,29.8635006V22
				c0-0.3876991-0.224577-0.7411995-0.5762005-0.9053001c-0.3486004-0.1639996-0.7645988-0.1112995-1.0643768,0.1368008
				L17.3594227,31.2304993z M31.5625,31.9990005L41,24.1348V39.8652L31.5625,31.9990005z M19.5625,31.9990005L29,24.1348V39.8652
				L19.5625,31.9990005z"/>
			<path fill={fill} d="M0.0000008,32c0,17.6730995,14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0S0.0000008,14.3268995,0.0000008,32
				z M2.0000007,32c0-16.5419998,13.4579992-30,30-30c16.542099,0,30,13.4580002,30,30c0,16.542099-13.457901,30-30,30
				C15.4580002,62,2.0000007,48.542099,2.0000007,32z"/>
		</g>
	</svg>
)

export const Star = ({
	width = '40px',
	fill = '#000',
	fill2 = '#fff'
}): any => (
	<svg
		version="1.1" x="0px" y="0px"
		viewBox="0 0 511.999 511.999"
		width={width}
		height={width}
	>
		<path fill={fill} d="M452.71,157.937l-133.741-12.404L265.843,22.17c-3.72-8.638-15.967-8.638-19.686,0l-53.126,123.362
			L59.29,157.937c-9.365,0.868-13.149,12.516-6.084,18.723l100.908,88.646l-29.531,131.029c-2.068,9.175,7.841,16.373,15.927,11.572
			L256,339.331l115.49,68.576c8.087,4.802,17.994-2.397,15.927-11.572l-29.532-131.029l100.909-88.646
			C465.859,170.453,462.074,158.805,452.71,157.937z"/>
		<g>
			<path fill={fill2} d="M119.278,17.923c6.818,9.47,26.062,50.14,37.064,73.842c1.73,3.726-2.945,7.092-5.93,4.269
				C131.425,78.082,98.96,46.93,92.142,37.459c-5.395-7.493-3.694-17.941,3.8-23.336C103.435,8.728,113.883,10.43,119.278,17.923z"/>
			<path fill={fill2} d="M392.722,17.923c-6.818,9.47-26.062,50.14-37.064,73.842c-1.73,3.726,2.945,7.092,5.93,4.269
				c18.987-17.952,51.451-49.105,58.27-58.575c5.395-7.493,3.694-17.941-3.8-23.336C408.565,8.728,398.117,10.43,392.722,17.923z"/>
			<path fill={fill2} d="M500.461,295.629c-11.094-3.618-55.689-9.595-81.612-12.875c-4.075-0.516-5.861,4.961-2.266,6.947
				c22.873,12.635,62.416,34.099,73.51,37.717c8.778,2.863,18.215-1.932,21.078-10.711
				C514.034,307.928,509.239,298.492,500.461,295.629z"/>
			<path fill={fill2} d="M11.539,295.629c11.094-3.618,55.689-9.595,81.612-12.875c4.075-0.516,5.861,4.961,2.266,6.947
				c-22.873,12.635-62.416,34.099-73.51,37.717c-8.778,2.863-18.215-1.932-21.078-10.711S2.761,298.492,11.539,295.629z"/>
			<path fill={fill2} d="M239.794,484.31c0-11.669,8.145-55.919,13.065-81.582c0.773-4.034,6.534-4.034,7.307,0
				c4.92,25.663,13.065,69.913,13.065,81.582c0,9.233-7.485,16.718-16.718,16.718C247.279,501.029,239.794,493.543,239.794,484.31z"/>
		</g>
		<path fill={fill} d="M285.161,67.03l-19.319-44.86c-3.72-8.638-15.967-8.638-19.686,0L193.03,145.532L59.29,157.937
			c-9.365,0.868-13.149,12.516-6.084,18.723l100.908,88.646l-29.531,131.029c-2.068,9.175,7.841,16.373,15.927,11.572l15.371-9.127
			C181.08,235.66,251.922,115.918,285.161,67.03z"/>
	</svg>
)

export const Arrow = ({
	width = '40px',
	fill = '#000'
}): any => (
	<svg
		version="1.1" x="0px" y="0px"
		viewBox="0 0 512 512"
		width={width}
		height={width}
	>
		<g>
			<g>
				<path fill={fill} d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496
					C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"/>
			</g>
		</g>
		<g>
			<g>
				<path fill={fill} d="M261.12,140c-3.12-3.136-8.176-3.136-11.312,0l-3.008,3.008h-0.224v0.224l-97.504,97.504l11.312,11.312l86.192-86.192
					V390.48h16v-226.4l87.968,87.968l11.312-11.312L261.12,140z"/>
			</g>
		</g>
	</svg>
)
