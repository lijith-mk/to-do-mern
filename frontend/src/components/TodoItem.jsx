function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
      <div className="todo-info">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <span className="status-badge">{todo.status}</span>
      </div>
      <div className="todo-actions">
        <button
          onClick={() =>
            onToggle(todo._id, {
              status: todo.status === 'pending' ? 'completed' : 'pending',
            })
          }
        >
          {todo.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
