import React from "react";
import "./App.css";
import { Input, Button, Row, Col, Typography } from "antd";
import "antd/dist/antd.css";

const { Title } = Typography;

function TodoView({ addToList }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addToList(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Enter you tasks!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo({ todo, index, completeItem, removeItem }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <Button onClick={() => completeItem(index)}>Complete</Button>
        <Button type="primary" danger onClick={() => removeItem(index)}>
          x
        </Button>
      </div>
    </div>
  );
}

function App() {
  const [allTodo, setAllTodo] = React.useState([
    { text: "Initiate create react app", isCompleted: true },
    { text: "Build to do app " },
    { text: "Rock on!" },
  ]);

  const addToList = (text) => {
    const newAllTodo = [...allTodo, { text }];
    setAllTodo(newAllTodo);
  };

  const completeItem = (index) => {
    const newAllTodo = [...allTodo];
    newAllTodo[index].isCompleted = true;
    setAllTodo(newAllTodo);
  };

  const removeItem = (index) => {
    const newAllTodo = [...allTodo];
    newAllTodo.splice(index, 1);
    setAllTodo(newAllTodo);
  };

  return (
    <div className="app">
      <img
        src="/background.svg"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "45%",
          position: "absolute",
        }}
      />
      <div className="text">
        <Title>React To Do app</Title>
      </div>
      <div className="todo-list">
        <Row justify="center">
          <Col span={24}>
            {allTodo.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                completeItem={completeItem}
                removeItem={removeItem}
              />
            ))}
            <TodoView addToList={addToList} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
