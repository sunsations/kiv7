Root.ModalViewModel = function() {
  var self = this;

  self.header = ko.observable();
  self.list   = ko.observable();
  
  self.render = function(header, body) {
    // format errors as a list, eg::
    //  from: {"errors":{"name":["cant be blank", "must be unique"]}}
    //    to: ["name cant be blank", "name must be unique"]
    var errors = _.reduce(body, function(memo, attr) {
      return _.map(_.keys(attr), function(field) {
        return field + " " + attr[field];
      });
    }, []);
    
    self.header(header);
    self.list(errors);
    self.show();
  };
  
  self.show = function() {
    $("#modal-view").modal({
      keyboard: true
    });
  }
};

Root.ModalViewModel.prototype = new Root.NamespaceViewModel();