1. HOW TO INSTALL yarn
    ## Global install 
    > npm install --global yarn
    ## Check version
    > yarn --version

2. Init app in DHIS2
    ## Init script by itself with npx
        > npx @dhis2/cli-app-scripts init <app_name>
        > cd <app_name>

    ## To install d2-app-scripts ( for building, starting, deploying the app ) as a dev dependency (this is done for you by the init command) 
        > yarn add --dev @dhis2/cli-app-scripts

3. Install The DHIS2 application runtime. Used for retrieve data from DHIS2 server.
        > npx yarn-deduplicate --packages @dhis2/app-runtime

4. FOR THE APP ( see more information in file "package.json" of folder [app_name]  )
    
    ## Install app
        > yarn install
    ## Build the app
        > yarn run build
    ## Deploy the app on DHIS2 server
        > yarn run deploy
    ## Test the app
        > yarn run test

====================================================

TO CHANGE APPLICATION ICON
Replace the icon in this folder : > FOS_Partnerships\.d2\shell\public\dhis2-app-icon.png