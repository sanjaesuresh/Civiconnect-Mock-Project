import Link from "next/link";

import React from "react";

/**

 * Defaults:

 * text colour = white

 * background colour = --color-topographic-green

 * font size = --font-size-body-L

 * padding = --padding-btn-default

 *

 * @param {*} param0

 * @returns

 */

export default function DefaultButton({
  isLink = false,

  bgColor = "var(--color-topographic-green)",

  textColor = "#FFFFFF",

  fontSize = "var(--font-size-body-L)",

  padding = "var(--padding-btn-default)",

  className = "",

  href = "",

  onClick,

  children,
}) {
  let useMaxWidth = "";

  if (className == "mobileNav") {
    useMaxWidth = "mobileNavChildren";
  }

  return (
    <>
      {isLink && (
        <div className={`defaultStyle ${className}`}>
          <Link href={href}>
            <div className={`linkChildren + ${useMaxWidth}`} onClick={onClick}>
              {children}
            </div>
          </Link>
        </div>
      )}

      {!isLink && (
        <button className={`defaultStyle ${className}`} onClick={onClick}>
          {children}
        </button>
      )}

      <style jsx>
        {`
          .defaultStyle {
            background-color: ${bgColor};
            font-size: ${fontSize};
            padding: ${padding};
            color: ${textColor};
            font-family: var(--font-calps);
          }
          .blank {
            background-color: transparent;
            font-size: default;
            padding: 0px;
            color: black;
            font-family: var(--font-calps);
          }

          .selectedCard {
            box-shadow: -6px 0px 0px var(--color-topographic-green);
          }
          .linkChildren {
            display: flex;

            flex-direction: row;
          }

           {
            /* style classes for various buttons */
          }

           {
            /* login page */
          }

          .signBtn {
            background-color: var(--color-elevated-green);

            color: white;

            box-shadow: var(--shadow-box-buttons);

            border-radius: var(--border-radius-pill);

            padding: var(--padding-btn-default);

            min-width: 150px;

            font-size: var(-font-size-body-L);

            font-weight: bold;

            margin: 15px 0px;
          }

          .signBtn:hover {
            filter: brightness(70%);
          }

          .blank {
            background-color: transparent;
            font-size: default;
            padding: 0px;
            color: black;
            font-family: var(--font-calps);
          }

          .dismissBtn {
            padding: 0px 16px;

            text-align: center;

            background-color: #f00;

            font-weight: bolder;

            font-size: var(--font-size-body-M);

            border-radius: 0px 0px 10px 10px;

            margin-right: 10px;

            align-self: start;

            position: sticky;
          }

          .dismissBtn:hover {
            filter: brightness(70%);
          }

           {
            /* Nav bar */
          }

          .mobileNav {
            background-color: transparent;

            color: white;

            font-size: 27px;

            font-family: var(--font-calps);

            font-weight: bold;

            display: flex;

            width: 100vw;

            border: none;

            padding: 12px 20px;
          }

          .mobileNav:hover {
            filter: brightness(70%);

            text-decoration: underline;

            transform: scale(1.02);

            transition: 0.5s;
          }

           {
            /* make mobile nav link stretch across entire width */
          }

          .mobileNavChildren {
            width: 100vw;
          }

           {
            /* search page */
          }

          .filter-sort-btn {
            margin: 10px;
          }

          .homepage-SmallCard {
            background-color: white;
            width: 70px;
            padding: 10px 4px;
            align-self: end;
            font-size: 18px;
            color: black;
            padding-left: 12px;
          }

          .homepage-see-more {
            width: 103px;
            padding: 5px 20px;
            float: right;
            margin-top: -70px;
          }

          .hero-under-buttons {
            width: auto;
            padding: 5px 15px;
            margin-right: 20px;
          }

          .see-lincoln {
            backdrop-filter: blur(2px);

            font-family: var(--font-roboto);
            font-size: 14px;
            font-weight: 800;

            display: flex;
            align-items: center;
          }

          .see-lincoln:hover {
            filter: brightness(70%);
          }


          .home-search-btn {
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
}
