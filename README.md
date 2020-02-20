# Add to event test

[Task description](./Nest.JS%20Test%20Project.pdf)

Uses [nestjs](https://nestjs.com/)

## Installation

```bash
$ npm install
```

Download google credentials JSON key and move it to:
[google-credentials.json](./google-credentials.json)
It's a secret so it's in [.gitignore](./.gitignore)

## Running the app

```bash
npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deploy

With [Google cloud run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy?hl=en_US)

```zsh
gcloud builds submit --tag gcr.io/<project id>/add-to-event-test
gcloud run deploy --image gcr.io/<project id>/add-to-event-test --platform managed
```