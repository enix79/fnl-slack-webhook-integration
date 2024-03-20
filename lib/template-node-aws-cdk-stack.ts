import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
    Function,
    Runtime,
    Code,
    FunctionUrl,
    FunctionUrlAuthType,
} from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class TemplateNodeAwsCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userLambda = new Function(this, 'User', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: Code.fromAsset(path.join('./lambda/user')),
        });

        new FunctionUrl(this, 'UserUrl', {
            function: userLambda,
            authType: FunctionUrlAuthType.NONE,
        });
    }
}
