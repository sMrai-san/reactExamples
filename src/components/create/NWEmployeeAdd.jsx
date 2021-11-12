import React, { Component } from 'react';
import '../../App.css';

class NWEmployeeAdd extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = { EmployeeID: 0, LastName: "", FirstName: "", Title: "", Address: "", City: "", PostalCode: 0, Country: "", HomePhone: ""};
        this.handleChangeEmployeeID = this.handleChangeEmployeeID.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeHomePhone = this.handleChangeHomePhone.bind(this);
        this.handleChangeTitleOfCourtesy = this.handleChangeTitleOfCourtesy.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangeReportsTo = this.handleChangeReportsTo.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //input fields handling
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
        this.InsertToDB();
    }

    InsertToDB() {
        const employee =
        {
            EmployeeID: this.state.EmployeeID,
            LastName: this.state.LastName,
            FirstName: this.state.FirstName,
            Title: this.state.Title,
            Address: this.state.Address,
            City: this.state.City,
            PostalCode: this.state.PostalCode,
            Country: this.state.Country,
            HomePhone: this.state.HomePhone,
        };

        //let's convert our variable before sending it to API
        const employeeJson = JSON.stringify(employee);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/employees/";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: employeeJson
        }).then((response) => response.json())
            .then((json) => {
                //store data
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
            <div className="NWEmployeeAdd">

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <input type="text" className="nw_input" title="Enter employee first name" placeholder="First Name" onChange={this.handleChangeFirstName} required />
                    <input type="text" className="nw_input" title="Enter employee last name" placeholder="Last Name" onChange={this.handleChangeLastName} required />
                    <input type="text" className="nw_input" title="Enter employee title" placeholder="Title" onChange={this.handleChangeTitle} />
                    <input type="text" className="nw_input" title="Enter employee address" placeholder="Address" onChange={this.handleChangeAddress} />
                    <input type="text" className="nw_input" title="Enter employee postal code" placeholder="Postal Code" onChange={this.handleChangePostalCode} />
                    <input type="text" className="nw_input" title="Enter employee city" placeholder="City" onChange={this.handleChangeCity} />
                    <input type="text" className="nw_input" title="Enter employee region" placeholder="Region" onChange={this.handleChangeRegion} />
                    <input type="text" className="nw_input" title="Enter employee country" placeholder="Country" onChange={this.handleChangeCountry} />
                    <input type="text" className="nw_input" title="Enter employee home phone" placeholder="Home Phone" onChange={this.handleChangeHomePhone} />
                    <input type="text" className="nw_input" title="Enter employee supervisor" placeholder="Supervisor" onChange={this.ReportsTo} />
                    <br />
                        <button className="btn_list-lg" type="submit">Add new employee</button>

                    </form>

            </div>
        );
    }

}

export default NWEmployeeAdd;