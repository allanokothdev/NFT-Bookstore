import React, { Component } from "react";

class PublishingListItem extends Component {

    render(){
        return (
            <tr>
              <td>{this.props.item.title}</td>
              <td>{this.props.item.copiesRemaining}/{this.props.item.totalCopies}</td>
              <td>{this.props.item.published}</td>
            </tr>
        )
    }

}

export default PublishingListItem;

