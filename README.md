# steps to launching demo:

1. get vapid keys - do `yarn keys`
2. put keys in a `.env` file in project root with PUBLICKEY and PRIVATEKEY accordingly
3. to launch, do `yarn dev` in project root
4. don't forget yarn install

# steps to getting notification

## first time

1. `yarn install && yarn dev`
2. open browser, goto `localhost:5000`
3. accept the notifications
   - console in terminal should print out an object with some auth things
4. goto `localhost:4000/send-notification`
5. get your notification

# other times (already registered service worker)

1. `yarn install && yarn dev`
2. open browser, goto `localhost:5000`
3. remove service worker via devtools
4. reload the page
5. check console in browser, should have a long string of characters and `{ message: "success" }`
   - console in terminal should print out an object with some auth things
6. goto `localhost:4000/send-notification`
7. get your notification

# Demo for the Web Push blog

This is the working demo code for the blog post here:

[https://blog.atulr.com/web-notifications](https://blog.atulr.com/web-notifications)
