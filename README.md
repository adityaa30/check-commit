
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

## TODO

- [x] Get the commit message
- [ ] Implement rules based on syntax defined [here](http://karma-runner.github.io/latest/dev/git-commit-msg.html)
- [ ] Helper functions to check commit message based on rules
- [ ] Add custom **[input parameters](https://help.github.com/en/actions/building-actions/metadata-syntax-for-github-actions#inputs)**
