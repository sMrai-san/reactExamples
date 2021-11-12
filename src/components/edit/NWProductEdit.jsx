import React, { Component } from 'react';
import '../../App.css';

class NWProductEdit extends Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };
        this.state = {productObj: [], ProductId: 0, ProductName: "", SupplierId: 0, CategoryId: 0, QuantityPerUnit: "", UnitPrice: 0, UnitsInStock: 0, UnitsOnOrder: "", ReorderLevel: 0, Discontinued: "", ImageLink: "" };
        this.handleChangeProductId = this.handleChangeProductId.bind(this);
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierId = this.handleChangeSupplierId.bind(this);
        this.handleChangeCategoryId = this.handleChangeCategoryId.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);
        this.handleChangeImageLink = this.handleChangeImageLink.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //getting data for inputfield defaults from DataFetchNW
    componentDidMount() {
        this.setState({
            ProductId: this.props.productObj.productId,
            ProductName: this.props.productObj.productName,
            SupplierId: this.props.productObj.supplierId,
            CategoryId: this.props.productObj.categoryId,
            QuantityPerUnit: this.props.productObj.quantityPerUnit,
            UnitPrice: this.props.productObj.unitPrice,
            UnitsInStock: this.props.productObj.unitsInStock,
            UnitsOnOrder: this.props.productObj.unitsOnOrder,
            ReorderLevel: this.props.productObj.reorderLevel,
            Discontinued: this.props.productObj.discontinued,
            ImageLink: this.props.productObj.imageLink,
        });
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
    handleChangeSupplierId(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, SupplierId: userInput });
    }
    handleChangeCategoryId(e) {
        var userInput = e.target.value;
        this.setState({ ...this.setState, CategoryId: userInput });
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
        this.PutToDB();
    }

    PutToDB() {
        const product =
        {
            ProductID: this.state.ProductId,
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierId,
            CategoryID: this.state.CategoryId,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.state.Discontinued,
            ImageLink: this.state.ImageLink,

        };

        //let's convert our variable before sending it to API
        const prodeditJson = JSON.stringify(product);

        const apiUrl = "https://yourwebapi.azurewebsites.net/nw/products/" + this.state.ProductId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodeditJson
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
            <div className="NWProductsEdit">

                <form className="nwdiv nwAddEdit_height" onSubmit={this.handleSubmit}>
                    <label htmlFor="productID" className="inputLabel-sm">Product ID</label>
                    <div name="productID">{this.state.ProductId}</div>
                    <label htmlFor="ProductName" className="inputLabel-sm">Product Name</label>
                    <input name="ProductName" type="text" className="nw_input" value={this.state.ProductName} title="Enter product name" onChange={this.handleChangeProductName} />
                    <label htmlFor="ContactName" className="inputLabel-sm">Supplier</label>
                    <input name="ContactName" type="text" className="nw_input" value={this.state.SupplierId} title="Enter supplier" onChange={this.handleChangeSupplierId} />
                    <label htmlFor="ContactTitle" className="inputLabel-sm">Category</label>
                    <input name="ContactTitle" type="text" className="nw_input" value={this.state.CategoryId} title="Enter category" onChange={this.handleChangeCategoryId} />
                    <label htmlFor="Address" className="inputLabel-sm">Quantity Per Unit</label>
                    <input name="Address" type="text" className="nw_input" value={this.state.QuantityPerUnit} title="Enter quantity per unit" onChange={this.handleChangeQuantityPerUnit} />
                    <label htmlFor="PostalCode" className="inputLabel-sm">Unit Price</label>
                    <input name="PostalCode" type="text" className="nw_input" value={this.state.UnitPrice} title="Enter unit price" onChange={this.handleChangeUnitPrice} />
                    <label htmlFor="City" className="inputLabel-sm">UnitsInStock</label>
                    <input name="City" type="text" className="nw_input" value={this.state.UnitsInStock} title="Enter units in stock" onChange={this.handleChangeUnitsInStock} />
                    <label htmlFor="Country" className="inputLabel-sm">Units On Order</label>
                    <input name="Country" type="text" className="nw_input" value={this.state.UnitsOnOrder} title="Enter units on order" onChange={this.handleChangeUnitsOnOrder} />
                    <label htmlFor="Phone" className="inputLabel-sm">Reorder Level</label>
                    <input name="Phone" type="text" className="nw_input" value={this.state.ReorderLevel} title="Enter reorder level" onChange={this.handleChangeReorderLevel} />

                    <label htmlFor="Phone" className="inputLabel-sm">Discontinued</label>
                    <label className="switch">
                        <input id="checkDis" type="checkbox" checked={this.state.Discontinued} onChange={this.handleChangeDiscontinued} />
                        <span className="slider round"></span>
                    </label>

                    <label htmlFor="Phone" className="inputLabel-sm">Image Link</label>
                    <input name="Phone" type="text" className="nw_input" value={this.state.ImageLink} title="Enter Image LInk" onChange={this.handleChangeImageLink} />
                        <br />
                        <button className="btn_list-lg" type="submit">Save changes</button>

                    </form>

            </div>
        );
    }

}

export default NWProductEdit;