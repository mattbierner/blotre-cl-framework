<div align="center">
    <a href="https://blot.re">
        <img src="https://github.com/mattbierner/blotre/raw/master/documentation/readme-logo.png" width="280px" alt="Blot're" />
    </a>
</div>

[Blot're][blotre] simple command line application framework for disposable
client apps. Uses [Blot're.js][blotre-js] to interact with Blot're and make API calls.

The framework can:
* Register a new disposable client.
* Prompt the user to redeem the client code.
* Persist creds.
* Automatically pick up persisted creds when run again.


## Example

```
var BlotreCl = require('blotre-cl-framework');

// Register a new client application or pick up an existing application.
// Will prompt the user to redeem if needed.
// This returns a promise to a new Blot're client 
BlotreCl({
    "name": "Toa*",
    "blurb": "The Pintrest of toast." })
    .then(function(client) {
        // Now we have a fully authorizedclient app and can 
        // make Blot're.js calls
        return client.getStream(client.creds.user.rootStream);
    })
    .then(console.log)
    .catch(console.err);
```


[blotre]: https://blot.re
[blotre-disposable]: https://github.com/mattbierner/blotre/wiki/single-use-clients

[blotre-js]: https://github.com/mattbierner/blotre-js

[documentation]: https://github.com/mattbierner/blotre-js/wiki

[bluebird]: https://github.com/petkaantonov/bluebird