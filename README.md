# Introduction
This project allows you to create a small server that you can use as update center for jenkins plugins.
It basically rewrites all download urls with a mirror you provide.
## Usage
Deploy the container to your system with the adjusted mirror base url. Here is a compose example:

```
version: '2'

services:
  jenkins:
    container_name: jenkins-mirror-rewriter
    image: roemer/jenkins-mirror-rewriter
    restart: unless-stopped
    ports:
      - 8080:8080
    environment:
      - MIRROR_BASE_URL=https://your.artifactory.url/artifactory/jenkins-plugins
```

Change the url in Jenkins -> Plugin Manager -> Advanced -> Update Site to your deployed container like: `http://docker:8080/update-center.json`

## Caveats
### SHA-512 digest mismatch
Because the content changes and the signature is not regenerated, you need to disable the signature check in jenkins with the following setting:
`-Dhudson.model.DownloadService.noSignatureCheck=true`

### Container needs access to https://updates.jenkins.io/
The container downloads the original json file from updates.jenkins.io. This is because it uses the `version` get parameter for different versions and some mirror software (like artifactory) are unable to distinguish between different get parameter values so it just takes the original from jenkins.
