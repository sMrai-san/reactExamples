import React, { Component } from 'react';
import '../../App.css';

class NWLoginAdd extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = { UserName: "", PassWord: "", FirstName: "", SurName: "", Email: "", AccesLevelID: "", PassWordAgain: "", Error: "",};
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassWord = this.handleChangePassWord.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeSurName = this.handleChangeSurName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAccesLevelAdmin = this.handleChangeAccesLevelAdmin.bind(this);
        this.handleChangeAccesLevelSuperuser = this.handleChangeAccesLevelSuperuser.bind(this);
        this.handleChangeAccesLevelUser = this.handleChangeAccesLevelUser.bind(this);
        this.handleChangePassWordAgain = this.handleChangePassWordAgain.bind(this);
        this.onFocusOutEmail = this.onFocusOutEmail.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //input fields handling
    handleChangeUserName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, UserName: userInput });
    }
    handleChangePassWord(e) {
        var userInput = e.target.value;
        //pwdhashing
        let md5url = "http://md5.jsontest.com/?text=" + userInput; //gets md5 hash from jsontest.com
        fetch(md5url)
            .then((response) => response.json())
            .then((data) => {
                let hashedPwd = data.md5;
                this.setState({ ...this.setState, PassWord: hashedPwd });
            });
    }
    handleChangePassWordAgain(e) {
        var userInput = e.target.value;
        //pwdhashing
        let md5url = "http://md5.jsontest.com/?text=" + userInput; //gets md5 hash from jsontest.com
        fetch(md5url)
            .then((response) => response.json())
            .then((data) => {
                let hashedPwd = data.md5;
                this.setState({ ...this.setState, PassWordAgain: hashedPwd });
            });
    }
    handleChangeFirstName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, FirstName: userInput });
    }
    handleChangeSurName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, SurName: userInput });
    }
    handleChangeEmail(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, Email: userInput });

    }
    //Checking if email is valid onFocusOut===onBlur
    onFocusOutEmail(e) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (document.getElementById("emailadd").value.match(mailformat)) {
            this.setState({ ...this.setState, Error: "" })
        }
        else if (document.getElementById("emailadd").value === "") {
            this.setState({ ...this.setState, Error: "" })
        }
        else {
            this.setState({ ...this.setState, Error: "Please insert a valid email-address" })
        }
    }

    handleChangeAccesLevelAdmin(e) {
        var userInput = 1;
        this.setState({ ...this.setState, AccesLevelID: userInput });
        document.getElementById("accessLevel").value = "Admin";
        document.getElementById("ac-lvl").style.display = "none";
    }
    handleChangeAccesLevelSuperuser(e) {
        var userInput = 2;
        this.setState({ ...this.setState, AccesLevelID: userInput });
        document.getElementById("accessLevel").value = "Superuser";
        document.getElementById("ac-lvl").style.display = "none";
    }
    handleChangeAccesLevelUser(e) {
        var userInput = 3;
        this.setState({ ...this.setState, AccesLevelID: userInput });
        document.getElementById("accessLevel").value = "User";
        document.getElementById("ac-lvl").style.display = "none";
    }


    //handleSubmit
    handleSubmit(event) {
        if (this.state.PassWord === this.state.PassWordAgain) {
            event.preventDefault();
            this.setState({ Error: "" })
            this.InsertToDB();
        }
        else {
            event.preventDefault();
            this.setState({ Error: "Password mismatch! Please type in passwords again." })
        }
    }
     

    InsertToDB() {
       
        const login =
        {
            UserName: this.state.UserName,
            PassWord: this.state.PassWord,
            FirstName: this.state.FirstName,
            SurName: this.state.SurName,
            Email: this.state.Email,
            AccesLevelID: this.state.AccesLevelID
        };

        //let's convert our variable before sending it to API
        const loginJson = JSON.stringify(login);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/logins";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: loginJson
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

    //if you want to choose AccessLevel again -> button enables dropdown list again
    letHover = () => {
        document.getElementById("ac-lvl").style.display = "block";
    }

    render() {
        return (
            <div className="NWLoginAdd">
                <div><p id="errors" className="text-danger">{this.state.Error}</p></div>

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <input type="text" className="nw_input" title="Enter username" placeholder="Username" onChange={this.handleChangeUserName} required/>
                    <input type="password" className="nw_input" title="Enter password" placeholder="Password" onChange={this.handleChangePassWord} required/>
                    <input type="password" className="nw_input" title="Enter password again" placeholder="Re-type password" onChange={this.handleChangePassWordAgain} required/>
                    <input type="text" className="nw_input" title="Enter firstname" placeholder="First Name" onChange={this.handleChangeFirstName} required/>
                    <input type="text" className="nw_input" title="Enter lastname" placeholder="Last Name" onChange={this.handleChangeSurName} required />
                    <input type="text" className="nw_input" title="Enter email" placeholder="Email" onChange={this.handleChangeEmail} id="emailadd" onBlur={this.onFocusOutEmail} required />
                    <input type="text" id="accessLevel" className="nw_input" placeholder="Access Level" disabled />
                    <div className="ac_dropdown">
                        <button type="button" className="ac_dropbtn" onClick={this.letHover}>Choose access level</button>
                        <div id="ac-lvl" className="ac_dropdown-content">
                            <button type="button" className="ac_dropdown-btn" id="admin" onClick={this.handleChangeAccesLevelAdmin}>1. Admin</button>
                            <button type="button" className="ac_dropdown-btn" id="superuser" onClick={this.handleChangeAccesLevelSuperuser}>2. Superuser</button>
                            <button type="button" className="ac_dropdown-btn" id="user" onClick={this.handleChangeAccesLevelUser}>3. User</button>
                        </div>
                    </div>

                    <br />
                        <button className="btn_list-lg" type="submit">Add new login</button>

                    </form>

            </div>
        );
    }

}

export default NWLoginAdd;