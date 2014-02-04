#Wall

Standard "White Decent" wall with support for tweets, a workspace standard display.

## Installation

The project uses [Grunt](http://gruntjs.com).

- Install Grunt command line tools

  ```bash
  npm install -g grunt-cli
  ```

- Install dependencies in project's root directory
  
  ```bash
  npm install
  bower install
  ```

## Building

To build locally, run 

```bash
grunt build
```

## Hosting Locally

To host locally:

```bash
PORT=[port] grunt run
```

And open <http://localhost:4242/build/demo.html>

## Deployment

To be able to deploy, you'll first need to set up env vars:

    S3_KEY=[aws key]
    S3_SECRET=[aws secret]
    CF_DISTR=[cloudfront distribution id]

Then run

    grunt deploy