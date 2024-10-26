

# Hosting a Resume on AWS: Step-by-Step Guide

This guide explains how to host a resume on Amazon Web Services (AWS) using S3 for static website hosting, securing it with SSL through AWS Certificate Manager, and utilizing CloudFront for efficient content delivery. It also covers setting up Route 53 for domain management.
![Screenshot (260)](https://github.com/user-attachments/assets/c7c06f67-c7e5-4472-b321-1e98394d5485)

## Step 1: Create Your Resume in HTML, CSS, and JavaScript

1. **Develop Your Resume**: Write your resume using HTML for structure, CSS for styling, and JavaScript for interactivity.
   
2. **Test Locally**: Ensure that your website functions correctly on your local machine before deploying.

## Step 2: Create an S3 Bucket

1. **Log in to AWS Management Console**: Access the [AWS Management Console](https://aws.amazon.com/console/).

2. **Navigate to S3**: Search for "S3" in the services search bar and select it.

3. **Create a New Bucket**:
   - Click on “Create bucket”.
   - Enter a unique bucket name (this must be globally unique).
   - Choose the AWS region closest to your target audience for better performance.
   - Uncheck “Block all public access” to allow public access to your site (you’ll configure this in a later step).
   - Click “Create bucket”.

## Step 3: Upload Your Resume Files to S3

1. **Upload Files**:
   - Click on your newly created bucket.
   - Click on the “Upload” button.
   - Drag and drop your HTML, CSS, JavaScript files, and any images into the S3 bucket.

2. **Set Permissions**:
   - After uploading, select your HTML file (usually `index.html`).
   - Click on the “Actions” dropdown and select “Make public” to allow public access.

## Step 4: Enable Static Website Hosting

1. **Go to Properties**:
   - In the S3 bucket dashboard, click on the “Properties” tab.

2. **Enable Static Website Hosting**:
   - Scroll down to the “Static website hosting” section and click “Edit”.
   - Choose “Enable”.
   - Enter the name of your main HTML file (e.g., `index.html`) in the “Index document” field.
   - Optionally, enter a custom error document (like `404.html`) if you have one.
   - Click “Save changes”.

3. **Copy the Website Endpoint**: You’ll need this URL to access your resume.

## Step 5: Register a Domain Name

1. **Register Your Domain**: 
   - Register a domain through AWS Route 53 or any other domain registrar (e.g., GoDaddy, Namecheap).
   - If using Route 53, navigate to Route 53 in the console and click on “Registered domains”.
   - Follow the instructions to register your domain.

## Step 6: Set Up Route 53 Records

1. **Go to Hosted Zones**:
   - In Route 53, navigate to “Hosted zones” and create a new hosted zone for your domain if you registered through Route 53.
   - If registered elsewhere, update your registrar’s nameservers to point to the Route 53 nameservers provided.

2. **Create a Record Set**:
   - Select your hosted zone.
   - Click on “Create Record Set”.
   - Leave the “Name” field empty to set it for the root domain.
   - Choose “Alias” and select your S3 website endpoint in the “Alias Target”.
   - Click “Create”.

## Step 7: Secure Your Website with SSL

1. **Go to AWS Certificate Manager (ACM)**:
   - Search for “Certificate Manager” in the AWS services and select it.

2. **Request a Public Certificate**:
   - Click on “Request a certificate”.
   - Select “Request a public certificate” and click “Next”.
   - Enter your domain name (e.g., `www.yourdomain.com`).
   - Follow the validation steps (typically using DNS validation) to prove ownership of the domain.

3. **Validate Domain Ownership**:
   - ACM will provide DNS records that you need to add in Route 53 (or your domain registrar) to validate ownership.

## Step 8: Set Up CloudFront

1. **Create a CloudFront Distribution**:
   - Go to the CloudFront service in the AWS Management Console.
   - Click on “Create Distribution”.
   - Choose the “Web” option.
   - Under “Origin Domain Name”, select your S3 bucket’s website endpoint.

2. **Configure the Distribution**:
   - For “Viewer Protocol Policy”, select “Redirect HTTP to HTTPS” to ensure secure connections.
   - Under “SSL Certificate”, choose “Custom SSL Certificate” and select the certificate you created in ACM.
   - Configure other settings as needed (like caching options).

3. **Create Distribution**: Click on “Create Distribution” and wait for it to deploy. This may take a few minutes.

## Step 9: Update Route 53 Records to Point to CloudFront

1. **Get CloudFront Domain Name**:
   - Once your CloudFront distribution is deployed, you will see a “Domain Name” (e.g., `d1234abcdef8.cloudfront.net`).

2. **Go Back to Route 53**:
   - Navigate back to your hosted zone in Route 53.

3. **Create a New Record Set**:
   - Click “Create Record Set”.
   - Leave the “Name” field empty for the root domain (or enter `www` if setting up a subdomain).
   - Select “Alias” and in the “Alias Target” field, select your CloudFront distribution domain name.
   - Click “Create”.

## Step 10: Test Your Website

1. **Access Your Domain**: 
   - After DNS changes propagate (which can take a few minutes), access your resume via your custom domain (e.g., `https://yourdomain.com`).
   - Ensure that it loads over HTTPS and check for any issues.

