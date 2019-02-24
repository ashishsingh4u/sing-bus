#!/usr/bin/env bash

echo Deploy to GitHub Pages

# only deploy tags
if [ -z "$TRAVIS_TAG" ]; then

    echo Deploy to GitHub Pages - Skipped deployment

else

    echo Deploy to GitHub Pages - Started

    # Move to the directory containing build artifacts and initialize git repository
    cd dist
    git init

    # Set Travis CI as git user
    git config user.name "Travis CI"
    git config user.email "ashishsingh4u@gmail.com"

    # Stage all build items and commit the change locally with message "Deploy to GitHub Pages".
    git add .
    git commit -m "Deploy to GitHub Pages"

    # Forced the push to gh-pages branch. This action will rewrite the history to this branch
    # Anyways we are not considering this history very important.
    # Added > /dev/null 2>&1 to send sensitive data to null. It will help hiding the passwords/credentials.
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages >/dev/null 2>&1

    echo Deploy to GitHub Pages - Successful
fi

echo Deploy to GitHub Pages - Finish
