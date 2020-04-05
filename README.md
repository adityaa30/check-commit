
<a href="https://github.com/adityaa30/check-commit">
    <img alt="GitHub Actions status" src="https://github.com/actions/checkout/workflows/Build%20and%20Test/badge.svg">
</a>

# Check Commit Syntax

Action to check if the commit follows proper syntax as specified [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html)

## Usage

Create a workflow `.yml` file in your repositories `.github/workflows` directory
(eg. `.github/workflows/check-commit.yml`). In your workflow you first need to checkout
your repository then use this [action](https://github.com/adityaa30/check-commit).

Refer to the example below,

```yaml
name: Check Commit

on:
  pull_request:
  push:
    branches:
      - "*"

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Check commit
        uses: adityaa30/check-commit@master
```

## Input Parameters

- `compulsory-scope`
  - Either 'true' or 'false'
  - Defaults to 'false'
  - If true, scope field becomes compulsory for each commit (refer [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html))

- `max-header-length`
  - Should be a valid non-zero positive integer
  - Defaults to 50
  - Raises an error if length of commit header is more than specified

## Project Installation

**[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)** the repository

```bash
# Clone the forked repository
git clone https://github.com/<git-username>/check-commit.git

# Enter project directory
cd check-commit

# Install dependencies
npm install

# Build the project
npm run build
```

### NOTE

- Before pushing any changes, please build the project to update the `dist/index.js` in order to reflect your changes in github
- To test the project in your local use [act](https://github.com/nektos/act)

## TODO

- [x] Get the commit message
- [x] Implement rules based on syntax defined [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html)
- [x] Helper functions to check commit message based on rules
- [x] Add input parameter `compulsory-scope`
- [x] Add input parameter `max-header-length`
- [ ] Add custom **[input parameters](https://help.github.com/en/actions/building-actions/metadata-syntax-for-github-actions#inputs)**
