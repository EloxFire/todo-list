import React from 'react'
import '../styles/components/card.scss'

interface CardProps {
  title: string
  description: string
  tags: string
  created_at: string
  updated_at: string
}

const Card: React.FC<CardProps> = (props) => {

  const { title, description, tags, created_at, updated_at } = props

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">{title}</p>
        <div className="line">
          <p className="card-small">Création : {new Date(created_at).toLocaleDateString()}</p>
          <p className="card-small" style={{ marginLeft: '1rem' }}>Dernière MàJ : {new Date(updated_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-description">{description}</p>
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
      </div>
    </div>
  )
}

export default Card
