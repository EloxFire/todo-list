import React, { useEffect } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import { v4 as uuidv4 } from 'uuid'
import '../styles/home.scss'
import * as Icon from 'react-icons/fi'

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
      order: todos.length + 1
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
    // Update todos order
    const temp = todos.map((todo, index) => {
      if (todo.id === id) {
        if (direction === 'up') {
          if (index === 0) {
            return todo
          }
          todo.order = todo.order - 1
          return todo
        } else {
          if (index === todos.length - 1) {
            return todo
          }
          todo.order = todo.order + 1
          return todo
        }
      }
      return todo
    })
    setTodos(temp)
    localStorage.setItem('todos', JSON.stringify(temp))
    setRefresh(!refresh)
  }

  // FilterType : 1 - DateUp, 2 - DateDown, 3 - UpdateUp, 4 - UpdateDown, 5 - TagsUp, 6 - TagsDown
  const handleFilter = (filterType: number) => {
    switch (filterType) {
      case 1:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.created_at > b.created_at ? 1 : -1))
        break;
      case 2:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.created_at < b.created_at ? 1 : -1))
        break;
      case 3:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.updated_at > b.updated_at ? 1 : -1))
        break;
      case 4:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.updated_at < b.updated_at ? 1 : -1))
        break;
      case 5:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.tags.split(',').length > b.tags.split(',').length ? 1 : -1))
        break;
      case 6:
        setTodos(todos.sort((a: TodoType, b: TodoType) => a.tags.split(',').length < b.tags.split(',').length ? 1 : -1))
        break;
      default:
        break;
    }

    localStorage.setItem('todos', JSON.stringify(todos))
    setRefresh(!refresh)
  }

  return (
    <div id="home">
      <Header />
      <div className="content">
        <div className="left">
          <div className="todos-container-header">
            <p className="section-title">Vos todos</p>
            <div className="filters-container">
              <p>Filtres :</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <button className="filter-button" onClick={() => handleFilter(1)}>Création <Icon.FiArrowUp /> </button>
                  <button className="filter-button" onClick={() => handleFilter(2)}>Création <Icon.FiArrowDown /> </button>
                  <button className="filter-button" onClick={() => handleFilter(3)}>Modification <Icon.FiArrowUp /> </button>
                  <button className="filter-button" onClick={() => handleFilter(4)}>Modification <Icon.FiArrowDown /> </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '.5rem' }}>
                  <button className="filter-button" onClick={() => handleFilter(5)}>Nbr tags <Icon.FiArrowUp /> </button>
                  <button className="filter-button" onClick={() => handleFilter(6)}>Nbr tags <Icon.FiArrowDown /> </button>
                </div>
              </div>
            </div>
          </div>
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
                <label htmlFor="tags">Tags {/*<small>(Séparés d'une virgule)</small>*/}</label>
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
