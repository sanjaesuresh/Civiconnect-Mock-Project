import React from "react";
import TextInput from "./TextInput";
import Image from "next/image";
import DefaultButton from "./DefaultButton";
import Link from "next/link";

export default function Footer() {
	//code
	//code

	//html
	return (
		<>
			{/* html */}
			<div className="footer">
				<div className="footer-logos">
					<Image src="footerIcons.svg" width={100} height={100} alt="Discover Lincon on Facebook, Instagram, Twitter"
					/>
				</div>
				<div className="footer-links">
					<div><Link href="./homepage">Homepage</Link></div>
					<div><Link href="./search">Search</Link></div>
					<div><Link href="./events">Upcoming Events</Link></div>
					<div><Link href="./attractions">Attractions</Link></div>
					<div><Link href="./business-service">Businesses & Services</Link></div>
					<div><Link href="./profile">Profile</Link></div>
				</div>
				<div className="footer-subscription">
					<h2 className="subscribe-text">Subscribe to Town of Lincoln</h2>
					<div className="subscription-inputs">
						<TextInput type="text" className="email-input" placeholder="Enter email"></TextInput>
						<DefaultButton padding="2px 15px" href="">{"SUBMIT"}</DefaultButton>
					</div>
				</div>
			</div>

			{/* styles */}
			<style jsx>{`
        .footer {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-items: stretch;
          gap: 12px;
          width: 100%;
          min-height: 150px;
          background-color: #005731;
          overflow: hidden;
          justify-content: space-between;
          padding-left: 40px;
          padding-right: 20px;
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .logo {
          float: left;
          width: 300px;
        }

        .footer-logos {
          display: flex;
          justify-content: center;
          margin: auto;
		  flex-shrink: 0;
		  max-width: 100%;
        }

        .footer-wrap {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: auto;
		  flex-wrap: wrap;

        }

        .footer-links {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-basis: 0%;
          flex-grow: 1;
        }

        .footer-links div {
          color: white;
          padding: 10px;
          font-size: 15px;
          font-family: var(--font-roboto);
          font-size: var(--font-size-body-Mplus);
          text-align: center;
        }

        .footer-links div:hover {
          text-decoration: underline;
          transform: scale(1.05);
          transition: 0.3s;
        }

        .footer-subscription {
          display: flex;
          flex-direction: column;
	  align-self: center;
        }

		@media only screen and (max-width: 1019px){
			.footer-subscription{ 
				display: none; 
			}
		}

		@media only screen and (max-width: 1207px){
			.footer-links{ 
				margin-left: 0px; 
			}
		}

		@media only screen and (max-width: 411px) {
      .footer {
        min-height: 270px;
      }

     

		}
 
        .subscription-inputs {
          display: flex;
          flex-direction: row;
          padding: 5px;
          gap: 5px;
		  flex-wrap: wrap;
        }

        .subscribe-text {
          font-weight: bold;
		  font-family: var(--font-roboto);
		  font-size: var(--font-size-body-L);
		  color: white;
          padding: 5px;
          font-size: 15px;

        }
        .button-style {
          display: flex;
          width: 81px;
          height: 30px;
          padding: 3px 15px;
          gap: 10px;
          flex-shrink: 0;
          background: var(--TOPOGRAPHIC-GREEN, #00a62e);
          backdrop-filter: blur(2px);
          color: white;
		  font-family: var(--font-roboto);
        }

        
      `}</style>
		</>
	);
}
