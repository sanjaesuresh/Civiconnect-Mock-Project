import React, {useState} from "react";

import DefaultButton from "./DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

/**
 * bgColour = sucess creates a green toast, err (or anything else) will create a red toast
 * type = "toast" for desktop toast, "toast toastMobile" = mobile toast
 */
export default function Toast({
  bgColor = "err",
  accentColor,
  fontSize,
  type = "toast",
  text = "Placeholder",
  hide = true,
}) {
  const [show, setShow] = useState(true);
  let icon;

  

  if (bgColor == "success") {
    bgColor = "#87C259";
    if (accentColor == undefined) {
      accentColor = "#7FFB74";
      icon = <FontAwesomeIcon icon={faCircleCheck} />;
    }
  } else {
    // default to error colours
    bgColor = "#FF7253";
    if (accentColor == undefined) {
      accentColor = "#f00";
      icon = <FontAwesomeIcon icon={faTriangleExclamation} />;
    }
  }

  function setText(textReplace) {
    text = textReplace;
  }

  function setColor(colorStatus) {
    if (colorStatus == "err") {
      bgColor = "#FF7253";
      if (accentColor == undefined) {
        accentColor = "#f00";
        icon = <FontAwesomeIcon icon={faTriangleExclamation} />;
      }
    } else {
      accentColor = "#7FFB74";
      icon = <FontAwesomeIcon icon={faCircleCheck} />;
    }
  }


  return (
    <>
      <div className={hide ? "hideToast" : type}>
        <div className="accent"></div>
        <div className="icon">{icon}</div>
        <p>{text}</p>
      </div>

      <style jsx>
        {`

          .hideToast{
            display: none;
          }
          .toast {
            background-color: ${bgColor};
            width: 400px;
            min-height: 70px;
            margin: 5px 0px;

            display: flex;
            align-items: center;
            justify-content: start;

            font-size: var(--font-size-body-L);
            font-family: var(--font-roboto);
          }
          .toast:hover {
            filter: brightness(110%);
          }

          .toast * {
            margin-right: 10px;
          }
          .toast div {
            /*for override accent height*/
            align-self: stretch;
          }

          .toast p {
            width: 100%;
          }

          /* mobile styling is hidden by default */
          .toastMobile {
            display: none;
            width: 100%;
          }

          .accent {
            height: auto;
            width: 15px;
            background-color: ${accentColor};
            border-radius: 0px 8px 8px 0px;
          }

          .icon {
             {
              /* width: 40px;
                                height: 40px; */
            }
            display: flex;
            justify-content: center;

             {
              /* background-color: black; */
            }
            font-size: 30px;

            align-self: center;
            margin-top: 20px;
             {
              /* ???????? why is my align self not working????? */
            }
          }

           {
            /* reveal mobile toast styling, hide desktop */
          }
          @media only screen and (max-width: 500px) {
            .toast {
              /* width: 100%; */
              width: 90%;
              margin-top: 0px;
            }
            .toastMobile {
              display: flex;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
