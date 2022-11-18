import React, { useEffect } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { v4 as uuidv4 } from 'uuid'
import '../styles/home.scss'

export type TodoType = {
  id: string,
  title: string,
  description: string,
  tags: string,
  created_at: string,
  updated_at: string,
  order: number
}

const Home: React.FC = () => {

  const [todos, setTodos] = React.useState<TodoType[]>([])

  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [tags, setTags] = React.useState<string>('')
  const [refresh, setRefresh] = React.useState<boolean>(false)

  useEffect(() => {
    const data = localStorage.getItem('todos')
    if (data) {
      // Sort todos by id
      const temp = JSON.parse(data).sort((a: TodoType, b: TodoType) => a.order > b.order ? 1 : -1)
      setTodos(temp)
    }
  }, [refresh])

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (title === '') {
      alert('Title is required')
      return
    }

    const newTodo = {
      id: uuidv4(),
      title: title,
      description: description,
      tags: tags,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      order: todos.length
    }

    let temp = todos
    temp?.push(newTodo)
    setTodos(temp)
    localStorage.setItem('todos', JSON.stringify(temp))

    setRefresh(!refresh)
    setTitle('')
    setDescription('')
    setTags('')
  }

  const handleDelete = (id: string) => {
    const temp = todos.filter(todo => todo.id !== id)
    setTodos(temp)
    localStorage.setItem('todos', JSON.stringify(temp))
    setRefresh(!refresh)
  }

  const handleEdit = (todo: TodoType) => {
    const temp = todos.map(t => {
      if (t.id === todo.id) {
        return todo
      }
      return t
    })
    setTodos(temp)
    localStorage.setItem('todos', JSON.stringify(temp))
    setRefresh(!refresh)
  }

  const handleOrder = (id: string, direction: string) => {
    console.log("Reordering");
    // Update todo order property based on direction
    const temp = todos
    temp.map(t => {
      if (t.id === id) {
        switch (direction) {
          case "up":
            t.order += 1
            console.log("Adding to ", t.id);
            break;
          case "down":
            t.order -= 1
            console.log("Removing to ", t.id);
            break;

          default:
            break;
        }
      }
      return t
    })
    setTodos(temp)
    localStorage.setItem('todos', JSON.stringify(temp))
    setRefresh(!refresh)
  }

  return (
    <div id="home">
      <Header />
      <div className="content">
        <div className="left">
          <p className="section-title">Vos todos</p>
          <div className="todos-container">
            {
              todos.length > 0 ?
                todos.map((todo: TodoType, index: number) => {
                  return (
                    <Card
                      key={`todo-${index}`}
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      tags={todo.tags}
                      created_at={todo.created_at}
                      updated_at={todo.updated_at}
                      order={todo.order}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      onOrder={handleOrder}
                    />
                  )
                })
                :
                <p className="no-todos">Aucune tâche enregistrée</p>
            }
          </div>
        </div>
        <div className="right">
          <p className="section-title">Ajouter une tâche</p>

          <div className="add-form-container">
            <form className="add-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Titre de votre todo" type="text" name="title" id="title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrition</label>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Entrez une description pour ce Todo" name="description" id="description" rows={10}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags <small>(Séparés d'une virgule)</small></label>
                <input onChange={(e) => setTags(e.target.value.replace(' ', ',').toLowerCase().trim())} value={tags} placeholder="tag1,tag2,tag3" type="text" name="tags" id="tags" />
              </div>
              <button className="submit-button" type='submit'>Sauvegarder</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
