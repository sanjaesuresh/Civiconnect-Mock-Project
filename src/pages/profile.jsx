import LargeCardList from "@/components/LargeCardList";
import LargeCardDesktop from "@/components/LargeCardDesktop";
import React, { useState, useEffect } from "react";
import LargeCardMobile from "@/components/LargeCardMobile";
import Section from "@/components/Section";
import DefaultButton from "@/components/DefaultButton";

export default function Profile() {
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

      if (userData.data === null) { //not logged in, redirect to login
        window.location.href = "/login";
      }
    }
    getUserData();
  }, []);


  function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  }

  return (
    <>
      {userStrapiData && (
        <Section>

          <div className="account-info">
            <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"></img>
            <h1>{userStrapiData.username}</h1>
            <div className="logout-buttons">
              <DefaultButton onClick={() => { logout() }}>Log out</DefaultButton>
            </div>
          </div>

          <div className="event-tickets-wrap">
            <LargeCardList>
              {console.log(userStrapiData?.registeredEvents)}
              {userStrapiData?.registeredEvents?.map((card, index) => (
                <div key={index}>
                  <LargeCardDesktop
                    isTicket={true}
                    isEvent={true}
                    title={card.title}
                    description={card.description}
                    address={card.location}
                    ticketDate={card.date}
                    ticketTime={`${card.startTime} - ${card.endTime}`}
                    rating={card.numStars}
                    category={card.tags}
                    imgSrc={card.image.url}
                    imgAltText={card.image.alternativeText}
                    barcodeUID={card.barcodeUID}

                    isRegisterable={card.isRegisterable}
                    isFull={card.isFull}
                    isAvail={card.isAvailable}
                    hoursOfOperation={card.hoursOfOperation}
                  ></LargeCardDesktop>
                </div>
              ))}
            </LargeCardList>
          </div>

          <div className="event-tickets-wrap-mobile">
            <LargeCardList>
              {console.log(userStrapiData?.registeredEvents)}
              {userStrapiData?.registeredEvents?.map((card, index) => (
                <div key={index}>
                  <LargeCardMobile
                    isTicket={true}
                    isEvent={true}
                    title={card.title}
                    description={card.description}
                    address={card.location}
                    ticketDate={card.date}
                    ticketTime={`${card.startTime} - ${card.endTime}`}
                    rating={card.numStars}
                    category={card.tags}
                    imgSrc={card.image.url}
                    imgAltText={card.image.alternativeText}
                    barcodeUID={card.barcodeUID}

                    isRegisterable={card.isRegisterable}
                    isFull={card.isFull}
                    isAvail={card.isAvailable}
                    hoursOfOperation={card.hoursOfOperation}
                  ></LargeCardMobile>
                </div>
              ))}
            </LargeCardList>
          </div>

        </Section>


      )}

      <style jsx>
        {`
          .account-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            height: 300px;
            padding: 20px;
          }

          .account-info img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
          }

          .account-info h1 {
            color: black;
            font-size: 40px;
            font-weight: bold;
          }

          .logout-buttons {
            margin: 20px;
          }

          .event-ticket-wrap {
            background-color: grey;
            height: 100%;
          }

          .event-tickets {
            display: flex;
            flex-direction: column-reverse;
            background-color: black;

            padding-left: 100px;
            padding-right: 100px;
            border-color: grey;
            border-style: solid;
            border-width: 2px;
          }

          .event-tickets-wrap-mobile {
            display: none;

          }

          @media screen and (max-width: 600px) {
            .event-tickets-wrap {
            display: none;
          }

          .event-tickets-wrap-mobile {
            display: flex;
            justify-content: center;
          }
          }


        `}
      </style>
    </>
  );
}
