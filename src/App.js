import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsCount: 0,
    searchInput: '',
    userdetailsList: [],
    isChecked: false,
  }

  handleWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleAddButtonClick = event => {
    event.preventDefault()
    const {website, username, password, isChecked, passwordsCount} = this.state
    if (
      website.trim() !== '' ||
      username.trim() !== '' ||
      password.trim() !== ''
    ) {
      const newDetails = {
        id: v4(),
        website,
        username,
        password,
        isChecked,
        passwordsCount,
      }
      this.setState(prev => ({
        userdetailsList: [...prev.userdetailsList, newDetails],
        website: '',
        username: '',
        password: '',
        passwordsCount: prev.passwordsCount + 1,
        searchInput: '',
        isChecked,
      }))
    } else {
      alert('Please enter valid inputs')
    }
  }

  onChangingCheckBox = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  handleDelete = id => {
    const {userdetailsList} = this.state
    const updateList = userdetailsList.filter(each => each.id !== id)
    this.setState(prev => ({
      userdetailsList: updateList,
      passwordsCount: prev.passwordsCount - 1,
    }))
  }

  listElements = prop => {
    const {id, website, username, password, isChecked, passwordsCount} = prop
    return (
      <li className="list-container" key={id}>
        <p>{website}</p>
        <p>{username}</p>
        {isChecked && passwordsCount > 0 ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
        <button
          className="button1"
          type="button"
          onClick={() => this.handleDelete(id)}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </li>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsCount,
      userdetailsList,
      searchInput,
      isChecked,
    } = this.state

    const filteringPasswords = userdetailsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const backgroundImg = passwordsCount === 0 ? 'show' : 'dontShow'
    const textContent =
      passwordsCount === 0 || filteringPasswords.length === 0
        ? 'No Passwords'
        : ''

    return (
      <div className="bgContainer">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="innerBg">
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
          <form>
            <h1>Add New Password</h1>
            <div className="inputsBg">
              <img
                className="smallImages"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.handleWebsiteChange}
              />
            </div>
            <div className="inputsBg">
              <img
                className="smallImages"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className="inputsBg">
              <img
                className="smallImages"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              onClick={this.handleAddButtonClick}
              data-testid="delete"
            >
              Add
            </button>
          </form>
        </div>

        <div className="innerBg">
          <div>
            <div className="bg">
              <div className="bg">
                <h1>Your Passwords </h1>
                <p>{passwordsCount}</p>
              </div>
              <div>
                <img
                  className="smallImages"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <input
              type="checkbox"
              id="checkBoxId"
              onChange={this.onChangingCheckBox}
              value={isChecked}
            />

            <label htmlFor="checkBoxId">Show passwords</label>
            <div className={backgroundImg}>
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>{textContent}</p>
            </div>
            <ul className="bg1">
              {filteringPasswords.map(each => this.listElements(each))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
