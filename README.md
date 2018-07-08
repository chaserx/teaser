# Teaser

Trying to make my daughter think that I'm a cool Dad. `¯\_(ツ)_/¯`

## Setup

*   install `yarn` with `brew install yarn`. https://yarnpkg.com/en/docs/install

*   install node modules with `yarn install`. https://yarnpkg.com/en/docs/usage

*   from the project root, run `gulp` to build the `dist/` directory.

## Deploy

*   cloudformation template (s3 bucket, cloudfront distribution)

Required parameter: the hosted zone. This must already be in Route53.

`aws cloudformation create-stack --stack-name brainteaser --template-body file:///Users/chase/outside_projects/teaser/cloudformation/templates/s3_bucket_with_cloudfront.yaml --parameters ParameterKey=HostedZone,ParameterValue=brain-teaser.me --profile chaserx`

*   aws cli s3 sync contents of dist directory

`cd dist && aws s3 sync . s3://brainteaser2-s3bucketforwebsitecontent-m31h8exvpg72 --profile chaserx`

*   cloudfront invalidation

`aws cloudfront create-invalidation --distribution-id ABC123XYZ --paths /index.html /js/main.js`

## Gotchas

* You may still need to add a public bucket policy like this one: 

```JSON
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"PublicReadGetObject",
        "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::brainteaser2-s3bucketforwebsitecontent-m31h8exvpg72/*"
      ]
    }
  ]
}
```

* The default TTL is 900s (15 min)
* This [default template](https://github.com/awslabs/aws-cloudformation-templates/blob/master/aws/services/S3/S3_Website_With_CloudFront_Distribution.yaml) sets up a CNAME instead of an `A record with an alias` to the cloudfront distribution. You may want to update the cloudfront CNAME to the bare domain name and then once that's deployed you can attach. Updating the template with this would be nice. [See here](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-route53.html)
* Remember CloudFormation can be slow. 
* You might encounter a "Failed to contact the origin." error, which is perplexing. Adding an origin that is not "origin-only" but one that points to the bucket in this form: "brainteaser2-s3bucketforwebsitecontent-m31h8exvpg72.s3.amazonaws.com" seems to help.

## TODO

The CloudFormation template is a work in progress and just the base template (see above). Update the CloudFormation template to: 1) generate distribution differently; 2) create the Route 53 Record Set with an alias to the cloudfront distribution; 

## Attributions

_Background image photo_: [Photo by Kawtar CHERKAOUI on Unsplash](https://unsplash.com/photos/1Q1P_XpWylY)

_Brain teaser list_: I can not account for where or how this list of brain teaser questions was created as there was a long gap in development without sufficient notes. These brain teasers are not my own.
