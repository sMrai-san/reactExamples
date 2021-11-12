import React, { Component } from 'react';
import '../../App.css';

class NWEmployeeEdit extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = {
            employeeObj: [], EmployeeID: 0, LastName: "", FirstName: "", Title: "", Address: "", PostalCode: "", City: "", Country: "", HomePhone: "", TitleOfCourtesy: "", Region: "", Extension: "", ReportsTo: "",
        };
        this.handleChangeEmployeeID = this.handleChangeEmployeeID.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeHomePhone = this.handleChangeHomePhone.bind(this);
        this.handleChangeTitleOfCourtesy = this.handleChangeTitleOfCourtesy.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangeReportsTo = this.handleChangeReportsTo.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //getting data for inputfield defaults from DataFetchNW
    componentDidMount() {
        this.setState({
            EmployeeID: this.props.employeeObj.employeeId,
            FirstName: this.props.employeeObj.firstName,
            LastName: this.props.employeeObj.lastName,
            Title: this.props.employeeObj.title,
            Address: this.props.employeeObj.address,
            City: this.props.employeeObj.city,
            PostalCode: this.props.employeeObj.postalCode,
            Country: this.props.employeeObj.country,
            TitleOfCourtesy: this.props.employeeObj.titleOfCourtesy,
            Region: this.props.employeeObj.region,
            HomePhone: this.props.employeeObj.homePhone,
            ReportsTo: this.props.employeeObj.reportsTo,
        });
    }

    //input fields handling
    handleChangeEmployeeID(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, EmployeeID: userInput });
    }
    handleChangeFirstName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, FirstName: userInput });
    }
    handleChangeLastName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, LastName: userInput });
    }
    handleChangeTitle(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Title: userInput });
    }
    handleChangeTitleOfCourtesy(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, TitleOfCourtesy: userInput });
    }
    handleChangeAddress(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Address: userInput });
    }
    handleChangePostalCode(e) {
    var userInput = e.target.value;
    this.setState({ ...this.setState, PostalCode: userInput });
    }
    handleChangeCity(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, City: userInput });
    }
    handleChangeRegion(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Region: userInput });
    }
    handleChangeCountry(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Country: userInput });
    }
    handleChangeHomePhone(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, HomePhone: userInput });
    }
    handleChangeReportsTo(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ReportsTo: userInput });
    }


    //handleSubmit
    handleSubmit(event) {
            event.preventDefault();
            this.PutToDB();
        }

    PutToDB() {

        const employeeEdit =
        {
            EmployeeID: this.state.EmployeeID,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Title: this.state.Title,
            TitleOfCourtesy: this.state.TitleOfCourtesy,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Region: this.state.Region,
            Country: this.state.Country,
            HomePhone: this.state.HomePhone,
            ReportsTo: this.state.ReportsTo,

        };

        //let's convert our variable before sending it to API
        const loginJson = JSON.stringify(employeeEdit);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/employees/" + this.state.EmployeeID;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: loginJson
        }).then((response) => response.json())
            .then((json) => {
                //store data to variable
                const success = json;
                if (success) {
                    this.dismiss();
                }
            });


    }

    dismiss() {
        this.props.unmountMe();
    }

    render() {
        return (
            <div className="NWEmployeeEdit">
                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <label htmlFor="EmployeeID" className="inputLabel-sm">Employee Id</label>
                    <div name="EmployeeID">{this.state.EmployeeID}</div>
                    <label htmlFor="FirstName" className="inputLabel-sm">First Name</label>
                    <input name="FirstName" type="text" className="nw_input" value={this.state.FirstName} title="Enter first name" onChange={this.handleChangeFirstName} required />
                    <label htmlFor="LastName" className="inputLabel-sm">Last Name</label>
                    <input name="LastName" type="text" className="nw_input" value={this.state.LastName} title="Enter last name" onChange={this.handleChangeLastName} required />
                    <label htmlFor="TitleOfCourtesy" className="inputLabel-sm">Title Of Courtesy</label>
                    <input name="TitleOfCourtesy" type="text" className="nw_input" value={this.state.TitleOfCourtesy} title="Enter title of courtesy" onChange={this.handleChangeTitleOfCourtesy} />
                    <label htmlFor="Title" className="inputLabel-sm">Title</label>
                    <input name="Title" type="text" className="nw_input" value={this.state.Title} title="Enter title" onChange={this.handleChangeTitle} required />
                    <label htmlFor="Address" className="inputLabel-sm">Address</label>
                    <input name="Address" type="text" className="nw_input" value={this.state.Address} title="Enter address" onChange={this.handleChangeAddress} required />
                    <label htmlFor="PostalCode" className="inputLabel-sm">Postal Code</label>
                    <input name="PostalCode" type="text" className="nw_input" value={this.state.PostalCode} title="Enter postal code" onChange={this.handleChangePostalCode} required />
                    <label htmlFor="City" className="inputLabel-sm">City</label>
                    <input name="City" type="text" className="nw_input" value={this.state.City} title="Enter city" onChange={this.handleChangeCity} required />
                    <label htmlFor="Region" className="inputLabel-sm">Region</label>
                    <input name="Region" type="text" className="nw_input" value={this.state.Region} title="Enter region" onChange={this.handleChangeRegion} />
                    <label htmlFor="Phone" className="inputLabel-sm">Phone</label>
                    <input name="Phone" type="text" className="nw_input" value={this.state.HomePhone} title="Enter phone number" onChange={this.handleChangeHomePhone} required />
                    <label htmlFor="ReportsTo" className="inputLabel-sm">Reports to</label>
                    <input name="ReportsTo" type="text" className="nw_input" value={this.state.ReportsTo} title="Enter supervisor" onChange={this.handleChangeReportsTo} />
                        <br />
                        <button className="btn_list-lg" type="submit">Save changes</button>

                    </form>

            </div>
        );
    }

}

export default NWEmployeeEdit;