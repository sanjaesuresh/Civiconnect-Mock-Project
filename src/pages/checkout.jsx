import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import DefaultButton from "@/components/DefaultButton";
import TextInput from "@/components/TextInput";
import Section from "@/components/Section";
import LargeCardDesktop from "@/components/LargeCardDesktop";
import LargeCardMobile from "@/components/LargeCardMobile";

export default function Checkout() {
  const [selectedCard, setSelectedCard] = useState();
  const router = useRouter();

  const [userStrapiData, setUserStrapiData] = useState(null);

  useEffect(() => {
    async function getUserData() {
      const jwt = localStorage.getItem("jwt");

      const response = await fetch(
        "https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/users/me?populate=registeredEvents.image",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const userData = await response.json();
      setUserStrapiData(userData);
      console.log(userStrapiData);

      if (userData.data === null) {
        //not logged in, redirect to login
        window.location.href = "/login";
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function fetchStrapiData() {
      if (router.query == undefined) {
        console.log("router is not ready yet");
        return;
      }

      // if (router.query.paid == true) {
      // 	console.log("paid already, doing database stuff");
      // 	/**
      // 	 * do databbser stuff here?
      // 	 */
      // 	// now redirect to profile?
      // 	return;
      // }

      console.log("router IS READY");
      // console.log(router.query)

      const eventResponse = await fetch(
        `https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/events?populate=*&filters[barcodeUID][$in]=${router.query.whichSelection}`
      );
      const eventData = await eventResponse.json();
      setSelectedCard(eventData.data[0]);
      console.log(selectedCard);
    }

    fetchStrapiData();
  }, [router]);

  async function addTicketToUser() {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch(
      `https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/users/${userStrapiData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            registeredEvents: [selectedCard.id],
        }),
      }
    );

    console.log(await response.json());
  }

  return (
    <>
      <style jsx>
        {`

                h1 {
					font-weight: var(--font-weight-title);
					font-size: var(--font-size-header-S);
					font-family: var(--font-calps);
                }
                h3 {
					font-weight: var(--font-weight-title);
					font-size: var(--font-size-header-XS);
					font-family: var(--font-calps);
                }

             
				{/* confirm order and summary card section*/}
                .actionBar {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 30px 0px;
					width: 100%;
                }

				{/* Event form */}
                .infoContainer {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;
                }
            
                .infoContainer ul {
					max-width: 50%;
					min-width:450px;
					{/* border: 1px solid black; */}

					margin-bottom: 40px;
                }

                li {
					display: flex;
					align-items: center;
                }
                
                li * {
					margin: 5px 10px;
                }


                .verticalList {
					display: flex;
					flex-direction: column;
					align-items: start;

					font-size: var(--font-size-body-Mplus);
					font-family: var(--font-roboto);
                }



                


                .costBox  {
                  width: 100%
                  display: flex;
                  flex-direction: column;
                  
                  align-items: start;
                  border: 1px solid #d1d1d1;
                  padding-right: 18px;
                  margin-top: 10px;
                }

                .costEntry {
					width: 100%;
					display: flex;
					justify-content: space-between;
                }

                .costEntry p {
					font-weight: var(--font-weight-title);
					font-size: var(--font-size-header-S);
					font-family: var(--font-calps);
                }


				{/* TOS and proceeed */}
                .tos {
					display: flex;
					flex-direction: column;
					font-weight: var(--font-weight-titles);
                }

                #checkoutButton {
					{/* THIS IS THE SPAN, NOT A BUTTON */}
		        	align-self: end;
					margin: 20px 0px;
				}


				.costEntry p {
					font-weight: normal;
					font-size: var(--font-size-body-L);
				}


             	{/* Card containers */}
				.card {
					margin-bottom: 40px;
					box-shadow: var(--shadow-box-massive-card);
				}


				.mobileCard {
					display: none;
					margin-bottom: 40px;
					box-shadow: var(--shadow-box);
				}





				{/* mobile view */}
				@media screen and (max-width:500px) {
					h1 {
						font-weight: var(--font-weight-title);
						font-size: var(--font-size-header-XS);
						font-family: var(--font-calps);
					}
					h3 {
						font-weight: normal;
						font-size: var(--font-size-body-XL);
								
					}
					.infoContainer ul {
						max-width: 90vw;
						min-width: 90vw;
						width: 90vw;
					}

					.mobileCard {
						display: flex;
					}

					.card {
						display: none;
					}
				}    
        `}
      </style>

      <Section marginBottom="40px" marginTop="40px">
        <div className="orderSummary">
          <div className="actionBar">
            <h1>Confirm Your Order</h1>
            <DefaultButton isLink={true} href="./homepage" children=" Cancel"></DefaultButton>
          </div>

          <div className="card">
            {selectedCard != undefined ? (
              <LargeCardDesktop
                isTicket={true}
                isEvent={true}
                title={selectedCard.attributes.title}
                description={
                  selectedCard.attributes.richTextDescription != undefined
                    ? selectedCard.attributes.richTextDescription
                    : selectedCard.attributes.description
                }
                address={selectedCard.attributes.location}
                ticketDate={selectedCard.attributes.date}
                ticketTime={`${selectedCard.attributes.startTime} - ${selectedCard.attributes.endTime}`}
                rating={selectedCard.attributes.numStars}
                category={selectedCard.attributes.tags}
                imgSrc={selectedCard.attributes.image.data.attributes.url}
                imgAltText={
                  selectedCard.attributes.image.data.attributes.alternativeText
                }
                barcodeUID={selectedCard.attributes.barcodeUID}
                isRegisterable={selectedCard.attributes.isRegisterable}
                isFull={selectedCard.attributes.isFull}
                isAvail={selectedCard.attributes.isAvailable}
                hoursOfOperation={selectedCard.attributes.hoursOfOperation}
              ></LargeCardDesktop>
            ) : (
              <></>
            )}
          </div>

          <div className="mobileCard">
            {selectedCard != undefined ? (
              <LargeCardMobile
                isTicket={true}
                isEvent={true}
                title={selectedCard.attributes.title}
                description={
                  selectedCard.attributes.richTextDescription != undefined
                    ? selectedCard.attributes.richTextDescription
                    : selectedCard.attributes.description
                }
                address={selectedCard.attributes.location}
                ticketDate={selectedCard.attributes.date}
                ticketTime={`${selectedCard.attributes.startTime} - ${selectedCard.attributes.endTime}`}
                rating={selectedCard.attributes.numStars}
                category={selectedCard.attributes.tags}
                imgSrc={selectedCard.attributes.image.data.attributes.url}
                imgAltText={
                  selectedCard.attributes.image.data.attributes.alternativeText
                }
                barcodeUID={selectedCard.attributes.barcodeUID}
                isRegisterable={selectedCard.attributes.isRegisterable}
                isFull={selectedCard.attributes.isFull}
                isAvail={selectedCard.attributes.isAvailable}
                hoursOfOperation={selectedCard.attributes.hoursOfOperation}
              ></LargeCardMobile>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Section>

      <Section marginBottom="40px" marginTop="40px">
        <div className="eventForm">
          <h1>Event Form</h1>

          <div className="infoContainer">
            <ul>
              <li>
                <h3>Name:</h3>
                <TextInput
                  className="checkoutInput"
                  type="text"
                  placeholder="Enter answer"
                ></TextInput>
              </li>
              <li>
                <h3>Vehicles:</h3>1<input type="radio" name="vehicles"></input>2
                <input type="radio" name="vehicles"></input>
                3+<input type="radio" name="vehicles"></input>
              </li>
            </ul>

            <ul>
              <li>
                <h3>Atendees:</h3>
                <input type="range"></input>
              </li>
              <li>
                <h3>Occupation:</h3>
                <input type="file"></input>
              </li>
            </ul>
          </div>

          <div className="infoContainer">
            <ul>
              <li className="verticalList">
                <h3>Notifications & Offers:</h3>

                <span>
                  <input type="checkbox"></input> I want to recieve email
                  notifications
                </span>
                <span>
                  <input type="checkbox"></input> Subscribe to email offers
                </span>
                <span>
                  <input type="checkbox"></input> I agree to the terms of use
                </span>
              </li>
            </ul>

            <ul>
              <li>
                <span className="actionBar">
                  <TextInput
                    className="checkoutInput"
                    type="text"
                    placeholder="Discount Code"
                  ></TextInput>
                  <DefaultButton children="Apply"></DefaultButton>
                </span>
              </li>
              <li className="costBox">
                <span className="costEntry">
                  <p>Subtotal</p>
                  <p>
                    $
                    {selectedCard != undefined
                      ?  parseFloat(selectedCard.attributes.ticketCost).toFixed(2)
                      : 0.00}
                  </p>
                </span>
                <span className="costEntry">
                  <p>Taxes</p>
                  <p>
                    $
                    {selectedCard != undefined
                      ? parseFloat(selectedCard.attributes.ticketCost * 0.13).toFixed(2)
                      : 0.00}
                  </p>
                </span>
                <span className="costEntry">
                  <p>Total</p>
                  <p>
                    $
                    {selectedCard != undefined
                      ?  parseFloat(selectedCard.attributes.ticketCost * 0.13 +
                        selectedCard.attributes.ticketCost).toFixed(2)
                      : 0.00}
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* TOS part */}
        <div className="tos">
          <h3>Terms of Use</h3>
          <p>
            By continuing, you agree to... blah blah legal stuff blah blah more
            fine print blah bluh you can’t sue us blah blah have a nice day.
            blah blah legal stuff blah blah more fine print blah bluh you can’t
            sue us blah blah have a nice day. blah blah legal stuff blah blah
            more fine print blah bluh you can’t sue us blah blah have a nice
            day. blah blah legal stuff blah blah more fine print blah bluh you
            can’t sue us blah blah have a nice day. blah blah legal stuff blah
            blah more fine print blah bluh you can’t sue us blah blah have a
            nice day. blah blah legal stuff blah blah more fine print blah bluh
            you can’t sue us blah blah have a nice day. blah blah legal stuff
            blah blah more fine print blah bluh you can’t sue us blah blah have
            a nice day. blah blah legal stuff blah blah more fine print blah
            bluh you can’t sue us blah blah have a nice day. blah blah legal
            stuff blah blah more fine print blah bluh you can’t sue us blah blah
            have a nice day.{" "}
          </p>
          <span id="checkoutButton">
            <DefaultButton
              isLink={true}
              href={{
                pathname: "./profile",
                query: {
                  whichSelection:
                    selectedCard != undefined
                      ? selectedCard.attributes.barcodeUID
                      : "noBARCODE",
                  paid: true,
                },
              }}
              onClick={addTicketToUser}
            >
              Proceed to Checkout
            </DefaultButton>
          </span>
        </div>
      </Section>
    </>
  );
}
