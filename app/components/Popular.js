var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

//==============================
function SelectLanguage (props) {

  var languages = ['All', 'JS', 'Ruby', 'Java', 'CSS', 'Python'];
  return(
    <ul className="languages">
      {languages.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b', borderBottom: '1px solid #d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid (props) {
  return (
    <ul className="popular-list">
    {props.repos.map(function(repo, index){
      return (
        <li key={repo.name} className="popular-item">
         
          <ul className="space-list-items">
            <li className="space-list-image">
              <div className="popular-rank">#{index + 1}</div>
              <img className="avatar"
              src={repo.owner.avatar_url}
              alt={'Avatar for '+repo.owner.login}
              />
            </li>
            <div className="space-list-details">  
              <li className="details repo-name"><a href={repo.html_url}>{repo.name}</a></li>
              <li className="details repo-owner">@{repo.owner.login}</li>
              <li className="details repo-stars">{repo.stargazers_count} stars</li>
            </div>
          </ul>
        </li>
      )
    })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

//===============================


class Popular extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

//envoke update language
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  //update language
  updateLanguage(lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null 
      }
    });
    // fetch repos
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function(){
          return{
            repos: repos,

          }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} 
        />
        {!this.state.repos
        ? <h1>loading</h1> 
        : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;