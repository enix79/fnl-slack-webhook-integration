import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class TemplateNodeAwsCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const listUsersLambda = new Function(this, 'CreateUser', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromAsset(path.join('./lambda/user')),
        });
    }
}
