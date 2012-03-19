Root.ListsViewModel = function() {
  var self = this;
  
  self.tasks = ko.observableArray([]);
  
  Api.get("/v1/tasks", function(json) {
    self.tasks($.map(json.data, function(task) { return new Api.V1.Task(task) }))
  });
  
  self.completedTasks = ko.computed(function() {
    return _.filter(self.tasks(), function(task) {
      return task.done() 
    });
  });
  
  self.incompleteTasks = ko.computed(function() {
    return _.filter(self.tasks(), function(task) {
      return !task.done() 
    });
  });
  
  self.newTask = {
    name: ko.observable()
  };
  
  self.resetNewTask = function() {
    self.newTask.name("")
  };
  
  self.createTask = function() {
    Api.post("/v1/tasks", { task: ko.toJS(self.newTask) },
    function(task) {
      self.tasks.push(new Api.V1.Task(task));
      self.newTask.name("");
    },
    function() {
      self.modal.header("Error");
      
      $('#modal-alert').modal({
        keyboard: true
      });
    });
  };
  
  self.destroyTask = function(task) {
    Api.delete_("/v1/tasks/" + task.id, function() {
      self.tasks.remove(task);
    });
  };
  
  self.toggleTask = function(task) {
    Api.put("/v1/tasks/" + task.id + "/toggle", function(data) {
      task.done(data.done);
    });
  };
}