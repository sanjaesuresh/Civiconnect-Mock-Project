import React from "react";

import LargeCardDesktop from "@/components/LargeCardDesktop";
import LargeCardMobile from "@/components/LargeCardMobile";
import LargeCardList from "@/components/LargeCardList";
import CardCarousel from "./CardCarousel";
import SmallCard from "./SmallCard";
import dynamic from 'next/dynamic'
import DefaultButton from "./DefaultButton";
const MapCard = dynamic(() => import("@/components/MapCard"), { ssr: false })
import { useEffect } from "react";

export default function EventAttractionTemplate({
	variant = "events",
	strapiDataLink,
	strapiDataLinkSetter
}) {



	/**
 * Trigger a reload of the cards
 */
	useEffect(() => {
		async function fetchStrapiData() {
			console.log("Reloading all");

			// console.log(eventStrapiData);
			strapiDataLinkSetter(strapiDataLink);
		}

		fetchStrapiData()
	}, [strapiDataLink])



	const itemSelector = (id) => {
		// create new array, deselect all items first
		let temp = strapiDataLink?.map((element) => {
			// console.log(element)
			if (element.isSelected) {
				element.isSelected = false;
			}
			return element;
		}
		)

		// select the item with the id
		temp = temp?.map((element) => {
			if (element.id == id) {
				element.isSelected = true;
				// console.log("selected"); console.log(element);
			}
			return element;
		})


		strapiDataLinkSetter(temp);

	}


	return (
		<>
			<style jsx>
				{`
          .iconBackdrop {
            width: 450px;
            height: 500px;
            position: fixed;
            z-index: -99;
			top: 40px;

            transform: rotate(-15deg) translate(10px, 80px);
          }

          .psudoBody {
            margin: auto;
            width: 100%;
          }

          .maincontent {
            max-width: 100%;
            margin: 0 100px;
            display: flex;
            flex-direction: column;
            font-family: var(--font-calps);
            font-weight: bold;
          }

          /* Titles */
          .titleBlock {
            display: flex;
            flex-direction: column;
            margin-top: 50px;
            gap: 25px;
          }

          .titleBlock p {
            font-family: var(--font-calps);
            font-weight: var(--font-weight-titles);
            font-size: 24px;

            /* Hax for calps font spacing */
            /* margin-bottom: 20px; */
            position: relative;
            top: -30px;
          }

          /* Events content  */
          /* .offerings {
                background-color: rgba(0, 0, 0, 0.332);
        } */

          .mobileOfferings {
            display: none;
            flex-direction: column;
          }

          #mobileOfferingsTitles {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          /* scroll bar */
          ::-webkit-scrollbar-thumb {
            background: var(--color-font-secondary);
          }
          ::-webkit-scrollbar {
            width: 5px;
          }

          /* Placeholder cards */
          .cards-mobile {
            display: none;
          }

          .info {
            width: 700px;
            min-height: 400px;
            float: right;

            background-color: rgb(241, 184, 70);
          }

          /* EndPlaceholder cards */

          h1 {
            font-family: var(--font-calps);
            font-size: var(--font-size-header-L);
            font-weight: var(--font-weight-titles);
          }

          .offerings-text {
            font-family: var(--font-calps);
            font-size: var(--font-size-header-M);
            font-weight: var(--font-weight-titles);
          }

          h2 {
            font-size: var(--font-size-header-S);
          }

{/* Map stuff */}
		  .mapContainer {
            {/* background-color: #d4d4d4; */}
			margin-bottom: 50px;
            width: 100%;
          }
			.smallCardli {
				margin: 10px 10px 5px 10px;
			}
	
		.mapCarousel-wrap {
			width: 340px;
			height: 400px;
			overflow-y: scroll;
		}


          @media screen and (max-width: 1000px) {
            /* Maybe use mobile cards here */
            .titleBlock p {
              /* removed Hax for calps font spacing */
              margin-top: 10px;
            }
            .maincontent {
              margin: 0 30px;
            }
          }

		  @media screen and (max-width: 800px) {
			{/* for map only */}
			.mapCarousel-wrap {
				width: 100%;
				height: 220px;
			}
			}

          @media screen and (max-width: 550px) {
            /* Mobile view. Map gets thrown to bottom, collaps */

            h1 {
              font-size: var(--font-size-header-M);
            }

            h2 {
              font-size: var(--font-size-body-L);
            }

            #offeringsSubheading {
              display: flex;
            }

            #browseBtn {
            }

            .titleBlock p {
              font-size: var(--font-size-body-Mplus);
              /* remove Hax for calps font spacing */
              margin-top: 16px;
            }

            .maincontent {
              margin: 0 10px;
            }

            /* reformat cards for mobile */
            .offerings {
            }

            .offerings-text {
              font-family: var(--font-calps);
              font-size: var(--font-size-header-S);
            }

            .mobileOfferings {
              display: flex;
            }

            .cards-desktop {
              display: none;
            }

            .cards-mobile {
              display: flex;
              flex-direction: column;

              nav ul {
                height: 500px;
                width: 400px;
                background-color: rgba(0, 255, 255, 0.227);
              }
            }


			

		



			{/* small cards  */}

          }
        `}
			</style>

			<div className="psudoBody">
				<div className="iconBackdrop">
					<svg xmlns="http://www.w3.org/2000/svg" width="569" height="589" viewBox="0 0 569 589" fill="none">
						<path className="backdrop-icon" d="M70.5684 89.6993C86.411 81.8063 105.587 88.2288 113.48 104.072L127.75 132.714L242.319 75.6339L228.049 46.9918C220.156 31.1491 226.578 11.9728 242.421 4.07978C258.264 -3.81328 277.44 2.60929 285.333 18.4519L299.603 47.094L342.566 25.6891C366.285 13.8719 395.117 23.5282 406.934 47.2474L428.339 90.2105L27.3496 289.989L5.94474 247.026C-5.87254 223.307 3.78376 194.476 27.503 182.658L70.4661 161.253L56.1962 132.611C48.3031 116.769 54.7257 97.5924 70.5684 89.6993ZM41.6196 318.632L442.609 118.853L563.903 362.31C575.72 386.03 566.064 414.861 542.345 426.678L227.282 583.648C203.563 595.465 174.731 585.809 162.914 562.089L41.6196 318.632ZM134.579 361.697L148.848 390.339C152.773 398.216 162.428 401.449 170.304 397.525L198.947 383.255C206.823 379.331 210.057 369.676 206.133 361.799L191.863 333.157C187.939 325.281 178.283 322.047 170.407 325.971L141.765 340.241C133.888 344.165 130.654 353.82 134.579 361.697ZM249.147 304.617L263.417 333.259C267.341 341.136 276.996 344.37 284.873 340.445L313.515 326.175C321.392 322.251 324.625 312.596 320.701 304.719L306.431 276.077C302.507 268.201 292.852 264.967 284.975 268.891L256.333 283.161C248.456 287.085 245.223 296.741 249.147 304.617ZM370.901 226.082C363.025 230.006 359.791 239.661 363.715 247.538L377.985 276.18C381.909 284.056 391.565 287.29 399.441 283.366L428.083 269.096C435.96 265.172 439.194 255.516 435.269 247.64L420.999 218.998C417.075 211.121 407.42 207.887 399.543 211.812L370.901 226.082ZM191.658 476.265L205.928 504.907C209.852 512.784 219.508 516.018 227.384 512.093L256.026 497.824C263.903 493.899 267.137 484.244 263.212 476.368L248.942 447.725C245.018 439.849 235.363 436.615 227.486 440.539L198.844 454.809C190.968 458.734 187.734 468.389 191.658 476.265ZM313.413 397.73C305.536 401.654 302.302 411.309 306.227 419.186L320.497 447.828C324.421 455.704 334.076 458.938 341.953 455.014L370.595 440.744C378.471 436.82 381.705 427.164 377.781 419.288L363.511 390.646C359.587 382.769 349.931 379.535 342.055 383.46L313.413 397.73ZM420.795 362.106L435.065 390.748C438.989 398.625 448.644 401.858 456.521 397.934L485.163 383.664C493.04 379.74 496.273 370.085 492.349 362.208L478.079 333.566C474.155 325.689 464.5 322.456 456.623 326.38L427.981 340.65C420.104 344.574 416.871 354.229 420.795 362.106Z" fill="#F2F2F2" />
					</svg>
				</div>

				<div className="maincontent">
					<div className="titleBlock">
						{variant == "events" && (
							<>
								<h1>Upcomming Events</h1>
								<p>There is always something around the corner</p>
							</>
						)}

						{variant == "attractions" && (
							<>
								<h1>Attractions</h1>
								<p>Eye spy with my little eye...</p>
							</>
						)}
					</div>


					<div className="mapContainer">
						<MapCard strapiDataLink={strapiDataLink} itemSelector={itemSelector}>


							<div className="mapCarousel-wrap">
								<CardCarousel margin="0px 0px 20px 0px">
									{strapiDataLink?.map((card, index) => (
										<li key={index} className={`smallCardli`}>
											<DefaultButton onClick={() => { itemSelector(card.id) }} className={`blank ${card.isSelected ? "selectedCard" : ""}`}>


												<SmallCard
													title={card.attributes.title}
													imgSrc={card.attributes.image.data.attributes.url}
													category={card.attributes.tags}
													scrollLink={card.refLink}
													scrollLinkMobile={card.refLinkMobile}
												>

													<img src="Icon-glass.svg" width={20} height={20} alt="uwu" />
												</SmallCard>
											</DefaultButton>
										</li>
									))}
								</CardCarousel>
							</div>
						</MapCard>
					</div>




					<div className="offerings">
						<h1 className="offerings-text">All Offerings</h1>

						{/* scrollable offerings */}
						<div className="cards-desktop">
							<LargeCardList>
								{strapiDataLink?.map((element, index) => (
									<div key={index} ref={(r) => {
										element.refLink = r;
									}}>
										<LargeCardDesktop
											isTicket={false}
											title={element.attributes.title}
											isEvent={variant === "events" ? true : false}
											description={element.attributes.description}
											address={element.attributes.location}
											ticketDate={element.attributes.date}
											ticketTime={`${element.attributes.startTime} - ${element.attributes.endTime}`}
											rating={element.attributes.numStars}
											category={element.attributes.tags}
											imgSrc={element.attributes.image.data.attributes.url}
											imgAltText={element.attributes.image.data.attributes.alternativeText}
											barcodeUID={element.attributes.barcodeUID}

											isRegisterable={element.attributes.isRegisterable}
											isFull={element.attributes.isFull}
											isAvail={element.attributes.isAvailable}
											hoursOfOperation={element.attributes.hoursOfOperation}
										></LargeCardDesktop>
									</div>
								))}
							</LargeCardList>
						</div>
						<div className="cards-mobile">
							<LargeCardList>
								{strapiDataLink?.map((element, index) => (
									<div key={index} ref={(r) => {
										element.refLinkMobile = r;
									}}>
										<LargeCardMobile
											isTicket={false}
											isEvent={variant === "events" ? true : false}
											title={element.attributes.title}
											description={element.attributes.description}
											address={element.attributes.location}
											ticketDate={element.attributes.date}
											ticketTime={`${element.attributes.startTime} - ${element.attributes.endTime}`}
											rating={element.attributes.numStars}
											category={element.attributes.tags}
											imgSrc={element.attributes.image.data.attributes.url}
											imgAltText={element.attributes.image.data.attributes.alternativeText}
											barcodeUID={element.attributes.barcodeUID}

											isRegisterable={element.attributes.isRegisterable}
											isFull={element.attributes.isFull}
											isAvail={element.attributes.isAvailable}
											hoursOfOperation={element.attributes.hoursOfOperation}
										></LargeCardMobile>
									</div>
								))}
							</LargeCardList>
						</div>
					</div>
				</div>
			</div >
		</>
	);
}
