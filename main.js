const GITHUB_USERNAME = '9m11d';
// color mapping for projectr languages
const LANGUAGE_COLORS = {
  'C++':    'cpp',
  'C':      'c',
  'Python': 'python',
  'HTML':   'html',
};

// take a repo JSON and return a carfd
const buildProjectCard = function _buildProjectCard(repo) {
  const langKey = LANGUAGE_COLORS[repo.language] || 'default';

  const card = document.createElement('article');
  card.classList.add('project-card');

  // card header: name + desc
  const header = document.createElement('div');
  const name = document.createElement('h3');
  const description = document.createElement('p');
  header.classList.add('project-card-header');
  name.classList.add('project-name');
  description.classList.add('project-description');
  name.textContent = repo.name;
  description.textContent = repo.description || 'No description available.';

  header.append(name, description);

  // card stats
  const stats = document.createElement('div');
  const stars = document.createElement('span');
  const forks = document.createElement('span');
  const issues = document.createElement('span');
  stats.classList.add('project-stats');
  stars.classList.add('project-stat');
  forks.classList.add('project-stat');
  issues.classList.add('project-stat');
  stars.textContent = `★ ${repo.stargazers_count}`;
  forks.textContent = `⑂ ${repo.forks_count}`;
  issues.textContent = `! ${repo.open_issues_count}`;

  stats.append(stars, forks, issues);

  // card footer: lang keys + link
  const footer = document.createElement('div');
  const lang = document.createElement('span');
  const link = document.createElement('a');
  footer.classList.add('project-card-footer');
  lang.classList.add('project-lang', `project-lang--${langKey}`);
  link.classList.add('project-link');
  lang.textContent = repo.language || 'Unknown';
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'View on GitHub';

  footer.append(lang, link);

  card.append(header, stats, footer);
  return card;
};

const fetchProjects = function _fetchProjects() {
  const grid = document.querySelector('.projects-grid');

  // fetch 8 most recent repos
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=8`)
    // if success, return as JSON
    .then(function _handleResponse(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repos...');
      }
      return response.json();
    })
    .then(function _renderRepos(repos) {
      const filtered = repos.filter((repo) => !repo.fork);

      // step through and build + append cards
      grid.innerHTML = '';
      filtered.forEach((repo) => {
        grid.append(buildProjectCard(repo));
      });
    })
    .catch(function _handleError(error) {
      console.error(error);
      grid.innerHTML = '<p class="projects-error">Failed to get GitHub repos...</p>';
    });
};

fetchProjects();
