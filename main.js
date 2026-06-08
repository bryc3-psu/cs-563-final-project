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

const isValidEmail = function _isValidEmail(email) {
  // from: https://medium.com/@sketch.paintings/email-validation-with-javascript-regex-e1b40863ed23
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const showFormError = function _showFormError(input, message) {
  const error = document.createElement('span');
  error.classList.add('form-error');
  error.textContent = message;
  input.insertAdjacentElement('afterend', error);
};

const handleSubmit = function _handleSubmit(event) {
  event.preventDefault();
  let valid = true;

  // grab form elements
  const form = event.target;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  // remove old error msgs
  form.querySelectorAll('.form-error').forEach((element) => element.remove());

  // check no fields are empty and email is right format
  if (!name) {
    showFormError(form.elements.name, 'Missing name!');
    valid = false;
  }
  if (!email) {
    showFormError(form.elements.email, 'Missing email address!');
    valid = false;
  } else if (!isValidEmail(email)) {
    showFormError(form.elements.email, 'Invalid email address!');
    valid = false;
  }
  if (!message) {
    showFormError(form.elements.message, 'Empty message!');
    valid = false;
  }

  // If tests passed, POST the submission to formspree
  if (valid) {
    fetch('https://formspree.io/f/mbdegnrb', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        console.log('Form submitted successfully.');
        form.reset();

        // build success popup
        const overlay = document.createElement('div');
        const dialog = document.createElement('div');
        const heading = document.createElement('h2');
        const msg = document.createElement('p');
        const closeBtn = document.createElement('button');
        overlay.classList.add('popup-overlay');
        dialog.classList.add('success-dialog');
        closeBtn.classList.add('btn-submit');
        heading.setAttribute('id', 'popup-heading');
        overlay.setAttribute('role', 'dialog');
        heading.textContent = 'Message Sent!';
        msg.textContent = "Thanks for reaching out.";
        closeBtn.textContent = 'OK';

        // listener to delete dialog overlay on OK click
        closeBtn.addEventListener('click', () => overlay.remove());

        // append heading msg and btn to dialog
        dialog.append(heading, msg, closeBtn);
        // append dialog to the overlay
        overlay.append(dialog);
        // append overlay to the body
        document.body.append(overlay);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

// form submission listener
document.querySelector('.contact-form').addEventListener('submit', handleSubmit);

// fetch repos from GitHub and build + append project cards
fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=8`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    return response.json();
  })
  .then((repos) => {
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = '';
    repos
      .filter((repo) => !repo.fork)
      .forEach((repo) => grid.append(buildProjectCard(repo)));
  })
  .catch((error) => {
    console.error(error);
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = '<p class="projects-error">Failed to load projects. Please try again later.</p>';
  });
