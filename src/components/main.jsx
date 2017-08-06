var React = require('react')
var Header = require('./header')
var TopicList = require('./topic-list')

module.exports = React.createClass({
  content: function() {
    return this.props.children ? this.props.children : <TopicList />
  },
  render: function() {
    return (
      <div>
        <Header />
        {this.content()}
      </div>
    )
  }
})