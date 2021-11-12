import React, { Component } from 'react';
import '../../App.css';

class NWProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = {
            ProductId: 0, ProductName: "", SupplierId: 0, CategoryId: 0, QuantityPerUnit: "", UnitPrice: 0, UnitsInStock: 0, UnitsOnOrder: "", ReorderLevel: 0, Discontinued: false, ImageLink: "",
            categories: [], suppliers: [],
        };


        this.handleChangeProductId = this.handleChangeProductId.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
        this.handleChangeCategoryDropDown = this.handleChangeCategoryDropDown.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleChangeImageLink = this.handleChangeImageLink.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //input fields handling
    handleChangeProductId(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ProductId: userInput });
    }
    handleChangeProductName(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ProductName: userInput });
    }
    handleChangeSupplier(e) {
        if (e.target.value === "Select a shipper") {
            this.setState({ SupplierId: "" },
            );
        }
        let targetcat = e.target.value;
        this.setState({ SupplierId: targetcat },
        );
    }
    //Category dropdown list handling
    handleChangeCategoryDropDown(event) {
        if (event.target.value === "Select a category") {
            this.setState({ CategoryId: "" },
            );
        }
        let targetcat = event.target.value;
        this.setState({ CategoryId: targetcat },
        );
    }
    handleChangeQuantityPerUnit(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, QuantityPerUnit: userInput });
    }
    handleChangeUnitPrice(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, UnitPrice: userInput });
    }
    handleChangeUnitsInStock(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, UnitsInStock: userInput });
    }
    handleChangeUnitsOnOrder(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, UnitsOnOrder: userInput });
    }
    handleChangeReorderLevel(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ReorderLevel: userInput });
    }
    //sliding box for yes/no
    handleChangeDiscontinued(e) {
        if (document.getElementById("checkDis").checked === true) {
            this.setState({ ...this.setState, Discontinued: true });
        }
        else if (document.getElementById("checkDis").checked === false) {
            this.setState({ ...this.setState, Discontinued: false });
        }

    }
    handleChangeImageLink(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, ImageLink: userInput });
    }


    //handleSubmit
    handleSubmit(event) {
        event.preventDefault();
        this.InsertToDB();
    }





    componentDidMount() {
        //get categories for dropdown
        fetch("https://yourwebapi.azurewebsites.netnw/products/getcat")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    categories: [{ value: '', display: 'Select a category' }].concat(data)
                });
            }).catch(error => {
                console.log(error);
            });
        //get suppliers for dropdown
        fetch("https://yourwebapi.azurewebsites.net/nw/products/getsupplier")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    suppliers: [{ value: '', display: 'Select a shipper' }].concat(data)
                });
            }).catch(error => {
                console.log(error);
            });
    }

    InsertToDB() {
        const product =
        {
            ProductID: this.state.ProductId,
            ProductName: this.state.ProductName,
            SupplierID: parseInt(this.state.SupplierId),
            CategoryID: parseInt(this.state.CategoryId),
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: parseFloat(this.state.UnitPrice),
            UnitsInStock: parseInt(this.state.UnitsInStock),
            UnitsOnOrder: parseInt(this.state.UnitsOnOrder),
            ReorderLevel: parseInt(this.state.ReorderLevel),
            Discontinued: this.state.Discontinued,
            ImageLink: this.state.ImageLink,
            RPAproc: "",

        };

        //let's convert our variable before sending it to API
        const prodaddJson = JSON.stringify(product);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/products/";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodaddJson
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
            <div className="NWProductsAdd">

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    {/*}
                    <label htmlFor="productID" className="inputLabel-sm">Product ID</label>
                    */}
                    <input name="productID" type="text" className="nw_input" title="Enter product name" onChange={this.handleChangeProductId} hidden/>
                    <label htmlFor="ProductName" className="inputLabel-sm">Product Name</label>
                    <input name="ProductName" type="text" className="nw_input" title="Enter product name" onChange={this.handleChangeProductName} required/>
                    <label htmlFor="Supplier" className="inputLabel-sm">Supplier</label>

                    <div id="cat-dropdown" className="selectdiv">
                        <select value={this.state.SupplierId} id="categorylist" onChange={this.handleChangeSupplier}>
                            {this.state.suppliers.map((supp) => <option key={supp.value} value={supp.supplierId}>{supp.companyName}{supp.display}</option>)}
                        </select>
                    </div>


                    {/*
                    <input name="Supplier" type="text" className="nw_input" title="Enter supplier" onChange={this.handleChangeSupplierId} />
                    */}
                    <label htmlFor="Category" className="inputLabel-sm">Category</label>
                    {/*
                    <input name="Category" type="text" className="nw_input" title="Enter category" onChange={this.handleChangeCategoryId} /> 
                    */}

                    <div id="cat-dropdown" className="selectdiv">
                        <select value={this.state.CategoryId} id="categorylist" onChange={this.handleChangeCategoryDropDown}>
                            {this.state.categories.map((catg) => <option key={catg.value} value={catg.categoryId}>{catg.categoryName}{catg.display}</option>)}
                        </select>
                    </div>


                    <label htmlFor="QuantityPerUnit" className="inputLabel-sm">Quantity Per Unit</label>
                    <input name="QuantityPerUnit" type="text" className="nw_input" title="Enter quantity per unit" onChange={this.handleChangeQuantityPerUnit} required />
                    <label htmlFor="UnitPrice" className="inputLabel-sm">Unit Price</label>
                    <input name="UnitPrice" type="text" className="nw_input" title="Enter unit price" onChange={this.handleChangeUnitPrice} required />
                    <label htmlFor="UnitsInStock" className="inputLabel-sm">UnitsInStock</label>
                    <input name="UnitsInStock" type="text" className="nw_input" title="Enter units in stock" onChange={this.handleChangeUnitsInStock} required />
                    <label htmlFor="UnitsOnOrder" className="inputLabel-sm">Units On Order</label>
                    <input name="UnitsOnOrder" type="text" className="nw_input" title="Enter units on order" onChange={this.handleChangeUnitsOnOrder} required />
                    <label htmlFor="Reorder" className="inputLabel-sm">Reorder Level</label>
                    <input name="Reorder" type="text" className="nw_input" title="Enter reorder level" onChange={this.handleChangeReorderLevel} required />

                    <label htmlFor="Discontinued" className="inputLabel-sm">Discontinued</label>
                    <label className="switch">
                        <input id="checkDis" type="checkbox" onChange={this.handleChangeDiscontinued} />
                        <span className="slider round"></span>
                    </label>

                    <label htmlFor="ImageLink" className="inputLabel-sm">Image Link</label>
                    <input name="ImageLink" type="text" className="nw_input" title="Enter Image LInk" onChange={this.handleChangeImageLink} />
                        <br />
                        <button className="btn_list-lg" type="submit">Save changes</button>

                    </form>

            </div>
        );
    }

}

export default NWProductAdd;