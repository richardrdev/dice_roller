import React from 'react';

function UserInput(props){
    return(
            <div className='input-container'>
                <RollList rolls={props.rolls} 
                    onClick={(roll) => props.onClick(roll)} />
            </div>
        );
}

function RollList(props){
    const diceButtons = props.rolls.map((roll, idx) => {
        return <RollButton 
                key={`roller-${roll.toString()}__${idx}`}
                text={roll.name === undefined ? roll.toString() : roll.name}
                onClick={() => props.onClick(roll)}/>
    });

    return diceButtons;
}

function RollButton(props){
    return(
        <button className='rollBtn' 
            onClick={props.onClick}>{props.text}</button>
    );
}



export default UserInput;