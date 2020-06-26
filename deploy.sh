#!/bin/sh

# Build site files.
hugo

cd public
rsync -vaR -e "ssh -i ~/.ssh/cdn77" * user_fnn9g5jk@push-24.cdn77.com:/www/

echo Deployment completed!
