import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class CollegeSearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      collegeStr: props.collegeStr,
      lat: 0,
      lng: 0,
      zoom: 11
    }

    this.handleResults = this.handleResults.bind(this);
    this.updateCollegeStr = this.updateCollegeStr.bind(this);
  }

  componentDidMount() {
    const {collegeStr} = this.state;
    this.updateCollegeStr(collegeStr);
  }

  handleResults(res, collegeStr) {
    if (res.results !== undefined && res.results.length !== 0) {
      this.setState({
        collegeStr: collegeStr,
        loading: false,
        lat: res.results[0].location.lat,
        lng: res.results[0].location.lon,
        error: null
      })
    }
    else {
      this.setState({
        collegeStr: collegeStr,
        loading: false,
        error: "College not found.",
        lat: null,
        lng: null,
      })
    }
  }

  updateCollegeStr(collegeStr) {
    fetch(
      "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=" + process.env.REACT_APP_COLLEGE_SCORECARD_API_KEY + "&school.name=" + collegeStr
    ).then(
      res => res.json()
    ).then(
      res => this.handleResults(res, collegeStr)
    );
  }

  render() {
    const { error, loading, collegeStr, lat, lng, zoom } = this.state;
    if (this.props.collegeStr !== collegeStr) {
      this.updateCollegeStr(this.props.collegeStr);
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={{lat: lat, lng: lng}}
            defaultZoom={zoom}
          />
        </div>
      );
    }
  }
}

export default CollegeSearchMap;
