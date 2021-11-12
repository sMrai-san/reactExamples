import React, { Component } from 'react';
import '../App.css';
import Helpme from './Helpme';
import NWEmployeeAdd from './create/NWEmployeeAdd';
import NWEmployeeEdit from './edit/NWEmployeeEdit';


class DataFetchNWEmployees extends Component {


    //****************************************************************************************************************
    //**********************************json from Northwind database**************************************************
    //****************************************************************************************************************

    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            employees_recordcount: 0,
            page: 0,limit: 10,
            totalEmployees: 0,
            LastName: "",
            visible: "employeesTable",
            renderChildAdd: true,
            renderChildEdit: true,
            oneEmployee: [],
            EmployeeToDelete: 0,
            LastNameToDel: "",
            FirstNameToDel: "",
            TitleToDel: "",
            AddressToDel: "",
            CityToDel: "",
            PostalCodeToDel: "",
            CountryToDel: "",
        };
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
    }

    handleChildUnmountAdd() {
        this.setState({ renderChildAdd: false });
        this.handleClickAddBrowseEmployees();
        this.GetFromNW();
    }
    handleChildUnmountEdit() {
        this.setState({ renderChildEdit: false });
        this.handleClickAddBrowseEmployees();
        this.GetFromNW();
    }
    handleChildUnmountDelete() {
        this.NWDelete();
    }

    componentDidMount() {
        this.GetFromNW();
        this.GetTotalEmployees();
    }

    ResetOnDelete() {
        this.setState({
            EmployeeToDelete: "",
        })
        this.handleClickAddBrowseEmployees();
        this.GetFromNW();
    }


    //when you click delete -> passing values to states as a string
    handleClickDelete = (employeeDelete, lastNameDelete, firstNameDelete, titleDelete, addressDelete, cityDelete, postalCodeDelete, countryDelete, event) => {
        this.setState({
            EmployeeToDelete: employeeDelete,
            LastNameToDel: lastNameDelete,
            FirstNameToDel: firstNameDelete,
            TitleToDel: titleDelete,
            AddressToDel: addressDelete,
            CityToDel: cityDelete,
            PostalCodeToDel: postalCodeDelete,
            CountryToDel: countryDelete,
            visible: "deleteform"
        });
    }


    /**********************************/
    /*****controls above***************/

    handleClickAddBrowseEmployees = () => {
        this.setState({ visible: "employeesTable" });
        //this is where I should add the css active thingy if there's time
    }

    handleClickAddEmployee = () => {
        this.setState({ visible: "addEmployeeform" });
    }

    handleClickHelp = () => {
        this.setState({ visible: "help" });
    }

    //when one clicks edit -> passing values for edit as a []
    handleClickEdit = (dataObj, event) => {
        this.setState({
            oneEmployee: dataObj,
            visible: "editform",
            renderChildEdit: true
        });
    }

    /*************************************************************/
    /****lower controls*******************************************/

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
        if (this.state.employees_recordcount < 10) {        
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
        this.setState({ LastName: targetUser },
            this.handleSubmit);
    }

    handleSubmit(event) {
        this.GetFromNW();
    }


    /*************************************************************************/
    /******FETCHING FROM API***********/
    /************************************************************************/

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //fetch data from Northwind
    GetFromNW() {
        let uri = "";
        if (this.state.LastName !== "")
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/employees/getsome?lastName=' + this.state.LastName + "&offset=" + this.state.page + "&limit=" + this.state.limit;
        }
        else
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/employees/getsome?offset=' + this.state.page + "&limit=" + this.state.limit;
        }
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ employees: json, employees_recordcount: Object.keys(json).length });
            })
        this.handlePreviousDisable();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //fetch total employees from Northwind with error checking (there's some problems with the data in the table, maybe too long?)
    GetTotalEmployees() {
        let uriTotal = 'https://yourwebapi.azurewebsites.net/nw/employees/';
        fetch(uriTotal)          
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                this.setState({ totalEmployees: Object.keys(json).length })
            })
            .catch((error) => {
                console.error('Error occurred:', error);
            })
    }


    ///////////////////////////////////////////////////////////////////////////////////////////
    //delete employee data from northwind(force to int)
    NWDelete() {
        let uridel = 'https://yourwebapi.azurewebsites.net/nw/employees/' + Number(this.state.EmployeeToDelete);
        fetch(uridel, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;"
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



    render() {
        let rowCount = "Total rows fetched from Northwind database / Employees: " + this.state.totalEmployees;
        let employeestableJson = [];
        if (this.state.employees.length > 0) {
            for (let index = 0; index < this.state.employees.length; index++) {
                const element = this.state.employees[index];

                employeestableJson.push(
                    <tr key={element.employeeId}>
                        <td id="IsEmployee">{element.employeeId}</td>                                
                        <td>{element.lastName}</td>
                        <td>{element.firstName}</td>
                        <td>{element.title}</td>
                        <td>{element.address}</td>
                        <td>{element.postalCode}</td>
                        <td>{element.city}</td>
                        <td>{element.country}</td>
                        <td>
                            <button className="btn_list" onClick={this.handleClickEdit.bind(this, element)}>Edit</button>
                            <button className="btn_list" id="btnModal" onClick={this.handleClickDelete.bind(
                                this,
                                element.employeeId,
                                element.lastName,
                                element.firstName,
                                element.title,
                                element.address,
                                element.city,
                                element.postalCode,
                                element.country,
                            )}>Delete</button>
                        </td>
                    </tr>
                );
            }
}
        else {
            rowCount = <div className="loader"></div>
        }

        if (this.state.visible === "employeesTable") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                    

                        <div className="nw_topcontrols">
                            <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                            <button className="btn_list-lg" onClick={this.handleClickAddEmployee}>Add Employee</button>
                        </div>

                        <h5>{rowCount}</h5>
                        <input type="text" placeholder=" Limit list by last name" title="Get all records with last name" value={this.state.lastName} onChange={this.handleChangeLastName} />
                        <br />
                        <table id="northwind_employees" className="nwtable">
                            <thead><tr>
                            <th>Employee ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Postal Code</th>
                            <th>City</th>
                            <th>Country</th>
                                
                            </tr></thead>
                            <tbody>{employeestableJson}</tbody></table>
                        <div id="resultsToShowError" className="resultsToShowError text-danger"></div>
                        <div className="nw_lowercontrols">
                            <button id="previousBtn" className="btn_list-lg" onClick={this.handleJsonPrev}>Previous</button>
                            <button id="nextBtn" className="btn_list-lg" onClick={this.handleJsonNext}>Next</button>
                        </div>

                    </div>
                </div>
            );
        }

        else if (this.state.visible === "addEmployeeform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseEmployees}>Browse Employees</button>
                    </div>
                    {this.state.renderChildAdd ? < NWEmployeeAdd unmountMe={this.handleChildUnmountAdd} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "editform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseEmployees}>Browse Employees</button>
                    </div>
                    {this.state.renderChildEdit ? < NWEmployeeEdit employeeObj={this.state.oneEmployee} unmountMe={this.handleChildUnmountEdit} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "deleteform") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                        <div id="deleteModal" className="delModal">
                            <div className="delModal-content">
                                <span onClick={this.handleClickAddBrowseEmployees} className="close">&times;</span>
                                <p>Are you sure you want to delete this employee {this.state.EmployeeToDelete}?</p>
                                <table className="nwtable">
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Last Name</th>
                                            <th>First Name</th>
                                            <th>Title</th>
                                            <th>Address</th>
                                            <th>Postal Code</th>
                                            <th>City</th>
                                            <th>Country</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <td>{this.state.EmployeeToDelete}</td>
                                        <td>{this.state.LastNameToDel}</td>
                                        <td>{this.state.FirstNameToDel}</td>
                                        <td>{this.state.TitleToDel}</td>
                                        <td>{this.state.AddressToDel}</td>
                                        <td>{this.state.CityToDel}</td>
                                        <td>{this.state.PostalCodeToDel}</td>
                                        <td>{this.state.CountryToDel}</td>
                                    </tbody>
                                </table>
                                <br />
                                <div>
                                    <button className="btn_list-lg" onClick={this.handleChildUnmountDelete}>Confirm delete</button>
                                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseEmployees}>Back</button>
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
                        <button className="btn_list-lg" onClick={this.handleClickAddEmployee}>Add Employee</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseEmployees}>Browse Employees</button>
                    </div>

                    <Helpme mod="NWEmployeesFetch" />

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

export default DataFetchNWEmployees;