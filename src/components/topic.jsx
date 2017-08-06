var React = require('react')
var Link = require('react-router').Link
var ImageStore = require('../stores/image-store')
var Reflux = require('reflux')
var Actions = require('../actions')
var ImagePreview = require('./image-preview')

module.exports = React.createClass({
  mixins: [ Reflux.listenTo(ImageStore, 'onChange') ],
  getInitialState: function() {
    return {
      images: []
    }
  },
  componentWillMount: function() {
    this.componentWillReceiveProps(this.props)
  },
  componentWillReceiveProps: function(nextProps) {
    Actions.getImages(nextProps.params.id)
  },
  renderImages: function() {
    return this.state.images.slice(0, 20).map(function(image) {
      return <ImagePreview key={image.id} {...image} />
    })
  },
  onChange: function(event, images) {
    this.setState({images: images})
  },
  render: function() {
    return <div className="topic" >
      {this.renderImages()}
    </div>
  }
})