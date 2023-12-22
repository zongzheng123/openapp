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
```
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