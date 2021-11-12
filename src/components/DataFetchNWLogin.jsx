import React, { Component } from 'react';
import '../App.css';
import Helpme from './Helpme';
import NWLoginAdd from './create/NWLoginAdd';
import NWLoginEdit from './edit/NWLoginEdit';


class DataFetchNWLogin extends Component {


    //****************************************************************************************************************
    //**********************************json from Northwind database**************************************************
    //****************************************************************************************************************

    constructor(props) {
        super(props);

        this.state = {
            logins: [],
            login_recordcount: 0,
            page: 0,
            limit: 10,
            totalLogins: 0,
            surName: "",
            visible: "loginsTable",
            renderChildAdd: true,
            renderChildEdit: true,
            oneLogin: [],
            LoginToDelete: 0,
            UserNameToDel: "",
            FirstNameToDel: "",
            LastNameToDel: "",
            EmailToDel: "",
            AccessLevelToDel: "",
            AccesLevelString: "",
        };
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
    }

    handleChildUnmountAdd() {
        this.setState({ renderChildAdd: false });
        this.handleClickAddBrowseLogins();
        this.GetFromNW();
    }
    handleChildUnmountEdit() {
        this.setState({ renderChildEdit: false });
        this.handleClickAddBrowseLogins();
        this.GetFromNW();
    }
    handleChildUnmountDelete() {
        this.NWDelete();
    }

    componentDidMount() {
        this.GetFromNW();
        this.GetTotalLogins();
    }





    //when you click delete -> passing values to states as a string
    handleClickDelete = (loginDelete, userNameDelete, firstNameDelete, lastNameDelete, emailDelete, accessDelete, event) => {
        this.setState({
            LoginToDelete: loginDelete,
            UserNameToDel: userNameDelete,
            FirstNameToDel: firstNameDelete,
            LastNameToDel: lastNameDelete,
            EmailToDel: emailDelete,
            AccessLevelToDel: accessDelete,
            visible: "deleteform"
        });
    }


    /*****************************************/
    /**********controls above****************/

    handleClickAddBrowseLogins = () => {
        this.setState({ visible: "loginsTable" });
        //this is where I should add the css active thingy if there's time
    }

    handleClickAddLogin = () => {
        this.setState({ visible: "addLoginform" });
    }

    handleClickHelp = () => {
        this.setState({ visible: "help" });
    }

    //*******************************************************************
    //when one clicks edit -> passing values for edit as a []
    handleClickEdit = (dataObj, event) => {
        this.setState({
            oneLogin: dataObj,
            visible: "editform",
            renderChildEdit: true
        });
    }
    //After a succesfull delete
    ResetOnDelete() {
        this.setState({
            LoginToDelete: "",
        })
        this.handleClickAddBrowseLogins();
        this.GetFromNW();
    }

    /***************************************************/
    /****lower controls********************************/

    //disable previous button from page 1 = 0
    handlePreviousDisable() {
        if (this.state.page === 0) {
            document.getElementById("previousBtn").className = "btn_list-lg-disabled";
        }
        else {
            document.getElementById("previousBtn").className = "btn_list-lg";
        }
    }
    //previous button
    handleJsonPrev = () => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber - 10;
        }
        this.setState({
            page: pagenumber,
        }, this.handleSubmit);
        document.getElementById("resultsToShowError").style.display = "none";
        document.getElementById("nextBtn").className = "btn_list-lg";
    }

    //next button
    handleJsonNext = () => {
        if (this.state.login_recordcount < 10) {        
            this.setState({
                page: this.state.page,
            }, this.handleSubmit);
            document.getElementById("resultsToShowError").innerHTML = "No more results to show!"
            document.getElementById("resultsToShowError").style.display = "block";
            document.getElementById("nextBtn").className = "btn_list-lg-disabled";
        }
        else {
            this.setState({
                page: this.state.page + 10,
            }, this.handleSubmit);
        }
    }

    /*********************************************/
    //when user input's lastname to search -field
    handleChangeLastName(event) {
        let targetUser = event.target.value;
        this.setState({ surName: targetUser },
            this.handleSubmit);
    }

    //handleSubmit triggers dataload from Northwind
    handleSubmit(event) {
        this.GetFromNW();
        this.GetTotalLogins();
    }


    /*************************************************************************/
    /*************************************************************************/

    //////////////////////////////////////////////////////////////////////////
    //fetch data from Northwind
    GetFromNW() {
        let uri = "";
        if (this.state.userName !== "")
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/logins/getsome?surName=' + this.state.surName + "&offset=" + this.state.page + "&limit=" + this.state.limit;
        }
        else
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/logins/getsome?offset=' + this.state.page + "&limit=" + this.state.limit;
        }
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ logins: json, login_recordcount: Object.keys(json).length })
            })
        this.handlePreviousDisable();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //fetch total logins from Northwind (had to do this here, cause above code limits!)
    GetTotalLogins() {
        let uri2 = 'https://yourwebapi.azurewebsites.net/nw/logins/';
        fetch(uri2)
            .then(response => response.json())
            .then(json => {
                this.setState({ totalLogins: Object.keys(json).length })
            })


    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    //delete login data from northwind
    NWDelete() {
        let uridel = 'https://yourwebapi.azurewebsites.net/nw/logins/' + Number(this.state.LoginToDelete);
        fetch(uridel, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                //store data to variable
                const success = json;
                if (success) {
                    this.ResetOnDelete();
                }
            });


    }


    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************



    render() {
        let rowCount = "Total rows fetched from Northwind database / Logins: " + this.state.totalLogins;
        let loginstableJson = [];
        if (this.state.logins.length > 0) {
            for (let index = 0; index < this.state.logins.length; index++) {
                const element = this.state.logins[index];

                loginstableJson.push(
                    <tr key={element.loginId}>
                        <td>{element.loginId}</td>
                        <td>{element.userName}</td>
                        <td>{element.firstName}</td>
                        <td>{element.surName}</td>
                        <td>{element.email}</td>
                        <td>{element.accesLevelID}</td>
                        <td>
                            <button className="btn_list" onClick={this.handleClickEdit.bind(this, element)}>Edit</button>
                            <button className="btn_list" id="btnModal" onClick={this.handleClickDelete.bind(
                                this,
                                element.loginId,
                                element.userName,
                                element.firstName,
                                element.surName,
                                element.email,
                                element.accesLevelID,
                            )}>Delete</button>
                        </td>
                    </tr>
                );
            }
}
        else {
            rowCount = <div className="loader"></div>
        }

        if (this.state.visible === "loginsTable") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                    

                        <div className="nw_topcontrols">
                            <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                            <button className="btn_list-lg" onClick={this.handleClickAddLogin}>Add Login</button>
                        </div>

                        <h5>{rowCount}</h5>
                        <input type="text" placeholder=" Limit list by user lastname" title="Get all records with user's lastname" value={this.state.surName} onChange={this.handleChangeLastName} />
                        <br />
                        <table id="northwind_logins" className="nwtable">
                        <thead><tr>
                            <th>Login ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email address</th>
                            <th><div className="tooltip_divider"><div className="ac_left">Accesslevel</div><div className="help-tip ac_right"><p>1. Admin <br />2. Superuser <br /> 3. User</p></div></div></th>
                            </tr></thead>
                            <tbody>{loginstableJson}</tbody></table>
                        <div id="resultsToShowError" className="resultsToShowError text-danger"></div>
                        <div className="nw_lowercontrols">
                            <button id="previousBtn" className="btn_list-lg" onClick={this.handleJsonPrev}>Previous</button>
                            <button id="nextBtn" className="btn_list-lg" onClick={this.handleJsonNext}>Next</button>
                        </div>

                    </div>
                </div>
            );
        }

        else if (this.state.visible === "addLoginform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseLogins}>Browse Logins</button>
                    </div>
                    {this.state.renderChildAdd ? < NWLoginAdd unmountMe={this.handleChildUnmountAdd} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "editform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseLogins}>Browse Logins</button>
                    </div>
                    {this.state.renderChildEdit ? < NWLoginEdit loginObj={this.state.oneLogin} unmountMe={this.handleChildUnmountEdit} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "deleteform") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                        <div id="deleteModal" className="delModal">
                            <div className="delModal-content">
                                <span onClick={this.handleClickAddBrowseLogins} className="close">&times;</span>
                                <p>Are you sure you want to delete login {this.state.LoginToDelete}?</p>
                                <table className="nwtable">
                                    <thead>
                                        <tr>
                                            <th>Login ID</th>
                                            <th>Username</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email -address</th>
                                            <th>Accesslevel</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <td>{this.state.LoginToDelete}</td>
                                        <td>{this.state.UserNameToDel}</td>
                                        <td>{this.state.FirstNameToDel}</td>
                                        <td>{this.state.LastNameToDel}</td>
                                        <td>{this.state.EmailToDel}</td>
                                        <td>{this.state.AccessLevelToDel}</td>
                                    </tbody>
                                </table>
                                <br />
                                <div>
                                    <button className="btn_list-lg" onClick={this.handleChildUnmountDelete}>Confirm delete</button>
                                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseLogins}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else if (this.state.visible === "help") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickAddLogin}>Add Login</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseLogins}>Browse Logins</button>
                    </div>

                    <Helpme mod="NWLoginHelp" />

                </div>
            );
        }
        else {
            return (
                <div className="nw_topcontrols">
                    <h5>Something went wrong...Please try to load the page again.</h5>
                </div>
            );
        }


    }
}

export default DataFetchNWLogin;