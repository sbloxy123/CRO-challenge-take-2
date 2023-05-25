## My approach:

- Setup the listener for when the page loads so that my code would run after the DOM has loaded.
- Implemented IntersectionObserver() to setup the placement and visibility of the CTA (call-to-action)
- Implemented MutationObserver for adding the CTA to the page on page load
- Limited quantity of items user can add through the CTA (to meet Amazon's product availability/allowance)

# CRO Developer - Coding Challenge

## Get Started

- Download this repository
- Open it in your code editor
- Run `npm i`
- Run `npm start`

This will run a local server on port 7000 and surface your Javascript/CSS file in /public endpoint:

- http://localhost:7000/public/js/script.js
- http://localhost:7000/public/css/styles.css


## Brief

# Install this Chrome extension: https://chrome.google.com/webstore/detail/code-injector/edkcmfocepnifkbnbkmlcmegedeikdeb 
- Click on the extension, click “Add Rule”, and add the following configuration:
- Add the URL Pattern: https://www.amazon.co.uk/dp/B09B8YWXDF* (including the asterisk in the end)
- Click in “Files”
- Add the file URL to your css file and javascript file
- Uncheck “On page load”
- Click “Save”

Go to the URL where the challenge runs and reload the page. Your code should run now.

## Page Url

https://www.amazon.co.uk/dp/B09B8YWXDF/
