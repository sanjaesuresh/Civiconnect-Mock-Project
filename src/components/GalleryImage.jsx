import Image from 'next/image'
import React from 'react'

export default function GalleryImage({ src, alt }) {
	return (
		<>
			<div className="container">
				<Image src={src} alt={alt} width={368} height={368} style={{ height: "100%", objectFit: "cover" }} />
			</div>


			<style jsx>{`
				.container {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 378px;
					height: 378px;
					border: 8px solid white;
					box-shadow: var(--shadow-box-massive-card);
				}
			`}</style>
		</>
	)
}
