import React, { Component } from 'react';
import '../App.css';

class DataFetchJson extends Component {


    //****************************************************************************************************************
    //**********************************from jsonplaceholder.typicode.com*********************************************
    //****************************************************************************************************************
    constructor(props) {
        super(props);

        this.state = {
            fdata: [],
            recordcount: 0,
            page: 1,
            limit: 10,
            userId: ""
        };

        this.handleChangeUserId = this.handleChangeUserId.bind(this);
    }

    componentDidMount() {
        this.FetchData();
    }
    
    //fetch data from json
    FetchData() {
        let uri = "";
        if (this.state.userId !== "")
        {
            uri = 'https://jsonplaceholder.typicode.com/todos?userId=' + this.state.userId + '&_page=' + this.state.page + '&_limit=' + this.state.limit;
        }
        else
        {
            uri = 'https://jsonplaceholder.typicode.com/todos?_page=' + this.state.page + '&_limit=' + this.state.limit;
        }


        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ fdata: json, recordcount: Object.keys(json).length });
            })
            .catch ((error) => {
            console.error('Error occurred: ', error); //no fancy error handling here, yet error handling..
            });

    }

    //previous button
    handleJsonPrev = () => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber - 1;
        }
        this.setState({
            page: pagenumber,
        },this.handleSubmit);
    }

    //next button
    handleJsonNext = () => {
        this.setState({
            page: this.state.page + 1,
        },this.handleSubmit);
    }

    //when user inputs UserId to inputfield
    handleChangeUserId(event) {
        let targetuser = event.target.value;
        this.setState({ userId: targetuser },
            this.handleSubmit);
    }
    handleSubmit(event) {
        this.FetchData();
    }


    //****************************************************************************************************************

    render() {
        let rowCount = "Rows fetched from jsonplaceholder.typicode.com: " + this.state.recordcount;
        let tableJson = [];
        if (this.state.fdata.length > 0) {
            for (let index = 0; index < this.state.fdata.length; index++) {
                const element = this.state.fdata[index];

                tableJson.push(
                    <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.userId}</td>
                    <td>{element.title}</td>
                    <td>{element.completed}</td>
                    </tr>
                );
            }
}
        else {
            rowCount = <div className="loader"></div>
        }

        return (
            <div className="messageBox">
                <h5>{rowCount}</h5>

                <table id="todos"><tbody>{tableJson}</tbody></table>
                <input type="text" placeholder=" Limit with UserId" title="Get all Todo's from inserted UserId" value={this.state.userId} onChange={this.handleChangeUserId} />
                <div className="nw_lowercontrols">
                <button className="btn_list-lg" onClick={this.handleJsonPrev}>Previous</button>
                <button className="btn_list-lg" onClick={this.handleJsonNext}>Next</button>
                 </div>
            </div>
            
            );
    }
}

export default DataFetchJson;