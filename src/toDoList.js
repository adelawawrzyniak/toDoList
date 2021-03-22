import React from 'react';
import ReactDOM from 'react-dom';
import './toDoList.css';

class App extends React.Component{
	
	state = {tasks: ['Create To Do List']};
	
	handleDelete = (index) => {
		const newArr = [...this.state.tasks];
		newArr.splice(index, 1);
		this.setState({tasks: newArr});
	}

	handleSubmit = task => {
		this.setState({tasks: [...this.state.tasks, task]});
	}
	
	render() {
		return(
			<div className='thelist'>
				<div>
					<Header numTodos={this.state.tasks.length}/>
					<SubmitForm onFormSubmit={this.handleSubmit} />
					<TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
			
				</div>
			</div>
		);
	}
}

class SubmitForm extends React.Component {
	state = { term: '' };
  
	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.term === ''){
			console.log("here");
			return;
		}
		
	this.props.onFormSubmit(this.state.term);
    this.setState({ term: '' });
	
  }
  
  render() {
	return(
		<form onSubmit={this.handleSubmit}>
			<input type='text' className='input' placeholder='Enter Item' value={this.state.term}
			 onChange={(e) => this.setState({term: e.target.value})}/>
			<button id="submit" type="submit">Submit</button>
		</form>
	);
  }
}

const Header = (props) => {
	return(
		<div className='card-header'>
			<h1 className='card-header-title header'>You have {props.numTodos} Todos</h1>
		</div>
	)
}

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index, status) => {
    return <Todo content={todo} key={index} id={index} onDelete={props.onDelete}  />
  })
  return( 
    <div>
	<ul>
      {todos}
	  </ul>
    </div>
  )
}

const Todo = (props) => {
	return(
		<div className='list-item'>
			<li>
				<input type="checkbox" id="complete"/>
				<button id="delete" onClick={() => {props.onDelete(props.id)}}>X</button>
				{props.content}
			</li>
		</div>
	);
}


ReactDOM.render(
	<App />,
	document.querySelector('#listBody')
);

export default App;
