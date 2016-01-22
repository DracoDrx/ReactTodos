var React = require("react");
var ReactDom = require("react-dom");
var Header = require("./header");
var ItemList = require("./itemlist");
var Store = require("store");

var App = React.createClass({
  getInitialState: function() {
    return {
      items: []
    }
  },
  componentWillMount: function() {
    var items = Store.get("todos");
    if (items) {
      this.setState({
        items: items
      });
    }
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="text-center">ReactTodos</h1>
          <Header addTodoItem={this.addTodoItem}/>
        </div>
        <div className="panel-body">
          {this.getItemListContents()}
        </div>
        <div className="panel-footer">
          <div className="text-center">
            <button type="button" className="btn btn-default" onClick={this.handleAllDoneClick}>All Completed</button>
            <button type="button" className="btn btn-default" onClick={this.handleClearDoneClick}>Clear Completed</button>
          </div>
        </div>
      </div>
    )
  },
  getItemListContents: function() {
    if (this.state.items.length > 0) {
      return (
        <ItemList items={this.state.items} updateTodoItem={this.updateTodoItem} removeTodoItem={this.removeTodoItem}/>
      );
    } else {
      return (
        <h3 className="text-center">Nothing!</h3>
      );
    }
  },
  addTodoItem: function(item) {
    var items = this.state.items;
    items.push(item);
    this.setState({
      items: items
    });
    Store.set("todos", this.state.items);
  },
  removeTodoItem: function(uuid) {
    var items = this.state.items;
    var index = this.getTodoItemIndex(uuid);
    items.splice(index, 1);
    this.setState({
      items: items
    });
    Store.set("todos", this.state.items);
  },
  updateTodoItem: function(item) {
    var items = this.state.items;
    var index = this.getTodoItemIndex(item.uuid);
    items[index] = item;
    this.setState({
      items: items
    });
    Store.set("todos", this.state.items);
  },
  handleAllDoneClick: function() {
    var items = this.state.items;
    items.forEach(function(item) {
      item.done = true;
    });
    this.setState({
      items: items
    });
    Store.set("todos", items);
  },
  handleClearDoneClick: function() {
    var items = this.state.items;
    var newItems = [];
    items.forEach(function(item) {
      if (!item.done) {
        newItems.push(item);
      }
    });
    this.setState({
      items: newItems
    });
    Store.set("todos", newItems);
  },
  getTodoItemIndex: function(uuid) {
    var i;
    for (i = 0; i < this.state.items.length; i++) {
      if (uuid === this.state.items[i].uuid) {
        return i;
      }
    }
  }
});

ReactDom.render(<App />, document.getElementById("todo-container"));
