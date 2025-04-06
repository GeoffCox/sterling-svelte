#run
run() {
    export STERLING_SVELTE_PUBLISH=true
    npm run build
    npm publish --dry-run
    unset STERLING_SVELTE_PUBLISH
}

run