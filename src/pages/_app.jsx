import "@/styles/globals.css";
import cssReset from "../reset";
import localFont from 'next/font/local'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
config.autoAddCss = false;

// Fonts
import { Roboto_Condensed } from "next/font/google"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const roboto_condensed = Roboto_Condensed({
	subsets: ['latin'],
	weight: ['300', '400', '700']
})
const calps = localFont({
	src: [
		{
			path: '../fonts/Calps-Medium.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../fonts/Calps-Bold.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../fonts/Calps-Black.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../fonts/Calps-ExtraBlack.ttf',
			weight: '900',
			style: 'normal',
		}
	]
})

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
				<div>
					{!Component.overrideDefaultNavs && <Navbar></Navbar>}
					<SessionProvider session={session}>
						<Component {...pageProps} />
					</SessionProvider>
				</div>
				{!Component.overrideDefaultNavs && <Footer></Footer>}
			</div>

			{/* css reset */}
			<style jsx global>
				{cssReset}
			</style>

			{/* Global Styles */}
			<style jsx global>{`
				:root {
					/* Colors */
					--color-elevated-green: #005837;
					--color-topographic-green: #00A62E;
					--color-background: #FCFCFC;
					--color-background-decoration: #F2F2F2;
					--color-dividers: #DFDFDF;
					--color-font-primary: #000000;
					--color-font-secondary: #5C5C5C;

					/* Fonts */
					--font-calps: ${calps.style.fontFamily};
					--font-roboto: ${roboto_condensed.style.fontFamily};

					--font-size-header-XL: 128px;
					--font-size-header-L: 96px;
					--font-size-header-M: 64px;
					--font-size-header-S: 48px;
					--font-size-header-XS: 32px;

					--font-size-body-S: 12px;
					--font-size-body-M: 14px;
					--font-size-body-Mplus: 16px;
					--font-size-body-L: 20px;
					--font-size-body-XL: 24px;

					--font-weight-titles: "bold";

					/* Spacing */
					--padding-btn-default: 5px 20px;
					--padding-input-default: 12px 20px;

					/* Shadows, Border Radius */
					--shadow-box-buttons: 0px 4px 2px rgba(0, 0, 0, 0.381);
					--shadow-box-massive-card:  2px 4px 10px rgba(0, 0, 0, 0.762);
					--shadow-box-small-card: 0px 3px 8px rgba(0, 0, 0, 0.381);
					--border-radius-pill: max(100vh, 100vw);
					--border-grey-thin: 1px solid rgb(209, 209, 209);

					/* Page Layout */
					--section-max-width: 1200px;
					--section-padding: 36px;
					
					/* Default Styles */
					body {
						background-color: var(--color-background);
						color: var(--color-font-primary);
						font-family: var(--font-roboto);
					}
				}
			`}</style>
		</>
	);
}
