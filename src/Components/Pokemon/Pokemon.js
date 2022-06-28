import React, { Component } from "react";
import axios from "axios"

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, pokemon: "", pokemon_types: [], pokemon_moves: [], photo: ""
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            let pokemon_name = window.location.href.split("/").pop();
            axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon_name).then(resp => {
                this.setState({
                    pokemon: resp.data,
                    pokemon_types: resp.data['types'],
                    pokemon_moves: resp.data['moves'],
                    photo: resp.data.sprites
                })
            }).catch(err => {
                console.log(err)
            })
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-lg-8 col-md-6">
                                    <h3 className="mb-0 text-truncated">{this.state.pokemon.name}</h3>
                                    <p className="lead">Pokemon id :{this.state.pokemon.id}</p>
                                    <p>Pokemon family</p>
                                    <p>
                                        pokemon types :
                                        {this.state.pokemon_types.map((val, index) =>
                                            <span className="badge badge-info tags" key={index}>{val.type.name}</span>
                                        )}
                                    </p>
                                    <p>
                                        pokemon moves :
                                        {this.state.pokemon_moves.map((val, index) =>
                                            <span className="badge badge-success tags" key={index}>{val.move.name}</span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="badge badge-warning tags">pokemon object</span>
                                    </p>
                                    <p className="pt-3 pb-3">Pokemon description</p>
                                </div>
                                <div className="col-12 col-lg-4 col-md-6 text-center">
                                    <img src="https://robohash.org/68.186.255.198.png" alt="" className="mx-auto rounded-circle img-fluid" />
                                    <br />
                                    <h4>Evolution & Pres evolution</h4>
                                    <ul className="list-inline ratings text-center" title="Ratings">
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                        <li className="list-inline-item"><span className="fa fa-star">pokemon evolution and pre evolution</span></li>
                                    </ul>
                                </div>
                                <div className="col-12 row">
                                    {this.state.photo['back_female'] ? <img src={this.state.photo['back_female']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['back_default'] ? <img src={this.state.photo['back_default']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['back_shiny'] ? <img src={this.state.photo['back_shiny']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['back_shiny_female'] ? <img src={this.state.photo['back_shiny_female']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['front_default'] ? <img src={this.state.photo['front_default']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['front_female'] ? <img src={this.state.photo['front_female']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['front_shiny'] ? <img src={this.state.photo['front_shiny']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                    {this.state.photo['front_shiny_female'] ? <img src={this.state.photo['front_shiny_female']} alt="" className="mx-auto rounded-circle img-fluid" /> :null}
                                </div>
                                {/*/col*/}
                            </div>
                            {/*/row*/}
                        </div>
                        {/*/card-block*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;
