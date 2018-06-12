/**
 * ui-iconpicker
 *
 * @version   v0.1.4
 * @author    Justin Lau <justin@tclau.com>
 * @copyright Copyright (c) 2014 Justin Lau <justin@tclau.com>
 * @license   The MIT License (MIT)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("values/icon-groups-map", ["angular"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/values/icon-groups-map", []);
    return module.value("iconGroupsMap", {
      "bootstrap": {
        prefix: "glyphicon glyphicon-",
        classes: ["asterisk", "plus", "euro", "minus", "cloud", "envelope", "pencil", "glass", "music", "search", "heart", "star", "star-empty", "user", "film", "th-large", "th", "th-list", "ok", "remove", "zoom-in", "zoom-out", "off", "signal", "cog", "trash", "home", "file", "time", "road", "download-alt", "download", "upload", "inbox", "play-circle", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "indent-left", "indent-right", "facetime-video", "picture", "map-marker", "adjust", "tint", "edit", "share", "check", "move", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-sign", "minus-sign", "remove-sign", "ok-sign", "question-sign", "info-sign", "screenshot", "remove-circle", "ok-circle", "ban-circle", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "share-alt", "resize-full", "resize-small", "exclamation-sign", "gift", "leaf", "fire", "eye-open", "eye-close", "warning-sign", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder-close", "folder-open", "resize-vertical", "resize-horizontal", "hdd", "bullhorn", "bell", "certificate", "thumbs-up", "thumbs-down", "hand-right", "hand-left", "hand-up", "hand-down", "circle-arrow-right", "circle-arrow-left", "circle-arrow-up", "circle-arrow-down", "globe", "wrench", "tasks", "filter", "briefcase", "fullscreen", "dashboard", "paperclip", "heart-empty", "link", "phone", "pushpin", "usd", "gbp", "sort", "sort-by-alphabet", "sort-by-alphabet-alt", "sort-by-order", "sort-by-order-alt", "sort-by-attributes", "sort-by-attributes-alt", "unchecked", "expand", "collapse-down", "collapse-up", "log-in", "flash", "log-out", "new-window", "record", "save", "open", "saved", "import", "export", "send", "floppy-disk", "floppy-saved", "floppy-remove", "floppy-save", "floppy-open", "credit-card", "transfer", "cutlery", "header", "compressed", "earphone", "phone-alt", "tower", "stats", "sd-video", "hd-video", "subtitles", "sound-stereo", "sound-dolby", "sound-5-1", "sound-6-1", "sound-7-1", "copyright-mark", "registration-mark", "cloud-download", "cloud-upload", "tree-conifer", "tree-deciduous"]
      },
      "font-awesome": {
        prefix: "fa fa-lg fa-",
        classes: ["glass", "music", "search", "envelope-o", "heart", "star", "star-o", "user", "film", "th-large", "th", "th-list", "check", "times", "search-plus", "search-minus", "power-off", "signal", "gear", "cog", "trash-o", "home", "file-o", "clock-o", "road", "download", "arrow-circle-o-down", "arrow-circle-o-up", "inbox", "play-circle-o", "rotate-right", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "dedent", "outdent", "indent", "video-camera", "picture-o", "pencil", "map-marker", "adjust", "tint", "edit", "pencil-square-o", "share-square-o", "check-square-o", "arrows", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-circle", "minus-circle", "times-circle", "check-circle", "question-circle", "info-circle", "crosshairs", "times-circle-o", "check-circle-o", "ban", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "mail-forward", "share", "expand", "compress", "plus", "minus", "asterisk", "exclamation-circle", "gift", "leaf", "fire", "eye", "eye-slash", "warning", "exclamation-triangle", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder", "folder-open", "arrows-v", "arrows-h", "bar-chart-o", "twitter-square", "facebook-square", "camera-retro", "key", "gears", "cogs", "comments", "thumbs-o-up", "thumbs-o-down", "star-half", "heart-o", "sign-out", "linkedin-square", "thumb-tack", "external-link", "sign-in", "trophy", "github-square", "upload", "lemon-o", "phone", "square-o", "bookmark-o", "phone-square", "twitter", "facebook", "github", "unlock", "credit-card", "rss", "hdd-o", "bullhorn", "bell", "certificate", "hand-o-right", "hand-o-left", "hand-o-up", "hand-o-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-circle-down", "globe", "wrench", "tasks", "filter", "briefcase", "arrows-alt", "group", "users", "chain", "link", "cloud", "flask", "cut", "scissors", "copy", "files-o", "paperclip", "save", "floppy-o", "square", "bars", "list-ul", "list-ol", "strikethrough", "underline", "table", "magic", "truck", "pinterest", "pinterest-square", "google-plus-square", "google-plus", "money", "caret-down", "caret-up", "caret-left", "caret-right", "columns", "unsorted", "sort", "sort-down", "sort-asc", "sort-up", "sort-desc", "envelope", "linkedin", "rotate-left", "undo", "legal", "gavel", "dashboard", "tachometer", "comment-o", "comments-o", "flash", "bolt", "sitemap", "umbrella", "paste", "clipboard", "lightbulb-o", "exchange", "cloud-download", "cloud-upload", "user-md", "stethoscope", "suitcase", "bell-o", "coffee", "cutlery", "file-text-o", "building-o", "hospital-o", "ambulance", "medkit", "fighter-jet", "beer", "h-square", "plus-square", "angle-double-left", "angle-double-right", "angle-double-up", "angle-double-down", "angle-left", "angle-right", "angle-up", "angle-down", "desktop", "laptop", "tablet", "mobile-phone", "mobile", "circle-o", "quote-left", "quote-right", "spinner", "circle", "mail-reply", "reply", "github-alt", "folder-o", "folder-open-o", "smile-o", "frown-o", "meh-o", "gamepad", "keyboard-o", "flag-o", "flag-checkered", "terminal", "code", "reply-all", "mail-reply-all", "star-half-empty", "star-half-full", "star-half-o", "location-arrow", "crop", "code-fork", "unlink", "chain-broken", "question", "info", "exclamation", "superscript", "subscript", "eraser", "puzzle-piece", "microphone", "microphone-slash", "shield", "calendar-o", "fire-extinguisher", "rocket", "maxcdn", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-circle-down", "html5", "css3", "anchor", "unlock-alt", "bullseye", "ellipsis-h", "ellipsis-v", "rss-square", "play-circle", "ticket", "minus-square", "minus-square-o", "level-up", "level-down", "check-square", "pencil-square", "external-link-square", "share-square", "compass", "toggle-down", "caret-square-o-down", "toggle-up", "caret-square-o-up", "toggle-right", "caret-square-o-right", "euro", "eur", "gbp", "dollar", "usd", "rupee", "inr", "cny", "rmb", "yen", "jpy", "ruble", "rouble", "rub", "won", "krw", "bitcoin", "btc", "file", "file-text", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-numeric-asc", "sort-numeric-desc", "thumbs-up", "thumbs-down", "youtube-square", "youtube", "xing", "xing-square", "youtube-play", "dropbox", "stack-overflow", "instagram", "flickr", "adn", "bitbucket", "bitbucket-square", "tumblr", "tumblr-square", "long-arrow-down", "long-arrow-up", "long-arrow-left", "long-arrow-right", "apple", "windows", "android", "linux", "dribbble", "skype", "foursquare", "trello", "female", "male", "gittip", "sun-o", "moon-o", "archive", "bug", "vk", "weibo", "renren", "pagelines", "stack-exchange", "arrow-circle-o-right", "arrow-circle-o-left", "toggle-left", "caret-square-o-left", "dot-circle-o", "wheelchair", "vimeo-square", "turkish-lira", "try", "plus-square-o"]
      },
      "ionicons": {
        prefix: "ion ion-",
        classes: ["alert","alert-circled","android-add","android-add-circle","android-alarm-clock","android-alert","android-apps","android-archive","android-arrow-back","android-arrow-down","android-arrow-dropdown","android-arrow-dropdown-circle","android-arrow-dropleft","android-arrow-dropleft-circle","android-arrow-dropright","android-arrow-dropright-circle","android-arrow-dropup","android-arrow-dropup-circle","android-arrow-forward","android-arrow-up","android-attach","android-bar","android-bicycle","android-boat","android-bookmark","android-bulb","android-bus","android-calendar","android-call","android-camera","android-cancel","android-car","android-cart","android-chat","android-checkbox","android-checkbox-blank","android-checkbox-outline","android-checkbox-outline-blank","android-checkmark-circle","android-clipboard","android-close","android-cloud","android-cloud-circle","android-cloud-done","android-cloud-outline","android-color-palette","android-compass","android-contact","android-contacts","android-contract","android-create","android-delete","android-desktop","android-document","android-done","android-done-all","android-download","android-drafts","android-exit","android-expand","android-favorite","android-favorite-outline","android-film","android-folder","android-folder-open","android-funnel","android-globe","android-hand","android-hangout","android-happy","android-home","android-image","android-laptop","android-list","android-locate","android-lock","android-mail","android-map","android-menu","android-microphone","android-microphone-off","android-more-horizontal","android-more-vertical","android-navigate","android-notifications","android-notifications-none","android-notifications-off","android-open","android-options","android-people","android-person","android-person-add","android-phone-landscape","android-phone-portrait","android-pin","android-plane","android-playstore","android-print","android-radio-button-off","android-radio-button-on","android-refresh","android-remove","android-remove-circle","android-restaurant","android-sad","android-search","android-send","android-settings","android-share","android-share-alt","android-star","android-star-half","android-star-outline","android-stopwatch","android-subway","android-sunny","android-sync","android-textsms","android-time","android-train","android-unlock","android-upload","android-volume-down","android-volume-mute","android-volume-off","android-volume-up","android-walk","android-warning","android-watch","android-wifi","aperture","archive","arrow-down-a","arrow-down-b","arrow-down-c","arrow-expand","arrow-graph-down-left","arrow-graph-down-right","arrow-graph-up-left","arrow-graph-up-right","arrow-left-a","arrow-left-b","arrow-left-c","arrow-move","arrow-resize","arrow-return-left","arrow-return-right","arrow-right-a","arrow-right-b","arrow-right-c","arrow-shrink","arrow-swap","arrow-up-a","arrow-up-b","arrow-up-c","asterisk","at","backspace","backspace-outline","bag","battery-charging","battery-empty","battery-full","battery-half","battery-low","beaker","beer","bluetooth","bonfire","bookmark","bowtie","briefcase","bug","calculator","calendar","camera","card","cash","chatbox","chatbox-working","chatboxes","chatbubble","chatbubble-working","chatbubbles","checkmark","checkmark-circled","checkmark-round","chevron-down","chevron-left","chevron-right","chevron-up","clipboard","clock","close","close-circled","close-round","closed-captioning","cloud","code","code-download","code-working","coffee","compass","compose","connection-bars","contrast","crop","cube","disc","document","document-text","drag","earth","easel","edit","egg","eject","email","email-unread","erlenmeyer-flask","erlenmeyer-flask-bubbles","eye","eye-disabled","female","filing","film-marker","fireball","flag","flame","flash","flash-off","folder","fork","fork-repo","forward","funnel","gear-a","gear-b","grid","hammer","happy","happy-outline","headphone","heart","heart-broken","help","help-buoy","help-circled","home","icecream","image","images","information","information-circled","ionic","ios-alarm","ios-alarm-outline","ios-albums","ios-albums-outline","ios-americanfootball","ios-americanfootball-outline","ios-analytics","ios-analytics-outline","ios-arrow-back","ios-arrow-down","ios-arrow-forward","ios-arrow-left","ios-arrow-right","ios-arrow-thin-down","ios-arrow-thin-left","ios-arrow-thin-right","ios-arrow-thin-up","ios-arrow-up","ios-at","ios-at-outline","ios-barcode","ios-barcode-outline","ios-baseball","ios-baseball-outline","ios-basketball","ios-basketball-outline","ios-bell","ios-bell-outline","ios-body","ios-body-outline","ios-bolt","ios-bolt-outline","ios-book","ios-book-outline","ios-bookmarks","ios-bookmarks-outline","ios-box","ios-box-outline","ios-briefcase","ios-briefcase-outline","ios-browsers","ios-browsers-outline","ios-calculator","ios-calculator-outline","ios-calendar","ios-calendar-outline","ios-camera","ios-camera-outline","ios-cart","ios-cart-outline","ios-chatboxes","ios-chatboxes-outline","ios-chatbubble","ios-chatbubble-outline","ios-checkmark","ios-checkmark-empty","ios-checkmark-outline","ios-circle-filled","ios-circle-outline","ios-clock","ios-clock-outline","ios-close","ios-close-empty","ios-close-outline","ios-cloud","ios-cloud-download","ios-cloud-download-outline","ios-cloud-outline","ios-cloud-upload","ios-cloud-upload-outline","ios-cloudy","ios-cloudy-night","ios-cloudy-night-outline","ios-cloudy-outline","ios-cog","ios-cog-outline","ios-color-filter","ios-color-filter-outline","ios-color-wand","ios-color-wand-outline","ios-compose","ios-compose-outline","ios-contact","ios-contact-outline","ios-copy","ios-copy-outline","ios-crop","ios-crop-strong","ios-download","ios-download-outline","ios-drag","ios-email","ios-email-outline","ios-eye","ios-eye-outline","ios-fastforward","ios-fastforward-outline","ios-filing","ios-filing-outline","ios-film","ios-film-outline","ios-flag","ios-flag-outline","ios-flame","ios-flame-outline","ios-flask","ios-flask-outline","ios-flower","ios-flower-outline","ios-folder","ios-folder-outline","ios-football","ios-football-outline","ios-game-controller-a","ios-game-controller-a-outline","ios-game-controller-b","ios-game-controller-b-outline","ios-gear","ios-gear-outline","ios-glasses","ios-glasses-outline","ios-grid-view","ios-grid-view-outline","ios-heart","ios-heart-outline","ios-help","ios-help-empty","ios-help-outline","ios-home","ios-home-outline","ios-infinite","ios-infinite-outline","ios-information","ios-information-empty","ios-information-outline","ios-ionic-outline","ios-keypad","ios-keypad-outline","ios-lightbulb","ios-lightbulb-outline","ios-list","ios-list-outline","ios-location","ios-location-outline","ios-locked","ios-locked-outline","ios-loop","ios-loop-strong","ios-medical","ios-medical-outline","ios-medkit","ios-medkit-outline","ios-mic","ios-mic-off","ios-mic-outline","ios-minus","ios-minus-empty","ios-minus-outline","ios-monitor","ios-monitor-outline","ios-moon","ios-moon-outline","ios-more","ios-more-outline","ios-musical-note","ios-musical-notes","ios-navigate","ios-navigate-outline","ios-nutrition","ios-nutrition-outline","ios-paper","ios-paper-outline","ios-paperplane","ios-paperplane-outline","ios-partlysunny","ios-partlysunny-outline","ios-pause","ios-pause-outline","ios-paw","ios-paw-outline","ios-people","ios-people-outline","ios-person","ios-person-outline","ios-personadd","ios-personadd-outline","ios-photos","ios-photos-outline","ios-pie","ios-pie-outline","ios-pint","ios-pint-outline","ios-play","ios-play-outline","ios-plus","ios-plus-empty","ios-plus-outline","ios-pricetag","ios-pricetag-outline","ios-pricetags","ios-pricetags-outline","ios-printer","ios-printer-outline","ios-pulse","ios-pulse-strong","ios-rainy","ios-rainy-outline","ios-recording","ios-recording-outline","ios-redo","ios-redo-outline","ios-refresh","ios-refresh-empty","ios-refresh-outline","ios-reload","ios-reverse-camera","ios-reverse-camera-outline","ios-rewind","ios-rewind-outline","ios-rose","ios-rose-outline","ios-search","ios-search-strong","ios-settings","ios-settings-strong","ios-shuffle","ios-shuffle-strong","ios-skipbackward","ios-skipbackward-outline","ios-skipforward","ios-skipforward-outline","ios-snowy","ios-speedometer","ios-speedometer-outline","ios-star","ios-star-half","ios-star-outline","ios-stopwatch","ios-stopwatch-outline","ios-sunny","ios-sunny-outline","ios-telephone","ios-telephone-outline","ios-tennisball","ios-tennisball-outline","ios-thunderstorm","ios-thunderstorm-outline","ios-time","ios-time-outline","ios-timer","ios-timer-outline","ios-toggle","ios-toggle-outline","ios-trash","ios-trash-outline","ios-undo","ios-undo-outline","ios-unlocked","ios-unlocked-outline","ios-upload","ios-upload-outline","ios-videocam","ios-videocam-outline","ios-volume-high","ios-volume-low","ios-wineglass","ios-wineglass-outline","ios-world","ios-world-outline","ipad","iphone","ipod","jet","key","knife","laptop","leaf","levels","lightbulb","link","load-a","load-b","load-c","load-d","location","lock-combination","locked","log-in","log-out","loop","magnet","male","man","map","medkit","merge","mic-a","mic-b","mic-c","minus","minus-circled","minus-round","model-s","monitor","more","mouse","music-note","navicon","navicon-round","navigate","network","no-smoking","nuclear","outlet","paintbrush","paintbucket","paper-airplane","paperclip","pause","person","person-add","person-stalker","pie-graph","pin","pinpoint","pizza","plane","planet","play","playstation","plus","plus-circled","plus-round","podium","pound","power","pricetag","pricetags","printer","pull-request","qr-scanner","quote","radio-waves","record","refresh","reply","reply-all","ribbon-a","ribbon-b","sad","sad-outline","scissors","search","settings","share","shuffle","skip-backward","skip-forward","social-android","social-android-outline","social-angular","social-angular-outline","social-apple","social-apple-outline","social-bitcoin","social-bitcoin-outline","social-buffer","social-buffer-outline","social-chrome","social-chrome-outline","social-codepen","social-codepen-outline","social-css3","social-css3-outline","social-designernews","social-designernews-outline","social-dribbble","social-dribbble-outline","social-dropbox","social-dropbox-outline","social-euro","social-euro-outline","social-facebook","social-facebook-outline","social-foursquare","social-foursquare-outline","social-freebsd-devil","social-github","social-github-outline","social-google","social-google-outline","social-googleplus","social-googleplus-outline","social-hackernews","social-hackernews-outline","social-html5","social-html5-outline","social-instagram","social-instagram-outline","social-javascript","social-javascript-outline","social-linkedin","social-linkedin-outline","social-markdown","social-nodejs","social-octocat","social-pinterest","social-pinterest-outline","social-python","social-reddit","social-reddit-outline","social-rss","social-rss-outline","social-sass","social-skype","social-skype-outline","social-snapchat","social-snapchat-outline","social-tumblr","social-tumblr-outline","social-tux","social-twitch","social-twitch-outline","social-twitter","social-twitter-outline","social-usd","social-usd-outline","social-vimeo","social-vimeo-outline","social-whatsapp","social-whatsapp-outline","social-windows","social-windows-outline","social-wordpress","social-wordpress-outline","social-yahoo","social-yahoo-outline","social-yen","social-yen-outline","social-youtube","social-youtube-outline","soup-can","soup-can-outline","speakerphone","speedometer","spoon","star","stats-bars","steam","stop","thermometer","thumbsdown","thumbsup","toggle","toggle-filled","transgender","trash-a","trash-b","trophy","tshirt","tshirt-outline","umbrella","university","unlocked","upload","usb","videocamera","volume-high","volume-low","volume-medium","volume-mute","wand","waterdrop","wifi","wineglass","woman","wrench","xbox"]
      }
    });
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("services/IconGroupCollection", ["angular", "values/icon-groups-map"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/services/IconGroupCollection", ["ui-iconpicker/values/icon-groups-map"]);
    return module.factory("IconGroupCollection", [
      "iconGroupsMap", function(iconGroupsMap) {
        var IconGroupCollection;
        return IconGroupCollection = (function() {
          function IconGroupCollection(groupIdLiteral) {
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            this.iconGroupsMap = {};
            this.includeGroups(groupIdLiteral);
          }

          IconGroupCollection.prototype.filterByGroups = function(groupIdLiteral) {
            var group, groupId, groupIds, _ref;
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            if (groupIdLiteral !== "all") {
              groupIds = groupIdLiteral.split(" ");
              _ref = this.iconGroupsMap;
              for (groupId in _ref) {
                group = _ref[groupId];
                if (groupIds.indexOf(groupId) !== -1) {
                  delete this.iconGroupsMap[groupId];
                }
              }
            }
            return this;
          };

          IconGroupCollection.prototype.includeGroups = function(groupIdLiteral) {
            var group, groupId, groupIds;
            if (groupIdLiteral == null) {
              groupIdLiteral = "bootstrap";
            }
            groupIds = groupIdLiteral.split(" ");
            for (groupId in iconGroupsMap) {
              group = iconGroupsMap[groupId];
              if (this.iconGroupsMap[groupId] == null) {
                if (groupIdLiteral === "all" || groupIds.indexOf(groupId) !== -1) {
                  this.iconGroupsMap[groupId] = group;
                }
              }
            }
            return this;
          };

          IconGroupCollection.prototype.getClassArray = function() {
            var classes, group, iconClass, id, _i, _len, _ref, _ref1;
            classes = [];
            _ref = this.iconGroupsMap;
            for (id in _ref) {
              group = _ref[id];
              _ref1 = group.classes;
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                iconClass = _ref1[_i];
                classes.push(group.prefix + iconClass);
              }
            }
            return classes;
          };

          return IconGroupCollection;

        })();
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("templates/iconpicker", ["angular", "angular-bootstrap"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/templates/iconpicker", ["ui.bootstrap"]);
    return module.run([
      "$templateCache", function($templateCache) {
        return $templateCache.put("templates/iconpicker.html", "<span class=\"btn-group ui-iconpicker\" ng-class=\"{ disabled: disabled }\" dropdown>\n	<button type=\"button\" class=\"btn btn-default dropdown-toggle\"><i class=\"{{ iconClass }}\"></i><span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\">\n		<li ng-repeat=\"class in availableIconClasses\">\n			<button class=\"btn btn-default\" type=\"button\" ng-click=\"$parent.iconClass = class\"><span class=\"{{ class }}\"></span></button>\n		</li>\n	</ul>\n	<input name=\"{{ name }}\" type=\"hidden\" value=\"{{ iconClass }}\" ng-if=\"name\" />\n</span>");
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("directives/ui-iconpicker", ["angular", "services/IconGroupCollection", "templates/iconpicker"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    var module;
    module = angular.module("ui-iconpicker/directives/ui-iconpicker", ["ui-iconpicker/services/IconGroupCollection", "ui-iconpicker/templates/iconpicker"]);
    return module.directive("uiIconpicker", [
      "IconGroupCollection", function(IconGroupCollection) {
        return {
          replace: true,
          restrict: "E",
          scope: {
            name: "@",
            model: "=?ngModel"
          },
          templateUrl: "templates/iconpicker.html",
          link: function($scope, $element, attrs) {
            var _ref;
            $scope.availableIconClasses = (new IconGroupCollection(attrs.groups)).getClassArray();
            $scope.iconClass = (_ref = attrs.value) != null ? _ref : $scope.availableIconClasses[0];
            if (attrs.ngModel) {
              $scope.model = $scope[attrs.ngModel];
              $scope.$watch("iconClass", function() {
                return $scope.model = $scope.iconClass;
              });
              $scope.$watch("model", function() {
                return $scope.iconClass = $scope.model;
              });
            }
            $scope.$dropdownButton = $element.find("button").eq(0);
            return $scope.disabled = attrs.disabled != null;
          }
        };
      }
    ]);
  });

}).call(this);

(function() {
  var umd;

  umd = function(root, factory) {
    if (typeof define === "function" && (define.amd != null)) {
      return define("ui-iconpicker", ["angular", "directives/ui-iconpicker"], factory);
    } else {
      return factory(root.angular);
    }
  };

  umd(this, function(angular) {
    return angular.module("ui-iconpicker", ["ui-iconpicker/directives/ui-iconpicker"]);
  });

}).call(this);

