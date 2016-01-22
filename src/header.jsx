var React = require("react");
var Uuid = require("uuid");
var PropTypes = React.PropTypes;

var Header = React.createClass({
  getInitialState: function() {
    return ({
      text: "",
      noValue: true
    });
  },
  render: function() {
    return (
      <div className="input-group">
        <input className="form-control" value={this.state.text} onChange={this.handleChanged} onKeyPress={this.handleEnterPressed}></input>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleAddClicked} disabled={this.state.noValue}>ADD</button>
        </span>
      </div>
    )
  },
  handleChanged: function(event) {
    var noValue = (event.target.value === "");
    this.setState({
      text: event.target.value,
      noValue: noValue
    });
  },
  handleEnterPressed: function(event) {
    if (event.charCode === 13) {
      this.handleAddClicked();
    }
  },
  handleAddClicked: function() {
    var item = {
      uuid: Uuid.v1(),
      text: this.state.text,
      done: false
    };
    this.props.addTodoItem(item);
    this.setState({
      text: "",
      noValue: true
    });
  }
});

module.exports = Header;
