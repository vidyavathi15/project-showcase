import './index.css'

const ProjectItem = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <li className="list-project">
      <img src={imageUrl} alt={name} className="project-img" />
      <p className="pro-name">{name}</p>
    </li>
  )
}

export default ProjectItem
