import React, { Component } from 'react';
import '../App.css';
import Helpme from './Helpme';
import NWCustomerAdd from './create/NWCustomerAdd';
import NWCustomerEdit from './edit/NWCustomerEdit';


class DataFetchNWCustomers extends Component {


    //****************************************************************************************************************
    //**********************************json from Northwind database**************************************************
    //****************************************************************************************************************

    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            cust_recordcount: 0,
            page: 0,
            limit: 10,
            country: "",
            totalcustomers: 0,
            visible: "browse",
            renderChildAdd: true,
            renderChildEdit: true,
            oneCustomer: [],
            CustomerToDelete: "", CompanyNameToDel: "", ContactNameToDel: "", ContactTitleToDel: "", AddressToDel: "", PostalCodeToDel: "", CityToDel: "", CountryToDel: "", PhoneToDel:"",
        };
       
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
    }

    handleChildUnmountAdd() {
        this.setState({ renderChildAdd: false });
        this.handleClickAddBrowseCustomers();
        this.GetFromNW();
    }
    handleChildUnmountEdit() {
        this.setState({ renderChildEdit: false });
        this.handleClickAddBrowseCustomers();
        this.GetFromNW();
    }
    handleChildUnmountDelete() {
        this.NWDelete();
    }

    componentDidMount() {
        this.GetFromNW();
        this.GetTotalCustomers();
    }

    ResetOnDelete() {
        this.setState({
            CustomerToDelete: "",
        })
        this.handleClickAddBrowseCustomers();
        this.GetFromNW();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //controls above
    handleClickAddBrowseCustomers = () => {
        this.setState({ visible: "browse" });
    }

    handleClickAddCustomer = () => {
        this.setState({ visible: "addform" });
    }

    handleClickHelp = () => {
        this.setState({ visible: "help" });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //controls in browse table.

    //when one clicks edit -> passing values for edit as a [array]
    handleClickEdit = (dataObj, event) => {
        this.setState({
            oneCustomer: dataObj,
            visible: "editform",
            renderChildEdit: true
        });
    }
    //when you click delete -> passing values to states as a string
    handleClickDelete = (oneDelete, companyNameDelete, contactNameDelete, contactTitleDelete, addressDelete, postalCodeDelete, cityDelete, countryDelete, phoneDelete, event) => {
        this.setState({
            CustomerToDelete: oneDelete,
            CompanyNameToDel: companyNameDelete,
            ContactNameToDel: contactNameDelete,
            ContactTitleToDel: contactTitleDelete,
            AddressToDel: addressDelete,
            PostalCodeToDel: postalCodeDelete,
            CityToDel: cityDelete,
            CountryToDel: countryDelete,
            PhoneToDel: phoneDelete,
            visible: "deleteform"
        });
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //fetch data from Northwind
    GetFromNW() {
        let uri = "";
        if (this.state.country !== "")
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/customers/getsome?country=' + this.state.country + '&page=' + this.state.page + '&limit=' + this.state.limit;
        }
        else
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/customers/getsome?offset=' + this.state.page + '&limit=' + this.state.limit;
        }
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ customers: json, cust_recordcount: Object.keys(json).length })
            })
        this.handlePreviousDisable();

        
    }

    //fetch total customers from Northwind
    GetTotalCustomers() {
        let uri2 = 'https://yourwebapi.azurewebsites.net/nw/customers/';
        fetch(uri2)
            .then(response => response.json())
            .then(json => {
                this.setState({ totalcustomers: Object.keys(json).length })
            })


    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    //delete data from northwind
    NWDelete() {
        let uridel = 'https://yourwebapi.azurewebsites.net/nw/customers/' + this.state.CustomerToDelete;
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

    //////////////////////////////////////////////////////////////////////////////////////////
    //controls under the table

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
        if (this.state.cust_recordcount < 10) {
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

    //when user inputs Country to inputfield
    handleChangeCountry(event) {
        let targetcountry = event.target.value;
        this.setState({ country: targetcountry },
            this.handleSubmit
        );
    }

    handleSubmit(event) {
        this.GetFromNW();
    }

    //****************************************************************************************************************
    //****************************************************************************************************************

    render() {

        let rowCount = "Total rows fetched from Northwind database / Customers: " + this.state.totalcustomers;
        let customerstableJson = [];
        if (this.state.customers.length > 0) {
            for (let index = 0; index < this.state.customers.length; index++) {
                const element = this.state.customers[index];
           
                customerstableJson.push(
                    <tr key={element.customerId}>
                        <td>{element.customerId}</td>
                        <td>{element.companyName}</td>
                        <td>{element.country}</td>
                        <td>{element.phone}</td>
                        <td>
                            <button className="btn_list" onClick={this.handleClickEdit.bind(this, element)}>Edit</button>
                            <button className="btn_list" id="btnModal" onClick={this.handleClickDelete.bind(
                                this,
                                element.customerId,
                                element.companyName,
                                element.contactName,
                                element.contactTitle,
                                element.address,
                                element.postalCode,
                                element.city,
                                element.country,
                                element.phone,
                            )}>Delete</button>
                        </td>
                    </tr>
                );
            }
}
        else {
            rowCount = <div className="loader"></div>
        }

        if (this.state.visible === "browse") {
            return (
                <div className="messageBox">
                <div className="nwdiv">

                    <div className="nw_topcontrols">
                    <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                    <button className="btn_list-lg" onClick={this.handleClickAddCustomer}>Add Customer</button>
                    </div>
                        <h5>{rowCount}</h5>
                        <input type="text" placeholder=" Limit list by country name" title="Get all records with Country" value={this.state.country} onChange={this.handleChangeCountry} />
                        <table id="northwind_customers" className="nwtable">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Company Name</th>
                                    <th>Country</th>
                                    <th>Phone</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                            <tbody>{customerstableJson}</tbody></table>
                        <div id="resultsToShowError" className="resultsToShowError text-danger"></div>
                    <div className="nw_lowercontrols">
                            <button id="previousBtn" className="btn_list-lg" onClick={this.handleJsonPrev}>Previous</button>
                            <button id="nextBtn" className="btn_list-lg" onClick={this.handleJsonNext}>Next</button>
                    </div>

                    </div>

                </div>



            );
        }
        else if (this.state.visible === "addform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                    <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseCustomers}>Browse Customers</button>
                </div>
                    {this.state.renderChildAdd ? < NWCustomerAdd unmountMe={this.handleChildUnmountAdd} /> : null}
                </div>
            );
        }
        else if (this.state.visible === "editform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseCustomers}>Browse Customers</button>
                    </div>
                    {this.state.renderChildEdit ? < NWCustomerEdit customerObj={this.state.oneCustomer} unmountMe={this.handleChildUnmountEdit} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "deleteform") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                <div id="deleteModal" className="delModal">
                            <div className="delModal-content">
                                <span onClick={this.handleClickAddBrowseCustomers} className="close">&times;</span>
                                <p>Are you sure you want to delete customer {this.state.CustomerToDelete}?</p>
                                <table className="nwtable">
                                    <thead>
                                        <tr>
                                            <th>Customer ID</th>
                                            <th>Company Name</th>
                                            <th>Contact Name</th>
                                            <th>Contact Title</th>
                                            <th>Address</th>
                                            <th>Postal Code</th>
                                            <th>City</th>
                                            <th>Country</th>
                                            <th>Phone</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <td>{this.state.CustomerToDelete}</td>
                                        <td>{this.state.CompanyNameToDel}</td>
                                        <td>{this.state.ContactNameToDel}</td>
                                        <td>{this.state.ContactTitleToDel}</td>
                                        <td>{this.state.AddressToDel}</td>
                                        <td>{this.state.PostalCodeToDel}</td>
                                        <td>{this.state.CityToDel}</td>
                                        <td>{this.state.CountryToDel}</td>
                                        <td>{this.state.PhoneToDel}</td>
                                    </tbody>
                                </table>
                                <br />
                                <div>
                                    <button className="btn_list-lg" onClick={this.handleChildUnmountDelete}>Confirm delete</button>
                                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseCustomers}>Back</button>
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
                    <button className="btn_list-lg" onClick={this.handleClickAddCustomer}>Add Customer</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseCustomers}>Browse Customers</button>
                    </div>

                    <Helpme mod="NWCustomerFetch" />

                </div>
            );
        }
        else {
            return (
                <div className="nw_topcontrols">
                    <h5>Something went wrong...Please try to load this page again.</h5>
                </div>
            );
        }

    }
}

export default DataFetchNWCustomers;