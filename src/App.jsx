import React , {useState , useEffect} from 'react'
import Die from "./Die"


function App() {
    const [dice , setDice] = useState(allNewDice())
    const [tenzies , setTenzies] = useState(false);
    
    useEffect(function(){ 
        const allHeld = dice.every( die => die.isHeld);
        const firstValue = dice[0].value;
        const sameValue = dice.every( die => die.value === firstValue);
        if(allHeld && sameValue){
            setTenzies(true)
            console.log("Won")
        }
    } , [dice])

    function allNewDice(){
        const newDice = []
        for(let i = 0 ; i < 10 ; i++){
            const currentObj = {
                value : Math.ceil(Math.random() * 6) , 
                isHeld : false ,
                id : i + 1 , 
            }
            newDice.push(currentObj)
        }
        return newDice
    }

    function rollDice(){
        setDice( prevDice => prevDice.map( die => {
            if(die.isHeld === false){
                return {
                    ...die ,
                    value : Math.ceil(Math.random() * 6) ,
                }
            } else {
                return {
                    ...die
                }
            }
        }))
    }

    function toggleDice(id){
        setDice(prevDice => prevDice.map( (die) => {
            return die.id === id ? {...die , isHeld : !die.isHeld} : die
        }))
    }

    function newGame(){
        setTenzies(false)
        setDice(allNewDice())
    }

    const diceElements = dice.map( die => <Die key={die.id} isHeld={die.isHeld} value={die.value} toggleDice={() => toggleDice(die.id)}/>)


    return(
        <main>
            {tenzies ? <h1 className="title won">You Won</h1> : <h1 className="title">TENZIES</h1>}
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceElements}
            </div>
            {
            tenzies ? 
            <button className='roll-btn' onClick={newGame}>New Game</button> : 
            <button className='roll-btn' onClick={rollDice}>Roll</button>
            }
        </main>
    )
}

export default App
