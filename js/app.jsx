(function () {
	'use strict';

	var ENTER_KEY = 13;

	class TodoApp extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input className="new-todo" 
							   placeholder="What needs to be done?" 
							   autoFocus={true} />
					</header>
					<section className="main">
						<input className="toggle-all" 
							   type="checkbox" />
						<ul className="todo-list">
						
						</ul>
					</section>
				</div>
			);
		}
	}

	ReactDOM.render(<TodoApp/>, document.getElementsByClassName('todoapp')[0]);
})();
