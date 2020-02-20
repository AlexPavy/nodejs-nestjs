# Add to event test

[Task description](./Nest.JS%20Test%20Project.pdf)

App running at https://add-to-event-test-di4fnzjk5q-ew.a.run.app

Uses:
- [nestjs](https://nestjs.com/)
- [google firestore](https://cloud.google.com/firestore)

## Installation

```bash
$ npm install
```

For firestore:
Download google credentials JSON key and move it to:
[google-credentials.json](./google-credentials.json)
It's a secret so it's in [.gitignore](./.gitignore)

## Running the app

```bash
npm run start
```

## Test

```bash
npm run test
```

## Deploy

With [Google cloud run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy?hl=en_US)

```zsh
gcloud builds submit --tag gcr.io/<project id>/add-to-event-test
gcloud run deploy --image gcr.io/<project id>/add-to-event-test --platform managed
```