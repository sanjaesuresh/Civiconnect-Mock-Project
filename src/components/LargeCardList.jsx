import React from 'react'
import { Children } from 'react';

export default function LargeCardList({children}) {
	//code
	//html
	return (
		<>
			<div className="card-container">
				{children}
			</div>

			<style jsx>{`
				.card-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 50px;
					padding-bottom: 50px;
					padding-top: 20px;
				}
			`}</style>
		</>
	)
}