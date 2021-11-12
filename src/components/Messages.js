import React, { Component } from 'react';
import '../App.css';
import Helpme from './Helpme';

class Message extends Component {

    render() {
        return(
        <p>Default message.</p>
        );
    }
}

class InputMessage extends Component {
    state = {
        msge: 'Default message.'
    };
    render() {
        return (
            <div>
                <p>{this.state.msge}</p>
                <p>Change the text above by typing into the field beneath: </p>
                <input id="textInput" type="text" onChange={e => {
                    if (document.getElementById('textInput').value !== "") { //if input is not empty show input
                        this.setState({ msge: e.target.value });
                    }
                    else {
                        this.setState({msge: 'Default message'}); //if input is empty show default text
                    }
                }
                }

                />
                <p className="inputHelpText">(If the input -field is empty, default message is shown.)</p>
            </div>
        );
    }
}




class MessageProps extends Component { //muuttuja luokassa MessageProps, jolle voi asettaa arvon my�hemmin. (this.props.message)
    render() {
        return (
            <>
                <p>{this.props.message}</p>
                <p>{this.props.message0}</p>
                <p>{this.props.message1}</p>
                <p>{this.props.message2}</p>
            </>
        );
    }
}




class MessageChange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg0: "Another message.(0)",
            msg1: "Another message.(1)",
            msg2: "Another message.(2)"
        }
    }

    reset = () => { //ei ole viel� tietoa miten this.state resetoidaan, joten tehd��n 'resetointi' k�sin:
        this.setState({
            msg0: "Yet another message.(0)",
            msg1: "Yet another message.(1)",
            msg2: "Yet another message.(2)"
        });
        document.getElementById('changeTextToOriginal').setAttribute("class", "hiddenMessage");
        document.getElementById('changeText').setAttribute("class", "showMessage");

    }

    msgChange = () => {
        this.setState({
            msg0: "Yet another message.(3)",
            msg1: "Yet another message.(4)",
            msg2: "Yet another message.(5)"

        });

        document.getElementById('changeText').setAttribute("class", "hiddenMessage");
        document.getElementById('changeTextToOriginal').setAttribute("class", "showMessage");
    }

    render() {
        return (

            <>
            <div id="btn">
                <button id="changeText" onClick={this.msgChange}>Click me to change text</button>
                <button className="hiddenMessage" id="changeTextToOriginal" onClick={this.reset}>Click again for original text</button>
            </div>
                <p>{this.state.msg0}</p>
                <p>{this.state.msg1}</p>
                <p>{this.state.msg2}</p>

            </>
        );
    }
}



class InputList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { createMsg: [] };
    }

    save() {
        var createMsg = [...this.state.createMsg];
        createMsg.push(this.newText.value);
        this.setState({ createMsg });
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.save();
        }
    }

    render() {
        return (
            <div className="list">
                <p className="inputHelpText">(Type in a message and press Enter or Add Message -button)</p>
                <input type="text" ref={(ip) => { this.newText = ip }} onKeyDown={this._handleKeyDown} />
                <button onClick={this.save.bind(this)} className="addMessageBtn">Add message</button>
                <h3>Input list:</h3>
                <ul>
                    {this.state.createMsg.map(function (newMsg) {
                        return <li key={newMsg.toString()}>{newMsg}</li>
                    })}

                </ul>
            </div>
        )
    }
};







class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showhelp: "hide"
        };
    }

    handleClickHelp = (event) => {
        let status = this.state.showhelp;
        if (status === "show") {
            status = "hide"
        }
        else {
            status = "show"
        }
        this.setState
            ({
                showhelp: status
            })
    }


    render() {

        if (this.state.showhelp === "show") {
            return (
                <>
                    <div>
                        <div className="Messages">
                            <header className="Message-header">
                                <h3>Messages</h3>
                                <div className="messageHideContent">
                                    <button className="messageHideContent-btn" onClick={this.handleClickHelp}>Show content</button>
                                </div>
                            </header>
                            <div className="messageBox">
                                <Helpme mod="messageHide" />
                            </div>
                        </div>
                    </div>
                </>

            )
        } else {
            return (<div>
                <div className="Messages">
                    <header className="Message-header">
                        <h3>Messages</h3>
                        <div className="messageHideContent">
                            <button className="messageHideContent-btn" onClick={this.handleClickHelp}>Hide content</button>
                        </div>
                    </header>
                    <div className="messageBox">
                        <Message />
                        <InputMessage />
                        <p></p><hr />
                        <div id="msgContent">
                            <MessageProps
                                message="Another default message."
                                message0="Yet another message.(0)"
                                message1="Yet another message.(1)"
                                message2="Yet another message.(2)"
                            />
                        </div>
                        <p></p><hr />
                        <MessageChange />
                        <p></p><hr />
                        <InputList />
                    </div>



                </div>
            </div>
            );
        }


    }

}

export default Messages;
