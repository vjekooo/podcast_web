aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 150363524457.dkr.ecr.eu-west-1.amazonaws.com

docker push 150363524457.dkr.ecr.eu-west-1.amazonaws.com/podcast_web:latest