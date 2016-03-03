#!/bin/bash

rm -rf /src/static
mkdir -p /src/static/
touch /src/static/index.html

npm i && npm run build:prod

tar cvzf /target/kodokojo-ui-${KODOKOJO_UI_VERSION}.tar.gz -C /src/static/ .

