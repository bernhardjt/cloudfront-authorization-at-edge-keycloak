const client_id = "mypage";
const ipd_url = "https://login.example.com";
const realm = "realmexample";

if (window.location.hash) {
    console.log("hash url")
    var lochash = window.location.hash.substr(1),
        mylocation = lochash.substr(lochash.search(/(?<=^|&)access_token=/))
        .split('&')[0]
        .split('=')[1];
    if (mylocation) {
        console.log(mylocation);
        document.cookie = `SSOToken=${mylocation};path=/`;
        location.reload();
    }
} else {
    const encodedRedirectUrl = (window.location.href);
    window.location.replace(`${ipd_url}/auth/realms/${realm}/protocol/openid-connect/auth?client_id=${client_id}&response_type=token&redirect_uri=${encodedRedirectUrl}`);
}