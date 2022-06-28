import React, { Component } from "react";
import NotFound from "../../Components/NotFound/NotFound"
import Home from "../../Components/Home/Home"
import Pokemon from "../../Components/Pokemon/Pokemon"
import { BrowserRouter, Switch, Route } from "react-router-dom";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/Pokemon/:pokemon_name(\w+)">
                        <Pokemon/>
                    </Route>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Container;
