import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons' //find icon name at https://fontawesome.com/search?o=r&m=freeortawesome/react-fontawesome';

export default function BuisnessCard({
	theme = "black",
	title,
	isMobile = false,
	isAltOrientation = false,
	children,
	icons = faPaperclip 
}) {

	let fontColor;
	let className = "businessCard";
	let titleClass = "";
	
	// handle theme, variants from props
	if (theme == "white" || theme == "#FFFFFF") {
		theme = "#FFFFFF";
		fontColor = "#000000";
	}
	else { // default to black
		theme = "#2D2D2D";
		fontColor = "#FFFFFF";
	}

	if (isMobile == true) {
		className = "businessCard mobileBusinessCard";
		console.log("using mobile card format")
	}

	if (isAltOrientation) {
		isAltOrientation += " orientationAlt";
		titleClass = "cardTitleAlt";
	}

	// ugly hax
	if (title == "Our Partners") {
		className += " spacingFix";
	}


	return (
		<>
			<div className={className}>
				<span className={isAltOrientation}>
					<h3 className={titleClass}>{title}</h3>
					{children}
				</span>
				<div className='icon'>
					<FontAwesomeIcon icon={icons} />
				</div>
			</div>


			<style jsx>
				{`
		
                        .icon {
                                {/* width: 60px;
                                height: 40px; */}

                                align-self: start;
                                position: relative;

				margin: 20px 20px 0px 0px;
                                font-size: 30px;
                        }

                        .businessCard {
                                background-color: ${theme};
                                color: ${fontColor};

                                max-width: 400px;
				min-width: 200px;
                                min-height: 210px;

				border-radius: 5px;
				box-shadow: var(--shadow-box-massive-card);

                                display: flex;
                                align-items: center;
                                justify-content: start;
                                padding: 0px 0px 40px 30px; 
			        
                                font-size: var(--font-size-body-S);
                                font-family: var(--font-roboto);
                        }


			{/* so uh this will make title and body stack vertically instead of side by side.
			This is designed to override the .businessCard and h3 classes respectibly */}
			.orientationAlt {
				{/* I now love flex box */}
				flex-direction: column;
			}

			.cardTitleAlt {
				{/* min-width: 210px; */}
				align-self: start;
				justify-self: start;
			}
                        

                        h3 {
                                font-family: var(--font-calps);
                                font-size: var(--font-size-header-XS);
                                margin-bottom: 15px;
                                align-self: start;
                                max-width: 130px; /* maybe needed to control title length but it overlaps so idk*/
				margin-right: 20px;
			}

			p {
				width: 100%;
			}


                        span {
                                display: flex;
                                margin-top: 40px;
				width: 100%;
                        }

			.spacingFix {
				padding: 0px 0px 0px 40px; 
				height: 100px;
			}


			{/* Ultra-mobile view */}
			@media screen and (max-width: 420px) {
				.icon {
					margin: 20px 20px 0px 0px;
					font-size: 30px;
                       		}

				h3 {
					font-size: var(--font-size-body-XL);
					margin-right: 0px;
				}
				
				.businessCard {
					padding: 0px 0px 0px 20px;
					width: 100vw;
				}
			}
                
			`}</style>
		</>
	)
}
