#run
run() {
    export STERLING_SVELTE_PUBLISH=true
    npm run build
    echo built
    cp -R ./build/. ../geoffcox.github.io/docs/sterling-svelte
    echo copied
    unset STERLING_SVELTE_PUBLISH
}

run