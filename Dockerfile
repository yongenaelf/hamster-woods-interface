FROM node:18.16.0

ARG web=/opt/workspace/aelf-example

WORKDIR ${web}

COPY . ${web}

RUN yarn \
    && yarn build-dev

ENTRYPOINT yarn start

EXPOSE 3000
