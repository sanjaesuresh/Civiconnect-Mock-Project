import { registerUser } from '@/util/authRequests'
import React, { useState, useEffect } from 'react'

export default function AuthExample() {

	useEffect(() => {

		//registerUser("aPerson@hotmail.com", "aPerson", "aPerson1234")
		loginUser("aPerson", "aPerson1234").then((data) => {
			getUserData()
		})
	}, [])

	async function registerUser(email, username, password) {

		const response = await fetch("https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/auth/local/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				username: username,
				password: password,
			}),
		})
		const data = await response.json()

		localStorage.setItem("jwt", data.jwt)
	}

	async function loginUser(username, password) {
		const response = await fetch("https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/auth/local", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: username,
				password: password,
			}),
		})
		const data = await response.json()

		localStorage.setItem("jwt", data.jwt)
	}

	async function getUserData() {
		const jwt = localStorage.getItem("jwt")

		const response = await fetch("https://strapi.discoverlincoln-t2-c8.civiconnect.net/api/users/me?populate=*", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${jwt}`,
			}
		})

		const data = await response.json()
		console.log(data)
	}

	return (
		<div>AuthExample</div>
	)
}
