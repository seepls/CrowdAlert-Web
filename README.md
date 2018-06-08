# CrowdAlert Web

Crowdalert lets you to share events across the globe. 

## Up & Running

```bash
# Create a virtual env
virtualenv env --python=python3.5

# Activate the env
. env/bin/activate

# Install the packages
pip install -r requirements.txt

# Install NPM packages
yarn

```

## API keys

Run this in the project root directory

```bash
echo "\
REACT_APP_GOOGLE_MAPS_KEY=\

REACT_APP_FACEBOOK_APP_ID=\

REACT_APP_FIREBASE_API_KEY=\

REACT_APP_FIREBASE_AUTH_DOMAIN=\

REACT_APP_FIREBASE_DATABASE_URL=\

REACT_APP_FIREBASE_PROJECT_ID=\

REACT_APP_FIREBASE_SENDER_ID=\
" > .env.local
```

Update the file with your own keys

## Preview

`npm start`

## Deploying

```bash
npm run build
gunicorn -b 0.0.0.0:8000 CrowdAlert.wsgi
```
