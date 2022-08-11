<p align="center">
  <a href="https://macrometa.com">
    <img src="https://i.imgur.com/NzHE2sN.png" alt="Logo" width="120">
  </a>

  <h2 align="center"><a href="https://macrometa.com/docs">Macrometa Docs</a></h3>
  <br />
  <p align="center">
    Macrometa is a secure, global data platform with integrated pub/sub, stream processing, search, functions, and containers. Create stateful APIs and real-time, event-driven, streaming data apps in minutes – not months.
    <br />
    <br />
    <a href="https://macrometa.com/docs">Explore the Docs 🚀</a>
    ·
    <a href="https://github.com/macrometacorp/docs/issues">Report a Bug 🐛</a>
    <br />
    <br />
  </p>
</p>

## The Stack

The Macrometa docs are powered by [Docusaurus](https://docusaurus.io/), a static site generator that helps developers ship beautiful, accessible docs. In addition to Docusaurus, we use [Stoplight Elements](https://stoplight.io/open-source/elements) for documenting our REST API and [Tailwind](https://tailwindcss.com/) for styling.

## Contributing

This section describes how you can get make contributions to the Macrometa docs.

### Reporting an Issue

Opening an [issue](https://github.com/Macrometacorp/docs/issues) is an effective way to contribute because many users might also be impacted. We'll make sure to fix it quickly if it's technically feasible and doesn't have significant side effects for other users.

Before reporting an issue, check that there is not an issue already open for the same topic.

### Submitting a Contribution

To make a contribution, you need to:

1. Clone the latest master branch: `git clone git@github.com:Macrometacorp/docs.git`
2. Create your feature branch: `git checkout -b my-new-contribution`
3. Add your changes: `git add .`
4. Commit your changes: `git commit -am "Add a contribution message"`
5. Push to the branch: `git push -u origin my-new-feature`
6. Create a pull request

### Pull Requests

All pull requests should have:

- A concise commit message.
- A description of what was changed/added.
- A maintainer will review your pull request and either merge the pull request or request that changes be made before merging.

After you've submitted your pull request:

- Automatic checks will be run
- A team member will review the pull request
- Your contribution will be merged

## Building

This section describes how you can get the Macrometa docs up and running on your machine.

### Prerequisites

- [Node](https://nodejs.dev/) – Using a version manager like [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) or [Volta](https://volta.sh/) is recommended.
- [Yarn](https://yarnpkg.com/) – Using the installation instructions [here](https://yarnpkg.com/getting-started/install) or install with [Homebrew](https://formulae.brew.sh/formula/yarn#default).

### Installation

1. Clone the repo

```bash
git clone git@github.com:Macrometacorp/docs.git && cd docs
```

2. Install dependencies

```bash
yarn install
```

3. Run the docs in developer mode. This mode updates the build whenever you save a change, but it doesn't always make broken links obvious. Docs will be available at `http://localhost:3000`.

```bash
yarn start
```

4. Before you push a PR, run the production build command. This will create a build and provide an extensive list of any broken links or any other issues that need to be addressed. Make any necessary fixes, then run this command again. Repeat until you do not see any errors in your build.

 ```bash
 yarn run build
 ```

 5. Display the production build. This serves the build you made in the previous step to `http://localhost:3000`. Unlike the developer mode, this build will not automatically update when you make a change.

 ```bash
 yarn run serve
 ```

### Troubleshooting

If you get a bunch of errors when you do a local build, first try updating your dependencies by running `yarn` in the top level of the `docs` directory. You must do this every time dependencies change.

You might also need to update yarn. If you do, follow the instructions displayed in the terminal.
