import React from 'react';

function Display(props){
    return(
        <div className='display-container'>
            <ResultDisplay result={props.currentResult}
                contextClass='current-result' />
            <div className='details-view'>
                <ResultHistoryDisplay rollHistory={props.rollHistory}/>
                <AddButton onClick={props.addButtonOnClick}/>
            </div>
        </div>
    );
}

function ResultHistoryDisplay(props){
    let idx = -1;
    const historyList = props.rollHistory.map((item) => {
        idx++;
        return (<li key={'history-' + idx}>
            <ResultDisplay 
                result={item}
                contextClass='historical-result' />
            </li>);
    });

    return(
        <div className='result-history'>
            <ul id='result-history-list' className='result-history-list'>
                {historyList}
            </ul>
        </div>
    );
}

function ResultDisplay(props){
    const rollStr = props.result.origin === undefined ? "" : props.result.origin.toString();
    const detailStr = props.result.detail === undefined ? "" : props.result.printDetail();

    return(
        <div className={'result-wrapper ' + props.contextClass}>
            <h4 className='result-header'>{rollStr}</h4>
            <p className='result-details'>{detailStr}</p>
            <p className='result-display'>{props.result.total}</p>
        </div>
    );
}

function AddButton(props){
    return(
        <button className='addBtn' onClick={props.onClick}>Add Custom Roll</button>
    );
}

export default Display;