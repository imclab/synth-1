(function() {
  'use strict';

  bs.views.LoopModuleView = Backbone.View.extend({
    initialize: function() {
      var view = this;
      $(window).on('keydown', function(e) {
        view.handleKeydown(e);
      });

      this.listenTo(this.model.buffers, 'add', this.insertBuffer);
      this.listenTo(this.model.buffers, 'remove', this.unscheduleEvent);
    },

    template: _.template($('.loop-module-template').html()),

    handleKeydown: function(e) {
      if (e.keyCode == 192) { // ~
        if (this.model.recording) {
          this.model.stopRecording();
        } else {
          this.model.startRecording();
        }
      }

      if (e.keyCode >= 49 && e.keyCode <= 58) {
        switch (e.keyCode) {
          case 49:  // 1
            this.model.toggleBufferVolume(0);
            break;
          case 50:  // 2
            this.model.toggleBufferVolume(1);
            break;
          case 51:  // 3
            this.model.toggleBufferVolume(2);
            break;
          case 52:  // 4
            this.model.toggleBufferVolume(3);
            break;
          case 53:  // 5
            this.model.toggleBufferVolume(4);
            break;
          case 54:  // 6
            this.model.toggleBufferVolume(5);
            break;
          case 55:  // 7
            this.model.toggleBufferVolume(6);
            break;
          case 56:  // 8
            this.model.toggleBufferVolume(7);
            break;
          case 57:  // 9
            this.model.toggleBufferVolume(8);
            break;
          case 58:  // 0
            this.model.toggleBufferVolume(9);
            break;
        }
      } 
    },

    insertBuffer: function(buffer) {
      var bufferView = new bs.views.BufferView({model: buffer});
      this.$el.append(bufferView.render().el);
      bufferView.drawWaveform();
      bufferView.drawWaveform();
      bufferView.drawWaveform();
      bufferView.drawWaveform();
    },

    unscheduleEvent: function(model) {
      var unscheduled = _.find(this.model.scheduled, function(ev) {
        return ev.id === model.cid;
      });
      if (unscheduled) {
        this.model.scheduled.splice(this.model.scheduled.indexOf(unscheduled), 1);
      }
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();