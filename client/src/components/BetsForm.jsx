
import {useState, useEffect} from 'react'
import '../bets_card.css' 

function BetsForm({ bet, handleAddBet, handleDeleteBet}){
    
    const [betFormSubmit, setBetFormSubmit] = useState(false)
    const [newUserBet, setNewUserBet] = useState({})

    //create state 
    //handles the initial place bet submit
    function handleBetSubmit(e){
        e.preventDefault()
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bet_id: bet.id,
                money_bet: +e.target.money_bet.value})
        }

        fetch('/user_bets', configObj)
            .then(res => res.json())
            .then(data => {
                setNewUserBet(data)
                handleAddBet(data.bet.id, data.bet.current_bets, data)
            })

        setBetFormSubmit(betFormSubmit => !betFormSubmit)
    }
    
    //handle the update bet

    function handleUpdateBet(e){
        e.preventDefault()
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                money_bet: +e.target.update_bet.value
            })
        }

        fetch(`/user_bets/${newUserBet.id}`, configObj)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    //handle the delete bet
    function handleDeleteClick(){

        const configObj = {
            method: 'DELETE'
        }

        fetch(`/user_bets/${newUserBet.id}`, configObj)
            .then(res => res.json())
            .then(data => handleDeleteBet(data))
    }

    //timer useEffect for toggling the update and delete button for the bet
    useEffect(()=> {

        if(betFormSubmit){

          const timer = setTimeout(()=> {
            setBetFormSubmit(betFormSubmit => !betFormSubmit) 
          },5000)

          return () => clearTimeout(timer)
        }
       
    },[betFormSubmit])

    //conditional below for when the initla bet has been placed and if it has, allow the user to update and delete the bet
    return(
        <>
            <div className="bets-form-container">
                {!betFormSubmit ? 
                <form className="bets-form" onSubmit={handleBetSubmit}>
                    <label>
                        How much money do you want to bet?
                        <input type="text" name="money_bet"></input>
                    </label>
                    <div className="bets-card-btn-container">
                        <button className="btn btn-light btn-lg btn-block" type="submit">Place Bet</button>
                    </div>
                </form>
                : 
                <>
                    <form className="bets-form" onSubmit={handleUpdateBet}>
                        <label>
                            How much do you want to update your bet by?
                            <input type="text" name="update_bet"></input>
                        </label>
                        <div className="bets-card-btn-container">
                            <button className="btn btn-light btn-lg btn-block" type="submit">Update Bet</button>
                        </div>
                    </form>
                <div className="bets-card-btn-container">
                    <button className="btn btn-light btn-lg btn-block" onClick={handleDeleteClick} type="submit">Delete Bet</button>
                </div>
                
                </>
                }
            </div>

        </>

    )
}

export default BetsForm
