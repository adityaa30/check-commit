
# Check Commit Syntax

Action to check if the commit follows proper syntax as specified [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html)

## Usage

Create a workflow `.yml` file in your repositories `.github/workflows` directory
(eg. `.github/workflows/check-commit.yml`). In your workflow you first need to checkout
your repository then use this [action](https://github.com/adityaa30/check-commit).

Refer to the example below,

```yaml
name:  Check Commit

on:
  push:
    branches:
      - master

jobs:
  check:
    runs-on:  ubuntu-latest
    steps:
     - name:  Checkout
       uses:  actions/checkout@master
     - name:  Check commit
       uses:  adityaa30/check-commit@master
```

## Project Installation

**[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)** the repository

```bash
# Clone the forked repository
git clone https://github.com/<git-username>/check-commit.git

# Enter project directory
cd check-commit

# Install dependencies
npm install

# Buld the project
npm run build
```

### NOTE

- Before pushing any changes, please build the project to update the `dist/index.js` in order to reflect your changes in github
- To test the project in your local use [act](https://github.com/nektos/act)

## TODO

- [x] Get the commit message
- [ ] Implement rules based on syntax defined [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html)
- [ ] Helper functions to check commit message based on rules
- [ ] Add custom **[input parameters](https://help.github.com/en/actions/building-actions/metadata-syntax-for-github-actions#inputs)**
