FROM node:5.12.0

ENV NODE_ENV development
ENV BABEL_ENV production

WORKDIR /src/

VOLUME /src
VOLUME /target

# add jq to parse npm package version in build
RUN apt-get update
RUN apt-get install jq
ADD build.sh /build.sh
RUN chmod +x /build.sh

CMD ["/build.sh"]
