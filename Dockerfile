FROM node:latest

# Copy project content to docker image
COPY . /home/app/

WORKDIR /home/app/

# RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN npm install

EXPOSE 8003

USER node

# Use Supervisor to run and manage all other services
CMD ["npm", "start"]
