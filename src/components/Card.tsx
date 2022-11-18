import React, { useEffect } from 'react'
import * as Icon from 'react-icons/fi'
import { IconContext } from 'react-icons'
import '../styles/components/card.scss'
import { colors } from '../scripts/utils'
import { TodoType } from '../pages/Home'

interface CardProps {
  id: string
  title: string
  description: string
  tags: string
  created_at: string
  updated_at: string
  order: number
  onDelete: (id: string) => void
  onEdit: (todo: TodoType) => void
  onOrder: (id: string, direction: string) => void
}

const Card: React.FC<CardProps> = (props) => {

  const { id, title, description, tags, created_at, updated_at, order, onDelete, onEdit, onOrder } = props

  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [titleEdit, setTitleEdit] = React.useState<string>(title)
  const [descriptionEdit, setDescriptionEdit] = React.useState<string>(description)


  useEffect(() => {
    console.log(editMode);
    handleEditButton()
  }, [editMode])

  const handleEditButton = () => {
    if (!editMode) {
      if (titleEdit === '' || descriptionEdit === '') {
        return
      }

      const editedTodo = {
        id: id,
        title: titleEdit,
        description: descriptionEdit,
        tags: tags,
        created_at: new Date(created_at).toString(),
        updated_at: new Date().toString(),
        order: order
      }

      onEdit(editedTodo)
    }
  }

  return (
    <>
      <div className="card-tab">
        <IconContext.Provider value={{ color: colors.white }}>
          <button className="delete-button" onClick={() => onDelete(id)}><Icon.FiTrash2 /></button>
          <button className="edit-button" onClick={() => { setEditMode(!editMode) }}>{editMode ? <Icon.FiCheck /> : <Icon.FiEdit />}</button>
          <button className="move-button-up" onClick={() => onOrder(id, "up")}><Icon.FiArrowUp /></button>
          <button className="move-button-down" onClick={() => onOrder(id, "down")}><Icon.FiArrowDown /></button>
        </IconContext.Provider>
      </div>
      <div className="card">
        <div className="card-header">
          {
            editMode ?
              <input type="text" placeholder={title} onChange={(e) => setTitleEdit(e.target.value)} />
              :
              <p className="card-title">{title}</p>
          }
          <div className="line">
            <p className="card-small">Création : {new Date(created_at).toLocaleDateString()}</p>
            <p className="card-small" style={{ marginLeft: '1rem' }}>Dernière MàJ : {new Date(updated_at).toLocaleDateString()} à {new Date(updated_at).toLocaleTimeString('fr-FR').slice(0, -3).replace(':', 'h')}</p>
          </div>
        </div>
        <div className="card-body">
          {
            editMode ?
              <textarea className="card-description" placeholder={description} onChange={(e) => setDescriptionEdit(e.target.value)} />
              :
              <p className="card-description">{description}</p>
          }
        </div>
        <div className="card-footer">
          {
            tags !== '' ?
              tags.split(',').map((tag, index) => {
                return (
                  <p className="card-tags" key={index}>{tag}</p>
                )
              })
              :
              <p className="card-tags">Aucun tag défini</p>
          }
          {/* <p>{order}</p> */}
        </div>
      </div>
    </>
  )
}

export default Card
