import React from "react";
import { faStar as faStarfilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import DefaultButton from "./DefaultButton";
import ReactMarkdown from "react-markdown";

export default function LargeCardMobile({
	title = "Title",
	address = "101 Address Street, Lincoln, ON",
	category = "Other",
	description = "Explore endless fields of vines and grapes, with twists and turns to your hearts content. Fun for the whole family. Enjoy a warm, sunny day, in the relaxing yards of vine. Hurry up! Space is limited!",
	hoursOfOperation,
	rating,
	isEvent = false,
	isTicket = false,
	isRegisterable = false,
	isFull = false,
	isAvail = false,
	ticketDate = "2023-10-17",
	timeStart = "18:00:00",
	timeEnd = "20:30:00",
	ticketPrice = 0,
	imgSrc = "https://travelforfoodhub.com/wp-content/uploads/2023/05/Best-Wine-Regions-in-Europe.jpg",
	imgAltText,
	barcodeUID,
	forceMaxWidth = false,
}) {
	//code
	function renderStars() {
		const stars = [];
		for (let i = 0; i < 3; i++) {
			const icon = i < rating ? faStarfilled : faStarOutline;
			stars.push(<FontAwesomeIcon icon={icon} />);
		}
		return stars;
	}

	function tConvert(timeString) {
		const [hourString, minute] = timeString.split(":");
		const hour = +hourString % 24;
		return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
	}

	const categoryColors = {
		Restaurant: "#ff0303",
		Music: "#b33978",
		Performing_Arts: "#8b288f",
		Festival: "#56288f",
		Sports: "#1922a6",
		Charity: "#515cf0",
		Other: "#10649c",
		Tours: "#10929e",

		Monument: "#1eb07f",
		Mall: "#5ea890",
		Park: "#268034",
		Food: "#06590a",
		Shopping: "#74914d",
		Technology: "#90941e",
		Financial: "#b58412",
		Distribution: "#694c0a",
		Medical: "#009179",
		Emergency: "#666666",
		Industrial: "#b04300"
	};


	/**
	 * This function checks if category is in the list of categoryColours
	 * If no matchm the default colour (Other) is returned
	 * @param {*} category 
	 * @returns 
	 */
	function checkCategory(category) {
		if (category in categoryColors) {
			return category;
		} else {
			return "Other";
		}
	}


	// do not allow register for full events
	isFull ? isRegisterable = false : {};
	// tickets are not registerable by definition
	isTicket ? isRegisterable = false : {};

	category = checkCategory(category);

	//html
	return (
		<>
			<div className="large-card-mobile">
				<div className="image-container"></div>
				<img src={imgSrc} alt={imgAltText} className="content-img"></img>
				<div className="card-information-wrap">
					<div className="large-info-wrap">
						<div className="large-info-wrap-left">
							<h1 className="title">{title}</h1>
							<div className="address-wrap">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="17"
									height="26"
									viewBox="0 0 17 26"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M4.20434 1.19319C6.80537 -0.423801 10.0025 -0.395538 12.5791 1.26722C15.1304 2.96385 16.681 5.99182 16.6666 9.24908C16.6072 12.485 14.9445 15.5267 12.8661 17.8781C11.6665 19.2414 10.3246 20.4469 8.86772 21.4699C8.71768 21.5628 8.55332 21.6249 8.38277 21.6533C8.21862 21.6458 8.05876 21.5939 7.91761 21.5023C5.6934 19.9651 3.74209 18.0029 2.15755 15.7101C0.831658 13.7962 0.0783763 11.4839 1.38302e-06 9.08728C-0.00171986 5.82378 1.6033 2.81018 4.20434 1.19319ZM5.70678 10.438C6.14431 11.592 7.17705 12.3448 8.3228 12.3448C9.0734 12.3506 9.79493 12.0289 10.3266 11.4515C10.8583 10.874 11.156 10.0888 11.1533 9.27072C11.1573 8.02203 10.4703 6.89386 9.41288 6.41298C8.3555 5.9321 7.13641 6.19336 6.32483 7.07478C5.51324 7.95619 5.26926 9.28389 5.70678 10.438Z"
										fill="black"
									/>
									<ellipse
										opacity="0.4"
										cx="8.33132"
										cy="24.2005"
										rx="5.95242"
										ry="1.27372"
										fill="black"
									/>
								</svg>
								<h2 className="address">{address}</h2>
							</div>
							{rating !== undefined && (
								<div className="star-container">{renderStars()}</div>
							)}
						</div>
						<div className="large-info-wrap-right">
							<div className="category-tag">
								<h1>{category}</h1>
							</div>
						</div>
					</div>
					<div className="description-wrap">
						<div className="description-text">{description}</div>
						<div className="border-line"></div>
						{isEvent && isTicket ? ( // ticket
							<div className="ticket-wrap">
								<p className="ticket-text">Date: {ticketDate}</p>
								<p className="ticket-text">
									Time: {tConvert(timeStart)} to {tConvert(timeEnd)}
								</p>
								<img
									src="https://i.stack.imgur.com/oSqy5.png"
									className="ticket-code-img"
								></img>
							</div>
						) : isEvent && !isTicket && isRegisterable ? ( // register for paid events
							<div className="event-wrap">
								<p className="ticket-text">Date: {ticketDate}</p>
								<p className="ticket-text">
									Time: {tConvert(timeStart)} to {tConvert(timeEnd)}
								</p>
								<hr></hr>
								<p className="ticket-text">
									Price: ${(Math.round(ticketPrice * 100) / 100).toFixed(2)}
								</p>
								<DefaultButton isLink={true} href={{ pathname: "./checkout", query: { whichSelection: barcodeUID } }}>Purchase</DefaultButton>
							</div>
						) : isEvent && !isTicket && !isRegisterable ? ( // free events
							<div className="event-wrap">
								{!isFull ? <p className="ticket-text">Always open!</p> : <p className="ticket-text">*Currently Full*</p>}
								<p className="ticket-text">Date: {ticketDate}</p>
								<p className="ticket-text">
									Time: {tConvert(timeStart)} to {tConvert(timeEnd)}
								</p>
							</div>
						) : ( // attractions, business
							<div className="description2-text">
								{isAvail ? <h1 className="hours-title">Hours of Operation:</h1> : <p className="hours-title">*Currently Closed*</p>}
								<div className="markdown-wrap">
									<ReactMarkdown className="hours-description">
										{hoursOfOperation}
									</ReactMarkdown>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
        .large-card-mobile {
          display: flex;
          flex-direction: column;
          max-width: 360px;
		  min-width: ${forceMaxWidth ? "360px" : "0px"};
          max-height: 400px;
          overflow: hidden;
          box-shadow: var(--shadow-box-massive-card);
        }

        .image-container {
          max-width: 360px;
          {/* height: 156px; */}
          background-position: center center;
          background-repeat: no-repeat;
          background-image: url("https://travelforfoodhub.com/wp-content/uploads/2023/05/Best-Wine-Regions-in-Europe.jpg");
          background-size: cover;
        }

		.content-img {
			object-fit: fill;
		}

        .card-information-wrap {
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
          background-color: white;

          position: sticky;
          bottom: 0px;
        }

        .large-info-wrap {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .star-container {
          display: flex;
          gap: 3px;
          margin-top: 2px;
		  margin-bottom: 12px;
        }

        .category-tag {
          border-radius: var(--border-radius-pill);
          color: white;
          background-color: ${categoryColors[category]};
          padding: 8px 12px;
          font-weight: 800;
          font-family: var(--font-roboto);
          font-size: var(--font-size-body-M);
        }

        .title {
          font-family: var(--font-calps);
          font-size: var(--font-size-header-XS);
          font-weight: 900;
        }

        .address-wrap {
          display: flex;
          flex-direction: row;
          gap: 4px;
          align-items: center;
        }

        .address {
          padding-left: 5px;
          font-family: var(--font-roboto);
          font-size: var(--font-size-body-M);
          font-weight: 400;
          padding-bottom: 2px;
        }

        .description-wrap {
          display: flex;
          flex-direction: row;
		  {/* justify-content: space-around; */}
          {/* width: 360px; */} {/* commented to try to be responsive*/}
          align-items: center;
        }

        .description-text {
			font-family: var(--font-roboto);
			font-size: var(--font-size-body-M);
			line-height: 1.6;
			max-width: 50%;
			min-width: 50%;
			font-weight: 400px;
			margin-top: 10px;
			margin-bottom: auto;

			overflow-y: scroll;
			max-height: 150px;
			word-wrap: break-word;
        }

	{/* scroll bar settings*/}
	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	::-webkit-scrollbar-thumb {
		background: #d4d4d4;
	}

        .border-line {
          border-left: 1px solid grey;
          height: 150px;
          margin-left: 5px;
          margin-right: 5px;
        }

        .description2-wrap {
          display: flex;
          flex-direction: column;
		  overflow-y: auto;
        }

        .hours-title {
          font-family: var(--font-roboto);
          font-size: var(--font-size-body-M);
          font-weight: 700;
          padding-bottom: 5px;
          padding-left: 4px;
        }

      

        .ticket-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          margin-right: 10px;
        }

        .event-wrap {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-left: 5px;
		  overflow-y: auto;
		  max-height: 100%
        }

        .ticket-text {
          font-family: var(--font-roboto);
          font-size: var(--font-size-body-S);
          line-height: 1.4;
          {/* padding-right: 10px; */}
		  text-align: left;
        }

		.markdown-wrap {
		
		}

		@media screen and (max-width: 500px) {
			.large-card-mobile {
				min-width: 270px;
			}
		}


      `}</style>
		</>
	);
}
