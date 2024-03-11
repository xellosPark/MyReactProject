import './Today.css';

function Today() {


    return (
    <div className="todo-app">
        <header className="todo-header">ToDo List</header>
        <ul className="todo-list">
        {/* List items will be dynamically added here */}
        </ul>
        <footer className="todo-footer">
        <button className="add-btn">+</button>
        <button className="delete-btn">🗑️</button>
        </footer>
    </div>
    );
}

export default Today
