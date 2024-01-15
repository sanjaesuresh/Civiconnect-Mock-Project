import CardCarousel from "@/components/CardCarousel";
import DefaultButton from "@/components/DefaultButton";
import Section from "@/components/Section";
import TextInput from "@/components/TextInput";
import LargeCardMobile from "@/components/LargeCardMobile";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
	const [searchQuery, setSearchQuery] = useState([]); // the thing to search for
	const [searchReq, setSearchReq] = useState(false); // request for a search opperation
	const [sortFlags, setSortFlags] = useState(["title", "des"]);
	const [reloadLocalCards, setReloadLocalCards] = useState([]); // request for a reload of local cards
	const [allTags, setAllTags] = useState([]); // all tags avalible at the current moment
	const [selectedTags, setSelectedTags] = useState([]); // all tags the user has selected


	const [eventStrapiData, setEventsStrapiData] = useState([]); // events
	const [attractionStrapiData, setAttractionStrapiData] = useState([]);
	const [businessStrapiData, setBusinessStrapiData] = useState([]);

	const [showFilterSortOptions, setShowFilterSortOptions] = useState(false); // show filter and sort options


	useEffect(() => {
		async function fetchStrapiData() {
			if (searchQuery == "") {
				console.log("No search query, load all")

				const eventResponse = await fetch('https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/events?populate=*')
				const eventData = await eventResponse.json()
				setEventsStrapiData(eventData.data)

				const attractionResponse = await fetch('https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/attrractions?populate=*')
				const attractionData = await attractionResponse.json()
				setAttractionStrapiData(attractionData.data)

				const businessResponse = await fetch('https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/businesses?populate=*')
				const businessData = await businessResponse.json()
				setBusinessStrapiData(businessData.data)
			}


			// console.log(eventStrapiData)
		}

		fetchStrapiData()
	}, [searchReq])


	/**
	 * Read search queries from router and apply them is applicable
	 */

	let router = useRouter();
	useEffect(() => {
		async function workaround() {
			setTimeout(() => { // avoid asyncrounous programming demons
				if (router.query == undefined || router.query.searchQuery == undefined) {
					console.log("router is not ready yet");
					return;
				}

				// console.log("router IS READY")
				// console.log(router.query.searchQuery);
				if (router.query.searchQuery != "") {
					setSearchQuery([router.query.searchQuery]);
					setSearchReq(true);
				}

				router.query = undefined // only read and set once
			}, 500)
		}

		workaround()
	}, [router])



	/**
	 * Search and sort functions
	 */

	/**
	 * {0: data...} ===> {0: attributes: {data...}}
	 * @param {*} oldArray 
	 * @returns 
	 */
	async function reMap(oldArray, variant) {
		if (oldArray.length <= 0) return undefined;

		// let newArray = [];

		let strapiQuery = ""

		// get strapi query, then search for all ids
		oldArray.map((item) => {
			strapiQuery += `&filters[id][$in]=${item.id}`;
		})
		// console.log(oldArray);

		/**
		 * Fetch data with images from strapi
		 * @returns 
		 */
		async function getImages() {
			const imagesPulled = await fetch(`https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/${variant}?populate=*${strapiQuery}`);
			const imageData = await imagesPulled.json();
			// console.log("Raw images")
			// console.log(imageData)


			// sort the data to ensure parity
			imageData.data.sort((a, b) => {
				return a.id > b.id ? 1 : -1;
			})

			return imageData.data;
		}

		let newData = await getImages();
		// console.log("New data")
		// console.log(newData)

		return newData;
	}

	useEffect(() => {
		async function fetchSearchResult() {
			console.log("Searching for: " + searchQuery);
			if (searchReq == false) {
				console.log("No search request, aborting")
				return;
			}

			// show all results if search is blank
			if (searchQuery[0] == undefined) {
				console.log("Blank search, showing all results")
				return;
			}

			const gotData = await fetch(`https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/fuzzy-search/search?query=${searchQuery}`);
			const searchData = await gotData.json();
			// console.log("got data")
			// console.log(searchData);

			// set the data
			setEventsStrapiData(await reMap(searchData.events, "events"));
			setBusinessStrapiData(await reMap(searchData.businesses, "businesses"));
			setAttractionStrapiData(await reMap(searchData.attrractions, "attrractions"));
			setSearchReq(false); // end search request

			// console.log("ending data");
			// console.log(eventStrapiData);
			// console.log(attractionStrapiData);
			// console.log(businessStrapiData);
		}

		fetchSearchResult()
	}, [searchReq, reloadLocalCards])




	/**
	 * Filter and sort functions
	 */


	/**
	 * Sort the data an all three strapi datas
	 *
	 * @param {Array} variant which data array to sort
	 * @param {String} sortType sort by date or title
	 * @param {String} sortDirection sort by ascending (asc) or descending (des)
	 */
	function doSort(variant, variantSetter, sortType, sortDirection) {
		sortType = sortFlags[0];
		sortDirection = sortFlags[1];
		// console.log("sorting..." + sortType + sortDirection);

		let sortedArr;

		// sort by type
		if (sortType == "id") {
			// console.log("sorting by id")
			sortedArr = variant.sort((a, b) => {
				return a.id > b.id ? 1 : -1;
			})
		}

		else if (sortType == "date") {
			// console.log("sorting by date")
			sortedArr = variant.sort((a, b) => {
				let first = new Date(a.attributes.date).getTime();
				let second = new Date(b.attributes.date).getTime();

				// i think this is required for insitu
				if (first == second) return 0;
				else if (first > second) return 1;
				else return -1;
			})
		}
		else {
			// console.log("sorting by title")
			sortedArr = variant.sort((a, b) => {
				return a.attributes.title > b.attributes.title ? 1 : -1;
			})

		}

		// // reverse results if requested
		if (sortDirection == "des") {
			sortedArr = sortedArr.reverse();
		}

		variantSetter(sortedArr);
		setReloadLocalCards(!reloadLocalCards);
	}


	/**
	 * returns the tags the user selected, parsed into a filter query string
	 * @returns
	 */
	function getAllSelectedTagsInFormat() {
		let strapiQuery = "";
		selectedTags.map((item) => {
			strapiQuery += `&filters[tags][$in]=${item}`;
		})

		return strapiQuery;
	}

	/**
	 * returns all tags from all strapi datas, and sets the coresponding usestate
	 * @returns
	 */
	function getAllCurrentTagsArray() {
		let allTags = [];

		// Take all the tags current in a card displayed on the page
		eventStrapiData?.map((item) => {
			allTags.push(item.attributes.tags);
		})

		attractionStrapiData?.map((item) => {
			allTags.push(item.attributes.tags);
		})

		businessStrapiData?.map((item) => {
			allTags.push(item.attributes.tags);
		})

		setAllTags([...new Set(allTags)]); // remove duplicates
		return allTags;
	}

	/**
	 * This will request a new set of cards based on the tags selected
	 */
	function doFilter() {
		getAllCurrentTagsArray(); // get all current tags

		console.log("filtering...")
		async function fetchFilterResult() {
			// abort if no tags
			if (selectedTags[0] === undefined) {
				console.log("No tags, aborting, showing all results")
				return;
			}

			/**
			 * @param {*} variant useState to read
			 * @param {*} setter setter for the useState
			 */
			async function askStrapiForFilters(variant, setter) {
				const gotData = await fetch(
					`https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/${variant}/?populate=*${getAllSelectedTagsInFormat()}`);
				const searchData = await gotData.json();
				// console.log("got data")
				// console.log(searchData);
				setter(searchData.data);
			}

			askStrapiForFilters("events", setEventsStrapiData);
			askStrapiForFilters("businesses", setBusinessStrapiData);
			askStrapiForFilters("attrractions", setAttractionStrapiData);
		}

		fetchFilterResult()
	}



	/**
	 * Misc functions
	 */


	/**
	 * Read from text input component
	 * @param {*} data 
	 */
	const readQuery = (data) => {
		// console.log("recieved")
		// console.log(data)
		setSearchQuery(data)
	}

	/**
	 * Read the type to sort by from the user
	 * @param {*} data 
	 */
	const readSortType = (data) => {
		// console.log("recieved type " + data.target.value);
		setSortFlags([data.target.value, sortFlags[1]]);
	}

	/**
	 * Read the direction to sort by from the user
	 * @param {*} data 
	 */
	const readDirection = (data) => {
		// console.log("recieved fdirection " + data.target.value);
		setSortFlags([sortFlags[0], data.target.value]);
	}

	/**
	 * Read the tags to the user wants to filter by
	 * @param {*} data 
	 */
	const readTag = (data) => {
		// if checked, add to array, else remove from array
		data.target.checked ? setSelectedTags([...selectedTags, data.target.value])
			:
			setSelectedTags([...selectedTags.filter(tag => tag != data.target.value)]);
	}

	/**
	 * Take action on enter press
	 * @param {*} event 
	 */
	const handleKeyPress = (keyPress) => {
		if (keyPress.key === 'Enter') {
			setSearchReq(true);
		}
	}

	/**
	 * Trigger a reload of the cards
	 */
	useEffect(() => {
		async function fetchStrapiData() {
			// console.log("Reloading all");
			setEventsStrapiData(eventStrapiData);
			setAttractionStrapiData(attractionStrapiData);
			setBusinessStrapiData(businessStrapiData);
			// console.log(eventStrapiData);
		}

		fetchStrapiData()
	}, [reloadLocalCards])



	return (
		<>
			<style jsx>
				{`
           {
            /* heading, search bar, filter buttons */
          }

          h1 {
            font-size: var(--font-size-header-M);
            font-weight: var(--font-weight-titles);
            font-family: var(--font-calps);
          }

          .topPart {
            display: flex;
            flex-direction: column;
            margin: auto;
          }
          .searchBox {
            width: 100%;
          }
          .searchBoxWithIcon {
            display: flex;
            margin: 20px;
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
          }

          .search-title {
            font-size: var(--font-size-header-M);
            margin: 0px 10px;
          }


          .filter-sort {
			display: flex;
            align-self: end;
			flex-wrap: wrap;
          }

           {
            /* Carousel */
          }
          .cardPlaceholder {
            width: 360px;
            height: 360px;
            background-color: grey;
          }

           {
            /* for card spacing */
          }
          li {
            margin: 20px;
          }


		  {/* Sorting and filtering */}
			.sortOptions-wrap {
				display: ${showFilterSortOptions ? "flex" : "none"};
				flex-direction: column;
				align-items: start;
				margin-right: 20px;
				font-size: var(--font-size-body-Mplus);
            	font-family: var(--font-roboto);
			}
		  .sortOptions-wrap div {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			{/* margin: 0px 5px */}
		  }
		  .sortOptions * {
			margin-right: 5px;
		  }

		  .filterOptions-wrap {
			flex-wrap: wrap;
			max-height: 60px;
		  }


		  .iconBackdrop {
            width: 450px;
            height: 500px;
            position: fixed;
            z-index: -99;
			top: 140px;
			left: 40px;
          }


		  @media screen and (max-width: 639px) {
            .search-title {
              font-size: var(--font-size-header-S);
            }

			.filterOptions-wrap {
				max-height: none;
				margin-bottom: 20px;
			}
          }
        `}
			</style>


			<div className="iconBackdrop">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="512"
					height="512"
					viewBox="0 0 512 512"
					fill="none"
				>
					<path className=""
						d="M416 208C416 253.9 401.1 296.3 376 330.7L502.6 457.4C515.1 469.9 515.1 490.2 502.6 502.7C490.1 515.2 469.8 515.2 457.3 502.7L330.7 376C296.3 401.2 253.9 416 208 416C93.1 416 0 322.9 0 208C0 93.1 93.1 0 208 0C322.9 0 416 93.1 416 208ZM208 352C226.91 352 245.636 348.275 263.106 341.039C280.577 333.802 296.452 323.195 309.823 309.823C323.195 296.452 333.802 280.577 341.039 263.106C348.275 245.636 352 226.91 352 208C352 189.09 348.275 170.364 341.039 152.894C333.802 135.423 323.195 119.548 309.823 106.177C296.452 92.805 280.577 82.198 263.106 74.9613C245.636 67.7247 226.91 64 208 64C189.09 64 170.364 67.7247 152.894 74.9613C135.423 82.198 119.548 92.805 106.177 106.177C92.805 119.548 82.198 135.423 74.9613 152.894C67.7247 170.364 64 189.09 64 208C64 226.91 67.7247 245.636 74.9613 263.106C82.198 280.577 92.805 296.452 106.177 309.823C119.548 323.195 135.423 333.802 152.894 341.039C170.364 348.275 189.09 352 208 352Z"
						fill="#F2F2F2"
					/>
				</svg>
			</div>

			<Section marginTop="20px">
				<h1 className="search-title">Search Events & Attractions</h1>
				<div className="topPart">
					<div className="searchBoxWithIcon" >
						<DefaultButton onClick={() => { setSearchReq(true) }}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</DefaultButton>

						<div className="searchBox">
							<TextInput placeholder={searchQuery != "" ? searchQuery : "Search"} width={`100%`}
								dataOut={readQuery} onKeyDownOut={handleKeyPress}></TextInput>
						</div>
					</div>
					<div className="filter-sort">

						<div className="sortOptions-wrap filterOptions-wrap ">
							<p style={{ fontSize: "16px", marginBottom: "5px", fontWeight: "bold" }}>Filter By:</p>
							{
								allTags.map((tag, index) => (

									<div className="sortOptions" key={index}>
										<input type="checkbox" id={tag} name={tag} value={tag} onChange={readTag} />
										<label htmlFor={tag}>{tag}</label>
									</div>
								))
							}
						</div>

						<div className="sortOptions-wrap">
							<p style={{ fontSize: "16px", marginBottom: "5px", fontWeight: "bold" }}>Sort By:</p>
							<div className="sortOptions">

								<label htmlFor="type1">ID</label>
								<input type="radio" id="type1" name="type" value="id" onChange={readSortType} />
								<label htmlFor="type2">Title</label>
								<input type="radio" id="type2" name="type" value="title" onChange={readSortType} />
								<label htmlFor="type3">Date</label>
								<input type="radio" id="type3" name="type" value="date" onChange={readSortType} />
							</div>

							<div className="sortOptions">
								<label htmlFor="direction1">Ascending</label>
								<input type="radio" id="direction1" name="direction" value="asc" onChange={readDirection} />
								<label htmlFor="direction1">Descending</label>
								<input type="radio" id="direction2" name="direction" value="des" onChange={readDirection} />
							</div>

						</div>
						<div>
							<DefaultButton className="filter-sort-btn" onClick={() => { setShowFilterSortOptions(true); doFilter() }}>Filter</DefaultButton>
							<DefaultButton className="filter-sort-btn" onClick={() => {
								setShowFilterSortOptions(true);
								doSort(eventStrapiData, setEventsStrapiData);
								doSort(attractionStrapiData, setAttractionStrapiData);
								doSort(businessStrapiData, setBusinessStrapiData);
							}}>Sort</DefaultButton>
						</div>
					</div>
				</div>
			</Section>

			<Section marginBottom="40px">
				<CardCarousel title="Events" margin="0px 0px 40px 0px">
					{eventStrapiData?.map((card, index) => (
						<li key={index}>
							<LargeCardMobile
								isTicket={false}
								isEvent={true}
								title={card.attributes.title}
								description={card.attributes.richTextDescription != undefined ? card.attributes.richTextDescription : card.attributes.description}
								address={card.attributes.location}
								ticketDate={card.attributes.date}
								ticketTime={`${card.attributes.startTime} - ${card.attributes.endTime}`}
								rating={card.attributes.numStars}
								category={card.attributes.tags}
								imgSrc={card.attributes.image.data.attributes.url}
								imgAltText={card.attributes.image.data.attributes.alternativeText}
								barcodeUID={card.attributes.barcodeUID}

								isRegisterable={card.attributes.isRegisterable}
								isFull={card.attributes.isFull}
								isAvail={card.attributes.isAvailable}
								hoursOfOperation={card.attributes.hoursOfOperation}
							>
							</LargeCardMobile>
						</li>
					))}

				</CardCarousel>
				<hr />
				<CardCarousel title="Attractions" margin="40px 0px 40px 0px">

					{attractionStrapiData?.map((card, index) => (
						<li key={index}>
							<LargeCardMobile
								isTicket={false}
								isEvent={false}
								title={card.attributes.title}
								description={card.attributes.richTextDescription != undefined ? card.attributes.richTextDescription : card.attributes.description}
								address={card.attributes.location}
								ticketDate={card.attributes.date}
								ticketTime={`${card.attributes.startTime} - ${card.attributes.endTime}`}
								rating={card.attributes.numStars}
								category={card.attributes.tags}
								imgSrc={card.attributes.image.data.attributes.url}
								imgAltText={card.attributes.image.data.attributes.alternativeText}
								barcodeUID={card.attributes.barcodeUID}

								isRegisterable={card.attributes.isRegisterable}
								isFull={card.attributes.isFull}
								isAvail={card.attributes.isAvailable}
								hoursOfOperation={card.attributes.hoursOfOperation}
							>
							</LargeCardMobile>
						</li>
					))}

				</CardCarousel>
				<hr />

				<CardCarousel title="Business" margin="40px 0px 40px 0px">

					{businessStrapiData?.map((card, index) => (
						<li key={index}>
							<LargeCardMobile
								isTicket={false}
								isEvent={false}
								title={card.attributes.title}
								description={card.attributes.richTextDescription != undefined ? card.attributes.richTextDescription : card.attributes.description}
								address={card.attributes.location}
								ticketDate={card.attributes.date}
								ticketTime={`${card.attributes.startTime} - ${card.attributes.endTime}`}
								rating={card.attributes.numStars}
								category={card.attributes.tags}
								imgSrc={card.attributes.image.data.attributes.url}
								imgAltText={card.attributes.image.data.attributes.alternativeText}
								barcodeUID={card.attributes.barcodeUID}

								isRegisterable={card.attributes.isRegisterable}
								isFull={card.attributes.isFull}
								isAvail={card.attributes.isAvailable}
								hoursOfOperation={card.attributes.hoursOfOperation}
							>
							</LargeCardMobile>
						</li>
					))}

				</CardCarousel>
			</Section>

		</>
	);
}
