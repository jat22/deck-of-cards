import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card"
import "./Table.css"

const Table = () => {
	const [deckId, setDeckId] = useState(null);
	const [showingCards, setShowingCards] = useState([])
	const [buttonOn, setButtonOn] = useState(false)
	const intervalId = useRef()

	useEffect(() => {
		async function createDeck() {
			const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
			setDeckId(resp.data.deck_id)
		};
		createDeck()
	}, [setDeckId])

	const handleToggle = () => {
		setButtonOn((buttonOn) => !buttonOn)
	}

	const getACard = async () => {
		const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
		if(resp.data.cards.length < 1) {
			setButtonOn(false)
			alert("Error: No remaining cards")
			return
		}
		const cardData = resp.data.cards[0]
		const card = {
			code : cardData.code,
			img : cardData.image
		}
		setShowingCards((showingCards) => [...showingCards, card])
	}

	useEffect(function toggleCards (){
		if(buttonOn){
			intervalId.current = setInterval(() => {
				getACard()
			}, 1000)
		}
		if(!buttonOn){
			clearInterval(intervalId.current)
		}

		return () => clearInterval(intervalId.current)

	}, [buttonOn])

	return (
		<div className="Table">
			<div>
				<button onClick={handleToggle}>{buttonOn ? "Stop" : "Start"}</button>
			</div>
			<div>
				{showingCards.map((card) => <Card key={card.code} img={card.img} code={card.code}/>)}
			</div>
		</div>
	)
}

export default Table