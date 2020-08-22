const jwt = require('jsonwebtoken'); // tested with "^8.5.1" //  npm install jsonwebtoken --save

/*
This script is checking the header "Authorization" and the cookie "SSOToken" for a valide jwt (access_token).
If the token is valide and satisfies the criteria of issuer_url, client_name and allow_algorithms, the request will permit.
Unauthorized user get and "content" and "/login.js".
*/

const publicKEY = `
-----BEGIN PUBLIC KEY-----
MIIB*****
-----END PUBLIC KEY-----`;
const issuer_url = 'https://login.example.com/auth/realms/realmexample'
const client_name  = 'mypage'
const allow_algorithms = ['RS256']


function parseCookies(headers) {
    const parsedCookie = {};
    if (headers.cookie) {
        headers.cookie[0].value.split(';').forEach((cookie) => {
            if (cookie) {
                const parts = cookie.split('=');
                parsedCookie[parts[0].trim()] = parts[1].trim();
            }
        });
    }
    return parsedCookie;
}

function checkJWT(jwtToken) {
    //Fail if the token is not jwt
    var decodedJwt = jwt.decode(jwtToken, {complete: true});
    if (!decodedJwt) {
        return false;
    }

    try {
        var decoded = jwt.verify(jwtToken, publicKEY, { algorithms: allow_algorithms, issuer: issuer_url });
        if (decoded.azp == client_name) {
            return true
        }
    } catch(err) {
        console.log(err.message);
        return false
    }

    return false
}  


exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    if (request.uri == '/login.js') {
        callback(null, request);
        return;
    }

    if (headers['authorization']) {
        if (checkJWT(headers['authorization'][0].value)) {
            callback(null, request);
            return;
        } else {
            console.log('NO valid token')
        }
    }

    const parsedCookies = parseCookies(headers);
    if (parsedCookies && parsedCookies['SSOToken']) {
        if (checkJWT(parsedCookies['SSOToken'])) {
            callback(null, request);
            return;
        } else {
            console.log('NO valid token')
        }
    }

    const content = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Login Redirect</title>
        </head>
        <body>
            <script src='/login.js'></script>
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
        </body>
    </html>
    `;

    const response = {
        status: '401',
        statusDescription: 'Unauthorized',
        body: content,
        
    };
    callback(null, response);
};
