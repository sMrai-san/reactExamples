import React, { Component } from 'react';
import '../../App.css';

class NWCustomerEdit extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = {customerObj: [], CustomerID: "", CompanyName: "", ContactName: "", ContactTitle: "", PostalCode: 0, City: "", Country: "", Address: "", Phone: "" };
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
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

    //getting data for inputfield defaults from DataFetchNW
    componentDidMount() {
        this.setState({
            CustomerID: this.props.customerObj.customerId,
            CompanyName: this.props.customerObj.companyName,
            ContactName: this.props.customerObj.contactName,
            ContactTitle: this.props.customerObj.contactTitle,
            Address: this.props.customerObj.address,
            PostalCode: this.props.customerObj.postalCode,
            City: this.props.customerObj.city,
            Country: this.props.customerObj.country,
            Phone: this.props.customerObj.phone,
        });
    }

    //input fields handling
    handleChangeCustomerID(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, CustomerID: userInput.toUpperCase() });
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
        this.PutToDB();
    }

    PutToDB() {
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

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/customers/" + this.state.CustomerID;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: customerJson
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
            <div className="NWCustomerEdit">

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <label htmlFor="CustomerID" className="inputLabel-sm">Customer ID</label>
                    <div name="CustomerID">{this.state.CustomerID}</div>
                    <label htmlFor="CompanyName" className="inputLabel-sm">Company Name</label>
                    <input name="CompanyName" type="text" className="nw_input" value={this.state.CompanyName} title="Enter customer Company Name" onChange={this.handleChangeCompanyName} required />
                    <label htmlFor="ContactName" className="inputLabel-sm">Contact Name</label>
                    <input name="ContactName" type="text" className="nw_input" value={this.state.ContactName} title="Enter customer Contact Name" onChange={this.handleChangeContactName} required />
                    <label htmlFor="ContactTitle" className="inputLabel-sm">Contact Title</label>
                    <input name="ContactTitle" type="text" className="nw_input" value={this.state.ContactTitle} title="Enter customer Contact Title" onChange={this.handleChangeContactTitle} />
                    <label htmlFor="Address" className="inputLabel-sm">Address</label>
                    <input name="Address" type="text" className="nw_input" value={this.state.Address} title="Enter customer Address" onChange={this.handleChangeAddress} />
                    <label htmlFor="PostalCode" className="inputLabel-sm">Postal Code</label>
                    <input name="PostalCode" type="text" className="nw_input" value={this.state.PostalCode} title="Enter customer Postal Code" onChange={this.handleChangePostalCode} />
                    <label htmlFor="City" className="inputLabel-sm">City</label>
                    <input name="City" type="text" className="nw_input" value={this.state.City} title="Enter customer City" onChange={this.handleChangeCity} />
                    <label htmlFor="Country" className="inputLabel-sm">Country</label>
                    <input name="Country" type="text" className="nw_input" value={this.state.Country} title="Enter customer Country" onChange={this.handleChangeCountry} />
                    <label htmlFor="Phone" className="inputLabel-sm">Phone number</label>
                    <input name="Phone" type="text" className="nw_input" value={this.state.Phone} title="Enter customer Phone" onChange={this.handleChangePhone} required />
                        <br />
                        <button className="btn_list-lg" type="submit">Save changes</button>

                    </form>

            </div>
        );
    }

}

export default NWCustomerEdit;