//Austin
//Michael 
//sanjae
import Link from 'next/link'


export default function Home() {
	return (
		<>
			<div className="link-container">
				<Link href="/homepage">homepage</Link>
				<Link href="/business-service">business</Link>
				<Link href="/checkout">checkout</Link>
				<Link href="/events-attractions">events-attractions</Link>
				<Link href="/login">login</Link>
				<Link href="/profile">profile</Link>
				<Link href="/test">test</Link>
			</div>

			<style jsx>{`
				.link-container {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
			`}</style>
		</>
	);
}