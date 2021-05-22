import React, { Component } from "react"

import CollegeSearchBar from './CollegeSearchBar.js';
import CollegeSearchMap from './CollegeSearchMap.js';

class CollegeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeStr: "Stanford",
    }

    this.updateCollegeStr = this.updateCollegeStr.bind(this);
  }

  updateCollegeStr(newStr) {
    this.setState({
      collegeStr: newStr
    })
  }

  render() {
    const { collegeStr } = this.state;
    return (
      <>
        <CollegeSearchBar query={collegeStr} updateMap={this.updateCollegeStr} />
        <CollegeSearchMap loading={true} collegeStr={this.state.collegeStr} />
      </>
    )
  }
}

export default CollegeSearch;
