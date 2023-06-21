import React from 'react';

function CustomButtonForm(props){
    return(
        <div className='modal-content'>
            <div className='form-heading'>
                <h3>Add a custom Dice</h3>
                <p>Please enter custom dice size</p>
                <small>(Number values only)</small>
            </div>
            <div className='modal-input-container'>
                <form className='custom-btn-form' onSubmit={props.handleSubmit}>
                    {/* dice size */}
                    <FormRow inputID='diceSize'
                        labelText='Dice Size (dX)' 
                        value={props.currentRoll.diceSize}
                        handleChange={(event) => props.handleFormChange(event)} />
                    {/* number of dice */}
                    <FormRow inputID='numDice'
                        labelText='Number of Dice' 
                        value={props.currentRoll.numDice}
                        handleChange={(event) => props.handleFormChange(event)} />
                    {/* modifier to roll result */}
                    <FormRow inputID='postRollAdd'
                        labelText='Modifier to roll result' 
                        value={props.currentRoll.postRollAdd}
                        handleChange={(event) => props.handleFormChange(event)} />
                    {/* number of rolls */}
                    <FormRow inputID='numRolls'
                        labelText='How many times to perform Roll?' 
                        value={props.currentRoll.numRolls}
                        handleChange={(event) => props.handleFormChange(event)} />
                    <FormRow inputID='name' 
                        labelText='Name for your custom roll'
                        value={props.currentRoll.name}
                        handleChange={(event) => props.handleFormChange(event)}/>
                    <div className='input-row'>
                        <label htmlFor='' className='input-label'>Your Custom Roll</label>
                        <input type='text' 
                            value={props.currentRoll.toString()}
                            readOnly />
                    </div>
                    <div className='input-row'>
                        <input id='input-submit' className='input-submit modal-btn' type='submit' name='input-submit' value='Submit' />
                    </div>
                    <div className='input-row'>
                        <button className='modal-close-btn modal-btn' onClick={() => props.closeModal()}>Close</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

function FormRow(props){
    return(
        <div className='input-row'>
            <label htmlFor={props.inputID} className={`label-${props.inputID} input-label`}>
                {props.labelText}
            </label>
            <input id={`input-${props.inputID}`} className='input-text' 
            type='text' name={props.inputID}
            value={props.value} 
            onChange={(event) => props.handleChange(event)} />
        </div>
    );
}

export default CustomButtonForm;