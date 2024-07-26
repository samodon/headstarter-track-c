# Track C

## Overview

Track C is aimed at making a succesful PR to an established open source project . This repository is structured to facilitate effective collaboration, development, and testing. We have established three primary branches: `individual`, `testing`, and `main`.

## Branch Structure

1. **Individual**:
    - Each contributor will clone this branch and work directly from it.
    - This branch is intended for personal development and initial commits.
    - Commit your changes regularly with clear and descriptive commit messages.
  
2. **Testing**:
    - Once features or fixes are ready for integration, they should be merged into the `testing` branch.
    - This branch is used to consolidate and test new features or bug fixes before they are considered stable.
    - Ensure thorough testing and peer reviews before merging into this branch.

3. **Main**:
    - The `main` branch is the stable branch that holds the final version of the project.
    - Only thoroughly tested and reviewed code from the `testing` branch should be merged here.
    - This branch will be used for the final stage of deployment.

## Workflow

To contribute to the Track C project, follow these steps:

1. **Clone the Repository**:
    - Clone the repository from the `individual` branch to your local machine.
    - `git clone -b individual https://github.com/your-repo/track-c.git`

2. **Develop and Commit**:
    - Make your changes in your local `individual` branch.
    - Commit your changes with clear and descriptive commit messages.

3. **Push and Create a Pull Request**:
    - Push your changes to the remote `individual` branch.
    - Create a pull request from `individual` to the `testing` branch for review and integration.

4. **Testing and Review**:
    - After initial review, merge your changes into the `testing` branch for further testing.
    - Conduct thorough testing and peer reviews.
    - Once approved, merge the changes from `testing` to `main`.

## Meeting Notes

- Relevant notes from meetings will be stored in the `main` branch.
- To access the latest notes, pull from the `main` branch: `git pull origin main`.
