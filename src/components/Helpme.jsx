import React, { Component } from 'react';
import '../App.css';

class Helpme extends Component {

    render() {

        if (this.props.mod === "Messages") {
            return (
                <div className="messageBox">
                    <p>Messages.</p>
                </div>
            );
    }
    else if (this.props.mod === "AnalogWatch") {
    return (
        <div className="messageBox">
            <p>Analog watch.</p>
        </div>
            );
        }
        else if (this.props.mod === "messageHide") {
            return (
                    <p></p>
            );
        }
        else if (this.props.mod === "NWLoginHelp") {
            return (
                <div className="messageBox">
                    <p>This is a help for Northwind database Login -table.</p>
                    <p>You can Add or Browse logins from the controls above.</p>
                </div>
            );
        }
        else if (this.props.mod === "NWCustomerFetch") {
            return (
                <div className="messageBox">
                    <p>This is a help for Northwind database Customers -table.</p>
                    <p>You can Add or Browse customers from the controls above.</p>
                </div>
            );
        }
        else if (this.props.mod === "NWEmployeesFetch") {
            return (
                <div className="messageBox">
                    <p>This is a help for Northwind database Employees -table.</p>
                    <p>You can Add or Browse employees from the controls above.</p>
                </div>
            );
        }
        else if (this.props.mod === "NWProductsFetch") {
            return (
                <div className="messageBox">
                    <p>This is a help for Northwind database Products -table.</p>
                    <p>You can Add or Browse products from the controls above.</p>
                </div>
            );
        }
        else if (this.props.mod === "NWProductsFetchAdd") {
            return (
                <div className="messageBox">
                    <p>Here you can add a product to your Products -table.</p>
                    <p>You can Add or Browse products from the controls above.</p>
                </div>
            );
        }
        else if (this.props.mod === "NWProductsFetchEdit") {
            return (
                <div className="messageBox">
                    <p>Here you can edit your product from the Products -table.</p>
                    <p>You can Add or Browse products from the controls above.</p>
                </div>
            );
        }
else {
    return (
        <div className="messageBox">
            <p>Help not found.</p>
        </div>
    );
}

    }

}

export default Helpme;
