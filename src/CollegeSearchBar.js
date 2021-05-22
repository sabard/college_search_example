import React, { Component } from "react"

class CollegeSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
    }

    this.updateMap = props.updateMap
    this.updateText = this.updateText.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateText(e) {
    let newQuery = e.target.value;
    this.setState({query: newQuery})
  }

  updateQuery(e) {
    e.preventDefault();
    this.props.updateMap(this.state.query);
  }

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.updateQuery}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search colleges: </span>
        </label>
        <input
            type="text"
            id="header-search"
            value={query}
            onChange={this.updateText}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default CollegeSearchBar
