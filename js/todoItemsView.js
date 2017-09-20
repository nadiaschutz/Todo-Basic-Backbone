var TodoItemsView = Backbone.View.extend({
    tagName: "ul",

    id: "todoItems",

    initialize: function (options) {
        if (!(options && options.model))
            throw new Error("model is not specified");

        this.model.on("add", this.onAddTodoItem, this);
        this.model.on("remove", this.onRemoveItemTodoItem, this);
    },

    onAddTodoItem: function (todoItem) {
        var view = new TodoItemView({
            model: todoItem
        });
        this.$el.append(view.render().$el);
    },
    
    onRemoveItemTodoItem:  function (todoItem) {
        
        this.$("li#" + todoItem.id).remove();
    },

    events: {
        "click #add": "onClickAdd",
        "keypress #newTodoItem": "onKeyPress"
    },
    
    onKeyPress:function(e){
      if (e.keyCode==13)
          this.onClickAdd();
    },

    onClickAdd: function () {
        var $textBox = this.$("#newTodoItem");
        
        if($textBox.val() ){
            var todoItem = new TodoItem({ title: $textBox.val() });
            
            this.model.create(todoItem);
            $textBox.val("");  
        }
        
        
    },
    
    render: function () {
        var self = this;

        this.$el.append("<input type ='text' autofocus id ='newTodoItem'></input>");
        this.$el.append("<button id='add'>Add</button>");

        this.model.each(function (todoItem) {
            var view = new TodoItemView({
                model: todoItem
            });
            self.$el.append(view.render().$el);
        });
        return this;
    }
});
