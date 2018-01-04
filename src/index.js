import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class IosCalculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayValue: '0',
            waitingForOperand: false,
            operator: null,
            firstValue: null,
            size: '7em'
        }

        this.handleDot = this.handleDot.bind(this);
        this.toggleSign = this.toggleSign.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    getFontSize(length){

        switch(length)
        {
            case 4:
                return '4.5em';
                break;
            case 7:
                return '2.8em';
                break;
            case 10:
                return '1.9em';
                break;
            default: return this.state.size;
        }

    }

    handleInput(digit){

        if(this.state.waitingForOperand)
        {
            this.setState(
                {
                    displayValue: String(digit),
                    waitingForOperand: false,
                    size: this.getFontSize(this.state.displayValue.length)
                }
            );
        }
        else{
            this.setState(
                {
                    displayValue: this.state.displayValue === '0' ? String(digit) : this.state.displayValue + digit,
                    size: this.getFontSize(this.state.displayValue.length)
                }
            );
        }  
    }

    handleDot(){

        const value = this.state.displayValue;

        if(this.state.waitingForOperand){
            this.setState(
                {
                    displayValue: '0.',
                    waitingForOperand: false,
                    size: this.getFontSize(this.state.displayValue.length)
                }
            );
        }
        else if(value.indexOf('.') === -1)
        {
            this.setState(
                {
                    displayValue: value + '.',
                    size: this.getFontSize(this.state.displayValue.length)
                }
            );
        }

    }

    clearInput(){

        this.setState(
            {
                displayValue: '0',
                operator: null,
                waitingForOperand: false,
                firstValue: null,
                size: '7em'
            }
        );

    }

    applyPercentage(){

        const result = parseFloat(this.state.displayValue) / 100;

        this.setState(
            {
                displayValue: String(result),
                size: this.getFontSize(this.state.displayValue.length)
            }
            
        );
        
    }

    toggleSign(){

        if(this.state.displayValue != '0'){
            const value = this.state.displayValue;

            this.setState(
                {displayValue: value.charAt(0) === '-' ? value.substr(1) : '-' + value}
            );
        }

        this.setState(
            {
                size: this.getFontSize(this.state.displayValue.length)
            }
        );
        
    }

    performOperation(operator){

        this.setState(
            {
                waitingForOperand: true,
                operator: operator,
                firstValue: this.state.displayValue
            }
        );

        switch(operator)
        {
            case '+':
                this.setState(
                    {displayValue: this.state.firstValue == null ? this.state.displayValue : String(parseFloat(this.state.firstValue) + parseFloat(this.state.displayValue))}
                );
                break;
            case '-':
                this.setState(
                    {displayValue: this.state.firstValue == null ? this.state.displayValue : String(parseFloat(this.state.firstValue) - parseFloat(this.state.displayValue))}
                );
                break;
        }

        this.setState(
            {
                size: this.getFontSize(this.state.displayValue.length)
            }
        );

    }

    equals(operator){

        const result = null; 

        switch(operator)
        {
            case '+':
                this.result = String(parseFloat(this.state.firstValue) + parseFloat(this.state.displayValue));
                break;
            case '-':
                this.result = String(parseFloat(this.state.firstValue) - parseFloat(this.state.displayValue));
                break;
            case '*':
                this.result = String(parseFloat(this.state.firstValue) * parseFloat(this.state.displayValue));
                break;
            case '/':
                this.result = String(parseFloat(this.state.firstValue) / parseFloat(this.state.displayValue));
                break;
        }

        if(this.state.operator != null)
        {
            this.setState(
                {
                    displayValue: this.result,
                    operator: null,
                    firstValue: this.result,
                    waitingForOperand: true,
                    size: this.getFontSize(this.state.displayValue.length)
                }
            );
        }

    }

    render(){
        
        return(
            <div id = "calculator">
                <div style = {{fontSize: this.state.size}} id="display"><p>{this.state.displayValue}</p></div>
                <div id="left">
                    <div id="specialButtons">
                        <button onClick = {() => this.clearInput()} class="special">AC</button>
                        <button onClick = {() => this.toggleSign()} class="special">±</button>
                        <button onClick = {() => this.applyPercentage()} class="special">%</button>
                    </div>
                    <div id="inputs">
                        <button onClick = {() => this.handleInput(7)} class="input">7</button>
                        <button onClick = {() => this.handleInput(8)} class="input">8</button>
                        <button onClick = {() => this.handleInput(9)} class="input">9</button>
                        <button onClick = {() => this.handleInput(4)} class="input">4</button>
                        <button onClick = {() => this.handleInput(5)} class="input">5</button>
                        <button onClick = {() => this.handleInput(6)} class="input">6</button>
                        <button onClick = {() => this.handleInput(1)} class="input">1</button>
                        <button onClick = {() => this.handleInput(2)} class="input">2</button>
                        <button onClick = {() => this.handleInput(3)} class="input">3</button>
                        <button onClick = {() => this.handleInput(0)} id="zero">0</button>
                        <button onClick = {() => this.handleDot()} class="input">.</button>
                    </div>
                </div>
                <div id="operators">
                    <button onClick = {() => this.performOperation('/')} class="operator">÷</button>
                    <button onClick = {() => this.performOperation('*')} class="operator">x</button>
                    <button onClick = {() => this.performOperation('-')} class="operator">–</button>
                    <button onClick = {() => this.performOperation('+')} class="operator">+</button>
                    <button onClick = {() => this.equals(this.state.operator)} class="operator">=</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<IosCalculator />, document.getElementById('root'));
