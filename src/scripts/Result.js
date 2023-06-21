class Result{
    constructor(roll){
        this.origin = roll
        this.total = 0;
        this.detail = {rolls: [], add: 0, rollBuffer: []};
    }

    printDetail = function(){
        let detailStr = "";
        this.detail.rolls.forEach(item => {
            detailStr += `(${item}${this.detail.add !== 0 ? (" +" + this.detail['add']) : ''}), `;
        });

        return detailStr.slice(0,-2);
    }
}

export default Result;