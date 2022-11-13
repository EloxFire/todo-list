import React, { useEffect } from 'react'
import Header from '../components/Header'
import '../styles/home.scss'

const Home: React.FC = () => {

  const [todos, setTodos] = React.useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('todos')
    if (data) {
      setTodos(JSON.parse(data))
    }
  }, [])

  return (
    <div id="home">
      <Header />
      <div className="content">
        <div className="left">
          <p className="section-title">Votre ToDoList</p>
          <div className="todos-container">
            {
              todos !== null ?
                todos.map((todo: any) => {
                  return (
                    <div className="todo">
                      <p>{todo.title}</p>
                      <p>{todo.description}</p>
                    </div>
                  )
                })
                :
                <p>Aucune tâche enregistrée</p>
            }
          </div>
        </div>
        <div className="right">
          <p className="section-title">Ajouter un ToDo</p>

          <div className="add-form-container">
            <form></form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
