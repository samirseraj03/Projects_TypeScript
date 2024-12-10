# Orbitas Backend 

This project uses Deno as the runtime environment. Below are the steps to install Deno, set up dependencies, and run the project.

## Requirements

- **Deno**: A runtime for JavaScript and TypeScript.

## Installation

### 1. Install Deno

To install Deno, follow the official installation instructions on their website [here](https://docs.deno.com/runtime/).



## Install dependencies

deno install


## Run the project

deno run --allow-net --allow-env main.ts


### Explanation of commands:

- **`deno install`**: Deno does not use a package manager like npm. Instead, dependencies are imported directly in your code from URLs. If your project doesn't need any external dependencies, you can skip this step and go straight to running the application.

- **`deno run --allow-net --allow-env main.ts`**: This command runs the `main.ts` file and grants it permissions to access the network (`--allow-net`) and environment variables (`--allow-env`). Be sure to include any other permissions your project may require, such as access to databases or files.

