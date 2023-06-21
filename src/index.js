import React from 'react';
import ReactDOM from 'react-dom';
import UserInput from './components/UserInput';
import CustomButtonForm from './components/CustomButtonForm';
import Display from './components/Display'
import Modal from 'react-modal';
import Roll from './scripts/Roll';

import '../node_modules/normalize.css/normalize.css';
import './css/index.css';

Modal.setAppElement('#root');

class App extends React.Component{
    constructor(props){
        super(props);
        const basicDice = this.createBasicDice();
        this.state = {
            currentResult: {},
            rolls: basicDice,
            rollHistory: [],
            modalIsOpen: false,
            nextCustomRoll: new Roll()
        };
    }

    componentDidUpdate(){
        this.scrollHistoryDown();
    }

    createBasicDice(){
        const basicDice = [2,4,6,8,10,12,20,100];
        let rollsToAdd = [];

        basicDice.forEach(item => {
            const newRoll = new Roll(item);
            rollsToAdd = rollsToAdd.concat(newRoll);
        });

        return rollsToAdd;
    }

    onClickDice(roll){
        const newResult = roll.roll();
        const newHistory = this.state.rollHistory.concat(newResult)
        this.setState({
            currentResult: newResult,
            rollHistory: newHistory
        });
    }

    scrollHistoryDown(){
        let historyDisplay = document.getElementById('result-history-list');

        historyDisplay.scrollTop = historyDisplay.scrollHeight;
    }

    showAddButtonModal(){
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal(){
        this.setState({
            modalIsOpen: false
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const newRollList = this.state.rolls.concat(this.state.nextCustomRoll)
        const newEmptyRoll = new Roll()
        this.setState({
            rolls: newRollList,
            nextCustomRoll: newEmptyRoll
        });

        this.closeModal();
    }

    handleFormChange(event){
        let newVal;
        if(event.target.name === 'name'){
            newVal = event.target.value
            const newCustomRoll = Object.assign({}, this.state.nextCustomRoll, {[event.target.name]: newVal});
                this.setState({
                    nextCustomRoll: newCustomRoll
                });
        } else{
            newVal = parseInt(event.target.value);
            if(Number.isInteger(newVal)){
                const newCustomRoll = Object.assign({}, this.state.nextCustomRoll, {[event.target.name]: newVal});
                this.setState({
                    nextCustomRoll: newCustomRoll
                });
            }
        }
    }

    render() {
        return(
            <div className='container'>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal()}
                >
                    <CustomButtonForm closeModal={() => this.closeModal()}
                        handleFormChange={event => this.handleFormChange(event)}
                        handleSubmit={(event) => this.handleSubmit(event)}
                        currentRoll={this.state.nextCustomRoll}/>
                </Modal>
                <UserInput onClick={(roll) => this.onClickDice(roll)} 
                    rolls={this.state.rolls} />
                <Display currentResult={this.state.currentResult} 
                    rollHistory={this.state.rollHistory}
                    addButtonOnClick={() => this.showAddButtonModal()} />
            </div>
        );
    }
}



/*****************************************/

ReactDOM.render(
    <App />,
    document.getElementById('root')
);