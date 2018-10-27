import React from "react"
import router from 'umi/router';

export default class BasicLayout extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    
    return (
        <div >
          { this.props.children }
        </div>
        );
  }
}