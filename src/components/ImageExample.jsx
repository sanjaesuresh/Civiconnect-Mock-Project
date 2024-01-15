import React from 'react'
import Image from "next/image"

export default function ImageExample() {

	/* image must exist in public folder then you can reference it like below */
	/* you cant style the image component so wrap it in a div and style that */
	return (
		<>
			<div>
				<Image
					src="civi.svg" width={600} height={600} alt="Civiconnect Logo"
					style={"max-width: 10px"}
				/>
			</div>

			<style jsx>{`
				div {
					max-width: 300px;
					background: black;
				}
			`}</style>
		</>
	)
}
