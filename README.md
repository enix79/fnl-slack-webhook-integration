# Finaply Slack integration

Finaply uses [fillout forms](https://www.fillout.com/) for streamlining requests of any type. Fillout is able to send the fields list to a dedicated email address. But it is currently not possible to only send filled (not null) values. For bigger forms, it becomes opaque and difficult to handle.

To help with this issue, this project creates AWS Lambda functions, that accept the fields list, filter out the null values and format it visually appealing for Slack.

# Techstack

This project has been bootstrapped from the CDK Typescript development template.

# Useful commands

-   `npm run build` compile typescript to js
-   `npm run watch` watch for changes and compile
-   `npm run test` perform the jest unit tests
-   `npx cdk deploy` deploy this stack to your default AWS account/region
-   `npx cdk diff` compare deployed stack with current state
-   `npx cdk synth` emits the synthesized CloudFormation template
