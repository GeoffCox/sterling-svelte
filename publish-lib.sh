#run
run() {
    export STERLING_SVELTE_PUBLISH=true
    npm run build
    npm run package
    cp package.json dist/package.json
    cd dist
    # !dist/**/*.test.* => !**/*.test.*
    # !dist/**/*.test.* => !**/*.spec.*
    sed -i '' "s/\!dist\/\*\*\/\*\.test\.\*/\!\*\*\/\*\.test\.\*/g" package.json
    sed -i '' "s/\!dist\/\*\*\/\*\.spec\.\*/\!\*\*\/\*\.spec\.\*/g" package.json
    # dist/* -> **/*
    sed -i '' "s/dist\/\*/\*\*\/\*/g" package.json
    #./dist/ => ./
    sed -i '' "s/\.\/dist\//\.\//g" package.json
    npm publish --dry-run
    cd ..
    unset STERLING_SVELTE_PUBLISH
}

run