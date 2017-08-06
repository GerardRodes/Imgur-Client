var React = require('react')
var Link = require('react-router').Link

module.exports = React.createClass({
  getInitialState: function() {
    return {
      hovering: false
    }
  },
  handleMouseEnter: function() {
    this.setState({hovering: true})
  },
  handleMouseLeave: function() {
    this.setState({hovering: false})
  },
  image: function() {
    var src = 'http://i.imgur.com/' + this.props.id + 'h.jpg'
    return <img src={src} alt={this.props.title} />
  },
  video: function() {
    return <video preload='auto' autoPlay='autoplay' loop='loop' webkit-playsinline >
      <source src={this.props.mp4} type='video/mp4' />
    </video>
  },
  inset: function() {
    return <div className="inset" >
      Views: {this.props.views}
      <br />
      Upvotes: {this.props.ups}
    </div>
  },
  render: function() {
    return (
      <Link className="image-preview"
        to={'images/' + this.props.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave} >
        {
          this.props.animated && !this.state.hovering ?
          <span className="glyphicon glyphicon-play" /> :
          null
        }
        {
          this.props.animated && this.state.hovering ? 
          this.video() :
          this.image()
        }
        { this.state.hovering ? this.inset() : null }
      </Link>
    )
  }
})