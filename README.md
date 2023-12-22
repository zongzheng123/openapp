## install
```
npm install -g opapp
```

## usage
```
opapp [appname]
```



## example
```
opapp github
```

## config 

#### you can set config in open.config.json or set open field in package.json
```
opapp -i  // init conifg file


{
    "defaultPlatform": "browser", // optional, default value is "browser"
    "defaultBrowser": "google chrome",  // optional, if not set will use system default browser
    "platforms": {
        "browser": { // every website key value
            "github": "https://github.com"
        }
    }
}
```