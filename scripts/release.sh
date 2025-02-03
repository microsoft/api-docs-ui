#!/bin/bash

# Ensure the script returns to the 'main' branch on exit
trap 'git checkout main || exit 1' EXIT

# Check if the user is logged into GitHub CLI, if not, initiate log in flow
gh auth status &>/dev/null
if [ $? -ne 0 ]; then
  echo "GitHub CLI is not authenticated. Logging in..."
  gh auth login || exit 1
fi

# Check if we're on the 'main' branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: You must be on the 'main' branch. Currently on '$CURRENT_BRANCH'."
  exit 1
fi

# Check for version bump type argument, default to 'patch' if not provided
VERSION_TYPE=${1:-patch}

# Validate the version bump type (must be one of patch, minor, or major)
if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "Error: Invalid version bump type. Use 'patch', 'minor', or 'major'."
  exit 1
fi

# Pull the latest changes from the main branch
git pull origin main || exit 1

# Create a new branch for the version bump
BRANCH_NAME="bump-version-$(date +%Y%m%d%H%M%S)"
git checkout -b $BRANCH_NAME || exit 1

# Bump the version
npm version $VERSION_TYPE || exit 1

# Push the new branch to the remote repository
git push origin $BRANCH_NAME || exit 1

# Create a pull request (ensure 'gh' CLI is installed and authenticated)
PR_URL=$(gh pr create --base main --head $BRANCH_NAME --title "Bump version" --body "Automated version bump") || exit 1

# Automatically merge the PR
gh pr merge $PR_URL --merge --auto "1" --delete-branch || gh pr view $PR_URL --web || exit 1

git push --tags

echo "Pull request created successfully!"
