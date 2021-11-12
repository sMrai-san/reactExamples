import React, { Component } from 'react';
import Request from 'react-http-request';
import '../App.css';

class MD5pwd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phrase: "pwd",
        }
    }


    render() {
        let url = "http://md5.jsontest.com/?text=" + this.state.phrase; //gets md5 hash from jsontest.com
        return (
            <div>
                <div className="messageBox">
                    <div>
                        <h3>md5.jsontest.com</h3>
                        <input id="textInputMD5" type="text" onChange={e => {
                            if (document.getElementById('textInputMD5').value !== "") { //if input is not empty show input
                                this.setState({ phrase: e.target.value });
                            }
                            else {
                                this.setState({ phrase: 'pwd' }); //if input is empty show default text
                            }
                        }
                        }

                        />
                    </div>
                    <Request url={url} method="get" accept="Application/json" verbose={false}>
                        {
                            ({ error, result, loading }) => {
                                if (loading) {
                                    return <div className="loader"></div>;
                                } else if (error) {
                                    return <div><p>Error occurred, please try loading the page again. </p><p>If error occurs again please check that <b><a className="linked" href="http://md5.jsontest.com/?text=%5Btext">https://www.jsontest.com/#md5</a></b> is responding.</p></div>
                                }
                                else {
                                    return <div><p>This is a pwd hash for input: <span style={{ fontSize: '20px' }}>{this.state.phrase}</span><br /> {result.body.md5} <br /> from md5.jsontest.com</p></div>;
                                }
                            }
                        }
                    </Request>
                </div>
            </div>
        );
    }
}

export default MD5pwd;