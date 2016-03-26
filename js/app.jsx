(function () {
	'use strict';

	var ENTER_KEY = 13;

	class TodoApp extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				todos: [],
				newtodo: ""
			}
		}

		onNewTodoChange(event){
			this.setState({
				newtodo: event.target.value
			})
		}

		onTodoKeyDown(event){
			if(event.keyCode !== ENTER_KEY){
				return;
			}
			var todolist = this.state.todos;
			var value = this.state.newtodo.trim();

			if(value !== ""){
				todolist.push({
					id: todolist.length + 1,
					title: this.state.newtodo.trim(),
					completed: false,
					editing: false
				});				
				this.setState({
					todos: todolist,
					newtodo: ""
				});
			}
		}

		onToggleAllItems(event){
			var todolist = this.state.todos.map(todo => {
				todo.completed = event.target.checked;
			});
			this.setState({
				todos: todolist
			});
		}

		onTodoItemDestroy(todoid){
			var todolist = this.state.todos;
			var index = todolist.findIndex(todo => todo.id == todoid);

			todolist.splice(index, 1);
			for(var i = index; i < todolist.length; i++){
				todolist[i].id = todolist[i].id - 1;
			}
			
			this.setState({
				todos: todolist
			})
		}

		onTodoItemBeginEdit(todoid){
			var todolist = this.state.todos;

			todolist.map(todo => {
				if(todo.id === todoid){
					todo.editing = true;
				}else{
					todo.editing = false;
				}
			})
			this.setState({
				todos: todolist
			})
		}

		onTodoItemFinishEdit(todoid){
			var todolist = this.state.todos;

			todolist.map(todo => {
				todo.editing = false;
			})
			this.setState({
				todos: todolist
			})
		}

		render() {			
			var todoitems = this.state.todos.map(todo =>{
				return <ToDoItem todo ={todo} 
								 onDestroy = {this.onTodoItemDestroy.bind(this, todo.id)} 
								 onBeginEdit = {this.onTodoItemBeginEdit.bind(this, todo.id)} 
								 onFinishEdit = {this.onTodoItemFinishEdit.bind(this, todo.id)}
					/>
			});

			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input className="new-todo" 
							   placeholder="What needs to be done?" 
							   autoFocus={true} 
							   value = {this.state.newtodo}
							   onChange = {this.onNewTodoChange.bind(this)}
							   onKeyDown = {this.onTodoKeyDown.bind(this)}
							   />
					</header>
					<section className="main">
						<input className="toggle-all" 
							   type="checkbox"
							   onChange = {this.onToggleAllItems.bind(this)}
							   />
						<ul className="todo-list">
						   {todoitems}
						</ul>
					</section>
				</div>
			);
		}
	}

	class ToDoItem extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				completed: this.props.todo.completed,
				editing: this.props.todo.editing,
				editText: this.props.todo.title
			}
		}

		onTodoItemCheckedChange(event){
			this.setState({
				completed: event.target.checked
			});
		}

		onTodoItemTitleChange(event){
			this.setState({
				editText: event.target.value
			})
		}

		onTodoItemKeyDown(event){
			if(event.keyCode !== ENTER_KEY){
				return;
			}
			this.props.onFinishEdit();
			if(event.target.value === ""){
				this.props.onDestroy();
			}		
		}

		componentWillReceiveProps(nextProps){
			this.setState({
				completed: nextProps.todo.completed,
				editing: nextProps.todo.editing,
				editText: nextProps.todo.title
			});
		}

		render(){
			var classname = this.state.completed ? "completed" : (this.state.editing ? "editing" : "");
			return <li className={classname}>
				<div className="view">
				    <input type="checkbox" 
				    	className="toggle"
				    	checked = {this.state.completed}
				    	onClick = {this.onTodoItemCheckedChange.bind(this)}
				    />
					<label onDoubleClick = {this.props.onBeginEdit.bind(this)}>{this.state.editText}</label>

					<button className="destroy"
							onClick = {this.props.onDestroy.bind(this)}
					/>
				</div>
				<input className="edit"
						onChange = {this.onTodoItemTitleChange.bind(this)}
						onKeyDown = {this.onTodoItemKeyDown.bind(this)}
					    value={this.state.editText}></input>
			</li>
		}
	}

	ReactDOM.render(<TodoApp/>, document.getElementsByClassName('todoapp')[0]);
})();
