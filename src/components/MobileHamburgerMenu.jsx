import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faCalendarCheck, faCamera, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
import DefaultButton from './DefaultButton'


export default function MobileHamburgerMenu({isHomepage = false}) {
	//html
	return (
		<>
			<div id='psudoHamburgeBody'>
				<DefaultButton className="mobileNav" isLink={true} href="./homepage">
					<div className='icon'>
						<FontAwesomeIcon icon={faHouse} />
					</div>
					<h2>Home</h2>
				</DefaultButton>

				<DefaultButton className="mobileNav" isLink={true} href="./search">
					<div className='icon'>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
					<h2>Search</h2>
				</DefaultButton>

				<DefaultButton className="mobileNav" isLink={true} href="./events">
					<div className='icon'>
						<FontAwesomeIcon icon={faCalendarCheck} />
					</div>
					<h2>Upcomming Events</h2>
				</DefaultButton>

				<DefaultButton className="mobileNav" isLink={true} href="./attractions">
					<div className='icon'>
						<FontAwesomeIcon icon={faCamera} />
					</div>
					<h2>Attractions</h2>
				</DefaultButton>


				<DefaultButton className="mobileNav" isLink={true} href="./business-service">
					<div className='icon'>
						<FontAwesomeIcon icon={faStore} />
					</div>
					<h2>Businesses & Services</h2>
				</DefaultButton>

				<DefaultButton className="mobileNav" isLink={true} href="./profile">
					<div className='icon'>
						<FontAwesomeIcon icon={faUser} />
					</div>
					<h2>Profile</h2>
				</DefaultButton>

			</div>

			{/* styles */}
			<style jsx>{`
				#psudoHamburgeBody {
					// ask how to hadel transparency
					{/* homepage overrides */}
					background-color: var(--color-elevated-green);
					position: ${!isHomepage ? "default" : "absolute"};
					top: 80px;
					padding: 20px 0px;
				}

				{/* align icon and heading */}
				h2 {
					margin-left: 20px;
					text-align: left;
				}

				
			`}</style>
		</>
	)
}
