riot.tag2('x-dropdown', '<div ref="box" onclick="{toggleDropdown}"> <span>{active.name}</span> <span show="{openning}"> ▼ </span> <span hide="{openning}"> ▷ </span> </div> <div ref="dropdown" show="{openning}"> <input type="text" placeholder="Filter" ref="filter" onkeyup="{setCandidates}"> <section class="candidates"> <div class="{⁗active⁗: candidate.id == active.id}" each="{candidate in candidates}" onclick="{choose}"> {candidate.name} </div> </section> </div>', 'x-dropdown .candidates,[data-is="x-dropdown"] .candidates{ min-height: 100px; height: 10em; overflow-y: scroll; } x-dropdown .candidates >div,[data-is="x-dropdown"] .candidates >div{ cursor: pointer; padding: 0.2em; } x-dropdown [ref=box],[data-is="x-dropdown"] [ref=box]{ cursor: pointer; } x-dropdown [ref=filter],[data-is="x-dropdown"] [ref=filter]{ border: solid 1px #eee; width: 100%; padding: 0.2em; } x-dropdown [ref=dropdown],[data-is="x-dropdown"] [ref=dropdown]{ width: 200px; min-height: 150px; border: solid 1px #eee; box-shadow: 2px 2px 2px #ccc; opacity: 1; transition: opacity 1s; } x-dropdown [ref=dropdown] .active,[data-is="x-dropdown"] [ref=dropdown] .active{ background: #00f; color: #fff; }', '', function(opts) {
this.active = opts.active;

this.openning = true;

this.numberSuggestion = opts.numberSuggestion || 10;

this.choose = (function(_this) {
  return function(e) {
    if (e.item.candidate.id === _this.active.id) {
      return _this.toggleDropdown();
    } else {
      _this.update({
        active: e.item.candidate
      });
      _this.trigger('chosen', e.item.candidate);
      return _this.toggleDropdown();
    }
  };
})(this);

this.rankFn = opts.rankFn || function(item) {
  if (item.name) {
    item._rank = item.name.toLocaleLowerCase().indexOf(this);
    if (item._rank === -1) {
      return false;
    }
  }
  return item;
};

this.setCandidates = (function(_this) {
  return function() {
    var items, keyword;
    items = opts.items;
    keyword = _this.refs.filter.value;
    if (keyword) {
      items = items.filter(_this.rankFn.bind(keyword));
      items = items.sort(function(item1, item2) {
        return item1._rank - item2._rank;
      });
    }
    return _this.update({
      candidates: items.slice(0, _this.numberSuggestion)
    });
  };
})(this);

this.toggleDropdown = (function(_this) {
  return function() {
    _this.update({
      openning: !_this.openning
    });
    if (_this.openning) {
      return _this.refs.filter.focus();
    }
  };
})(this);

this.on('mount', function() {
  this.setCandidates();
  return null;
});
});
