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

handleEdit = (index) => {
		this.setState({...this.state.edit, true});
		//React.setEdit(!edit);
};

	
	render() {
		return(
       <div className='wrapper'>
        <div className='card frame'>
          <Header numTodos={this.state.tasks.length}/>
			<TodoList tasks={this.state.tasks} onDelete={this.handleDelete} onEdit={this.handleEdit} />
			<SubmitForm onFormSubmit={this.handleSubmit} />
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
        <input 
          type='text'
          className='input'
          placeholder='Enter Item'
          value={this.state.term}
          onChange={(e) => this.setState({term: e.target.value})}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

/*
<form onSubmit={this.addItem}>
						<input ref={(a) => this._inputElement = a} 
							placeholder="enter task"></input>
						<button type="submit">add</button>
					</form>
*/

const Header = (props) => {
  return(
    <div className='card-header'>
      <h1 className='card-header-title header'>
        You have {props.numTodos} Todos
      </h1>
    </div>
  )
}

//const[edit, setEdit] = React.useState(false);

const TodoList = (props) => {
	
  const todos = props.tasks.map((todo, index, status) => {
    return <Todo content={todo} key={index} id={index} edit={false} onDelete={props.onDelete} onEdit={props.onEdit} />
  })
  return( 
    <div className='list-wrapper'>
	<ul className="theList">
      {todos}
	  </ul>
    </div>
  )
}

const Todo = (props) => {

  return(
    <div className='list-item'>
	{!props.edit ? (
	<li>
		<input type="checkbox" id="complete" />
      {props.content}
      <button className="delete is-pulled-right" onClick={() => {props.onDelete(props.id)}}>X</button>
	  <button onClick={() => {props.onEdit(props.id)}}>Edit</button>
	  </li>
	  ):(
	  <li>
	  <input type="text"
            value={props.content}
            name="todo"
        />
          <button onClick={() => {props.onEdit(props.id)}}>Cancel</button>
          <button type="submit">
            Save
          </button>
        </li>
      )}
	</div>
  );
}


ReactDOM.render(
	<App />,
	document.querySelector('#listBody')
);

export default App;