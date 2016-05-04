#!/bin/bash

npm i && npm test && npm run build:prod

tar cvzf /target/kodokojo-ui-${KODOKOJO_UI_VERSION}.tar.gz -C /src/static/ .

