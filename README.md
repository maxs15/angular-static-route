# Angular-static-route
Improvement of ngRoute to offer the possibility to create routes that execute an event without any template.

## Installation
Just add 'angular-static-route' in the module dependencies.

## Example
Here we want to call an overlay when matching the '/login' route.

```js
$routeProvider
.when('/', {
  templateUrl: '/' + evergigVersion + '/templates/home.html',
  controller: 'eg-home'
})
.when('/login', {
  defaultParent: '/',
  event: 'event:overlay-login'
});
```

The defaultParent is the view to display at the first load of the application.
If you we were already on the /help page for instance and you are clicking on the '/login' link, the background view will still be the /help page.


## License

(The MIT License)

Copyright (c) 2013 Maxime Mezrahi

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.