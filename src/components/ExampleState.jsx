import React from 'react'
import { useState, useEffect } from 'react';

export default function ExampleState({prop1}) {
	//count state is saved between renders
	const [count, setCount] = useState(0);

	//run once on load
	useEffect(() => {

	}, [])

	//run when count changes
	useEffect(() => {
		console.log(count)
	}, [count])

	function handleCount() {
		setCount(count + 1);
	}

	return (
		<>
			<button onClick={handleCount}>
				{count}
			</button>

			<style jsx>{`
				button {
					padding: 8px;
					background: blue;
					color: white;
				}

			`}</style>
		</>

	)
}
