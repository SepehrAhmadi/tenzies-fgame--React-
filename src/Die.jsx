
function Die(props){

    return(
        <div className={props.isHeld ? "die--face die--isHeld" : "die--face"} onClick={props.toggleDice}>
            <div className="die--num">{props.value}</div>
        </div>
    )
}

export default Die