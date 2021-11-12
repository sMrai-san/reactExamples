import React, { Component } from 'react';
import '../../App.css';

class NWLoginEdit extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = { loginObj: [], LoginID: 0, UserName: "", Password: "", PasswordAgain: "", FirstName: "", LastName: "", Email: "", AccessLevel: "", AccesLevelString: "", };
        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordAgain = this.handleChangePasswordAgain.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAccessLevel = this.handleChangeAccessLevel.bind(this);
        this.handleChangeAccesLevelAdmin = this.handleChangeAccesLevelAdmin.bind(this);
        this.handleChangeAccesLevelSuperuser = this.handleChangeAccesLevelSuperuser.bind(this);
        this.handleChangeAccesLevelUser = this.handleChangeAccesLevelUser.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //getting data for inputfield defaults from DataFetchNW
    componentDidMount() {
        this.setState({
            LoginID: this.props.loginObj.loginId,
            UserName: this.props.loginObj.userName,
            Password: this.props.loginObj.passWord,
            FirstName: this.props.loginObj.firstName,
            LastName: this.props.loginObj.surName,
            Email: this.props.loginObj.email,
            AccessLevel: this.props.loginObj.accesLevelID,
        });
        this.GetAccesLevelName();
    }

    //Let's show AccessLevels with string, not with int
    GetAccesLevelName() {
        if (this.props.loginObj.accesLevelID === 1) {
            this.setState({
                AccesLevelString: "Admin",
            });
        }
        else if (this.props.loginObj.accesLevelID === 2) {
            this.setState({
                AccesLevelString: "Superuser",
            });
        }
        else if (this.props.loginObj.accesLevelID === 3) {
            this.setState({
                AccesLevelString: "User",
            });
        }
    }

    //input fields handling
    handleChangeLoginID(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, LoginID: userInput });
    }
    handleChangeUserName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, UserName: userInput });
    }
    handleChangePassword(e) {
        var userInput = e.target.value;
        //pwdhashing
        let md5url = "http://md5.jsontest.com/?text=" + userInput; //gets md5 hash from jsontest.com
            fetch(md5url)
                .then((response) => response.json())
                .then((data) => {
                    let hashedPwd1 = data.md5;
                    this.setState({ ...this.setState, Password: hashedPwd1 });
                });

    }
    handleChangePasswordAgain(e) {
        var userInput = e.target.value;
        //pwdhashing
        let md5url = "http://md5.jsontest.com/?text=" + userInput; //gets md5 hash from jsontest.com
            fetch(md5url)
                .then((response) => response.json())
                .then((data) => {
                    let hashedPwd2 = data.md5;
                    this.setState({ ...this.setState, PasswordAgain: hashedPwd2 });
                });

    }
    handleChangeFirstName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, FirstName: userInput });
    }
    handleChangeLastName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, LastName: userInput });
    }
    handleChangeEmail(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Email: userInput });
    }
    handleChangeAccessLevel(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, AccessLevel: userInput });
    }

    handleChangeAccesLevelAdmin(e) {
        var userInput = 1;
        this.setState({ ...this.setState, AccessLevel: userInput });
        document.getElementById("accessLevel").value = "Admin";
        document.getElementById("ac-lvl").style.display = "none";
    }
    handleChangeAccesLevelSuperuser(e) {
        var userInput = 2;
        this.setState({ ...this.setState, AccessLevel: userInput });
        document.getElementById("accessLevel").value = "Superuser";
        document.getElementById("ac-lvl").style.display = "none";
    }
    handleChangeAccesLevelUser(e) {
        var userInput = 3;
        this.setState({ ...this.setState, AccessLevel: userInput });
        document.getElementById("accessLevel").value = "User";
        document.getElementById("ac-lvl").style.display = "none";
    }


    //handleSubmit
    handleSubmit(event) {
        if (this.state.Password === this.state.PasswordAgain) {
            event.preventDefault();
            this.PutToDB();
        }
        else {
            event.preventDefault();
            this.setState({ Error: "Password mismatch! Please type in passwords again." })
        }
    }

    PutToDB() {

        const login =
        {
            LoginID: this.state.LoginID,
            UserName: this.state.UserName,
            PassWord: this.state.Password,
            FirstName: this.state.FirstName,
            SurName: this.state.LastName,
            Email: this.state.Email,
            AccesLevelID: this.state.AccessLevel,
        };

        //let's convert our variable before sending it to API
        const loginJson = JSON.stringify(login);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/logins/" + this.state.LoginID;
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

    //if you want to choose AccessLevel again -> button enables dropdown list again
    letHover = () => {
        document.getElementById("ac-lvl").style.display = "block";
    }

    render() {
        return (
            <div className="NWLoginEdit">
                <div><p id="errors" className="text-danger">{this.state.Error}</p></div>

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <label htmlFor="LoginID" className="inputLabel-sm">Login ID</label>
                    <div name="LoginID">{this.state.LoginID}</div>
                    <label htmlFor="UserName" className="inputLabel-sm">Username</label>
                    <input name="UserName" type="text" className="nw_input" value={this.state.UserName} title="Enter username" onChange={this.handleChangeUserName} required />
                    <label htmlFor="Password" className="inputLabel-sm">Password</label>
                    <input name="Password" type="password" className="nw_input" title="Enter password" onChange={this.handleChangePassword} required />
                    <label htmlFor="Passworda" className="inputLabel-sm">Password again</label>
                    <input name="Passworda" type="password" className="nw_input" title="Enter password" onChange={this.handleChangePasswordAgain} required />
                    <label htmlFor="FirstName" className="inputLabel-sm">First Name</label>
                    <input name="FirstName" type="text" className="nw_input" value={this.state.FirstName} title="Enter first name" onChange={this.handleChangeFirstName} required />
                    <label htmlFor="LastName" className="inputLabel-sm">Last Name</label>
                    <input name="LastName" type="text" className="nw_input" value={this.state.LastName} title="Enter last name" onChange={this.handleChangeLastName} required/>
                    <label htmlFor="Email" className="inputLabel-sm">Email</label>
                    <input name="Email" type="text" className="nw_input" value={this.state.Email} title="Enter email" onChange={this.handleChangeEmail} required/>
                    <label htmlFor="Access" className="inputLabel-sm">Access Level</label>
                    <input type="text" id="accessLevel" className="nw_input" placeholder={this.state.AccesLevelString} disabled />
                    <div className="ac_dropdown">
                        <button type="button" className="ac_dropbtn" onClick={this.letHover}>Choose access level</button>
                        <div id="ac-lvl" className="ac_dropdown-content">
                            <button type="button" className="ac_dropdown-btn" id="admin" onClick={this.handleChangeAccesLevelAdmin}>1. Admin</button>
                            <button type="button" className="ac_dropdown-btn" id="superuser" onClick={this.handleChangeAccesLevelSuperuser}>2. Superuser</button>
                            <button type="button" className="ac_dropdown-btn" id="user" onClick={this.handleChangeAccesLevelUser}>3. User</button>
                        </div>
                    </div>
                    {/*<input name="Access" type="text" className="nw_input" value={this.state.AccessLevel} title="Enter access level" onChange={this.handleChangeAccessLevel} id="accessLevel" required/>
                    <div className="ac_dropdown">
                        <button type="button" className="ac_dropbtn" onClick={this.letHover}>Choose access level</button>
                        <div id="ac-lvl" className="ac_dropdown-content">
                            <button type="button" className="ac_dropdown-btn" id="admin" onClick={this.handleChangeAccesLevelAdmin}>1. Admin</button>
                            <button type="button" className="ac_dropdown-btn" id="superuser" onClick={this.handleChangeAccesLevelSuperuser}>2. Superuser</button>
                            <button type="button" className="ac_dropdown-btn" id="user" onClick={this.handleChangeAccesLevelUser}>3. User</button>
                        </div>
                    </div>*/}
                        <br />
                        <button className="btn_list-lg" type="submit">Save changes</button>

                    </form>

            </div>
        );
    }

}

export default NWLoginEdit;