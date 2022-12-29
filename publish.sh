#run
run() {
    npm run build:demo
    echo built
    cp -R ./build/. ../geoffcox.github.io/demos/sterling-svelte
    echo copied
}

run