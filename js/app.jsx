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
					completed: false
				});
				this.setState({
					todos: todolist,
					newtodo: ""
				});
			}
		}

		onCheckAllTodosChanged(event){
			var todolist = this.state.todos;
			todolist.forEach(todo => {
				todo.completed = event.target.checked;
			});
			this.setState({
				todos: todolist
			});
		}

		render() {
			var todoitems = this.state.todos.map(todo =>{
				return <ToDoItem todo={todo} />
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
							   onChange = {this.onCheckAllTodosChanged.bind(this)}
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
				completed: this.props.todo.completed
			}
		}

		onTodoItemCheckedChange(event){
			this.setState({
				completed: event.target.checked
			});
		}

		componentWillReceiveProps(nextProps){
			console.log("nextProps.todo.completed " + nextProps.todo.completed);
			this.setState({
				completed: nextProps.todo.completed
			});
		}

		render(){
			return <li className={this.state.completed && "completed"}>
			    <input type="checkbox" 
			    	className="toggle"
			    	checked = {this.state.completed}
			    	onClick = {this.onTodoItemCheckedChange.bind(this)}
			    />
				<label>{this.props.todo.title}</label>
			</li>
		}
	}

	ReactDOM.render(<TodoApp/>, document.getElementsByClassName('todoapp')[0]);
})();
