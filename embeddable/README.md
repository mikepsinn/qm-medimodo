# QuantiModo Embeddable Features

Gives capability to embed QuantiModo analyze and tracking features to the any web page.

Currently supported following following features:

1. Search For Variable Relationships

## Usage

To install plugin just put an iFrame tag whenever you want at the page. Set appropriate `height` and `width` and specify
`src` attribute accordingly to the required plugin.

*don't forget to include `client` and `secret`* params into the url

For example:

`<iframe src="https://embed.quantimo.do?plugin=search-relationships&outcome=Overall%20Mood&predictor=Steps&client=777&secret=777"
         frameborder="1" width="100%" height="768">
 </iframe>`

## Development

* Get plugin sources
* Setup virtual host of your server and point to the directory with `index.html` of the plugin

```
<VirtualHost *:80>
        DocumentRoot "/Users/alt/sites/QM-Docker/http/embeddable"
        ServerName embed.quantimo.local
</VirtualHost>
```

* Add new record to hosts
* Restart server
* You can reach required plugin functionality by specifying `?plugin=` parameter. 
Try to set `http://yourhost.com?plugin=search-relationships` or directly in the address bar of the browser or by
specifying this as a `src` value in the iframe
