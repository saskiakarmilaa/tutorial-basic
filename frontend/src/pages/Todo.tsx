import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Container, Row , Col} from "react-bootstrap";
import Table from "react-bootstrap/table";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
const ToDoList = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/todo");
    return response.data;
  };
  const { data: user } = useSWR("user", fetcher);
  if (!user) return <h2>Loading...</h2>;
  const addTodo = async () => {
    if (nama.trim() !== "" && email.trim() !== "") {
      const newTodo = { nama, email };
      try {
        const response = await axios.post(
          "http://localhost:5000/todo",
          newTodo
        );
        setNama("");
        setEmail("");
        mutate("user", [...user, response.data], false);
      } catch (error) {
        console.error("gagal", error);
      }
    }
  };
  const deleteTodo = async (userId: any) => {
    await axios.delete(`http://localhost:5000/todo/${userId}`);
    mutate("user");
  };
  return (
    <div className="todolist-page">
      <div className="todolist">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center mt-5 animate__animated animate__fadeInUp animate__delay-1s">
                TodoList Pendaftaran Disini
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Isikan Nama dan Email Anda
              </p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mt-3 mb-3">
            <Col>
              <div className="label-input-container animate__animated animate__fadeInUp animate__delay-1s">
                <label>
                  Nama :
                  <input
                    className="input-todo"
                    type="text"
                    placeholder="Masukkan nama..."
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </label>
              </div>
              <div className="label-input-container animate__animated animate__fadeInUp animate__delay-1s">
                <label>
                  Email :
                  <input
                    className="input-todo"
                    type="text"
                    placeholder="Masukkan Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <button
                className="btn btn-primary rounded-1 ms-1 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={addTodo}
              >
                Submit
              </button>
            </Col>
          </Row>
          <Row className="mt-3 animate__animated animate__fadeInUp animate__delay-1s">
            <Col>
              <div className="table-responsive">
                <Table
                  striped
                  bordered
                  hover
                  style={{ width: "100%" }}
                  className="table"
                >
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((user: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: number) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.title}</td>
                        <td>{user.description}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTodo(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default ToDoList;