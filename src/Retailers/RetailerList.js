import * as React from "react";
import StoreList from "./Stores/StoresList";
import RetailerItem from "./RetailerItem";
import CloseButton from "./Button/CloseButton";

export default class RetailerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retailers: [],
        }
    }


    componentDidMount() {
        fetch('http://api.ilikesales.co.uk/v2/retailers')
            .then(response => response.json())
            .then(responsejson => {
                this.setState({
                    retailers: responsejson
                })
            });
    }


    selectRetailer(retailer) {
        this.setState({
            retailer: null
        }, () => this.setState({retailer: retailer}));
    }


    closeList() {
        this.setState({
            retailer: null
        });
    }

    render() {
        if (this.state.retailers.length < 1) return false;

        const list = this.state.retailers.map(retailer => <RetailerItem key={retailer.id} retailer={retailer}
                                                                        selectRetailer={this.selectRetailer.bind(this)}/>);

        return (

            <div>
                <div className="retailers">
                    {list}
                </div>
                {
                    this.state.retailer &&
                    <div className="stores">
                        <CloseButton onClick={() => this.closeList()} title="Close List" />
                        <StoreList retailer={this.state.retailer}/>
                    </div>
                }
            </div>
        )
    }
}