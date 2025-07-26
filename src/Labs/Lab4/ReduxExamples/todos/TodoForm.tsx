import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between">
                <FormControl className="w-50" value={todo.title}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                <div>
                    <Button className="btn btn-success me-1"onClick={() => dispatch(addTodo(todo))}
                        id="wd-add-todo-click"> Add </Button>
                    <Button className="btn btn-warning"onClick={() => dispatch(updateTodo(todo))}
                        id="wd-update-todo-click"> Update </Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}
