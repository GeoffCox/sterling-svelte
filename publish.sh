#run
run() {
    export STERLING_SVELTE_PUBLISH=true
    npm run build
    echo built
    cp -R ./build/. ../geoffcox.github.io/demos/sterling-svelte
    echo copied
    unset STERLING_SVELTE_PUBLISH
}

run