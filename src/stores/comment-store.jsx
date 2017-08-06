var api = require('../utils/api')
var Reflux = require('reflux')
var Actions = require('../actions')

module.exports = Reflux.createStore({
  listenables: [Actions],
  getImage: function(imageId) {
    return api.get('image/' + imageId + '/comments')
      .then(function(json){
        this.comments = json.data
        this.triggerChange()
      }.bind(this))
  },
  triggerChange: function() {
    this.trigger('change', this.comments)
  }
})