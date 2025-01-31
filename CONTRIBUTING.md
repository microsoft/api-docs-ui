# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Development setup

Install dependencies:

```bash
npm install
```

Run storybook:

```bash
npm run storybook
```

## Building and publishing

TBD

## Project structure

```
/src
|   /components  // Common basic components
|   /experiences // Experience components grouped by domain
|   /types       // Typescript type definitions
|   /utils       // Common utils
|   index.ts     // Entry point (re-export here your experience components)
```

## Component structure and rules
1. Each component (both basic or experience) should follow the next structure:
    ```
    /ComponentName
    |   ComponentName.tsx         // Component implementation
    |   ComponentName.stories.tsx // Storybook stories (only for experiences)
    |   index.ts                  // Component entry point
    ```
    Feel free to add more files or nested components as long as they are specific to this component in particular.
2. Treat each component as a black box and import only from its index.
If you need to make something accessible from outside the component, re-export it from the index.ts file. 
3. Each experience component must be re-exported from project entry file.

## Storybook
Storybook acts as both a tool for development and a consumer documentation.
With this in mind every experience component should have a storybook story file
and components that are not meant to be used outside the project should not have one.

Be sure to list all experience properties with their descriptions, default values etc. as well as
a couple of stories showcasing the component in different configurations.

## Testing locally
If you want to test your component locally in another project, chances are you won't be able to use `npm link`
because of how node modules are resolved with this method. To work around this you can use `yalc` to simulate actual
publishing of the package and then install it in your project.

Make sure you have the most recent code built before publishing:
```bash
npm run build
```

To publish run in current project:
```bash
yalc publish
```

To install in your target project run:
```bash
yalc add @microsoft/api-docs-ui
```

## Publishing

Currently, we are publishing to GitHub packages registry.

Make sure you have gh cli installed.

To initiate the publish process run:
```bash
npm run release
```

It will create a new branch, bump the version, build the project, create a pull request and merge it, and create a new tag and push it.
After new tag is pushed, the package will be published to GitHub packages registry with a Publish GitHub action.
