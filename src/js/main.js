(function () {
  var $ = require("jquery"),
      _this;

  var App = new function(){
    this.init = function(){
      _this = this;
      this.$leaderboard = $('[data-leaderboard-list]:first');
      this.numPlayers   = this.$leaderboard.find('li').length;

      this.bindPlayerClick();
      this.bindPlayerHover();
      this.bindKeyPresses();
    };

    this.bindPlayerClick = function(){
      this.$leaderboard.on('click', 'li', function(){
        _this.selectPlayer($(this).index());
      });
    };

    this.bindPlayerHover = function(){
      this.$leaderboard.on('mouseover', 'li', function(){
        _this.hoverPlayer($(this).index());
      });
    };

    this.bindKeyPresses = function(){
      $(document).on('keydown', function(e){
        var code = parseInt(e.keyCode || e.which, 10);
        var $hoveringEl   = _this.$leaderboard.find('li.is-hovering');
        var hoveringIndex = $hoveringEl.index();
        if(code === 13 && !$hoveringEl.hasClass('is-active')) {
          e.preventDefault();
          e.stopPropagation();
          // enter
          _this.selectPlayer(hoveringIndex);
        } else if(code === 38 && hoveringIndex !== 0) {
          e.preventDefault();
          e.stopPropagation();
          // traverse up
          _this.hoverPlayer(hoveringIndex-1);
        } else if(code === 40 && (hoveringIndex+1 <= _this.numPlayers)) {
          e.preventDefault();
          e.stopPropagation();
          // traverse down
          _this.hoverPlayer(hoveringIndex+1);
        } else if(code === 27) {
          e.preventDefault();
          e.stopPropagation();
          // esc
          _this.deselectPlayers();
        }
      });
    };

    this.selectPlayer = function(index){
      console.log('selected ' + this.$leaderboard.find('li:eq('+index+') .leaderboard__name').text())
      this.$leaderboard.find('li:eq('+index+')').addClass('is-active').siblings().removeClass('is-active');
    };

    this.deselectPlayers = function(){
      this.$leaderboard.find('li').removeClass('is-active');
    };

    this.hoverPlayer = function(index){
      this.$leaderboard.find('li:eq('+index+')').addClass('is-hovering').siblings().removeClass('is-hovering');
    };

  };

  $(document).ready(function(){
    App.init();
  });

})();
