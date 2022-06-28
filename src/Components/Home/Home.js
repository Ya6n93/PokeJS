import React, { Component } from "react";
import background from './../../background.jpg';
import logo from './../../Pokédex_logo.png'
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, pokemon_list: [], next: "", previous: "", paginationNumber: 50, types: [],
            filter_by_types: [], moves: [], filter_by_moves: [], search_key: ""
        };
    }

    changeSearchKeys = (e) => {this.setState({search_key : e.target.value}, () => this.search())};

    addOrRemoveNewFilterByTypes = (e) => {
        let item_value = e.target.value;
        if (this.state.filter_by_types.findIndex(item => item === item_value) === -1) {
            this.setState(prevState => ({filter_by_types: [...prevState.filter_by_types, item_value]}));
        } else {
            let array = [...this.state.filter_by_types]; // make a separate copy of the array
            let index = array.indexOf(e.target.value);
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({filter_by_types: array});
            }
        }
    };

    addOrRemoveNewFilterByMoves = (e) => {
        let item_value = e.target.value;
        if (this.state.filter_by_moves.findIndex(item => item === item_value) === -1) {
            this.setState(prevState => ({filter_by_moves: [...prevState.filter_by_moves, item_value]}));
        } else {
            let array = [...this.state.filter_by_moves]; // make a separate copy of the array
            let index = array.indexOf(e.target.value);
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({filter_by_moves: array});
            }
        }
    };

    IfInFilter = (value, move_or_types) => {
        let resp = false;
        for (let row in value) {
            if (move_or_types === "types" && this.state.filter_by_types.length !== 0) {
                if (this.state.filter_by_types.findIndex(item => item === value[row]) !== -1)
                    resp = true;
            } else if (move_or_types === "moves" && this.state.filter_by_moves.length !== 0) {
                if (this.state.filter_by_moves.findIndex(item => item === value[row]) !== -1)
                    resp = true;
            } else {
                resp = true
            }
        }
        return resp
    };

    changePaginationNumber = (e) => {this.setState({paginationNumber : e.target.value})};

    CheckPokemonList = (Link) => {
        this.setState({pokemon_list: []}, () => {
            if (!Link)
                Link = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";

            axios.get(Link).then(FirstResponse => { // get list of pokemon and insert it in data
                let data = FirstResponse.data;
                this.setState({next: data['next'], previous: data['previous']}, () => { // add new value for link of next or previous pokemon list
                    for (let row in data['results']) {

                        axios.get(data['results'][row]['url']).then(SecondResponse => {

                            axios.get(SecondResponse.data['forms'][0]['url']).then(response => {

                                let pokemon_types = [];
                                let pokemon_moves = [];
                                for (let new_row in SecondResponse.data['types']) {
                                    if (this.state.types.findIndex(item => item === SecondResponse.data['types'][new_row]['type']['name']) === -1)
                                        this.setState(prevState => ({types: [...prevState.types, SecondResponse.data['types'][new_row]['type']['name']]}));
                                    pokemon_types.push(SecondResponse.data['types'][new_row]['type']['name'])
                                }
                                for (let new_row in SecondResponse.data['moves']) {
                                    if (this.state.moves.findIndex(item => item === SecondResponse.data['moves'][new_row]['move']['name']) === -1)
                                        this.setState(prevState => ({moves: [...prevState.moves, SecondResponse.data['moves'][new_row]['move']['name']]}));
                                    pokemon_moves.push(SecondResponse.data['moves'][new_row]['move']['name'])
                                }
                                let new_data = {
                                    'name': data['results'][row]['name'],
                                    'image': response.data['sprites']['front_default'],
                                    'types': pokemon_types,
                                    'moves': pokemon_moves
                                };
                                this.setState(prevState => ({pokemon_list: [...prevState.pokemon_list, new_data]}))

                            }).catch(error => {
                                console.log(error)
                            });

                        }).catch(error => {
                            console.log(error)
                        })

                    }
                })
            }).catch(error =>{
                console.log(error)
            });
        });
    };

    search = () => {
        this.setState({pokemon_list: []}, () => {
            axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50").then(resp => {
                let data = resp.data;
                for (let row in data['results']) {
                    let pokemon_name = data['results'][row]['name'];
                    if (pokemon_name.includes(this.state.search_key)) {
                        axios.get(data['results'][row]['url']).then(SecondResponse => {
                            axios.get(SecondResponse.data['forms'][0]['url']).then(response => {
                                let pokemon_types = [];
                                let pokemon_moves = [];
                                for (let new_row in SecondResponse.data['types']) {
                                    if (this.state.types.findIndex(item => item === SecondResponse.data['types'][new_row]['type']['name']) === -1)
                                        this.setState(prevState => ({types: [...prevState.types, SecondResponse.data['types'][new_row]['type']['name']]}));
                                    pokemon_types.push(SecondResponse.data['types'][new_row]['type']['name'])
                                }
                                for (let new_row in SecondResponse.data['moves']) {
                                    if (this.state.moves.findIndex(item => item === SecondResponse.data['moves'][new_row]['move']['name']) === -1)
                                        this.setState(prevState => ({moves: [...prevState.moves, SecondResponse.data['moves'][new_row]['move']['name']]}));
                                    pokemon_moves.push(SecondResponse.data['moves'][new_row]['move']['name'])
                                }
                                let new_data = {
                                    'name': data['results'][row]['name'],
                                    'image': response.data['sprites']['front_default'],
                                    'types': pokemon_types,
                                    'moves': pokemon_moves
                                };
                                this.setState(prevState => ({pokemon_list: [...prevState.pokemon_list, new_data]}))
                            }).catch(error => {
                                console.log(error)
                            });
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        });
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            this.CheckPokemonList();
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    render() {
        let card=require('./../../card.png')
        let bg=require('./../../background.jpg')
        return (
            <div className="App" style ={{backgroundImage: "url("+bg+")", backgroundRepeat: "no-repeat", backgroundPosition: 'center',backgroundSize: 'cover'}}>
            <div className="container">
                <div className="row">
                    <div className="col-6 my-3">
                    <div style={{backgroundColor : 'black', color: 'white', width: 500}} className="card-footer pb-0">
                            <div className="d-flex justify-content-between">
                                <div className="align-self-center">
                                    <ul className="nav nav-pills nav-icon-pills mb-3 m-2" role="tablist">
                                        <div className="nav-item ml-4">
                                            <h6>- Filter by types:</h6>
                                            <div style={{overflow: "scroll", overflowX: 'hidden', height: 200,}}>
                                                {this.state.types.map((val, index) =>
                                                    <div style={{display: "flex", flexDirection: "row"}}>
                                                        <input style={{marginLeft: 20, marginRight: 5, marginTop: 7}} key={index} type="checkbox" id={val} name={val} value={val} onChange={this.addOrRemoveNewFilterByTypes}/>
                                                        <label form={val}>{val}</label>
                                                    </div>
                                                )}
                                            </div>
                                            
                                        </div>
                                        <li className="nav-item ml-4">
                                            <h6>- Filter by moves:</h6>
                                            <div style={{overflow: "scroll", overflowX: 'hidden', height: 200,}}>
                                            {this.state.moves.map((val, index) =>
                                                <div style={{display: "flex", flexDirection: "row"}}>
                                                    <input style={{marginLeft: 50, marginRight: 5, marginTop: 7}} key={index} type="checkbox" id={val} name={val} value={val} onChange={this.addOrRemoveNewFilterByMoves}/>
                                                    <label form={val}>{val}</label>
                                                </div>
                                            )}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <input className="form-control border-secondary py-2 my-3" type="Search" placeholder="Search a pokemon" onChange={this.changeSearchKeys}/>
                            <div className="input-group-append">
                                <button style={{backgroundColor: 'yellow'}} className="btn btn-outline-secondary my-3" type="button">Search</button>
                            </div>
                        </div>
                        <img src={logo}></img>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <div style={{backgroundColor: '#000', color: "white"}} className="card no-b">
                            <div className="card-body no-p">
                                {this.state.pokemon_list.length === 0 ?
                                    <div className="row align-items-start pl-2 pr-2 overflow-auto" style={{height: 700, justifyContent: "center"}}>
                                        <p className="text-light">Pokemon Not Found</p>
                                    </div>:
                                <div className="row align-items-start pl-2 pr-2 overflow-auto" style={{height: 700, justifyContent: "center"}}>
                                    {/* eslint-disable-next-line array-callback-return */}
                                    {this.state.pokemon_list.map((val, index) => {
                                        // eslint-disable-next-line no-mixed-operators
                                            if (index <= this.state.paginationNumber && this.IfInFilter(val.types, "types") && this.IfInFilter(val.moves, "moves")) {
                                                return (
                                                    <div className="card ml-2 mr-2 p-1" style={{width: "20rem", height:"30rem" ,backgroundColor: "#8e8e8e", marginBottom: 10}} key={index}>
                                                        <img src={card} style={{zIndex: 1, position: 'absolute', width: "100%", height: "100%"}}></img>
                                                        <div style={{zIndex: 2}}>
                                                            <img src={val.image} className="card-img-top" alt="..." onClick={() => window.location.href = "/Pokemon/" + val.name}/>
                                                            <div className="card-body" style={{marginTop: -50}}>
                                                                <p style={{color: '#000'}} className="card-text" onClick={() => window.location.href = "/Pokemon/" + val.name}><strong>Name</strong>: {val.name}</p>
                                                                <p style={{color: '#000'}} className="card-text"><strong>Type</strong>:
                                                                    {this.state.pokemon_list[index]['types'].map((val, index) => val + ", ")}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>}
                            </div>
                            <div className="card-footer pb-0">
                                <div className="d-flex justify-content-between">
                                    <div style={{marginLeft: 700}} className="align-self-center">
                                        <ul className="nav nav-pills nav-icon-pills mb-3 m-2" role="tablist">
                                        <li style={{marginTop: 5}} className="nav-item ml-4">
                                                <label style={{marginRight: 10}}>Pagination Number :</label>
                                                <input className="col-xs-1"
                                                       style={{width: 30, borderRadius: 10, textAlign: "center", backgroundColor: "#3aff85"}}
                                                       value={this.state.paginationNumber}
                                                       onChange={this.changePaginationNumber}/>
                                            </li>
                                            <li style={{marginLeft: 10}} className="nav-item mr-2">
                                                <button style={{backgroundColor: "red"}} className="btn btn-info" onClick={() => this.CheckPokemonList(this.state.previous || null)}>Prev</button>
                                            </li>
                                            <li className="nav-item">
                                                <button style={{backgroundColor: "yellow", color: "#000"}} className="btn btn-info" onClick={() => this.CheckPokemonList(this.state.next || null)}>Next</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Home;
