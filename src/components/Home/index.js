import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import ProjectItem from '../ProjectItem'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Home extends Component {
  state = {projectsList: [], activeId: categoriesList[0].id, isLoading: true}

  componentDidMount() {
    this.getProjects()
  }

  onChangeActiveId = event => {
    this.setState({activeId: event.target.value})
  }

  getProjects = async () => {
    const {activeId} = this.state

    const url = `https://apis.ccbp.in/ps/projects/${activeId}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = response.json()
    const formattedData = data.projects.amp(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
    }))

    this.setState({projectsList: formattedData, isLoading: false})
  }

  renderListView = () => {
    const {projectsList} = this.state

    return (
      <ul className="projects-list">
        {projectsList.map(each => (
          <ProjectItem key={each.id} projectDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading, activeId} = this.state
    return (
      <>
        <NavBar />
        <div className="home-bg">
          <select
            value={activeId}
            className="select-class"
            onChange={this.onChangeActiveId}
          >
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          <div className="body-cont">
            {isLoading ? this.renderLoadingView() : this.renderListView()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
