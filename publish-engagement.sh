#! /bin/bash

UPDATE=“$1”
echo Publishing engagement website
echo ——————————————

cd ~/Dropbox/Public/engagement
scp index.html alee003@athena.dialup.mit.edu:/afs/athena.mit.edu/user/a/l/alee003/web_scripts
scp stylesheets/_engagement.css alee003@athena.dialup.mit.edu:/afs/athena.mit.edu/user/a/l/alee003/web_scripts
scp libs/engagement.js alee003@athena.dialup.mit.edu:/afs/athena.mit.edu/user/a/l/alee003/web_scripts

echo ——————————————
echo done.