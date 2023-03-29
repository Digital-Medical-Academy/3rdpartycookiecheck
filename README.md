# Third party cookie check for browsers

===================================== 

A simple, static, passive (CDN-compatible) way of checking if third party cookies are enabled in a browser. Origin can be found here: https://github.com/mindmup/3rdpartycookiecheck

Consists of two scripts:

- one that will set a cookie,
- and another that will post a message (to the parent window) depending on if the cookie is present or not.
Our usecase within (Digital Medical Academy) is to check if 3rd party cookies are enabled and to send it to userflow in order to provide assistence for the current user.

Deploy the two scripts somewhere on a different domain from the main application, then load them similar to the  example below:
- **First**: you need to include an iFrame to the html page on the domain where you want to test if 3rd party cookies are enabled or not.
- **Second**: Include the js code from the file "snippet_v2_GPT.js" and include it to an TalentLMS theme.
- **Third**: include a userflow key (`const uf_key`) in order to send data to userflow

  
## Live example
Thanks to github pages, the scripts are hosted already at https://mindmup.github.io/3rdpartycookiecheck/start.html -- so you can use that as a live version. For production, it's better to deploy somewhere under your control.
To see the client code in action, run this JSFiddle: https://jsfiddle.net/mdLaeyzu/1/