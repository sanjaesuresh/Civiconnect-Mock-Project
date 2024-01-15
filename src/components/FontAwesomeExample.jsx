import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; //find icon name at https://fontawesome.com/search?o=r&m=free

//FontAwesomeIcon behave like text; style it by allowing it to inherit from parent style
//https://fontawesome.com/docs/web/style/styling
export default function FontAwesomeExample() {
  return (
	<>
	  <div>
		<FontAwesomeIcon icon={faUser} />
	  </div>

	  <style jsx>{`
		div {
		  color: black;
		}
	  `}</style>
	</>
  );
}
