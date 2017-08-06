var api = require('../utils/api')
var Reflux = require('reflux')
var Actions = require('../actions')

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImages: function(topicId) {
    return api.get('topics/' + topicId)
      .then(function(json){
        this.images = json.data.filter(image => !image.is_album)
        this.triggerChange()
      }.bind(this))
  },
  getImage: function(imageId) {
    return api.get('image/' + imageId)
      .then(function(json){
        if (this.images) {
          this.images.push(json.data)
        } else {
          this.images = [json.data]
        }
        this.triggerChange()
      }.bind(this))
  },
  find: function(imageId) {
    if (this.images) {
      var result = this.images.filter(image => image.id == imageId)
      return result.length ? result[0] : null
    } else {
      this.getImage(imageId)
      return null
    }
  },
  triggerChange: function(change) {
    this.trigger('change', this.images)
  }
})