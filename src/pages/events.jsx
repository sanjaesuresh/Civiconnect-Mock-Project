import EventAttractionTemplate from "@/components/EventAttractionTemplate";
import React from "react";
import { useEffect, useState } from 'react'

export default function events() {
	const [strapiData, setStrapiData] = useState();

	useEffect(() => {
		async function fetchStrapiData() {
			const response = await fetch(`https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/events?populate=*`)
			const data = await response.json()
			setStrapiData(data.data)
		}

		fetchStrapiData()
	}, [])

	// console.log(strapiData)

	return (
		<>
			<EventAttractionTemplate variant={"events"} strapiDataLink={strapiData} strapiDataLinkSetter={setStrapiData}></EventAttractionTemplate>
		</>
	);
}
