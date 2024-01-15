import EventAttractionTemplate from "@/components/EventAttractionTemplate";
import React from "react";
import { useEffect, useState } from 'react'

export default function attractions() {
	const [strapiData, setStrapiData] = useState();

	useEffect(() => {
		async function fetchStrapiData() {
			const response = await fetch(`https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/attrractions?populate=*`) // it is spelt like this in api
			const data = await response.json()
			setStrapiData(data.data)
		}

		fetchStrapiData()
	}, [])

	return (
		<>
			<EventAttractionTemplate variant="attractions" strapiDataLink= {strapiData} strapiDataLinkSetter={setStrapiData}></EventAttractionTemplate>
		</>
	);
}
