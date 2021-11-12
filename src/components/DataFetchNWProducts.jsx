import React, { Component } from 'react';
import '../App.css';
import Helpme from './Helpme';
import NWProductAdd from './create/NWProductAdd';
import NWProductEdit from './edit/NWProductEdit';


class DataFetchNWProducts extends Component {


    //****************************************************************************************************************
    //**********************************json from Northwind database**************************************************
    //****************************************************************************************************************

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            products_recordcount: 0,
            page: 0, limit: 10,
            category: "",
            totalproducts: 0,
            visible: "browse",
            renderChildAdd: true,
            renderChildEdit: true,
            oneProducts: [],
            ProductToDelete: "", ProductNameToDel: "", CategoryIdToDel: "", UnitPriceToDel: "", UnitsInStockToDel: "", UnitsOnOrderDel: "", DiscontinuedToDel: "", ImageLinkToDel: "",
            categories: [], selectedCat: "",
        };
       
        this.handleChangeCategoryDropDown = this.handleChangeCategoryDropDown.bind(this);
        this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
        this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
        this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
    }

    handleChildUnmountAdd() {
        this.setState({ renderChildAdd: false });
        this.handleClickAddBrowseProducts();
        this.GetFromNW();
    }
    handleChildUnmountEdit() {
        this.setState({ renderChildEdit: false });
        this.handleClickAddBrowseProducts();
        this.GetFromNW();
    }
    handleChildUnmountDelete() {
        this.NWDelete();
    }

    componentDidMount() {
        this.GetFromNW();
        this.GetTotalProducts();

        //https://www.carlrippon.com/react-drop-down-data-binding/
        //get categories
        fetch("https://yourwebapi.azurewebsites.net/nw/products/getcat")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                    this.setState({
                        categories: [{ value: '', display: 'Show All Categories' }].concat(data)
                    });
            }).catch(error => {
                console.log(error);
            });
    }

    ResetOnDelete() {
        this.setState({
            ProductToDelete: "",
        })
        this.handleClickAddBrowseProducts();
        this.GetFromNW();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //controls above
    handleClickAddBrowseProducts = () => {
        this.setState({ visible: "browse" });
    }

    handleClickAddProduct = () => {
        this.setState({ visible: "addform" });
    }

    handleClickHelp = () => {
        this.setState({ visible: "help" });
    }
    handleClickHelpAdd = () => {
        this.setState({ visible: "helpAdd" });
    }
    handleClickHelpEdit = () => {
        this.setState({ visible: "helpEdit" });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //controls in browse table.

    //when one clicks edit -> passing values for edit as a []
    handleClickEdit = (dataObj, event) => {
        this.setState({
            oneProduct: dataObj,
            visible: "editform",
            renderChildEdit: true
        });
    }
    //when you click delete -> passing values to states as a string
    handleClickDelete = (productDelete, productNameDelete, categoryDelete, unitPriceDelete, unitsInStockDelete, unitsOnOrderDelete, discontinuedDelete, imageLinkDelete, event) => {
        this.setState({
            ProductToDelete: productDelete,
            ProductNameToDel: productNameDelete,
            CategoryIdToDel: categoryDelete,
            UnitPriceToDel: unitPriceDelete,
            UnitsInStockToDel: unitsInStockDelete,
            UnitsOnOrderDel: unitsOnOrderDelete,
            DiscontinuedToDel: discontinuedDelete,
            ImageLinkToDel: imageLinkDelete,
            visible: "deleteform"
        });
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //fetch data from Northwind
    GetFromNW() {
        let uri = "";
        if (this.state.selectedCat !== "")
        {
            if (this.state.selectedCat === "Show All Categories") { //handle this here and change it to "" or ELSE! that's right.
                this.setState({ selectedCat: "" },
                    this.handleSubmit);
            }
            else {
                uri = 'https://yourwebapi.azurewebsites.net/nw/products/getsome?category=' + this.state.selectedCat + '&page=' + this.state.page + '&limit=' + this.state.limit;
            }
        }
        else
        {
            uri = 'https://yourwebapi.azurewebsites.net/nw/products/getsome?offset=' + this.state.page + '&limit=' + this.state.limit;
        }
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                this.setState({ products: json, products_recordcount: Object.keys(json).length })
            })
        this.handlePreviousDisable();

        
    }

    //fetch total products from Northwind
    GetTotalProducts() {
        let uri2 = 'https://yourwebapi.azurewebsites.net/nw/products/';
        fetch(uri2)
            .then(response => response.json())
            .then(json => {
                this.setState({ totalproducts: Object.keys(json).length })
            })


    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    //delete data from northwind
    NWDelete() {
        let uridel = 'https://yourwebapi.azurewebsites.net/nw/products/' + parseInt(this.state.ProductToDelete);
        fetch(uridel, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                //store data to variable
                const success = json;
                if (success) {
                    this.ResetOnDelete();
                }
            });


    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //controls under the table

    //disable previous button from page 1 = 0
    handlePreviousDisable() {
        if (this.state.page === 0) {
            document.getElementById("previousBtn").className = "btn_list-lg-disabled";
        }
        else {
            document.getElementById("previousBtn").className = "btn_list-lg";
        }
    }

    //previous button
    handleJsonPrev = () => {
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber - 10;
        }
        this.setState({
            page: pagenumber,
        }, this.handleSubmit);
        document.getElementById("resultsToShowError").style.display = "none";
        document.getElementById("nextBtn").className = "btn_list-lg";
    }

    //next button
    handleJsonNext = () => {
        if (this.state.products_recordcount < 10) {
            this.setState({
                page: this.state.page,
            }, this.handleSubmit);
            document.getElementById("resultsToShowError").innerHTML = "No more results to show!"
            document.getElementById("resultsToShowError").style.display = "block";
            document.getElementById("nextBtn").className = "btn_list-lg-disabled";
        }
        this.setState({
            page: this.state.page + 10,
        }, this.handleSubmit);
    }

    //Category dropdown list handling
    handleChangeCategoryDropDown(event) {
        if (event.target.value === "Show All Categories") {
            this.setState({ selectedCat: "" },
                this.handleSubmit);
        }
            let targetcat = event.target.value;
            this.setState({ selectedCat: targetcat },
                this.handleSubmit
            );

    }


    handleSubmit(event) {
        this.GetFromNW();
    }

    //****************************************************************************************************************
    //****************************************************************************************************************

    render() {

        let rowCount = "Total rows fetched from Northwind database / Products: " + this.state.totalproducts;
        let prodtableJson = [];
        if (this.state.products.length > 0) {
            for (let index = 0; index < this.state.products.length; index++) {
                const element = this.state.products[index];

                prodtableJson.push(
                    <tr key={element.productId}>
                        <td>{element.productId}</td>
                        <td>{element.productName}</td>
                        <td>{element.categoryName}</td>
                        <td>{element.unitPrice.toFixed(2)}&#8364;</td>
                        <td>{element.unitsInStock}</td>
                        <td>
                            <label className="disContainer">
                                <input id="discontinuedCheck" type="checkbox" checked={element.discontinued} disabled />
                                <span className="checkmark"></span>
                            </label>
                        </td>
                        <td><img className="productImg" src={element.imageLink} alt="" /></td>
                        <td>
                            <button className="btn_list" onClick={this.handleClickEdit.bind(this, element)}>Edit</button>
                            <button className="btn_list" id="btnModal" onClick={this.handleClickDelete.bind(
                                this,
                                element.productId,
                                element.productName,
                                element.categoryName,
                                element.unitPrice,
                                element.unitsInStock,
                                element.unitsOnOrder,
                                element.discontinued,
                                element.imageLink,
                            )}>Delete</button>
                        </td>
                    </tr>
                );
            }
}
        else {
            rowCount = <div className="loader"></div>
        }

        if (this.state.visible === "browse") {
            return (
                <div className="messageBox">
                <div className="nwdiv">

                    <div className="nw_topcontrols">
                    <button className="btn_list-lg" onClick={this.handleClickHelp}>Help</button>
                    <button className="btn_list-lg" onClick={this.handleClickAddProduct}>Add Product</button>
                    </div>
                        <h5>{rowCount}</h5>
                        <div id="cat-dropdown" className="selectdiv">
                            <select value={this.state.selectedCat} id="categorylist" onChange={this.handleChangeCategoryDropDown}>
                                {this.state.categories.map((catg) => <option key={catg.value} value={catg.categoryId}>{catg.categoryName}{catg.display}</option>)}
                            </select>
                        </div>
                        <div id="dname"></div>
                        <table id="northwind_products" className="nwtable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Unit Price</th>
                                    <th>Units In Stock</th>
                                    <th>Discontinued</th>
                                    <th>Image</th>
                                </tr>
                                </thead>
                            <tbody>{prodtableJson}</tbody></table>
                        <div id="resultsToShowError" className="resultsToShowError text-danger"></div>
                    <div className="nw_lowercontrols">
                    <button id="previousBtn" className="btn_list-lg" onClick={this.handleJsonPrev}>Previous</button>
                    <button id="nextBtn" className="btn_list-lg" onClick={this.handleJsonNext}>Next</button>
                    </div>

                    </div>

                </div>



            );
        }
        else if (this.state.visible === "addform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                    <button className="btn_list-lg" onClick={this.handleClickHelpAdd}>Help</button>
                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Browse Products</button>
                </div>
                    {this.state.renderChildAdd ? < NWProductAdd unmountMe={this.handleChildUnmountAdd} /> : null}
                </div>
            );
        }
        else if (this.state.visible === "editform") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickHelpEdit}>Help</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Browse Products</button>
                    </div>
                    {this.state.renderChildEdit ? < NWProductEdit productObj={this.state.oneProduct} unmountMe={this.handleChildUnmountEdit} /> : null}
                </div>
            );
        }

        else if (this.state.visible === "deleteform") {
            return (
                <div className="messageBox">
                    <div className="nwdiv">
                <div id="deleteModal" className="delModal">
                            <div className="delModal-content">
                                <span onClick={this.handleClickAddBrowseProducts} className="close">&times;</span>
                                <p>Are you sure you want to delete product {this.state.ProductToDelete}?</p>
                                <table className="nwtable">
                                    <thead>
                                        <tr>
                                            <th>Product Id</th>
                                            <th>Product Name</th>
                                            <th>Category Name</th>
                                            <th>Unit Price</th>
                                            <th>Units In Stock</th>
                                            <th>Units On Order</th>
                                            <th>Discontinued</th>
                                            <th>Image</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <td>{this.state.ProductToDelete}</td>
                                        <td>{this.state.ProductNameToDel}</td>
                                        <td>{this.state.CategoryIdToDel}</td>
                                        <td>{this.state.UnitPriceToDel}&#8364;</td>
                                        <td>{this.state.UnitsInStockToDel}</td>
                                        <td>{this.state.UnitsOnOrderDel}</td>
                                        <td>
                                            <label className="disContainer">
                                                <input id="discontinuedCheck" type="checkbox" checked={this.state.DiscontinuedToDel} disabled />
                                            <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td><img className="productImg" src={this.state.ImageLinkToDel} alt="" /></td>
                                    </tbody>
                                </table>
                                <br />
                                <div>
                                    <button className="btn_list-lg" onClick={this.handleChildUnmountDelete}>Confirm delete</button>
                                    <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Back</button>
                                </div>
                      </div>
                        </div>
                        </div>
                </div>
                );
        }
        else if (this.state.visible === "help") {
            return (
                <div className="messageBox">
                <div className="nw_topcontrols">
                    <button className="btn_list-lg" onClick={this.handleClickAddProduct}>Add Product</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Browse Products</button>
                    </div>

                    <Helpme mod="NWProductsFetch" />

                </div>
            );
        }
        else if (this.state.visible === "helpAdd") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickAddProduct}>Add Product</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Browse Products</button>
                    </div>

                    <Helpme mod="NWProductsFetchAdd" />

                </div>
            );
        }
        else if (this.state.visible === "helpEdit") {
            return (
                <div className="messageBox">
                    <div className="nw_topcontrols">
                        <button className="btn_list-lg" onClick={this.handleClickAddProduct}>Add Product</button>
                        <button className="btn_list-lg" onClick={this.handleClickAddBrowseProducts}>Browse Products</button>
                    </div>

                    <Helpme mod="NWProductsFetchEdit" />

                </div>
            );
        }
        else {
            return (
                <div className="nw_topcontrols">
                    <h5>Something went wrong...Please try to load this page again.</h5>
                </div>
            );
        }

    }
}

export default DataFetchNWProducts;