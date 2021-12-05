import React from "react";
import {Card, Image, Button, CardGroup, Container, Row, Col} from 'react-bootstrap';
import MarketImage from '../images/market.png';
import '../styles/MarketPlacePage.css';
import BinImage from '../images/bin-recyclable.png';
import SearchBar from "../components/SearchBar";
import Batch from '../components/Batch';
import BatchDetails from "../components/BatchDetails";
import axios from 'axios';
import Loading from '../components/Loading';
const POSTS = [
    {
    objectID: 1,
    title: "Wine Bottles",
    location: "Bronx, NY",
    description: "I have a bin with 15+ wine bottles that could go to a nice home. They can be recycled and made into nice decorative bottles.",
    image: BinImage,
    isClaimed: true,
    },
    {
    objectID: 2,
    title: "Plastic Bottles",
    location: "Bronx, NY",
    description: "I have a bin with 15+ wine bottles that could go to a nice home. They can be recycled and made into nice decorative bottles.",
    image: BinImage,
    isClaimed: false,
    },
    {
    objectID: 3,
    title: "Some Cans",
    location: "Bronx, NY",
    description: "I have a bin with 15+ wine bottles that could go to a nice home. They can be recycled and made into nice decorative bottles.",
    image: BinImage,
    isClaimed: true,
    },
    {
    objectID: 4,
    title: "Wine Bottles",
    location: "Bronx, NY",
    description: "I have a bin with 15+ wine bottles that could go to a nice home. They can be recycled and made into nice decorative bottles.",
    image: BinImage,
    isClaimed: false,
    },
    {
    objectID: 5,
    title: "Wine Bottles",
    location: "Bronx, NY",
    description: "I have a bin with 15+ wine bottles that could go to a nice home. They can be recycled and made into nice decorative bottles.",
    image: BinImage,
    isClaimed: false,
    },
];

function MarketDecoration(){
    return (
        <div className="market-decor">
            <h3>MarketFeed</h3>
            <Image  src={MarketImage}/>
        </div>
    );
}

class MarketPlacePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            batches: [],
            loading: true,
            currBatch: null,
            showComponent: null,
        }
    }

    // Loads when the component is rendered so using the fake posts I passed Batch components into the Market's batches state
    componentDidMount(){
        // load data from database
        axios.get("/api/batches")
        .then(response => {
             this.setState({batches: response.data, loading: false, })
            });

    }

    // Arrow functions make it so you don't need the "bind" method 
    handleDetails = (currentBatch) => {
        // The Batch component gives the objectId of the current batch
        this.setState({ currBatch: currentBatch, showComponent: true});

    }

    updateClaimStatus = (batchID) => {
        // Update the status of the current batch
        const batches = this.state.batches;
        const indexOfBatch = batches.findIndex(b => b.id === batchID);
    
        batches[indexOfBatch].isClaimed = !batches[indexOfBatch].isClaimed;
        // this.setState({batches}); //the state will know that this is referring to the batches
        console.log("updated??\n", batches[indexOfBatch]);
        // Update back end
        axios.put("/api/batches/"+batchID, batches[indexOfBatch])
            .then(res => {
                console.log(res.data)
            })
            .then(this.setState({batches}))
            .catch(err => {console.log("Something is not right!")
                console.log(err)
            })
    }

    render(){
        if(this.state.loading) return <Loading />;
        const batchRecord = this.state.batches.map((batch, ii) => {
            return ( 
                // <Batch title={batch.title} location={batch.location} description={batch.description} image={batch.image} claimStatus={batch.isClaimed} key={ii} />

                // Shorter than previous ways of passing props, using the deconstructor or spread operator (...)
                <Batch { ...batch } handleDetails={this.handleDetails} handleClaimStatus={this.updateClaimStatus} key={ii} ></Batch>)
            
        })
        return (
            <Container fluid className="main-market-container">
                <Row className="top-market-row">
                    <Col lg="1" >
                        <MarketDecoration />
                    </Col>
                    <Col>
                        <SearchBar/>
                    </Col>
                </Row>
                <Row className="batch-row">
                    <Col className="batches-col">
                        { batchRecord }
                    </Col>
                    <Col className="details-col" >
                        {this.state.showComponent ? <BatchDetails  { ...this.state.batches.find(b => b.id === this.state.currBatch )}></BatchDetails> : null}
                    </Col>
                </Row>
                </Container>
        );
    }
}

export default MarketPlacePage;