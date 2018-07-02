import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.id);
    this.setState({id:params.id})
  }
  render() {
    return (
      <div>
        {this.state.id}
        <Helmet>
            <title>{this.state.id}</title>
        </Helmet>
      </div>
    );
  }
}

export default Page;
