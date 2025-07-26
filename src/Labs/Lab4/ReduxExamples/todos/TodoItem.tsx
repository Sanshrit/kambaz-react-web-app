import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch()
    return (
        <ListGroup.Item className="d-flex justify-content-between" key={todo.id}>
            {todo.title}
            <div>
                <Button className="btn btn-danger me-1" onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"> Delete </Button>
                <Button onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"> Edit </Button>
            </div>
        </ListGroup.Item>);
}