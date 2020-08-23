# Local Lambda test

## USE
```
cat event_***.json | docker run --rm \                                                                       
  -v "$PWD/src":/var/task:ro,delegated \
  -i -e DOCKER_LAMBDA_USE_STDIN=1  \
  lambci/lambda:nodejs12.x \
  index.handler
```

## Example
```
  # Example for jwt expired token 
  cat event_auth_cookie.json| docker run --rm \                                                                       
  -v "$PWD/src":/var/task:ro,delegated \
  -i -e DOCKER_LAMBDA_USE_STDIN=1  \
  lambci/lambda:nodejs12.x \
  index.handler
```

### Output
```
START RequestId: fe4dde49-d4cb-1913-e977-2b40b96cebf0 Version: $LATEST
2020-08-22T15:24:56.535Z        fe4dde49-d4cb-1913-e977-2b40b96cebf0    INFO    jwt expired
2020-08-22T15:24:56.539Z        fe4dde49-d4cb-1913-e977-2b40b96cebf0    INFO    NO valid token
END RequestId: fe4dde49-d4cb-1913-e977-2b40b96cebf0
REPORT RequestId: fe4dde49-d4cb-1913-e977-2b40b96cebf0  Init Duration: 648.50 ms        Duration: 23.68 ms      Billed Duration: 100 ms Memory Size: 1536 MB    Max Memory Used: 45 MB

{"status":"401","statusDescription":"Unauthorized","body":"\n    \u003c!DOCTYPE html\u003e\n    \u003chtml\u003e\n        \u003chead\u003e\n            \u003ctitle\u003eLogin Redirect\u003c/title\u003e\n        \u003c/head\u003e\n        \u003cbody\u003e\n            \u003cscript src='/login.js'\u003e\u003c/script\u003e\n            \u003cnoscript\u003e\n                You need to enable JavaScript to run this app.\n            \u003c/noscript\u003e\n        \u003c/body\u003e\n    \u003c/html\u003e\n    "}
```