var React = require('react')
var Reflux = require('reflux')
var Actions = require('../actions')

var ImageStore = require('../stores/image-store')
var CommentStore = require('../stores/comment-store')

var CommentBox = require('./comment-box')

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange'),
    Reflux.listenTo(CommentStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      image: ImageStore.find(this.props.params.id),
      comments: []
    }
  },
  componentWillMount: function() {
    Actions.getImage(this.props.params.id)
  },
  onChange: function() {
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comments
    })
  },
  image: function() {
    return <img src={this.state.image.link} alt={this.state.image.title} className="img-rounded" />
  },
  video: function() {
    return <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline >
      <source src={this.state.image.mp4} type='video/mp4' />
    </video>
  },
  renderContent: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1>{this.state.image.title}</h1>
            </div>
            <div className="panel-body text-center">
              {
                this.state.image.animated ? 
                this.video() :
                this.image()
              }
            </div>
            <div className="panel-footer">
              {this.state.image.description}
            </div>
          </div>
          <h2>Comments</h2>
          {this.state.comments ? this.renderComments() : null}
        </div>
      </div>
    )
  },
  renderComments: function() {
    return <CommentBox comments={this.state.comments} />
  },
  render: function() {
    return this.state.image ? this.renderContent() : null
  }
})