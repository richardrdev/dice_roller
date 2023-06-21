import Result from './Result'

class Roll{
    constructor(diceSize, numDice, postRollAdd, numRolls, name){
        const initDiceSize = parseInt(diceSize);
        const initNumDice = parseInt(numDice);
        const initPostRollAdd = parseInt(postRollAdd);
        const initNumRolls = parseInt(numRolls);

        if(diceSize === undefined || !Number.isInteger(initDiceSize)){
            this.diceSize = 20;
        } else{
            this.diceSize = parseInt(initDiceSize);
        }
        
        if(numDice === undefined || !Number.isInteger(initNumDice)){
            this.numDice = 1;
        } else{
            this.numDice = initNumDice;
        }
        
        if(postRollAdd === undefined || !Number.isInteger(initPostRollAdd)){
            this.postRollAdd = 0;
        } else{
            this.postRollAdd = initPostRollAdd;
        }

        if(numRolls === undefined || !Number.isInteger(initNumRolls)){
            this.numRolls = 1;
        } else{
            this.numRolls = initNumRolls;
        }

        if(!(name === undefined)){
            this.name= name;
        }
    }

    basicRoll = function(result){
        let newRollResult = Math.floor(Math.random() * Math.floor(this.diceSize)+1);
        result.detail['rollBuffer'].push(newRollResult);
        result.total += newRollResult;
        return result
    }

    fullRoll  = function(result){
        this.repeat_roll(this.numDice, this.basicRoll.bind(this), result);
        result.total += this.postRollAdd;
        result.detail['rolls'].push(result.detail['rollBuffer'].slice(0));
        result.detail['rollBuffer'] = [];
        return result;
    }

    repeat_roll  = function(num, func, result){
        func(result);
        num--;

        if(num > 0){
            this.repeat_roll(num, func, result);
            return result;
        }

        return result;
    }

    roll  = function(){
        let result = new Result(this);
        this.repeat_roll(this.numRolls, this.fullRoll.bind(this), result);
        result.detail['add'] = this.postRollAdd;
        return result;
    }

    toString  = function(){
        const showNumDice = (this.numDice !== 1);
        const showNumRolls = (this.numRolls !== 1);
        const showPostRollAdd = (this.postRollAdd !== 0);

        let str = `d${this.diceSize}`;
        str += showPostRollAdd ? `+${this.postRollAdd}` : '';
        if(showNumDice){str = this.numDice+str};
        if(showNumRolls){
            str = `${this.numRolls}[${str}]`;
        }

        return str;
    }
    
}

export default Roll;