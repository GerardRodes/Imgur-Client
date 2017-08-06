var React = require('react')
var TopicStore = require('../stores/topic-store')
var Reflux = require('reflux')
var Actions = require('../actions')
var Link = require('react-router').Link

module.exports = React.createClass({
  mixins: [Reflux.listenTo(TopicStore, 'onChange')],
  getInitialState: function() {
    return {
      topics: []
    }
  },
  componentWillMount: function() {
    Actions.getTopics()
  },
  onChange: function(event, topics) {
    this.setState({topics: topics})
  },
  renderTopics: function() {
    return this.state.topics.map(function(topic) {
      return  <Link className="list-group-item"
        key={topic.id}
        to={'topics/' + topic.id} >
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    })
  },
  render: function() {
    return (
      <div className="list-group" >
        {this.renderTopics()}
      </div>
    )
  }
})