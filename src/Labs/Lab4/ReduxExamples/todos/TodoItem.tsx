import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch()
    return (
        <ListGroup.Item key={todo.id}>
            <div className="d-flex justify-content-between">
                {todo.title}
                <div>
                    <Button variant="danger" className="me-1" onClick={() => dispatch(deleteTodo(todo.id))}
                        id="wd-delete-todo-click"> Delete </Button>
                    <Button variant="primary" className="me-1" onClick={() => dispatch(setTodo(todo))}
                        id="wd-set-todo-click"> Edit </Button>

                </div>
            </div>
        </ListGroup.Item>);
}