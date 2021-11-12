import React, { Component } from 'react';
import '../../App.css';

class NWCustomerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = { CustomerID: "", CompanyName: "", ContactName: "", ContactTitle: "", PostalCode: "", City: "", Country: "", Address: "", Phone: "" };
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleIsItLetters = this.handleIsItLetters.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //input fields handling
    handleChangeCustomerID(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, CustomerID: userInput.toUpperCase() });
    }
    //input should be letters only, this is how we handle it
    handleIsItLetters(e) {
        let value = e.target.value

        value = value.replace(/[^A-Za-z]/ig, '')

        this.setState({
            value,
        })
    }
    handleChangeCompanyName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, CompanyName: userInput });
    }
    handleChangeContactName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ContactName: userInput });
    }
    handleChangeContactTitle(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ContactTitle: userInput });
    }
    handleChangePostalCode(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, PostalCode: userInput });
    }
    handleChangeCity(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, City: userInput });
    }
    handleChangeCountry(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Country: userInput });
    }
    handleChangeAddress(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Address: userInput });
    }
    handleChangePhone(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Phone: userInput });
    }

    //handleSubmit
    handleSubmit(event) {
        event.preventDefault();
        this.InsertToDB();
    }

    InsertToDB() {
        const customer =
        {
            CustomerID: this.state.CustomerID,
            CompanyName: this.state.CompanyName,
            ContactName: this.state.ContactName,
            ContactTitle: this.state.ContactTitle,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country,
            Address: this.state.Address,
            Phone: this.state.Phone
        };

        //let's convert our variable before sending it to API
        const customerJson = JSON.stringify(customer);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/customers/";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: customerJson
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
            <div className="NWCustomerAdd">

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <input type="text" className="nw_input" title="Enter customer ID" placeholder="Customer ID (*Only 5 letters allowed)" maxLength="5" value={this.state.value} onChange={e => { this.handleChangeCustomerID(e); this.handleIsItLetters(e) }} required />
                    <input type="text" className="nw_input" title="Enter customer Company Name" placeholder="Company Name" onChange={this.handleChangeCompanyName} required/>
                    <input type="text" className="nw_input" title="Enter customer Contact Name" placeholder="Contact Name" onChange={this.handleChangeContactName} required/>
                    <input type="text" className="nw_input" title="Enter customer Contact Title" placeholder="Contact Title" onChange={this.handleChangeContactTitle} />
                    <input type="text" className="nw_input" title="Enter customer Address" placeholder="Address" onChange={this.handleChangeAddress} />
                    <input type="text" className="nw_input" title="Enter customer Postal Code" placeholder="Postal Code" onChange={this.handleChangePostalCode} />
                    <input type="text" className="nw_input" title="Enter customer City" placeholder="City" onChange={this.handleChangeCity} />
                    <input type="text" className="nw_input" title="Enter customer Country" placeholder="Country" onChange={this.handleChangeCountry} />
                    <input type="text" className="nw_input" title="Enter customer Phone" placeholder="Phone" onChange={this.handleChangePhone} required />
                    <br />
                        <button className="btn_list-lg" type="submit">Add new customer</button>

                    </form>

            </div>
        );
    }

}

export default NWCustomerAdd;