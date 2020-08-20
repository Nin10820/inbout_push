# build
yarn run build
set -e
# navigate into the build output directory
cd dist
 
git init
git add -A
git commit -m 'deploy'
 
git push -f git@github.com:Nin10820/inbout_push.git master:demo
# git push -f test git@github.com:buymed-engines/mdm.git master:gh-pages
 
cd -