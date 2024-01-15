import React from "react";
import DefaultButton from "@/components/DefaultButton";
import BusinessCard from "@/components/BusinessCard";
import CardCarousel from "@/components/CardCarousel";
import LargeCardMobile from "@/components/LargeCardMobile";
import Section from "@/components/Section";
import Link from "next/link";

import {
  faWindowRestore,
  faCircleInfo,
  faTruckMedical,
  faStore,
  faUtensils,
  faCarrot,
  faStrikethrough,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Business() {
  const [strapiData, setStrapiData] = useState();

  useEffect(() => {
    async function fetchStrapiData() {
      const response = await fetch(
        "https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/businesses?populate=*"
      );
      const data = await response.json();
      setStrapiData(data.data);
    }

    fetchStrapiData();
  }, []);

  // console.log("current data")
  // console.log(strapiData)

  return (
    <>
      <style jsx>
        {`

        .iconBackdrop {
            width: 450px;
            height: 500px;
            position: fixed;
            z-index: -99;
            top: -40px;
            left: 40px;

            {/* transform: rotate(-15deg) translate(10px, 80px); */}
          }

          #buisnessPsudoBody {
            margin: auto;
            margin-bottom: 80px;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
          }

           {
            /* Titles */
          }
          .banner {
            background-image: url("/local.svg");
            background-color: #dfdfdf;
            background-size: 110% auto;
            background-repeat: no-repeat;
            background-position: center;

             {
              /* filter: blur(10px); */
            }

            width: 100%;
            padding: 80px 40px 80px 80px;
            color: white;
          }

          .banner * {
            text-shadow: var(--shadow-box-massive-card);
          }

          h1 {
            font-size: var(--font-size-header-XL);
            font-weight: var(--font-weight-titles);
            font-family: var(--font-calps);
          }
          h3 {
            font-size: var(--font-size-header-S);
            font-family: var(--font-roboto);
          }
          .bannerTxt p {
            font-size: var(--font-size-body-L);
            margin-top: 20px;
            font-family: var(--font-roboto);
          }

          .bannerTxt {
            max-width: 700px;
          }

          .selectionsContent {
            margin-top: 50px;
            margin-bottom: 50px;
            display: flex;
            flex-direction: column;
            width: 100%;
            font-weight: var(--font-weight-titles);
          }

           {
            /* for card spacing */
          }
          li {
            margin: 20px;
          }


           {
            /* Buisness cards */
          }
          .buisnessCardBox {
            display: flex;
            justify-content: space-around;
            margin-left: -70px;
            margin-right: 60px;
          }

          .buisnessCardBoxMobile {
            width: 100%;
            display: none;
            flex-direction: column;
          }

          .buisnessCardBoxMobile-wrap {
            display: flex;
            justify-items: center;
          }

          .phoneNunbers {
            display: flex;
            margin-left: 30px;
          }

          .cardBodyTxt {
            margin-left: 5px;
            line-height: 1.5;
            {/* font-size: 12.5px; */}
          }

           {
            /* .card1 {

			} */
          }

           {
            /* start This is all for the partners card */
          }
          .partnersCard {
            display: flex;
            justify-content: space-between;
          }

          .iconsBox {
            position: relative;
            bottom: 40px;
            width: 0px;
          }
          .icon {
            font-size: 20pt;
            position: relative;
          }

          #icon1 {
            right: 120px;
          }
          #icon2 {
            right: 60px;
            bottom: 30px;
          }
          #icon3 {
            right: 90px;
            bottom: 20px;
          }
          #icon4 {
            right: 40px;
            bottom: 40px;
          }
          #icon5 {
            right: 70px;
            bottom: 30px;
          }
           {
            /* end This is all for the partners card */
          }

           {
            /* mobile cards */
          }
          .card2 {
             {
              /* lower card */
            }
            position: relative;
            top: -30px;
            right: -120px;
          }
          .card2M,
          .card1M {
            margin-bottom: 20px;
          }
          .card1M {
            align-self: end;
          }

           {
            /* Show "in between mobile and desktop" card layout */
          }
          @media screen and (max-width: 900px) {
            .buisnessCardBox {
               {
                /* display: none; */
              }
              flex-wrap: wrap;
              margin-left: 0px;
              margin-right: 0px;
            }
            .card2 {
              right: -40px;
            }
          }

           {
            /* Make banner smaller to fit */
          }
          @media screen and (max-width: 720px) {
            h1 {
              font-size: var(--font-size-header-S);
            }

            h3 {
              font-size: var(--font-size-body-L);
              font-weight: normal;
              margin-top: 15px;
            }

            .bannerTxt p {
              font-size: var(--font-size-body-M);
              margin-top: 20px;
            }

            .banner {
              padding: 20px;
              background-size: auto auto;
            }
          }

           {
            /* Mobile view */
          }
          @media screen and (max-width: 500px) {
            .selectionsContent {
              margin-top: 20px;
            }

            .buisnessCardBox {
              display: none;
            }
            .buisnessCardBoxMobile {
              display: flex;
            }
          }

           {
            /* ULtra-mobile view, kill card shifting */
          }
          @media screen and (max-width: 400px) {
            .card1M {
              align-self: start;
            }
          }
        `}
      </style>

      <div>
        <div className="iconBackdrop">
          <svg width="654" height="744" viewBox="0 0 654 744" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_50_11499)">
              <path d="M512.628 213.789C522.497 228.843 517.682 248.858 503.465 258.179L476.703 275.722L565.117 409.317C566.597 411.575 567.91 413.943 569.14 416.365L577.966 429.83C590.083 448.312 584.926 473.096 566.443 485.212L553.062 493.984C552.142 494.587 551.222 495.19 550.248 495.71C549.132 496.561 547.961 497.329 546.79 498.096L519.61 515.914L499.538 529.072C481.055 541.188 456.272 536.032 444.155 517.549L430.998 497.477L395.91 443.953C386.206 429.15 366.407 425.031 351.604 434.735L298.08 469.822C283.277 479.526 279.157 499.325 288.861 514.128L323.949 567.653L337.107 587.724C349.223 606.207 344.066 630.991 325.584 643.107L305.512 656.265L278.834 673.754C277.579 674.576 276.27 675.315 274.961 676.054C274.012 676.795 273.063 677.537 272.059 678.194L258.678 686.966C240.196 699.083 215.412 693.926 203.296 675.443L141.892 581.776C141.399 581.023 140.851 580.187 140.441 579.379L102.283 521.172L75.4374 538.77C60.3837 548.639 40.9998 544.606 31.0765 529.468C26.1423 521.941 24.2653 513.606 26.2818 503.914L118.181 176.427C120.198 166.735 126.34 161.513 132.194 157.675C138.048 153.838 145.835 151.124 153.594 152.016L490.271 199.748C500.799 201.216 508.531 205.714 512.628 213.789Z" fill="#F6F6F6" />
            </g>
            <defs>
              <clipPath id="clip0_50_11499">
                <rect width="576" height="512" fill="white" transform="translate(-109 315.789) rotate(-33.2467)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Section usePadding={false} fullWidth={true}>
          <div className="banner">
            <div className="bannerTxt">
              <h1>Explore Local</h1>
              <h3>
                This destination lends itself to exploration, slow travel, and
                serendipitous discovery
              </h3>
              <p>
                – Lincoln Destination Tourism Strategy and Action Plan 2020 –
                2025
              </p>
            </div>
          </div>
        </Section>
        {/* <div id="buisnessPsudoBody"> */}
        <Section usePadding={true}>
          <div className="selectionsContent">
            <CardCarousel
              title="Our Fine Selections"
              alignTitle="end"
              singleLineDisplay={true}
            >
              {strapiData?.map((element, index) => (
                <li key={index}>
                  <LargeCardMobile
                    forceMaxWidth={true}
                    isTicket={false}
                    title={element.attributes.title}
                    description={element.attributes.description}
                    address={element.attributes.location}
                    ticketDate={`${element.attributes.dateStart} - ${element.attributes.dateEnd}`}
                    rating={element.attributes.numStars}
                    category={element.attributes.tags}
                    imgSrc={element.attributes.image.data.attributes.url}
                    imgAltText={
                      element.attributes.image.data.attributes.alternativeText
                    }
                    hoursOfOperation={element.attributes.hoursOfOperation}
                  ></LargeCardMobile>
                </li>
              ))}
            </CardCarousel>

          </div>

          <div className="buisnessCardBox">
            <div>
              <div className="card1">
                <BusinessCard
                  theme="white"
                  title="Need Information?"
                  isAltOrientation="true"
                  icons={faCircleInfo}
                >
                  <p className="cardBodyTxt">
                    Have a question about your ventures? Visit an information
                    center or
                    <Link href=""> Click here </Link>
                    to view a map of our in person information centers.
                  </p>
                </BusinessCard>
              </div>

              <span className="card2">
                <BusinessCard
                  theme="black"
                  title="Our Partners"
                  isAltOrientation={true}
                  icons={null}
                >
                  <div className="partnersCard">
                    <p className="cardBodyTxt">
                      Megasoft
                      <br />
                      Months Inn
                      <br />
                      Burger Queen
                      <br />
                      Rotten Potatoes
                      <br />
                      SUNGSAM
                    </p>

                    <div className="iconsBox">
                      <div id="icon1" className="icon">
                        <FontAwesomeIcon icon={faUtensils} />
                      </div>
                      <div id="icon2" className="icon">
                        <FontAwesomeIcon icon={faWindowRestore} />
                      </div>

                      <div id="icon3" className="icon">
                        <FontAwesomeIcon icon={faCarrot} />
                      </div>

                      <div id="icon4" className="icon">
                        <FontAwesomeIcon icon={faStrikethrough} />
                      </div>

                      <div id="icon5" className="icon">
                        <FontAwesomeIcon icon={faCrown} />
                      </div>
                    </div>
                  </div>
                </BusinessCard>
              </span>
            </div>

            <div>
              <div className="card1">
                <BusinessCard
                  theme="black"
                  title="Emergency Services"
                  icons={faTruckMedical}
                >
                  <div className="phoneNunbers">
                    <p className="cardBodyTxt">
                      Emergency
                      <br />
                      Police
                      <br />
                      Fire
                      <br />
                      Roadside
                      <br />
                      Assistance
                    </p>
                    <p className="cardBodyTxt">
                      911
                      <br />
                      555-555
                      <br />
                      555-555
                      <br />
                      555-555
                    </p>
                  </div>
                </BusinessCard>
              </div>

              <div className="card2">
                <BusinessCard
                  theme="white"
                  title="Other Useful Contacts"
                  icons={faStore}
                >
                  <div className="phoneNunbers">
                    <p className="cardBodyTxt">
                      City Hall
                      <br />
                      Ontario Parks
                      <br />
                      Vineland
                      <br />
                      Support Line
                      <br />
                      Weather Info
                    </p>
                    <p className="cardBodyTxt">
                      555-555
                      <br />
                      555-555
                      <br />
                      555-555
                      <br />
                      555-555
                      <br />
                      555-555
                    </p>
                  </div>
                </BusinessCard>
              </div>
            </div>
          </div>
        </Section>
        <Section usePadding={false}>
          <div className="buisnessCardBoxMobile-wrap">
            <div className="buisnessCardBoxMobile">
              <div className="card1M">
                <BusinessCard
                  theme="white"
                  title="Need Information?"
                  isAltOrientation={true}
                  icons={faCircleInfo}
                >
                  <p className="cardBodyTxt">
                    Have a question about your ventures? Visit an information
                    center or <Link href="">Click here</Link> to view a map of
                    our in person information centers.
                  </p>
                </BusinessCard>
              </div>

              <span className="card2M">
                <BusinessCard
                  theme="black"
                  title="Our Partners"
                  isAltOrientation={true}
                  icons={null}
                >
                  <div className="partnersCard">
                    <p className="cardBodyTxt">
                      Megasoft
                      <br />
                      Months Inn
                      <br />
                      Burger Queen
                      <br />
                      Rotten Potatoes
                      <br />
                      SUNGSAM
                    </p>

                    <div className="iconsBox">
                      <div id="icon1" className="icon">
                        <FontAwesomeIcon icon={faUtensils} />
                      </div>
                      <div id="icon2" className="icon">
                        <FontAwesomeIcon icon={faWindowRestore} />
                      </div>

                      <div id="icon3" className="icon">
                        <FontAwesomeIcon icon={faCarrot} />
                      </div>

                      <div id="icon4" className="icon">
                        <FontAwesomeIcon icon={faStrikethrough} />
                      </div>

                      <div id="icon5" className="icon">
                        <FontAwesomeIcon icon={faCrown} />
                      </div>
                    </div>
                  </div>
                </BusinessCard>
              </span>

              <div className="card1M">
                <BusinessCard
                  theme="white"
                  title="Emergency Services"
                  icons={faTruckMedical}
                >
                  <p className="cardBodyTxt">
                    Emergency
                    <br />
                    Police
                    <br />
                    Fire
                    <br />
                    Roadside
                    <br />
                    Assistance
                  </p>
                  <p className="cardBodyTxt">
                    911
                    <br />
                    555-555
                    <br />
                    555-555
                    <br />
                    555-555
                  </p>
                </BusinessCard>
              </div>

              <div className="card2M">
                <BusinessCard
                  theme="black"
                  title="Other Useful Contacts"
                  icons={faStore}
                >
                  <p className="cardBodyTxt">
                    City Hall
                    <br />
                    Ontario Parks
                    <br />
                    Vineland
                    <br />
                    Support Line
                    <br />
                    Weather Info
                  </p>
                  <p className="cardBodyTxt">
                    555-555
                    <br />
                    555-555
                    <br />
                    555-555
                    <br />
                    555-555
                    <br />
                    555-555
                  </p>
                </BusinessCard>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
