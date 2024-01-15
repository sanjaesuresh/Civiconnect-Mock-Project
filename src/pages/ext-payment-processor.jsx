import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function extpaymentprocessor() {
        const router = useRouter();
        const [routerWorkaround, setrouterWorkaround] = useState({});

        useEffect(() => {
		async function workaround() {
			if (router.query == undefined) {
				console.log("router is not ready yet");
				return;
			}

			console.log("router IS READY")
			setrouterWorkaround(true);
		}

		workaround()
	}, [router])

  return (
    <>
     <h1>External payment processor page</h1>
     <p>Blah blah blah credit card details...</p>
     <Link href={{pathname: "./profile", query: {whichSelection: router.query.whichSelection, paid: true}}}>Click To Finish transcaction</Link>
    </>
  )
}

extpaymentprocessor.overrideDefaultNavs = true;
