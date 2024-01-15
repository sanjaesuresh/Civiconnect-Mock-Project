import React from 'react'

export default function TestComponent({ color, fontSize } /*props*/) {
	//code
	console.log(color)

	//html
	return (
		<>
			{/* html */}
			<div>
				<p>
					TestComponent
				</p>
			</div>

			{/* styles */}
			<style jsx>{`
				p {
					color: ${color};
				}
			`}</style>
		</>
	)
}
